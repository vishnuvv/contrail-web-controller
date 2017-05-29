/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var fwRuleTabView = ContrailView.extend({
        el: $(contentContainer),
        render: function (viewConfig) {
            var self = this,
            viewConfig = this.attributes.viewConfig,
            currentHashParams = layoutHandler.getURLHashParams(),
            policyName = currentHashParams.focusedElement.policy;
            console.log(policyName);
            self.renderView4Config(self.$el, null, getfwRulePolicy(viewConfig,policyName));
        }
    });
    function getfwRulePolicy(viewConfig, policyName){
        return {
            elementId: cowu.formatElementId(["fwrule-policy-page-id"]),
            view: "SectionView",
            viewConfig: {
                title: policyName,
                rows: [{
                    columns: [{
                        elementId: "fwrule-policy-tab-id",
                        view: 'TabsView',
                        viewConfig: getfwRulePolicyTabs(viewConfig)
                    }]
                }]
            }
        };
    };
    function getfwRulePolicyTabs(viewConfig) {
        return {
            theme: 'default',
            active: 0,
            tabs: [{
               elementId: 'policy_info_tab',
               title: 'Policy Info',
               view: "fwPolicyInfoView",
               viewPathPrefix: "config/firewall/common/fwpolicy/ui/js/views/",
               app: cowc.APP_CONTRAIL_CONTROLLER,
               viewConfig: viewConfig,
               tabConfig: {
                   activate: function(event, ui) {
                       var gridId = $('#' + 'fw-policy-info');
                       if (gridId.data('contrailGrid')) {
                           gridId.data('contrailGrid').refreshView();
                       }
                   },
                   renderOnActivate: true
               }
           }, {
               elementId: 'policy_rules',
               title: 'Rules',
               view: "fwRuleProjectListView",
               viewPathPrefix: "config/firewall/project/fwpolicy/ui/js/views/",
               app: cowc.APP_CONTRAIL_CONTROLLER,
               viewConfig: viewConfig,
               tabConfig: {
                   activate: function(event, ui) {
                       var gridId = $('#' + 'policy_rules_grid_id');
                       if (gridId.data('contrailGrid')) {
                           gridId.data('contrailGrid').refreshView();
                       }
                   },
                   renderOnActivate: true
               }
           }, {
               elementId: 'permissions',
               title: 'Permissions',
               view: "fwPermissionView",
               viewPathPrefix: "config/firewall/common/fwpolicy/ui/js/views/",
               viewConfig: viewConfig,
               tabConfig: {
                   activate: function(event, ui) {
                       var gridId = $('#' + 'permissions_grid_id');
                       if (gridId.data('contrailGrid')) {
                           gridId.data('contrailGrid').refreshView();
                       }
                   },
                   renderOnActivate: true
               }
           }]
        };
    };
    return fwRuleTabView;
});
