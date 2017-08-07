/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'lodash',
    'contrail-view',
    'contrail-list-model',
], function (_, ContrailView, ContrailListModel) {
    var TrafficGroupsSessionsView = ContrailView.extend({
        el: $(contentContainer),
        render: function (sessionData) {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                contrailListModel = new ContrailListModel({data : viewConfig.data}),
                tabTitle = viewConfig.names.join(' ' + cowc.ARROW_RIGHT_ICON + ' ');
           self.renderView4Config($("#"+viewConfig.tabid), contrailListModel, self.getSessionsGridViewConfig(tabTitle));
        },
        getSessionsGridViewConfig: function (title) {
            return {
                elementId: ctwl.TRAFFIC_GROUPS_ENDPOINT_STATS + '-grid',
                view: "GridView",
                viewConfig: {
                    elementConfig: this.getSessionsConfiguration(title)
                }
            }
        },
        getSessionsConfiguration: function (title) {
            var sessionColumns = [
                        {
                            field: 'app',
                            name: 'Application',
                            hide: true,
                            formatter:function(r,c,v,cd,dc) {
                               return appFormatter(v, dc);
                            }
                        },
                        {
                            field: 'deployment',
                            name: 'Deployment',
                            hide: true,
                            formatter:function(r,c,v,cd,dc) {
                               return deplFormatter(v, dc);
                            }
                        },
                        {
                            field: 'tier',
                            name: 'Tier',
                            formatter:function(r,c,v,cd,dc) {
                               return tierFormatter(v, dc);
                            }
                        },
                        {
                            field: 'site',
                            name: 'Site',
                            formatter:function(r,c,v,cd,dc) {
                               return siteFormatter(v, dc);
                            }
                        },
                        {
                            field: 'vn',
                            name: 'VN',
                            hide: true,
                            formatter:function(r,c,v,cd,dc) {
                               return vnFormatter(v, dc);
                            }
                        },
                        {
                            field: 'eps.traffic.remote_app_id',
                            name: 'Remote Application',
                            hide: true,
                            formatter:function(r,c,v,cd,dc) {
                               return remoteAppFormatter(v, dc);
                            }
                        },
                        {
                            field: 'eps.traffic.remote_deployment_id',
                            name: 'Remote Deployment',
                            hide: true,
                            formatter:function(r,c,v,cd,dc) {
                               return remoteDeplFormatter(v, dc);
                            }
                        },
                        {
                            field: 'eps.traffic.remote_tier_id',
                            name: 'Remote Tier',
                            formatter:function(r,c,v,cd,dc) {
                               return remoteTierFormatter(v, dc);
                            }
                        },
                        {
                            field: 'eps.traffic.remote_site_id',
                            name: 'Remote Site',
                            formatter:function(r,c,v,cd,dc) {
                               return remoteSiteFormatter(v, dc);
                            }
                        },
                        {
                            field: 'eps.traffic.remote_vn',
                            name: 'Remote VN',
                            hide: true,
                            formatter:function(r,c,v,cd,dc) {
                               return epsDefaultValueFormatter(v, dc);
                            }
                        },
                        {
                            field: 'SUM(eps.traffic.in_bytes)',
                            name: 'In Bytes',
                            formatter:function(r,c,v,cd,dc) {
                               return formatBytes(v);
                            }
                        },
                        {
                            field: 'SUM(eps.traffic.out_bytes)',
                            name: 'Out Bytes',
                            formatter:function(r,c,v,cd,dc) {
                               return formatBytes(v);
                            }
                        },
                        {
                            field: 'SUM(eps.traffic.initiator_session_count)',
                            name: 'Sessions Initiated'
                        },
                        {
                            field: 'SUM(eps.traffic.responder_session_count)',
                            name: 'Sessions Responded'
                        }
                    ],
                gridElementConfig = {
                    header: {
                        title: {
                            text: title
                        },
                        defaultControls: {
                            collapseable: false,
                            exportable: true,
                            searchable: true,
                            columnPickable:true
                        }
                    },
                    columnHeader: {
                        columns: sessionColumns
                    },
                    body: {
                        options : {
                            autoRefresh: false,
                            checkboxSelectable: false,
                            detail: {
                                template: cowu.generateDetailTemplateHTML(this.getSessionDetailsTemplateConfig(), cowc.APP_CONTRAIL_CONTROLLER)
                            }
                        },
                        dataSource : {data: []},
                        statusMessages: {
                            loading: {
                               text: 'Loading endpoint stats..',
                            },
                            empty: {
                               text: 'No endpoint stats Found.'
                            }
                         }
                    },
                    footer: {
                        pager: {
                            options: {
                                pageSize: 50,
                                pageSizeSelect: [5, 10, 50]
                            }

                        }
                    }
                };
            return gridElementConfig;
        },
        getSessionDetailsTemplateConfig: function() {
            return {
                templateGenerator: 'RowSectionTemplateGenerator',
                templateGeneratorConfig: {
                    rows: [
                        {
                            templateGenerator: 'ColumnSectionTemplateGenerator',
                            templateGeneratorConfig: {
                                columns: [
                                    {
                                        //class: 'trafficEndpointDetails',
                                        rows: [
                                            {
                                                title: 'Details',
                                                templateGenerator: 'BlockListTemplateGenerator',
                                                templateGeneratorConfig: [
                                                    {
                                                        key: 'app',
                                                        label: 'Application',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'appFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'deployment',
                                                        label: 'Deployment',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'deplFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'tier',
                                                        label: 'Tier',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'tierFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Site',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'siteFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'vn',
                                                        label: 'VN',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'epsDefaultValueFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Remote Application',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteAppFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'deployment',
                                                        label: 'Remote Deployment',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteDeplFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'tier',
                                                        label: 'Remote Tier',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteTierFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Remote Site',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteSiteFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'vn',
                                                        label: 'Remote VN',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteVNFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'In Bytes',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'bytesInFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Out Bytes',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'bytesOutFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Sessions Initiated',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'sessionsInFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Sessions Responded',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'sessionsOutFormatter'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
        }
    });
    this.epsDefaultValueFormatter = function(v) {
        return (v || v === 0) ? v : '-';
    }
    this.appFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['app']);
    }
    this.remoteAppFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['eps.traffic.remote_app_id']);
    }
    this.deplFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['deployment']);
    }
    this.remoteDeplFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['eps.traffic.remote_deployment_id']);
    }
    this.tierFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['tier']);
    }
    this.remoteTierFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['eps.traffic.remote_tier_id']);
    }
    this.siteFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['site']);
    }
    this.remoteSiteFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['eps.traffic.remote_site_id']);
    }
    this.vnFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['vn']);
    }
    this.remoteVNFormatter = function(v, dc) {
       return this.epsDefaultValueFormatter(dc['eps.traffic.remote_vn']);
    }
    this.bytesInFormatter = function(v, dc) {
       return formatBytes(dc['SUM(eps.traffic.in_bytes)']);
    }
    this.bytesOutFormatter = function(v, dc) {
       return formatBytes(dc['SUM(eps.traffic.out_bytes)']);
    }
    this.sessionsInFormatter = function(v, dc) {
       return dc['SUM(eps.traffic.initiator_session_count)'];
    }
    this.sessionsOutFormatter = function(v, dc) {
       return dc['SUM(eps.traffic.responder_session_count)'];
    }
    return TrafficGroupsSessionsView;
});
