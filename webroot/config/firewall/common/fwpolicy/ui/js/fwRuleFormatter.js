/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

 define(["underscore", "moment"], function(_, moment){
     var fwRuleFormatter = function(){

         /*
          * actionFormatter
          */
          this.actionFormatter = function(r, c, v, cd, dc) {
              var action = getValueByJsonPath(dc,
                  "action_list;simple_action", '', false);
              return action ? action : '-';
          };

          /*
           * squenceFormatter
           */
           this.sequenceFormatter = function(r, c, v, cd, dc) {
               var sequence = '', policies = getValueByJsonPath(dc,
                   "firewall_policy_back_refs", [], false),
                   currentHashParams = layoutHandler.getURLHashParams(),
                   policyId = currentHashParams.focusedElement.uuid;

               for(var i = 0; i < policies.length; i++) {
                   if(policies[i].uuid === policyId) {
                       sequence = getValueByJsonPath(policies[i],
                               'attr;sequence', '', false);
                       break;
                   }
               }
               return sequence ? sequence : (cd ? '-' : '');
           };

           /*
            * enabledFormatter
            */
            this.enabledFormatter = function(r, c, v, cd, dc) {
                var enabled = getValueByJsonPath(dc,
                        'id_perms;enabled', true, false);
                return enabled ? 'Enabled' : 'Disabled';
            };

          /*
           * serviceFormatter
           */
            this.serviceFormatter = function(r, c, v, cd, dc) {
                var serviceStr = "", service = getValueByJsonPath(dc,
                    "service", {}, false);
                serviceStr += service.protocol ? service.protocol : '';
                var startPort = getValueByJsonPath(service, 'dst_ports;start_port', '');
                var endPort = getValueByJsonPath(service, 'dst_ports;end_port', '');
                if(startPort !== '' && endPort !== ''){
                	if(startPort === endPort){
                        serviceStr += ':'  + endPort;
                    } else{
                        serviceStr += ':' + (service && service.dst_ports ?
                        		startPort + '-' +
                        		endPort : '-');
                    }
                }
                return serviceStr ? serviceStr : '-';
            };

          /*
           * endPoint1Formatter
           */
           this.endPoint1Formatter = function(r, c, v, cd, dc) {
               return formatEndPoints(dc, 'endpoint_1');

           };

           var formatEndPoints =  function(dc, endpointTarget) {
               var rule_display = '';
               var tags = ctwu.getGlobalVariable(ctwc.RULE_DATA_TAGS);
               var addressGrps = ctwu.getGlobalVariable(ctwc.RULE_DATA_ADDRESS_GROUPS);
               var endpoint = getValueByJsonPath(dc, endpointTarget, {}, false);
               if(endpoint.subnet) {
                   return endpoint.subnet;
               } else if(endpoint.address_group) {
                   return endpoint.address_group.split(":")[endpoint.address_group.length - 1];
               } else if(endpoint.tags.length > 0) {
                   return endpoint.tags[0];
               } else if(endpoint.security_group) {
                   return endpoint.security_group;
               } else if(endpoint.virtual_network) {
                   return endpoint.virtual_network.split(":")[2];
               } else if(endpoint.any) {
                   return 'any';
               } else {
                   return '-';
               }
           }

           /*
            * endPoint2Formatter
            */
            this.endPoint2Formatter = function(r, c, v, cd, dc) {
                return formatEndPoints(dc, 'endpoint_2');
            };

            /*
             * matchFormatter
             */
            this.matchFormatter = function(r, c, v, cd, dc) {
                var  formattedMatch ='', matches = getValueByJsonPath(dc,
                    "match_tags;tag_list", [], false);
                if(matches.length > 0) {
                    _.each(matches, function(match, i){
                        var matchStr  = getFormattedMatchTags(match)
                        if(i === 0) {
                            formattedMatch += matchStr;
                        } else {
                            formattedMatch += '<br>' + matchStr;
                        }
                    });
                } else {
                    formattedMatch = '-';
                }
                return formattedMatch;
            };

            var getFormattedMatchTags = function (key) {
                if(!key){
                    return '';
                }
                key = key.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                    return letter.toUpperCase();
                });
                return key;
            };

            /*
             * dirFormatter
             */
            this.dirFormatter = function(r, c, v, cd, dc) {
                var dir = getValueByJsonPath(dc,
                    "direction", '', false);
                if(dir) {
                    dir = cowu.deSanitize(dir);
                } else {
                    dir = '-';
                }
                return dir;
            };

            /*
             * simpleActionFormatter
             */
            this.simpleActionFormatter = function(r, c, v, cd, dc) {
                var simpleActionStr  = '',
                simpleAction = getValueByJsonPath(dc,
                    "action_list;apply_service", [], false);
                return simpleAction.length > 0 ? simpleAction.join(',') : '-';
            };
     };
     return fwRuleFormatter
 });

