/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view', 'node-color-mapping','analyticsnode-viewconfig','monitor-infra-viewconfig'],
        function(
                _, ContrailView, NodeColorMapping, AnalyticsNodeViewConfig, MonitorInfraViewConfig) {
            var analyticsNodeViewConfig = new AnalyticsNodeViewConfig(),
            monitorInfraViewConfig = new MonitorInfraViewConfig();
            var AnalyticsNodeListView = ContrailView.extend({
                render : function() {
                    nodeColorMapping = new NodeColorMapping(),
                    colorFn = nodeColorMapping.getNodeColorMap;
                    this.renderView4Config(this.$el, null,
                            getAnalyticsNodeListViewConfig(colorFn));
                }
            });
            function getAnalyticsNodeListViewConfig(colorFn) {
                var viewConfig = {
                        rows : [
                                {
                                    columns : [
                                               {
                                        elementId: 'analytics-node-carousel-view',
                                        view: "CarouselView",
                                        viewConfig: {
                                            pages : [
                                                 {
                                                     page: {
                                                         elementId : 'analytics-node-grid-stackview-0',
                                                         view : "GridStackView",
                                                         viewConfig : {
                                                            gridAttr : {
                                                                defaultWidth : 6,
                                                                defaultHeight : 8
                                                            },
                                                            widgetCfgList: [
                                                                {id:'analyticsnode-percentile-count-size'},
                                                                {id:'analyticsnode-database-read-write'},
                                                                {id:'analyticsnode-query-stats'},
                                                                {id:'analyticsnode-database-usage'},
                                                                {id:'analyticsnode-sandesh-message-info'},
                                                                {id:'analyticsnode-grid-view'}
                                                            ]
                                                         }
                                                     },
                                                 },{
                                                     page: {
                                                         elementId: 'analytics-node-grid-stackview-1',
                                                         view: 'GridStackView',
                                                         viewConfig: {
                                                             gridAttr: {
                                                                 defaultWidth: 6,
                                                                 defaultHeight: 8
                                                             },
                                                             widgetCfgList: [
                                                                {id:'analyticsnode-top-messagetype'},
                                                                {id:'analyticsnode-top-generators'},
                                                                {id:'analyticsnode-qe-cpu-share'},
                                                                {id:'analyticsnode-collector-cpu-share'},
                                                                {id:'analyticsnode-grid-view'}
                                                             ]
                                                         }
                                                     }
                                                 },{
                                                     page: {
                                                         elementId: 'analytics-node-grid-stackview-2',
                                                         view: 'GridStackView',
                                                         viewConfig: {
                                                            gridAttr: {
                                                                defaultWidth: 6,
                                                                defaultHeight: 8
                                                            },
                                                            widgetCfgList: [
                                                            {id:'analyticsnode-alarm-gen-cpu-share'},
                                                            {id:'analyticsnode-snmp-collector-cpu-share'},
                                                            {id:'analyticsnode-manager-cpu-share'},
                                                            {id:'analyticsnode-api-cpu-share'},
                                                            {id:'analyticsnode-grid-view'}
                                                            ]
                                                             gridAttr: {
                                                                 defaultWidth: 6,
                                                                 defaultHeight: 8
                                                             },
                                                             widgetCfgList: [
                                                               analyticsNodeViewConfig.getViewConfig('analyticsnode-qe-cpu-share')(),
                                                               analyticsNodeViewConfig.getViewConfig('analyticsnode-snmp-collector-cpu-share')(),
                                                               analyticsNodeViewConfig.getViewConfig('analyticsnode-api-cpu-share')(),
                                                               analyticsNodeViewConfig.getViewConfig('analyticsnode-stats-available-connections')(),
                                                               //analyticsNodeViewConfig.getViewConfig('analyticsnode-manager-cpu-share')(),
                                                               analyticsNodeViewConfig.getViewConfig('analyticsnode-grid-view')()
                                                             ]
                                                         }
                                                     }
                                                 },{
                                                     page: {
                                                         elementId: 'analytics-node-grid-stackview-3',
                                                         view: 'GridStackView',
                                                         viewConfig: {
                                                             gridAttr: {
                                                                 defaultWidth: 6,
                                                                 defaultHeight: 8
                                                             },
                                                             widgetCfgList: [
                                                                monitorInfraViewConfig.getViewConfig('disk-usage-info')(),
                                                                monitorInfraViewConfig.getViewConfig('system-cpu-share')(),
                                                                monitorInfraViewConfig.getViewConfig('system-memory-usage')(),
                                                                analyticsNodeViewConfig.getViewConfig('analyticsnode-grid-view')()
                                                             ]
                                                         }
                                                     }
                                                 }
                                            ]
                                        }
                                    }]
                                }]
                       };
                return {
                    elementId : cowu.formatElementId([
                         ctwl.ANALYTICSNODE_SUMMARY_LIST_SECTION_ID ]),
                    view : "SectionView",
                    viewConfig : viewConfig
                };
            }
            return AnalyticsNodeListView;
        });
