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
           * serviceFormatter
           */
           this.serviceFormatter = function(r, c, v, cd, dc) {
               var serviceStr = "", service = getValueByJsonPath(dc,
                   "service", null, false);
               serviceStr = service && service.protocol ?
                       service.protocol + " : " + service.dst_ports + ":" + service.src_ports : '-';
               return serviceStr;
           };

          /*
           * endPoint1Formatter
           */
           this.endPoint1Formatter = function(r, c, v, cd, dc) {
               return formatEndPoints(dc, 'endpoint_1');
                   
           };
           
           var formatEndPoints =  function(dc, endpointTarget) {
               var endpoint = getValueByJsonPath(dc, endpointTarget, {});
               if(endpoint.subnet) {
                   return endpoint.subnet;
               } else if(endpoint.address_group) {
                   return endpoint.address_group;
               } else if(endpoint.tags.length > 0) {
                   return endpoint.tags[0];
               } else if(endpoint.security_group) {
                   return endpoint.security_group;
               } else if(endpoint.virtual_network) {
                   return endpoint.virtual_network;
               } else if(endpoint.any) {
                   return endpoint.any;
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
                var match = getValueByJsonPath(dc,
                    "match_tags;tag_list", [], false);
                if(match.length > 0) {
                    match  = match.join(',');
                } else {
                    match = '-';
                }
                return match;
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

