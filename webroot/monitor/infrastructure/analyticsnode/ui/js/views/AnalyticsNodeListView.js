/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view','monitor-infra-analyticsnode-model',
          'node-color-mapping'],
        function(
                _, ContrailView, AnalyticsNodeListModel, NodeColorMapping) {
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
                                                         elementId :ctwl.ANALYTICSNODE_SUMMARY_CHART_ID,
                                                         title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                         view : "AnalyticsNodesSummaryChartsView",
                                                         viewPathPrefix: ctwl.MONITOR_INFRA_VIEW_PATH,
                                                         app : cowc.APP_CONTRAIL_CONTROLLER,
                                                         viewConfig: {
                                                             colorFn: colorFn
                                                         }
                                                     },
                                                 },{
                                                     page: {
                                                         elementId: 'grid-stack-view-page-1',
                                                         view: 'GridStackView',
                                                         viewConfig: {
                                                             gridAttr: {
                                                                 defaultWidth: 6,
                                                                 defaultHeight: 10
                                                             },
                                                             widgetCfgList: [
                                                                   {
                                                                       modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                           table_name: 'StatTable.SandeshMessageStat.msg_info',
                                                                           select: 'T=, msg_info.type, SUM(msg_info.messages)'
                                                                       }),
                                                                       viewCfg: {
                                                                           elementId : 'message_type_top_5_section',
                                                                           view : "SectionView",
                                                                           viewConfig : {
                                                                               rows : [ {
                                                                                   columns :[
                                                                                        $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                                            elementId : 'message_type_top_5',
                                                                                            viewConfig: {
                                                                                                chartOptions: {
                                                                                                    colors: cowc.FIVE_NODE_COLOR,
                                                                                                    title: 'Message Types',
                                                                                                    xAxisLabel: '',
                                                                                                    yAxisLabel: ctwl.ANALYTICS_NODE_TOP_MESSAGE_TYPES,
                                                                                                    groupBy: 'msg_info.type',
                                                                                                    limit: 5,
                                                                                                    yField: 'SUM(msg_info.messages)',
                                                                                                }
                                                                                            }
                                                                                        })
                                                                                   ]
                                                                               }]
                                                                           }
                                                                       },itemAttr: {
                                                                           title: ctwl.ANALYTICS_NODE_TOP_MESSAGE_TYPES
                                                                       }
                                                                   },{
                                                                       modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                           table_name: 'StatTable.SandeshMessageStat.msg_info',
                                                                           select: 'T=, name, SUM(msg_info.messages)'
                                                                       }),
                                                                       viewCfg: {
                                                                           elementId : 'generator_top_5_section',
                                                                           view : "SectionView",
                                                                           viewConfig : {
                                                                               rows : [ {
                                                                                   columns :[
                                                                                        $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                                            elementId : 'generator_top_5',
                                                                                            viewConfig: {
                                                                                                chartOptions: {
                                                                                                    colors: cowc.FIVE_NODE_COLOR,
                                                                                                    title: 'Generators',
                                                                                                    xAxisLabel: '',
                                                                                                    yAxisLabel: ctwl.ANALYTICS_NODE_TOP_GENERATORS,
                                                                                                    groupBy: 'name',
                                                                                                    limit: 5,
                                                                                                    yField: 'SUM(msg_info.messages)',
                                                                                                }
                                                                                            }
                                                                                        })
                                                                                   ]
                                                                               }]
                                                                           }
                                                                       },itemAttr: {
                                                                           title: ctwl.ANALYTICS_NODE_TOP_GENERATORS
                                                                       }
                                                                   }, {
                                                                       modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                           table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                           select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                           where: 'process_mem_cpu_usage.__key = contrail-analytics-nodemgr'
                                                                       }),
                                                                       viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                           elementId : 'analytics_node_node_manager_cpu_share',
                                                                           viewConfig: {
                                                                               chartOptions: {
                                                                                   yFormatter: d3.format('.2f'),
                                                                                   yAxisLabel: ctwl.ANALYTICS_NODE_NODE_MANAGER_CPU_SHARE,
                                                                                   groupBy: 'name',
                                                                                   colors: colorFn,
                                                                                   yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                                   title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                               }
                                                                           }
                                                                       }),
                                                                       itemAttr: {
                                                                           title: ctwl.ANALYTICS_NODE_NODE_MANAGER_CPU_SHARE
                                                                       }
                                                                   }, {
                                                                       modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                           table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                           select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                           where: 'process_mem_cpu_usage.__key = contrail-snmp-collector'
                                                                       }),
                                                                       viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                           elementId : 'analytics_node_snmp_collector_cpu_share',
                                                                           viewConfig: {
                                                                               chartOptions: {
                                                                                   yFormatter: d3.format('.2f'),
                                                                                   yAxisLabel: ctwl.ANALYTICS_NODE_SNMP_COLLECTOR_CPU_SHARE,
                                                                                   groupBy: 'name',
                                                                                   colors: colorFn,
                                                                                   yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                                   title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                               }
                                                                           }
                                                                       }),itemAttr: {
                                                                           title: ctwl.ANALYTICS_NODE_SNMP_COLLECTOR_CPU_SHARE
                                                                       }
                                                                   }, {
                                                                       modelCfg: new AnalyticsNodeListModel(),
                                                                       viewCfg: {
                                                                           elementId :
                                                                               ctwl.ANALYTICSNODE_SUMMARY_GRID_ID,
                                                                           title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                           view : "AnalyticsNodeSummaryGridView",
                                                                           viewPathPrefix:
                                                                               ctwl.ANALYTICSNODE_VIEWPATH_PREFIX,
                                                                           app : cowc.APP_CONTRAIL_CONTROLLER,
                                                                           viewConfig : {
                                                                               colorFn: colorFn
                                                                           }},
                                                                       itemAttr: {
                                                                           width: 2
                                                                       }
                                                                   }
                                                             ]
                                                         }
                                                     }
                                                 },{
                                                     page: {
                                                         elementId: 'grid-stack-view-page-2',
                                                         view: 'GridStackView',
                                                         viewConfig: {
                                                             gridAttr: {
                                                                 defaultWidth: 6,
                                                                 defaultHeight: 10
                                                             },
                                                             widgetCfgList: [
                                                                 {
                                                                     modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                         table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                         select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                         where: 'process_mem_cpu_usage.__key = contrail-alarm-gen'
                                                                     }),
                                                                     viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                         elementId : 'analytics_node_alarm_gen_cpu_share',
                                                                         viewConfig: {
                                                                             chartOptions: {
                                                                                 yFormatter: d3.format('.2f'),
                                                                                 yAxisLabel: ctwl.ANALYTICS_NODE_ALARM_GEN_CPU_SHARE,
                                                                                 groupBy: 'name',
                                                                                 colors: colorFn,
                                                                                 yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                                 title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                             }
                                                                         }
                                                                     }),itemAttr: {
                                                                         title: ctwl.ANALYTICS_NODE_ALARM_GEN_CPU_SHARE
                                                                     }
                                                                 },{
                                                                     modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                         table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                         select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                         where: 'process_mem_cpu_usage.__key = contrail-collector'
                                                                     }),
                                                                     viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                         elementId : 'analytics_node_node_collector_cpu_share',
                                                                         viewConfig: {
                                                                             chartOptions: {
                                                                                 yFormatter: d3.format('.2f'),
                                                                                 yAxisLabel: ctwl.ANALYTICS_NODE_COLLECTOR_CPU_SHARE,
                                                                                 groupBy: 'name',
                                                                                 colors: colorFn,
                                                                                 yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                                 title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                             }
                                                                         }
                                                                     }),itemAttr: {
                                                                         title: ctwl.ANALYTICS_NODE_COLLECTOR_CPU_SHARE
                                                                     }
                                                                 },{
                                                                     modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                         table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                         select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                         where: 'process_mem_cpu_usage.__key = contrail-query-engine'
                                                                     }),
                                                                     viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                         elementId : 'analytics_node_qe_cpu_share',
                                                                         viewConfig: {
                                                                             chartOptions: {
                                                                                 yFormatter: d3.format('.2f'),
                                                                                 yAxisLabel: ctwl.ANALYTICS_NODE_QE_CPU_SHARE,
                                                                                 groupBy: 'name',
                                                                                 colors: colorFn,
                                                                                 yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                                 title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                             }
                                                                         }
                                                                     }),itemAttr: {
                                                                         title: ctwl.ANALYTICS_NODE_QE_CPU_SHARE
                                                                     }
                                                                 },{
                                                                     modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                         table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                         select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                         where: 'process_mem_cpu_usage.__key = contrail-analytics-api'
                                                                     }),
                                                                     viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                         elementId : 'analytics_node_api_cpu_share',
                                                                         viewConfig: {
                                                                             chartOptions: {
                                                                                 yFormatter: d3.format('.2f'),
                                                                                 yAxisLabel: ctwl.ANALYTICS_NODE_API_CPU_SHARE,
                                                                                 groupBy: 'name',
                                                                                 colors: colorFn,
                                                                                 yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                                 title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                             }
                                                                         }
                                                                     }),itemAttr: {
                                                                         title: ctwl.ANALYTICS_NODE_API_CPU_SHARE
                                                                     }
                                                                 },{
                                                                     modelCfg: new AnalyticsNodeListModel(),
                                                                     viewCfg: {
                                                                         elementId :
                                                                             ctwl.ANALYTICSNODE_SUMMARY_GRID_ID,
                                                                         title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                                                         view : "AnalyticsNodeSummaryGridView",
                                                                         viewPathPrefix:
                                                                             ctwl.ANALYTICSNODE_VIEWPATH_PREFIX,
                                                                         app : cowc.APP_CONTRAIL_CONTROLLER,
                                                                         viewConfig : {
                                                                             colorFn: colorFn
                                                                         }},
                                                                     itemAttr: {
                                                                         width: 2
                                                                     }
                                                                 }
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
