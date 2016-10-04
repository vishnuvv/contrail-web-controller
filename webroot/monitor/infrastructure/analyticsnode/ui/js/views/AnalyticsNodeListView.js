/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view','monitor-infra-analyticsnode-model',
          'node-color-mapping', 'monitor-infra-databasenode-model'],
        function(
                _, ContrailView, AnalyticsNodeListModel, NodeColorMapping, DatabaseNodeListModel) {
            var AnalyticsNodeListView = ContrailView.extend({
                render : function() {
                    var analyticsNodeListModel = new AnalyticsNodeListModel(),
                        databaseNodeListModel = new DatabaseNodeListModel();
                    nodeColorMapping = new NodeColorMapping(),
                    colorFn = nodeColorMapping.getNodeColorMap;
                    this.renderView4Config(this.$el, analyticsNodeListModel,
                            getAnalyticsNodeListViewConfig(colorFn, analyticsNodeListModel, databaseNodeListModel));
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
                                                     elementId: 'grid-stack-view-page-1',
                                                     view: 'GridStackView',
                                                     viewConfig: {
                                                         gridAttr: {
                                                             defaultWidth: 6
                                                         },
                                                         widgetCfgList: [
                                                             {
                                                                 modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                     table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                     select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                     where: 'process_mem_cpu_usage.__key = cassandra'
                                                                 }),
                                                                 viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                     elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                     viewConfig: {
                                                                         chartOptions: {
                                                                             yAxisLabel: 'Cassandra CPU Share (%)',
                                                                             groupBy: 'name',
                                                                             colors: colorFn,
                                                                             yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                             title: ctwl.DATABASENODE_SUMMARY_TITLE,
                                                                         }
                                                                     }
                                                                 })
                                                             },
                                                             {
                                                                 modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                     table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                     select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                     where: 'process_mem_cpu_usage.__key = cassandra'
                                                                 }),
                                                                 viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                     elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                     viewConfig: {
                                                                         chartOptions: {
                                                                             yAxisLabel: 'Cassandra CPU Share (%)',
                                                                             groupBy: 'name',
                                                                             colors: colorFn,
                                                                             yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                             title: ctwl.DATABASENODE_SUMMARY_TITLE,
                                                                         }
                                                                     }
                                                                 })
                                                             },
                                                             {
                                                                 modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                     table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                     select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                     where: 'process_mem_cpu_usage.__key = cassandra'
                                                                 }),
                                                                 viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                     elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                     viewConfig: {
                                                                         chartOptions: {
                                                                             yAxisLabel: 'Cassandra CPU Share (%)',
                                                                             groupBy: 'name',
                                                                             colors: colorFn,
                                                                             yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                             title: ctwl.DATABASENODE_SUMMARY_TITLE,
                                                                         }
                                                                     }
                                                                 })
                                                             },
                                                             {
                                                                 modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                     table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                     select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                     where: 'process_mem_cpu_usage.__key = cassandra'
                                                                 }),
                                                                 viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                     elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                     viewConfig: {
                                                                         chartOptions: {
                                                                             yAxisLabel: 'Cassandra CPU Share (%)',
                                                                             groupBy: 'name',
                                                                             colors: colorFn,
                                                                             yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                             title: ctwl.DATABASENODE_SUMMARY_TITLE,
                                                                         }
                                                                     }
                                                                 })
                                                             }
                                                         ]
                                                     }
                                                 }
                                             },
                                             {
                                                page: {
                                                    elementId :ctwl.ANALYTICSNODE_SUMMARY_CHART_ID,
                                                    title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                    view : "AnalyticsNodesSummaryChartsView",
                                                    viewPathPrefix: ctwl.MONITOR_INFRA_VIEW_PATH,
                                                    app : cowc.APP_CONTRAIL_CONTROLLER,
                                                    viewConfig: {
                                                        colorFn: colorFn
                                                    }
                                                },
                                            }
                                        ]
                                    }
                                }]
                            }/*,{
                                columns : [{
                                    elementId :
                                        ctwl.ANALYTICSNODE_SUMMARY_GRID_ID,
                                    title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                    view : "AnalyticsNodeSummaryGridView",
                                    viewPathPrefix:
                                        ctwl.ANALYTICSNODE_VIEWPATH_PREFIX,
                                    app : cowc.APP_CONTRAIL_CONTROLLER,
                                    viewConfig : {
                                        colorFn: colorFn
                                    }
                                }]
                            }*/
                            ]
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
