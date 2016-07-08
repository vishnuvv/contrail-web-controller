/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model',
    'config/infra/globalconfig/ui/js/models/userDefinedCountersCollectionModel'
], function (_, ContrailModel, UserDefinedCounterCollectionModel) {
    var userDefinedCountersModel = ContrailModel.extend({
        defaultConfig: {
            "user_defined_counter": {
                "counter": []
            }
        },
        formatModelConfig: function(modelConfig) {
            /* Flow Aging Timeout */
            var userDefinedCounter;
            var userDefinedCounters = [];
            var userDefinedCounterCollectionModel;
            var userDefinedCountersTuples =
                getValueByJsonPath(modelConfig,
                                   'user_defined_counter;counter', []);
            var userDefinedCountersTuplesCnt = userDefinedCountersTuples.length;
            for (var i = 0; i < userDefinedCountersTuplesCnt; i++) {
                userDefinedCounter =
                    new UserDefinedCounterCollectionModel({
                                                name: userDefinedCountersTuples[i]['name'],
                                                pattern: userDefinedCountersTuples[i]['pattern']
                                              });
//                this.userDefinedCounterAttrs(userDefinedCounter, this);
                userDefinedCounters.push(userDefinedCounter);
            }
            userDefinedCounterCollectionModel = new Backbone.Collection(userDefinedCounters);
            modelConfig['userDefinedCounter'] = userDefinedCounterCollectionModel;
            if (null != modelConfig['user_defined_counter']) {
                delete modelConfig['user_defined_counter'];
            }
            return modelConfig;
        },
        deleteUserDefinedCounterTuple: function(data, userDefinedCounterTuple) {
            var userDefinedCounterCollection = data.model().collection;
            var userDefinedCounterEntry = userDefinedCounterTuple.model();
            userDefinedCounterCollection.remove(userDefinedCounterEntry);
        },
        addUserDefinedCounterTuple: function() {
            var userDefinedCounterCollection = this.model().get('userDefinedCounter');
            var userDefinedCounterEntry =
                new UserDefinedCounterCollectionModel({name: "", pattern: ""});
//            this.userDefinedCounterAttrs(userDefinedCounterEntry, this);
            userDefinedCounterCollection.add([userDefinedCounterEntry]);
        },
//        userDefinedCounterAttrs: function(userDefinedCounterCollectionModel, self) {
//            userDefinedCounterCollectionModel.disablePort = ko.computed(function(){
//               var protocol = self.getProtocolText(this.protocol());
//               var disablePort = false;
//               if(protocol === 'icmp' || protocol === '1') {
//                   this.port('0');
//                   disablePort = true;
//               } else if(this.disablePort instanceof Function &&
//                   this.disablePort()) {
//                   this.port('');
//                   disablePort = false
//               }
//               return disablePort;
//            }, userDefinedCounterCollectionModel);
//        },
        getUserDefinedCounterTupleList: function(attr) {
            var userDefinedCountersArr = [];
            var userDefinedCounterTupleCollection = attr.userDefinedCounter.toJSON();
            var userDefinedCounterTupleCnt = userDefinedCounterTupleCollection.length;
            for (var i = 0; i < userDefinedCounterTupleCnt; i++) {
                userDefinedCountersArr.push({
                    name: userDefinedCounterTupleCollection[i].name(),
                    pattern: userDefinedCounterTupleCollection[i].pattern()
               });
            }
            return userDefinedCountersArr;
        },
        configureFlowOptions: function (callbackObj) {
            var self = this, ajaxConfig = {}, returnFlag = false,
                putData = {}, userDefinedOptionsData = {}, newUserDefinedCounterOptionsConfig,
                validations = [
                    {
                        key: 'userDefinedCounter',
                        type: cowc.OBJECT_TYPE_COLLECTION,
                        getValidation: 'userDefinedCounterValidation'
                    }
                ];

          if(self.isDeepValid(validations)) {
                newUserDefinedCounterOptionsConfig =
                    $.extend({}, true, self.model().attributes);
                userDefinedOptionsData['global-system-config'] = {};

                var userDefinedCounterList = self.getUserDefinedCounterTupleList(newUserDefinedCounterOptionsConfig);
                if ((null != userDefinedCounterList) & (userDefinedCounterList.length > 0)) {
                    userDefinedOptionsData['global-system-config']['user_defined_counter'] = {};
                    userDefinedOptionsData['global-system-config']['user_defined_counter']
                           ['counter'] = userDefinedCounterList;
                } else {
                    userDefinedOptionsData['global-system-config']['user_defined_counter']
                        = null;
                }
                if (null != newUserDefinedCounterOptionsConfig['uuid']) {
                    userDefinedOptionsData['global-system-config']['uuid'] =
                        newUserDefinedCounterOptionsConfig['uuid'];
                    putData = {"data":[{"data":{"global-system-config": userDefinedOptionsData["global-system-config"]},
                                "reqUrl": "/global-system-config/" + newUserDefinedCounterOptionsConfig['uuid']
                                }]}
                }
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
             } else {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(ctwc.GLOBAL_COUNTERS_PREFIX_ID));
                }
            }
            return returnFlag;
        }
    });
    return userDefinedCountersModel;
});

