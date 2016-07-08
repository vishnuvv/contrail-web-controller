/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var userDefinedCountersCollectionModel = ContrailModel.extend({

        defaultConfig: {
            name : '',
            pattern : ''
        },

        validations: {
            userDefinedCounterValidation: {
                'name' : function(value, attr, finalObj) {
                    if(value === null || value.trim() === '') {
                        return "Enter the name";
                    }
                },
                'pattern': function(value, attr, finalObj) {
                    if(value === null || value.trim() === '') {
                        return "Enter the pattern";
                    }
                }
            }
        },
        
        getCurrentGlobalSystemConfigData : function (callbackObj,deferredObj) {
            var ajaxConfig = {
                    url : "/api/tenants/config/get-config-details",
                    type : 'POST',
                    data : JSON.stringify({data:
                        [{type: 'global-system-configs'}]})
             };
            contrail.ajaxHandler(ajaxConfig, null, function(response) {
                //Got the current global system config, send back
                deferredObj.resolve(response);
            },function(error) {
                //Got error return to caller
                callbackObj.error(error);
            }
            );
        },
        
        configureUserDefinedCounter : function (callbackObj,currentGlobalSystemConfigData,currentUserDefinedCounterList) {
            //Call the configure function in the parent model
            var userDefinedCountersData = {};
            userDefinedCountersData['global-system-config'] = {};

            if ((null != currentUserDefinedCounterList) & (currentUserDefinedCounterList.length > 0)) {
                userDefinedCountersData['global-system-config']['user_defined_counter'] = {};
                userDefinedCountersData['global-system-config']['user_defined_counter']
                       ['counter'] = currentUserDefinedCounterList;
            } else {
                userDefinedCountersData['global-system-config']['user_defined_counter']
                    = null;
            }
            if (null != currentGlobalSystemConfigData['uuid']) {
                userDefinedCountersData['global-system-config']['uuid'] =
                    currentGlobalSystemConfigData['uuid'];
                putData = {"data":[{"data":{"global-system-config": userDefinedCountersData["global-system-config"]},
                            "reqUrl": "/global-system-config/" + currentGlobalSystemConfigData['uuid']
                            }]}
            }
            var ajaxConfig = {}, returnFlag = false;
            ajaxConfig.type = "POST";
            ajaxConfig.data = JSON.stringify(putData);
            ajaxConfig.url = '/api/tenants/config/update-config-object';
            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
                returnFlag = true;
            }, function (error) {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
                returnFlag = false;
            });
        },
        
        deleteUserDefinedCounters : function (callbackObj,options) {
            var self = this, returnFlag = false,
                putData = {}, currentGlobalSystemConfigData = {},
                userDefinedCountersData = {}, newUserDefinedCounterConfig;
            var deferredObj = $.Deferred();
            var namesTobeDeleted = [];
            var rowIndecesTobeDeleted = options.rowIndexes;
            var gridDataList = options.gridData;
            for (var i = 0; i < rowIndecesTobeDeleted.length ; i++) {
                namesTobeDeleted.push(gridDataList[rowIndecesTobeDeleted[i]]);
            }
            var deferredObj = $.Deferred();
            self.getCurrentGlobalSystemConfigData(callbackObj, deferredObj);
            deferredObj.done(function(response) {
                
                currentGlobalSystemConfigData = getValueByJsonPath(response,
                        "0;global-system-configs;0;global-system-config", {});
                 var currentUserDefinedCounterList = 
                     getValueByJsonPath(currentGlobalSystemConfigData, 
                             "user_defined_counter;counter",[]);
                 var newCountersList = [];

                
                 currentUserDefinedCounterList = currentUserDefinedCounterList.filter(function(val) {
                     for(var i = 0; i < namesTobeDeleted.length ; i++) {
                         if(val.name === namesTobeDeleted[i].name) {
                             return false;
                         }
                     }
                     return true;
                 });
                 self.configureUserDefinedCounter(callbackObj, 
                         currentGlobalSystemConfigData, 
                         currentUserDefinedCounterList);
            });
        },
        
        editUserDefinedCounter : function (callbackObj) {
            //Read the data from the page
            //Get the parent/full object for global-system-config
            //Mofidy the line to be edited and call the update function in parent model

            var self = this, returnFlag = false,
                putData = {}, currentGlobalSystemConfigData = {},
                userDefinedCountersData = {}, newUserDefinedCounterConfig;

            if(self.model().isValid(true, "userDefinedCounterValidation")) {
              newUserDefinedCounterConfig =
                    $.extend({}, true, self.model().attributes);
                //Fetch the current global-system-config
              var deferredObj = $.Deferred();
              self.getCurrentGlobalSystemConfigData(callbackObj, deferredObj);
              deferredObj.done (function(response) {
                   currentGlobalSystemConfigData = getValueByJsonPath(response,
                  "0;global-system-configs;0;global-system-config", {});
                   var currentUserDefinedCounterList = 
                       getValueByJsonPath(currentGlobalSystemConfigData, 
                               "user_defined_counter;counter",[]);
                   for (var i = 0; i < currentUserDefinedCounterList.length; i++) {
                       if (currentUserDefinedCounterList[i]['name'] ==
                           newUserDefinedCounterConfig['name']) {
                           currentUserDefinedCounterList[i]['pattern'] = 
                               newUserDefinedCounterConfig['pattern'];
                       } else {
                           currentUserDefinedCounterList.push(newUserDefinedCounterConfig);
                       }
                       ctwu.deleteCGridData(currentUserDefinedCounterList[i]);
                   }
                  
                   self.configureUserDefinedCounter(callbackObj, 
                           currentGlobalSystemConfigData,
                           currentUserDefinedCounterList);
               });

            } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(ctwc.GLOBAL_COUNTERS_PREFIX_ID));
                }
            }
            return returnFlag;
        
        }
    });

    return userDefinedCountersCollectionModel;
});

