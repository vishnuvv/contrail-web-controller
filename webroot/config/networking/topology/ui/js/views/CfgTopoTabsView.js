/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var CfgTopoTabsView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig;

            this.renderView4Config(self.$el, null, getProjectViewConfig(viewConfig));
        }
    });

    var getProjectViewConfig = function (viewConfig) {

        return {
            elementId: ctwl.PROJECT_TABS_ID,
            view: "TabsView",
            viewConfig: {
                theme: 'classic',
                tabs: [
                    {
                        elementId: ctwl.PROJECT_NETWORKS_ID,
                        title: ctwl.TITLE_NETWORKS,
                        view: "vnCfgListView",
                        viewPathPrefix: "config/networking/networks/ui/js/views/",
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        tabConfig: {
                            activate: function(event, ui) {
                                if ($('#' + ctwl.CFG_VN_GRID_ID).data('contrailGrid')) {
                                    $('#' + ctwl.CFG_VN_GRID_ID).data('contrailGrid').refreshView();
                                }
                            }
                        },
                        viewConfig: viewConfig
                    },{
                        elementId: cowu.formatElementId(
                                [ctwc.CONFIG_PORT_PAGE_ID]),
                        view: "portListView",
                        title: ctwl.CONFIG_PORT_TITLE,
                        viewPathPrefix : ctwc.URL_PORT_VIEW_PATH_PREFIX,
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        viewConfig: viewConfig,
                        tabConfig: {
                            activate: function(event, ui) {
                                if ($('#' + ctwc.PORT_GRID_ID).data('contrailGrid')) {
                                    $('#' + ctwc.PORT_GRID_ID).data('contrailGrid').refreshView();
                                }
                            }
                        }
                    },{
                        elementId: cowu.formatElementId(
                                [ctwl.CONFIG_POLICIES_PAGE_ID]),
                        view: "policyListView",
                        title: ctwl.CONFIG_POLICIES_TITLE,
                        viewPathPrefix : ctwc.URL_POLICIES_VIEW_PATH_PREFIX,
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        viewConfig: viewConfig,
                        tabConfig: {
                            activate: function(event, ui) {
                                if ($('#' + ctwl.POLICIES_GRID_ID).data('contrailGrid')) {
                                    $('#' + ctwl.POLICIES_GRID_ID).data('contrailGrid').refreshView();
                                }
                            }
                        }
                    },{
                        elementId: cowu.formatElementId([ctwl.CONFIG_QUOTAS_PAGE_ID]),
                        view: "SecGrpListView",
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        viewPathPrefix: "config/networking/securitygroup/ui/js/views/",
                        title: ctwl.TITLE_SEC_GRP,
                        viewConfig: $.extend(true, {}, viewConfig,
                                         {projectSelectedValueData: viewConfig.projectSelectedValueData}),
                        tabConfig: {
                             activate: function(event, ui) {
                                 if ($('#' + ctwl.SEC_GRP_GRID_ID).data('contrailGrid')) {
                                     $('#' + ctwl.SEC_GRP_GRID_ID).data('contrailGrid').refreshView();
                                 }
                             }
                        }
                    },{
                        elementId: cowu.formatElementId(
                                        [ctwl.CONFIG_LOGICAL_ROUTER_PAGE_ID]),
                        view: "logicalRouterListView",
                        viewPathPrefix : ctwc.URL_LOGICAL_ROUTER_VIEW_PATH_PREFIX,
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        title: ctwl.CONFIG_LOGICAL_ROUTER_TITLE,
                        viewConfig: viewConfig,
                        tabConfig: {
                            activate: function(event, ui) {
                                if ($('#' + ctwl.LOGICAL_ROUTER_GRID_ID).data('contrailGrid')) {
                                    $('#' + ctwl.LOGICAL_ROUTER_GRID_ID).data('contrailGrid').refreshView();
                                }
                            }
                       }
                    },{
                        elementId: cowu.formatElementId([ctwl.CFG_IPAM_PAGE_ID]),
                        view: "ipamCfgListView",
                        viewPathPrefix:
                            "config/networking/ipam/ui/js/views/",
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        title: ctwl.CFG_IPAM_PREFIX_ID,
                        viewConfig: $.extend(true, {},
                             viewConfig, {projectSelectedValueData: viewConfig.projectSelectedValueData}),
                         tabConfig: {
                             activate: function(event, ui) {
                                 if ($('#' + ctwl.CFG_IPAM_GRID_ID).data('contrailGrid')) {
                                     $('#' + ctwl.CFG_IPAM_GRID_ID).data('contrailGrid').refreshView();
                                 }
                             }
                        }
                    },{
                        elementId: cowu.formatElementId([ctwl.CFG_FIP_PAGE_ID]),
                        view: "fipCfgListView",
                        viewPathPrefix:
                                "config/networking/fip/ui/js/views/",
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        title: ctwl.CFG_FIP_TITLE,
                        viewConfig: $.extend(true, {},
                             viewConfig, {projectSelectedValueData: viewConfig.projectSelectedValueData}),
                         tabConfig: {
                             activate: function(event, ui) {
                                 if ($('#' + ctwl.CFG_FIP_GRID_ID).data('contrailGrid')) {
                                     $('#' + ctwl.CFG_FIP_GRID_ID).data('contrailGrid').refreshView();
                                 }
                             }
                        }
                    }
                ]
            }
        };
    };

    return CfgTopoTabsView;
});
