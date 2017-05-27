/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var fwGlobalView = ContrailView.extend({
        el: $(contentContainer),
        renderFirewall: function (viewConfig) {
            var self = this;
            self.renderView4Config(self.$el, null, getSecurityPolicy(viewConfig));
        }
    });

    function getSecurityPolicy(viewConfig){
        return {
            elementId: cowu.formatElementId([ctwl.CONFIG_SECURITY_POLICY_PAGE_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [{
                    columns: [{
                        elementId: ctwc.GLOBAL_SECURITY_POLICY_TAB_ID,
                        view: 'TabsView',
                        viewConfig: getSecurityPolicyTabs(viewConfig)
                    }]
                }]
            }
        };
    };

    function getSecurityPolicyTabs(viewConfig) {
        return {
            theme: 'default',
            active: 0,
            tabs: [{
                elementId: 'fw_policy_tab',
                title: 'Firewall Policies',
                view: "fwPolicyGlobalListView",
                viewPathPrefix: "config/infra/firewall/ui/js/views/",
                viewConfig: viewConfig,
                tabConfig: {
                    activate: function(event, ui) {
                        var gridId = $('#' + ctwc.FW_POLICY_GRID_ID);
                        if (gridId.data('contrailGrid')) {
                            gridId.data('contrailGrid').refreshView();
                        }
                    },
                    renderOnActivate: true
                }
            }, {
               elementId: 'service_group_tab',
               title: 'Service Groups',
               view: "serviceGroupGlobalListView",
               viewPathPrefix: "config/infra/firewall/ui/js/views/",
               viewConfig: viewConfig,
               tabConfig: {
                   activate: function(event, ui) {
                       var gridId = $('#' + ctwc.SECURITY_POLICY_SERVICE_GRP_GRID_ID);
                       if (gridId.data('contrailGrid')) {
                           gridId.data('contrailGrid').refreshView();
                       }
                   },
                   renderOnActivate: true
               }
           }, {
               elementId: 'address_group_tab',
               title: 'Address Groups',
               view: "addressGroupGlobalListView",
               viewPathPrefix: "config/infra/firewall/ui/js/views/",
               viewConfig: viewConfig,
               tabConfig: {
                   activate: function(event, ui) {
                       var gridId = $('#' + ctwc.SECURITY_POLICY_ADDRESS_GRP_GRID_ID);
                       if (gridId.data('contrailGrid')) {
                           gridId.data('contrailGrid').refreshView();
                       }
                   },
                   renderOnActivate: true
               }
           }, {
               elementId: 'application_policy_tab',
               title: 'Application Policy Sets',
               view: "applicationPolicyGlobalListView",
               viewPathPrefix: "config/infra/firewall/ui/js/views/",
               viewConfig: viewConfig,
               tabConfig: {
                   activate: function(event, ui) {
                       var gridId = $('#' + ctwc.FIREWALL_APPLICATION_POLICY_GRID_ID);
                       if (gridId.data('contrailGrid')) {
                           gridId.data('contrailGrid').refreshView();
                       }
                   },
                   renderOnActivate: true
               }
           }]
        };
    };
    return fwGlobalView;
});
