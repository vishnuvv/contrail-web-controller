/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'monitor-infra-confignode-model', 'node-color-mapping'],
        function(_, ContrailView, ConfigNodeListModel, NodeColorMapping){
    var ConfigNodeViewConfig = function () {
        var nodeColorMapping = new NodeColorMapping(),
        colorFn = nodeColorMapping.getNodeColorMap,
        configNodeListModel = new ConfigNodeListModel();
        var self = this;
        var viewConfig = {
            'confignode-charts-view': function (){
                return {
                    modelCfg: null,
                    viewCfg: {
                        elementId :ctwl.CONFIGNODE_SUMMARY_CHART_ID,
                        title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                        view : "ConfigNodeChartsView",
                        viewPathPrefix: ctwl.MONITOR_INFRA_VIEW_PATH,
                        app : cowc.APP_CONTRAIL_CONTROLLER,
                        viewConfig: {
                            colorFn: colorFn
                        }
                    }
                }
            },
            'confignode-grid-view': function () {
              return {
                  modelCfg: configNodeListModel,
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
            },
            'confignode-top-useragent': function (){
                return {
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
                                                 yAxisLabel: 'Process Wise Usage',
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
                    }
                };
            },
            'confignode-top-objecttypes': function (){
                return {
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
                                                 yAxisLabel: 'Object Wise Usage',
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
                    }
                };
            },
            'confignode-top-remote-ip': function (){
                return {
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
                                                 yAxisLabel: "Client Wise Usage",
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
                    }
                };
            },
            'confignode-top-projects': function () {
                return {
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
                                                 yAxisLabel: "Project Wise Usage",
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
                    }
                };
            },
            'confignode-process-cpu-node-mngr': function (colorFn) {
                return {
                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                        table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                        select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                        where: 'process_mem_cpu_usage.__key = contrail-config-nodemgr'
                    }),
                    viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                        elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_NODE_MNGR_LINE_CHART_ID,
                        viewConfig: {
                            chartOptions: {
                                yFormatter: d3.format('.2f'),
                                yAxisLabel: 'Node Manager CPU Share (%)',
                                groupBy: 'name',
                                colors: colorFn,
                                yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                            }
                        }
                    })
                };
            },
            'confignode-process-contrail-schema': function () {
                return {
                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                        table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                        select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                        where: 'process_mem_cpu_usage.__key = contrail-schema'
                    }),
                    viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                        elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_SCHEMA_LINE_CHART_ID,
                        viewConfig: {
                            chartOptions: {
                                yFormatter: d3.format('.2f'),
                                yAxisLabel: 'Schema CPU Share (%)',
                                groupBy: 'name',
                                colors: colorFn,
                                yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                            }
                        }
                    })
                };
            },
            'confignode-process-contrail-discovery': function () {
                return {
                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                        table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                        select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                        where: 'process_mem_cpu_usage.__key = contrail-discovery:0'
                    }),
                    viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                        elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_DISCOVERYLINE_CHART_ID,
                        viewConfig: {
                            chartOptions: {
                                yFormatter: d3.format('.2f'),
                                yAxisLabel: 'Discovery CPU Share (%)',
                                groupBy: 'name',
                                colors: colorFn,
                                yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                            }
                        }
                    })
                };
            },'confignode-process-contrail-api': function () {
                return {
                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                        table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                        select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                        where: 'process_mem_cpu_usage.__key = contrail-api:0'
                    }),
                    viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                        elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_API_LINE_CHART_ID,
                        viewConfig: {
                            chartOptions: {
                                yFormatter: d3.format('.2f'),
                                yAxisLabel: 'Api CPU Share (%)',
                                groupBy: 'name',
                                colors: colorFn,
                                yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                            }
                        }
                    })
                };
            },'confignode-process-contrail-api': function () {
                return {
                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                        table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                        select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                        where: 'process_mem_cpu_usage.__key = contrail-api:0'
                    }),
                    viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                        elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_API_LINE_CHART_ID,
                        viewConfig: {
                            chartOptions: {
                                yFormatter: d3.format('.2f'),
                                yAxisLabel: 'Api CPU Share (%)',
                                groupBy: 'name',
                                colors: colorFn,
                                yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                            }
                        }
                    })
                };
            },
        };
        self.getConfig(id) {
            return self.viewConfig[id];
        };
    };
    return ConfigNodeViewConfig;
});