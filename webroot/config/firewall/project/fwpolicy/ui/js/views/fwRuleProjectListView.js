/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var fwRuleProjectListView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                currentHashParams = layoutHandler.getURLHashParams(),
                policyName = currentHashParams.focusedElement.policy,
                policyId = currentHashParams.focusedElement.uuid;
            pushBreadcrumb([policyName]);
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: "/api/tenants/config/get-config-details",
                        type: "POST",
                        data: JSON.stringify(
                            {data: [{type: 'firewall-policys', obj_uuids:[policyId]},
                                    {type: 'firewall-rules'}]})
                    },
                    dataParser: self.parseFWRuleData,
                }
            };
            var contrailListModel = new ContrailListModel(listModelConfig);
            this.renderView4Config(this.$el,
                    contrailListModel, getfwRuleGridViewConfig());
        },
        parseFWRuleData : function(response) {
            var currentPolicyRuleIds = getFWRuleIds(getValueByJsonPath(response,
                          "0;firewall-policys;0;firewall-policy", {}, false)),
                dataItems = [],
                rulesData = getValueByJsonPath(response,
                        "1;firewall-rules", [], false);
                _.each(rulesData, function(rule){
                        var currentRuleID = getValueByJsonPath(rule,
                                'firewall-rule;uuid', '', false);
                        if($.inArray(currentRuleID,
                                currentPolicyRuleIds) !== -1) {
                            dataItems.push(rule['firewall-rule']);
                        }
                }); 
            return dataItems;
        }
    });

    function getFWRuleIds(dc) {
        var ruleIds = [],
             rules = getValueByJsonPath(dc, 'firewall_rule_refs', [], false);
        _.each(rules, function(rule){
            ruleIds.push(rule.uuid);
        });
        return ruleIds;
    }

    var getfwRuleGridViewConfig = function () {
        return {
            elementId: cowu.formatElementId([ctwc.CONFIG_FW_RULE_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwc.CONFIG_FW_RULE_ID,
                                view: "fwRuleGridView",
                                viewPathPrefix: "config/firewall/common/fwpolicy/ui/js/views/",
                                app: cowc.APP_CONTRAIL_CONTROLLER,
                                viewConfig: {
                                    pagerOptions: {
                                        options: {
                                            pageSize: 10,
                                            pageSizeSelect: [10, 50, 100]
                                        }
                                    },
                                    isGlobal: false                            
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    return fwRuleProjectListView;
});

