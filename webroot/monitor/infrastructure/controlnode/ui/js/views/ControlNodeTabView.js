/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'monitor-infra-parsers'
], function (_, ContrailView, MonitorInfraParsers) {
    var monInfraParsers = new MonitorInfraParsers ();
    var ControlNodesTabView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig;

            self.renderView4Config(self.$el, null, getControlNodeTabViewConfig(viewConfig));
        }
    });

    var getControlNodeTabViewConfig = function (viewConfig) {
        var hostname = viewConfig['hostname'];

        return {
            elementId: cowu.formatElementId([ctwl.MONITOR_NETWORK_VIEW_ID, '-section']),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwl.NETWORK_TABS_ID,
                                view: "TabsView",
                                viewConfig: {
                                    theme: 'default',
                                    active: 0,
                                    activate: function (e, ui) {
                                        var selTab = $(ui.newTab.context).text();
                                        if (selTab == ctwl.TITLE_PORT_DISTRIBUTION) {
                                            $('#' + ctwl.NETWORK_PORT_DIST_ID).trigger('refresh');
                                        } else if (selTab == ctwl.TITLE_INSTANCES) {
                                            $('#' + ctwl.PROJECT_INSTANCE_GRID_ID).data('contrailGrid').refreshView();
                                        } else if (selTab == ctwl.TITLE_TRAFFIC_STATISTICS) {
                                            $('#' + ctwl.NETWORK_TRAFFIC_STATS_ID).find('svg').trigger('refresh');
                                        }
                                    },
                                    tabs: [
                                           {
                                               elementId: 'controlnode_detail_id',
                                               title: 'Details',
                                               view: "ControlNodeDetailPageView",
                                               viewPathPrefix: "monitor/infrastructure/controlnode/ui/js/views/",
                                               viewConfig: viewConfig 
                                           },
                                           {
                                               elementId: 'controlnode_peers_id',
                                               title: 'Peers',
                                               view: "ControlNodePeersView",
                                               viewPathPrefix: "monitor/infrastructure/controlnode/ui/js/views/",
                                               viewConfig: viewConfig 
                                           }
                                            
                                        /*{
                                            elementId: 'controlnode_routes_id',
                                            title: 'Routes',
                                            view: "DetailsView",
                                            viewConfig: {
                                                ajaxConfig: {
                                                    url: '/api/admin/monitor/infrastructure/controlnode/details?hostname=nodea2',
                                                    type: 'GET'
                                                },
                                                templateConfig: getDetailsViewTemplateConfig(),
                                                app: cowc.APP_CONTRAIL_CONTROLLER,
                                                dataParser: function(result) {
                                                    return monInfraParsers.parseControlNodesDashboardData([result])[0];
                                                }
                                            }
                                        },
                                        {
                                            elementId: 'controlnode_console_id',
                                            title: 'Console',
                                            view: "DetailsView",
                                            viewConfig: {
                                                ajaxConfig: {
                                                    url: '/api/admin/monitor/infrastructure/controlnode/details?hostname=nodea2',
                                                    type: 'GET'
                                                },
                                                templateConfig: getDetailsViewTemplateConfig(),
                                                app: cowc.APP_CONTRAIL_CONTROLLER,
                                                dataParser: function(result) {
                                                    return monInfraParsers.parseControlNodesDashboardData([result])[0];
                                                }
                                            }
                                        }*/
                                    ]
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
    return ControlNodesTabView;
});
