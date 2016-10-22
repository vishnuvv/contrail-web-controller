/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view','monitor-infra-confignode-model', 'node-color-mapping'],
        function(
                _, ContrailView, ConfigNodeListModel, NodeColorMapping) {
            var ConfigNodeListView = ContrailView.extend({
                render : function() {
                    var nodeColorMapping = new NodeColorMapping(),
                        colorFn = nodeColorMapping.getNodeColorMap;

                    this.renderView4Config(this.$el, null,
                            getConfigNodeListViewConfig(colorFn));
                }
            });


            function getConfigNodeListViewConfig(colorFn) {
                var viewConfig = {
                    rows : [
                         {
                             columns : [
                                        {
                                 elementId: 'config-node-carousel-view',
                                 view: "CarouselView",
                                 viewConfig: {
                                     pages : [
                                          {
                                              page: {
                                                  elementId :ctwl.CONFIGNODE_SUMMARY_CHART_ID,
                                                  title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                  view : "ConfigNodeChartsView",
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
                                                          defaultHeight: 8
                                                      },
                                                      widgetCfgList: [
                                                            {
                                                                modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                    table_name: 'StatTable.VncApiStatsLog.api_stats',
                                                                    select: "T=, api_stats.useragent, COUNT(api_stats)"
                                                                }),
                                                                viewCfg: {
                                                                    elementId : 'useragent_top_5_section',
                                                                    view : "SectionView",
                                                                    viewConfig : {
                                                                        rows : [ {
                                                                            columns :[
                                                                                 $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                                     elementId : 'useragent_top_5',
                                                                                     viewConfig: {
                                                                                         chartOptions: {
                                                                                             colors: cowc.FIVE_NODE_COLOR,
                                                                                             title: 'Process',
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: ctwl.CONFIG_NODE_TOP_5_USER_AGENTS,
                                                                                             groupBy: 'api_stats.useragent',
                                                                                             limit: 5,
                                                                                             yField: 'COUNT(api_stats)',
                                                                                             margin: {
                                                                                                 left: 40,
                                                                                                 top: 20,
                                                                                                 right: 0,
                                                                                                 bottom: 40
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                 })
                                                                            ]
                                                                        }]
                                                                    }
                                                                },itemAttr: {
                                                                    title: ctwl.CONFIG_NODE_TOP_5_USER_AGENTS
                                                                }
                                                            },{
                                                                modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                    table_name: 'StatTable.VncApiStatsLog.api_stats',
                                                                    select: "T=, api_stats.object_type, COUNT(api_stats)"
                                                                }),
                                                                viewCfg: {
                                                                    elementId : 'objecttype_top_5_section',
                                                                    view : "SectionView",
                                                                    viewConfig : {
                                                                        rows : [ {
                                                                            columns :[
                                                                                 $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                                     elementId : 'objecttype_top_5',
                                                                                     viewConfig: {
                                                                                         chartOptions: {
                                                                                             colors: cowc.FIVE_NODE_COLOR,
                                                                                             title: 'Objects',
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: ctwl.CONFIG_NODE_TOP_5_OBJECT,
                                                                                             groupBy: 'api_stats.object_type',
                                                                                             limit: 5,
                                                                                             yField: 'COUNT(api_stats)',
                                                                                             margin: {
                                                                                                 left: 40,
                                                                                                 top: 20,
                                                                                                 right: 0,
                                                                                                 bottom: 40
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                 })
                                                                            ]
                                                                        }]
                                                                    }
                                                                },itemAttr: {
                                                                    title: ctwl.CONFIG_NODE_TOP_5_OBJECT
                                                                }
                                                            }, {
                                                                modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                    table_name: 'StatTable.VncApiStatsLog.api_stats',
                                                                    select: "T=, api_stats.remote_ip, COUNT(api_stats)"
                                                                }),
                                                                viewCfg: {
                                                                    elementId : 'remote_ip_top_5_section',
                                                                    view : "SectionView",
                                                                    viewConfig : {
                                                                        rows : [ {
                                                                            columns :[
                                                                                 $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                                     elementId : 'remote_ip_top_5',
                                                                                     viewConfig: {
                                                                                         chartOptions: {
                                                                                             colors: cowc.FIVE_NODE_COLOR,
                                                                                             title: "Clients",
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel:ctwl.CONFIG_NODE_TOP_REMOTE_IP,
                                                                                             groupBy: 'api_stats.remote_ip',
                                                                                             limit: 5,
                                                                                             yField: 'COUNT(api_stats)',
                                                                                             margin: {
                                                                                                 left: 40,
                                                                                                 top: 20,
                                                                                                 right: 0,
                                                                                                 bottom: 40
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                 })
                                                                            ]
                                                                        }]
                                                                    }
                                                                },itemAttr: {
                                                                    title: ctwl.CONFIG_NODE_TOP_REMOTE_IP,
                                                                }
                                                            }, {
                                                                modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                    table_name: 'StatTable.VncApiStatsLog.api_stats',
                                                                    select: "T=, api_stats.project_name, COUNT(api_stats)"
                                                                }),
                                                                viewCfg: {
                                                                    elementId : 'projects_top_5_section',
                                                                    view : "SectionView",
                                                                    viewConfig : {
                                                                        rows : [ {
                                                                            columns :[
                                                                                 $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                                     elementId : 'projects_top_5',
                                                                                     viewConfig: {
                                                                                         chartOptions: {
                                                                                             colors: cowc.FIVE_NODE_COLOR,
                                                                                             title: "Projects",
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: ctwl.CONFIG_NODE_TOP_5_PROJECTS,
                                                                                             groupBy: 'api_stats.project_name',
                                                                                             limit: 5,
                                                                                             yField: 'COUNT(api_stats)',
                                                                                             margin: {
                                                                                                 left: 40,
                                                                                                 top: 20,
                                                                                                 right: 0,
                                                                                                 bottom: 40
                                                                                             }
                                                                                         }
                                                                                     }
                                                                                 })
                                                                            ]
                                                                        }]
                                                                    }
                                                                },itemAttr: {
                                                                    title: ctwl.CONFIG_NODE_TOP_5_PROJECTS
                                                                }
                                                            }, {
                                                                modelCfg: new ConfigNodeListModel(),
                                                                viewCfg: {
                                                                    title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                    view : "ConfigNodeSummaryGridView",
                                                                    viewPathPrefix:
                                                                        ctwl.CONFIGNODE_VIEWPATH_PREFIX,
                                                                    app : cowc.APP_CONTRAIL_CONTROLLER,
                                                                    viewConfig : {
                                                                        colorFn: colorFn
                                                                    }
                                                                },
                                                                itemAttr: {
                                                                    width: 2,
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
                                                          defaultHeight: 8
                                                      },
                                                      widgetCfgList: [
                                                          {
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-config-nodemgr'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : 'config_node_node_manager_cpu_share',
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yFormatter: d3.format('.2f'),
                                                                          yAxisLabel: ctwl.CONFIG_NODE_NODE_MANAGER_CPU_SHARE,
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              }),
                                                              itemAttr: {
                                                                 title: ctwl.CONFIG_NODE_NODE_MANAGER_CPU_SHARE
                                                              }
                                                          },{
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-schema'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : 'config_node_schema_cpu_share',
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yFormatter: d3.format('.2f'),
                                                                          yAxisLabel: ctwl.CONFIG_NODE_SCHEMA_CPU_SHARE,
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              }),itemAttr: {
                                                                  title: ctwl.CONFIG_NODE_SCHEMA_CPU_SHARE
                                                              }
                                                          },{
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-discovery:0'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : 'config_node_discovery_cpu_share',
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yFormatter: d3.format('.2f'),
                                                                          yAxisLabel: ctwl.CONFIG_NODE_DISCOVERY_CPU_SHARE,
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              }),
                                                              itemAttr: {
                                                                  title: ctwl.CONFIG_NODE_DISCOVERY_CPU_SHARE
                                                              }
                                                          },{
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-api:0'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : 'config_node_api_cpu_share',
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yFormatter: d3.format('.2f'),
                                                                          yAxisLabel: ctwl.CONFIG_NODE_API_CPU_SHARE,
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              }),
                                                              itemAttr: {
                                                                  title: ctwl.CONFIG_NODE_API_CPU_SHARE
                                                              }
                                                          },{
                                                              modelCfg: new ConfigNodeListModel(),
                                                              viewCfg: {
                                                                  title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                  view : "ConfigNodeSummaryGridView",
                                                                  viewPathPrefix:
                                                                      ctwl.CONFIGNODE_VIEWPATH_PREFIX,
                                                                  app : cowc.APP_CONTRAIL_CONTROLLER,
                                                                  viewConfig : {
                                                                      colorFn: colorFn
                                                                  }
                                                              },
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
                    elementId : cowu.formatElementId(
                        [ctwl.CONFIGNODE_SUMMARY_LIST_SECTION_ID ]),
                    view : "SectionView",
                    viewConfig : viewConfig
                };
            }
            return ConfigNodeListView;
        });
