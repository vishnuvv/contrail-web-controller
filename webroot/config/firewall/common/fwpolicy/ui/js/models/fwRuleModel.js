/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model',
    'config/networking/policy/ui/js/views/policyFormatters',
    'config/firewall/common/fwpolicy/ui/js/fwRuleFormatter'
], function (_, ContrailModel, PolicyFormatters, FWRuleFormatters) {
	var policyFormatters = new PolicyFormatters();
	var fwRuleFormatters = new FWRuleFormatters();
    var fwRuleModel = ContrailModel.extend({
        defaultConfig: {
        	'name': '',
            'enable': true,
            'sequence':'',
            'simple_action':'pass',
            'protocol': '',
            'port': '',
            'uuid':'',
            'endpoint_1':'',
            'endpoint_2':'',
            'direction':'<>',
            'match_tags':'',
            'service': {
                  'protocol': 'tcp',
                  'dst_ports': {
                    'start_port': '',
                    'end_port': ''
                  },
                  'src_ports': {
                    'start_port': 0,
                    'end_port': 0
                  }
              },
             'action_list': {
                  'simple_action': 'pass'
              },
              'match_tags': {
                  'tag_list': []
               }
        },
        formatModelConfig: function(modelConfig) {
        	var self = this;
        	var protocol = getValueByJsonPath(modelConfig, "service;protocol", "");
        	modelConfig["protocol"] = protocol;
        	var tag = getValueByJsonPath(modelConfig, "match_tags;tag_list", []);
        	if(tag.length > 0){
        		var taglist = tag.join(cowc.DROPDOWN_VALUE_SEPARATOR);
        		modelConfig["match_tags"] = taglist;
        	}else{
        		modelConfig["match_tags"] = '';
        	}
        	var simpleAction = getValueByJsonPath(modelConfig, "action_list;simple_action", '');
        	modelConfig["simple_action"] = simpleAction;
        	var dstStartPort = getValueByJsonPath(modelConfig, "service;dst_ports;start_port", '');
        	var dstEndtPort = getValueByJsonPath(modelConfig, "service;dst_ports;end_port", '');
        	var port
        	if(dstStartPort === dstEndtPort){
                port = dstStartPort;
            }else{
                port = dstStartPort + '-' + dstEndtPort;
            }
        	modelConfig["port"] = port;
        	var dir = getValueByJsonPath(modelConfig, "direction", '');
        	if(dir === '<>' || dir === '>'){
        		modelConfig['direction'] = dir;
        	}else{
        	   var splitedDir = dir.split(';'), arr = [];
        	   var dirArr = splitedDir.slice(0,splitedDir.length-1);
        	   for(var i = 0; i < dirArr.length; i++){
        		   if(dirArr[i] === '&gt'){
        			   arr.push('>');
        		   }else if(dirArr[i] === '&lt'){
        			   arr.push('<');
        		   }
        	   }
        	   modelConfig['direction'] = arr.join('');
        	}
        	var endpoint1 = getValueByJsonPath(modelConfig, "endpoint_1");
        	if(endpoint1 === ''){
        		modelConfig['endpoint_1'] = '';
        	}else{
        		modelConfig['endpoint_1'] = self.getEndpointVal(endpoint1, modelConfig);
        	}
        	var endpoint2 = getValueByJsonPath(modelConfig, "endpoint_2");
        	if(endpoint2 === ''){
        		modelConfig['endpoint_2'] = '';
        	}else{
        		modelConfig['endpoint_2'] = self.getEndpointVal(endpoint2, modelConfig);
        	}
        	modelConfig['sequence'] = fwRuleFormatters.sequenceFormatter(null,
        	        null, null, null, modelConfig);
        	return modelConfig;
        },
        getEndpointVal : function(endpoint, modelConfig){
        	var endpointArr = [];
        	
        	if(endpoint.tags && endpoint.tags.length > 0){
                _.each(endpoint.tags, function(tag){
                    var grpName = tag ? tag.split('-')[0]: '';
                    grpName = grpName.indexOf('global:') != -1 ? grpName.split(':')[1] : grpName;
                    var val = tag + cowc.DROPDOWN_VALUE_SEPARATOR + grpName.toLowerCase();
                    endpointArr.push(val);
                });
        	} else if(endpoint.virtual_network) {
                var vn = endpoint.virtual_network +
                     cowc.DROPDOWN_VALUE_SEPARATOR + 'virtual_network';
                endpointArr.push(vn);        	    
        	} else if(endpoint.address_group) {
                var addressGrp = endpoint.address_group +
                cowc.DROPDOWN_VALUE_SEPARATOR + 'address_group';
                endpointArr.push(addressGrp);                       	    
        	}
    		/*for(var j in endpoint){
    			if(endpoint[j].constructor === Array){
    				if(endpoint[j].length > 0){
    				    _.each(endpoint[j], function(tag){
    				        var grpName = tag ? tag.split('-')[0]: '';
    				        var val = tag + cowc.DROPDOWN_VALUE_SEPARATOR + grpName.toLowerCase();
    				    });
    				}
    			}else if(endpoint[j] !== null){
    				if(j === 'virtual_network'){
    					var uuid = endpoint[j].split(':').reverse()[0];
    					var val = uuid + ';' + j;
        				endpointArr.push(val);
    				}else{
    					var val = endpoint[j] + ';' + j;
        				endpointArr.push(val);
    				}
    				
    			}
    		}*/
    		if(endpointArr.length > 0){
    			return endpointArr[0];
    		}else{
    			return '';
    		}
        },
        getPostAddressFormat: function(arr, selectedDomain, selectedProject) {
            var array = arr.split(":");
            var returnval = null;
            if (array.length == 1) {
                if (String(array[0]).toLowerCase() != "any" &&
                    String(array[0]).toLowerCase() != "local") {
                    returnval = selectedDomain + ":" +
                                selectedProject + ":" +
                                array[0];
                } else {
                    returnval = array[0].toLowerCase();
                }
            } else if(array.length == 3) {
                returnval = arr;
            }
            return returnval;
        },

        populateEndpointData : function(inputAddress) {
        	var self = this;
            var selectedDomain = contrail.getCookie(cowc.COOKIE_DOMAIN_DISPLAY_NAME);
            var selectedProject = contrail.getCookie(cowc.COOKIE_PROJECT_DISPLAY_NAME);
            var srcArr = inputAddress.split(cowc.DROPDOWN_VALUE_SEPARATOR),
                vnSubnetObj, subnet, endpoint;
            endpoint  = {};
            endpoint["virtual_network"] = null;
            //endpoint["security_group"] = null;
            endpoint["address_group"] = null;
            endpoint["tags"] = [];
            endpoint["any"] = null;

            //tags
            if(srcArr.length == 2 && (srcArr[1] === 'application' ||
                    srcArr[1] === 'deployment' ||  srcArr[1] === 'site' || srcArr[1] === 'tier')) {
                endpoint["tags"].push(srcArr[0]);
            } else if(srcArr.length == 2 && srcArr[1] === 'address_group'){
                endpoint[srcArr[1]] = srcArr[0];
            } else if(srcArr.length == 2 && srcArr[1] === 'virtual_network'){
                endpoint[srcArr[1]] = self.getPostAddressFormat(srcArr[0], selectedDomain,
                        selectedProject)
            } else {
                //endpoint["any"] = true;
            }

            return endpoint;
        },
        getPolicyId : function(){
        	var uuid;
        	var url = decodeURIComponent(location.hash).split('&');
        	for(var i = 0; i < url.length; i++){
        		if(url[i].search('uuid') !== -1){
        			var spliturl = url[i].split('=').reverse();
        			uuid = spliturl[0];
        			break;
        		}
        	}
        	return uuid;
        },
        checkIsGlobal: function(){
        	var isGlobal = false;
        	var url = decodeURIComponent(location.hash).split('&');
        	for(var i = 0; i < url.length; i++){
        		if(url[i].search('isGlobal') !== -1){
        			var spliturl = url[i].split('=').reverse();
        			if(spliturl[0] === 'true'){
        				isGlobal = true;
        			}
        			break;
        		}
        	}
        	return isGlobal;
        },
        deleteFirewallRule: function (checkedRows, callbackObj) {
            var ajaxConfig = {};
            var uuidList = [];

            $.each(checkedRows, function (checkedRowsKey, checkedRowsValue) {
                uuidList.push(checkedRowsValue.uuid);
            });

            ajaxConfig.type = "POST";
            ajaxConfig.data = JSON.stringify([{'type': 'firewall-rule',
                                              'deleteIDs': uuidList}]);

            ajaxConfig.url = '/api/tenants/config/delete';
            contrail.ajaxHandler(ajaxConfig, function () {
                if (contrail.checkIfFunction(callbackObj.init)) {
                    callbackObj.init();
                }
            }, function (response) {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success();
                }
            }, function (error) {
                if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(error);
                }
            });
        },
        addEditFirewallRule: function (callbackObj, options) {
            var ajaxConfig = {}, returnFlag = true, postFWRules = [];
            var postFWRuleData = {};
            var self = this;
            var isGlobal = self.checkIsGlobal();
            var attr = $.extend(true,{},this.model().attributes), newFWRuleData = {};
                   if (options.mode == 'add') {
                	   attr.name = UUIDjs.create().hex;
                	   newFWRuleData['uuid'] = attr.name;
                   }else{
                	   newFWRuleData['uuid'] = attr.uuid;
                   }
	               if(isGlobal) {
	                    newFWRuleData["fq_name"] =
	                        [
	                          "default-policy-management",
	                          attr.name
	                        ];
	                    newFWRuleData['parent_type'] = "policy-management";
	                } else {
	                    newFWRuleData["fq_name"] =
	                        [
	                          contrail.getCookie(cowc.COOKIE_DOMAIN_DISPLAY_NAME),
	                          contrail.getCookie(cowc.COOKIE_PROJECT_DISPLAY_NAME),
	                          attr.name
	                        ];
	                    newFWRuleData['parent_type'] = "project";
	                }
	                newFWRuleData['name'] = attr.name;
	                newFWRuleData['endpoint_1'] = self.populateEndpointData(attr['endpoint_1']);
	                newFWRuleData['endpoint_2'] = self.populateEndpointData(attr['endpoint_2']);
	                newFWRuleData['service'] = {};
	                newFWRuleData['service']['protocol'] = attr.protocol;
	                newFWRuleData['service']['dst_ports'] = policyFormatters.formatPort(attr.port.toString())[0];
	                newFWRuleData['service']['src_ports'] = {};
	                newFWRuleData['service']['src_ports']['start_port'] = 0;
	                newFWRuleData['service']['src_ports']['end_port'] = 0;
	                newFWRuleData['action_list'] = {};
	                newFWRuleData['action_list']['simple_action'] = attr['simple_action'];
	                newFWRuleData['direction'] = attr['direction'];
	                newFWRuleData['sequence'] = attr['sequence'];
                    //newFWRuleData['id_perms'] = {};
                    //newFWRuleData['id_perms']["enable"] = attr["enable"];	                
	                newFWRuleData['match_tags'] = {};
	                newFWRuleData['match_tags']['tag_list'] = attr.match_tags.split(';');
	                postFWRules.push({'firewall-rule': $.extend(true, {}, newFWRuleData)});
	                postFWRuleData['firewall-rules'] = postFWRules;
	                ajaxConfig.type  = "POST";
	                if (options.mode == 'add') {
	                	postFWRuleData['fwPolicyId'] = self.getPolicyId();
	                	ajaxConfig.async = false;
		                ajaxConfig.url = ctwc.URL_CREATE_POLICY_RULES;
		                ajaxConfig.data  = JSON.stringify(postFWRuleData);
	                }else{
	                	var postData = {"data":[{"data":{"firewall-rule": newFWRuleData},
                            "reqUrl": "/firewall-rule/" +
                            attr.uuid}]};
                        ajaxConfig.url = ctwc.URL_UPDATE_CONFIG_OBJECT;
                        ajaxConfig.data  = JSON.stringify(postData);
	                }
	
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
	        return returnFlag;
        }
    });
    return fwRuleModel;
});
