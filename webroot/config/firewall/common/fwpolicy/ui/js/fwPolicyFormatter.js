/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

 define(["underscore"], function(_){
     var fwPolicyFormatter = function(){

         /*
          * fwRuleFormatter
          */
          this.fwRuleFormatter = function(r, c, v, cd, dc) {
              var fwRules = getValueByJsonPath(dc,
                  "firewall_rule_refs", [], false);
              return fwRules.length ? fwRules.length : 0;
          };

          /*
           * policySetFormatter
           */
           this.policySetFormatter = function(r, c, v, cd, dc) {
               var formattedPolSet = "", policySets = getValueByJsonPath(dc,
                   "application_policy_set_back_refs", [], false);
               _.each(policySets, function(polSet, i) {
                   if(i === 0){
                       formattedPolSet = polSet.to.join(":");
                   } else {
                       formattedPolSet += ', ' + polSet.to.join(":");
                   }
               });
               return formattedPolSet ? formattedPolSet : '-';
           };

          /*
           * policyDescriptionFormatter
           */
           this.policyDescriptionFormatter = function(r, c, v, cd, dc) {
               return getValueByJsonPath(dc,
                   "id_perms;description", '-', false);
           };

           /*
            * lastUpdateFormatter
            */
            this.lastUpdateFormatter = function(r, c, v, cd, dc) {
                var lastUpdated = getValueByJsonPath(dc,
                    "id_perms;last_modified", '', false);
                if(lastUpdated) {
                    lastUpdated = new Date(lastUpdated);
                } else {
                    lastUpdated = '-';
                }
                return lastUpdated;
            };
     };
     return fwPolicyFormatter
 });

