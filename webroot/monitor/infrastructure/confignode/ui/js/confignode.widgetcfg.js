/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['lodash', 'contrail-view', 'legend-view', 'monitor-infra-confignode-model', 'node-color-mapping'],
        function(_, ContrailView, LegendView, configNodeListModelCfg, NodeColorMapping){
    var ConfigNodeViewConfig = function () {
        var self = this;
        self.viewConfig = {
            'confignode-percentile-time-size': {
                baseModel: 'CONFIGNODE_PERCENTILE_TIMESIZE_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: ctwl.CONFIGNODE_CHART_PERCENTILE_TEXT_VIEW,
                    title: ctwl.CONFIG_NODE_RESPONSE_PARAMS_PERCENTILE,
                    view: "PercentileTextView",
                    viewConfig: {
                        percentileTitle: ctwl.CONFIGNODE_CHART_PERCENTILE_TITLE,
                        percentileXvalue: ctwl.CONFIGNODE_CHART_PERCENTILE_TIME,
                        percentileYvalue: ctwl.CONFIGNODE_CHART_PERCENTILE_SIZE,
                    }
                },
                itemAttr: {
                    width: 0.9,
                    height: 0.2,
                    title: ctwl.CONFIG_NODE_RESPONSE_PARAMS_PERCENTILE
                }
            },
            'confignode-requests-served': {
                    baseModel: 'CONFIGNODE_APIREQUESTS_MODEL',
                    modelCfg: {
                    },
                    viewCfg: {
                        elementId: 'confignode_requests_served',
                        view: 'StackedAreaChartView',
                        viewConfig: {
                            class: 'col-xs-7 mon-infra-chart chartMargin',
                            chartOptions: {
                                showControls: false,
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                failureLabel: ' Failed Requests (Total)',
                                subTitle: "Requests served per API Server (in 3 mins)",
                                xAxisLabel: '',
                                yAxisLabel: 'Requests Served',
                                groupBy: 'Source',
                                yAxisFormatter: function (d) {
                                    return cowu.numberFormatter(d, 0);
                                },
                                failureCheckFn: function (d) {
                                    if (parseInt(d['api_stats.resp_code']) != 200) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                }
                            }
                        }
                    },
                    itemAttr: {
                        height: 0.9,
                        width: 2,
                        title: ctwl.CONFIG_NODE_REQUESTS_SERVED
                    }
            },
            'confignode-response-time-bar': {

            },
            'confignode-response-size-line': {

            },
            'confignode-response-time-size': {
                    baseModel: 'CONFIGNODE_APIREQUESTS_MODEL',
                    modelCfg: {
                    },
                    viewCfg: {
                        elementId: 'confignode_response_time_size',
                        view: 'LineBarWithFocusChartView',
                        childWidgets: ['confignode-response-time-bar','confignode-response-size-line'],
                        viewConfig: {
                            class: 'col-xs-5 mon-infra-chart',
                            parseFn: cowu.parseLineBarChartWithFocus,
                            chartOptions: {
                                title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                xAxisTicksCnt: 8, //In case of time scale for every 15 mins one tick
                                margin: {top: 20, right: 50, bottom: 40, left: 50},
                                axisLabelDistance: -10,
                                focusEnable: false,
                                showLegend: true,
                                xAxisLabel: '',
                                xAxisMaxMin: false,
                                defaultDataStatusMessage: false,
                                insertEmptyBuckets: false,
                                bucketSize: 4,
                                groupBy: 'Source',
                                legendView: LegendView,

                                y1AxisLabel: ctwl.RESPONSE_TIME,
                                //Y1 for bar
                                y1Field: 'api_stats.response_time_in_usec',
                                y1FieldOperation: 'average',
                                y1Formatter: function (y1Value) {
                                    //Divide by 1000 to convert to milli secs;
                                    y1Value = ifNull(y1Value, 0)/1000;
                                    var formattedValue = Math.round(y1Value) + ' ms';
                                    if (y1Value > 1000){
                                        // seconds block
                                        formattedValue = Math.round(y1Value/1000);
                                        formattedValue = formattedValue + ' secs'
                                    } else if (y1Value > 60000) {
                                        // minutes block
                                        formattedValue = Math.round(y1Value/(60 * 1000))
                                        formattedValue = formattedValue + ' mins'
                                    }
                                    return formattedValue;
                                },


                                y2AxisLabel: ctwl.RESPONSE_SIZE,
                                y2AxisWidth: 50,
                                //Y2 for line
                                y2Field: 'api_stats.response_size',
                                y2AxisColor: monitorInfraConstants.CONFIGNODE_RESPONSESIZE_COLOR,
                                y2FieldOperation: 'average',
                                xFormatter: function (xValue, tickCnt) {
                                    // Same function is called for
                                    // axis ticks and the tool tip
                                    // title
                                    var date = new Date(xValue);
                                    return d3.time.format('%H:%M')(date);
                                },
                                y2Formatter: function (y2Value) {
                                    var formattedValue = formatBytes(y2Value, true);
                                    return formattedValue;
                                },
                            },
                        }
                    },
                    itemAttr: {
                        width: 1.2,
                        height: 0.8,
                        title: ctwl.CONFIG_NODE_RESPONSE_TIME_VS_SIZE
                    }
            },
            'confignode-reads-writes-donut-chart': {
                    baseModel: 'CONFIGNODE_APIREQUESTS_MODEL',
                    modelCfg: {
                    },
                    viewCfg: {
                        elementId: ctwl.CONFIGNODE_SUMMARY_DONUTCHART_SECTION_ID,
                        view: 'ConfigNodeDonutChartView',
                        viewPathPrefix: ctwl.MONITOR_INFRA_VIEW_PATH,
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        viewConfig: {
                            class: 'col-xs-5 mon-infra-chart',
                        }
                    },
                    itemAttr: {
                        width: 0.9,
                        height: 0.6,
                        title: ctwl.CONFIG_NODE_REQUESTS_READ_VS_WRITE
                    }
            },
            'confignode-grid-view': {
                  modelCfg: {
                    modelId: 'CONFIGNODE_LIST_MODEL',
                    config: configNodeListModelCfg
                  },
                  viewCfg: {
                      elementId: ctwl.CONFIGNODE_SUMMARY_GRID_ID,
                      title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                      view: "GridView",
                      viewConfig: {
                          elementConfig:
                              getConfigNodeSummaryGridConfig('confignode-grid-view','configNode')
                      }
                  },
                  itemAttr: {
                      width: 2,
                      height: 2
                    }
            },
            'confignode-top-useragent': {
                    baseModel: 'CONFIGNODE_USERAGENT_MODEL',
                    modelCfg: {
                    },
                    viewCfg: {
                        elementId: 'useragent_top_5',
                        view: 'StackedBarChartWithFocusView',
                        viewConfig: {
                            chartOptions: {
                                colors: cowc.FIVE_NODE_COLOR,
                                subTitle: "API requests per process/client (in 3 mins)",
                                title: 'Process',
                                xAxisLabel: '',
                                yAxisLabel: 'Process Wise Usage',
                                groupBy: 'api_stats.useragent',
                                limit: 5,
                                yField: 'COUNT(api_stats)',
                                showLegend: false,
                            }
                        }
                    },
                    itemAttr: {
                        title: ctwl.CONFIG_NODE_PROCESS_WISE_USAGE,
                    }
            },
            'confignode-top-objecttypes': {
                baseModel: 'CONFIGNODE_OBJECTTYPE_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: 'objecttype_top_5',
                    view: 'StackedBarChartWithFocusView',
                    viewConfig: {
                        chartOptions: {
                            colors: cowc.FIVE_NODE_COLOR,
                            title: 'Objects',
                            subTitle: "API requests per Config Object type (in 3 mins)",
                            xAxisLabel: '',
                            yAxisLabel: ctwl.CONFIG_NODE_OBJECT_USAGE_TITLE,
                            groupBy: 'api_stats.object_type',
                            limit: 5,
                            yField: 'COUNT(api_stats)',
                            showLegend: false,
                        }
                    }
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_OBJECT_USAGE_TITLE
                }
            },
            'confignode-top-remote-ip': function (){
                return {
                    baseModel: 'CONFIGNODE_REMOTEIP_MODEL',
                    modelCfg: {
                    },
                    viewCfg: {
                        elementId: 'remote_ip_top_5',
                        view: 'StackedBarChartWithFocusView',
                        viewConfig: {
                            chartOptions: {
                                colors: cowc.FIVE_NODE_COLOR,
                                title: "Clients",
                                subTitle: "API requests per client [IP:Port] (in 3 mins)",
                                xAxisLabel: '',
                                yAxisLabel: "Client Wise Usage",
                                groupBy: 'api_stats.remote_ip',
                                limit: 5,
                                yField: 'COUNT(api_stats)',
                                showLegend: false,
                            }
                        }
                    },
                    itemAttr: {
                        title: ctwl.CONFIG_NODE_CLIENT_WISE_USAGE,
                    }
                }
            },
            'confignode-top-projects': {
                baseModel: 'CONFIGNODE_PROJECTS_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: 'projects_top_5',
                    view: 'StackedBarChartWithFocusView',
                    viewConfig: {
                        chartOptions: {
                            colors: cowc.FIVE_NODE_COLOR,
                            title: "Projects",
                            subTitle: "API requests per project (in 3 mins)",
                            xAxisLabel: '',
                            yAxisLabel: "Project Wise Usage",
                            groupBy: 'api_stats.project_name',
                            limit: 5,
                            yField: 'COUNT(api_stats)',
                            showLegend: false,
                        }
                    }
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_PROJECT_WISE_USAGE,
                }
              },
              'confignode-process-contrail-schema': {
                baseModel: 'CONFIGNODE_SCHEMA_CPU_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: monitorInfraConstants.CONFIGNODE_CPU_SHARE_SCHEMA_LINE_CHART_ID,
                    view: 'LineWithFocusChartView',
                    viewConfig: {
                        chartOptions: {
                            yFormatter: d3.format('.2f'),
                            subTitle: ctwl.CPU_SHARE_PERCENTAGE,
                            yAxisLabel: 'Schema CPU Share (%)',
                            groupBy: 'name',
                            yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                            title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                        }
                    }
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_SCHEMA_CPU_SHARE,
                }
            },
            'confignode-system-cpu-share': {
                baseModel: 'SYSTEM_CPU_MODEL',
                baseView: 'SYSTEM_CPU_SHARE_VIEW',
                modelCfg: {
                    modelId: 'CONFIGNODE_SYSTEM_CPU_MODEL',
                    config: {
                        where: 'node-type = config-node'
                    }
                }
            },
            'confignode-system-memory-usage': {
                baseModel: 'SYSTEM_MEMORY_MODEL',
                baseView: 'SYSTEM_MEMORY_USAGE_VIEW',
                modelCfg: {
                    modelId: 'CONFIGNODE_SYSTEM_MEMORY_MODEL',
                    config: {
                        where: 'node-type = config-node'
                    }
                },
            },
            'confignode-disk-usage-info': {
                baseModel: 'SYSTEM_DISK_USAGE_MODEL',
                baseView: 'SYSTEM_DISK_USAGE_VIEW',
                modelCfg: {
                    modelId: 'CONFIGNODE_DISK_USAGE_MODEL',
                    config: {
                        where: 'node-type = config-node'
                    }
                },
            },
            'confignode-process-contrail-discovery': {
                baseModel: 'CONFIGNODE_DISCOVERY_CPU_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: monitorInfraConstants.CONFIGNODE_CPU_SHARE_DISCOVERYLINE_CHART_ID,
                    view: 'LineWithFocusChartView',
                    viewConfig: {
                        chartOptions: {
                            yFormatter: d3.format('.2f'),
                            subTitle: ctwl.CPU_SHARE_PERCENTAGE,
                            yAxisLabel: 'Discovery CPU Share (%)',
                            groupBy: 'name',
                            yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                            title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                        }
                    }
                },
                itemAttr: {
                    title: ctwl.CONFIGNODE_DISCOVERY_CPU_SHARE,
                }
            },
            'confignode-process-contrail-api': {
                baseModel: 'CONFIGNODE_API_CPU_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: monitorInfraConstants.CONFIGNODE_CPU_SHARE_API_LINE_CHART_ID,
                    view: 'LineWithFocusChartView',
                    viewConfig: {
                        chartOptions: {
                            yFormatter: d3.format('.2f'),
                            subTitle: ctwl.CPU_SHARE_PERCENTAGE,
                            yAxisLabel: 'API CPU Share (%)',
                            groupBy: 'name',
                            yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                            title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                        }

                    }
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_API_CPU_SHARE,
                }
            },
            'confignode-process-contrail-service-monitor': {
                baseModel: 'CONFIGNODE_SERVICE_MONITOR_CPU_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: monitorInfraConstants.CONFIGNODE_CPU_SHARE_SERVICE_MONITOR_LINE_CHART_ID,
                    view: 'LineWithFocusChartView',
                    viewConfig: {
                        chartOptions: {
                            yFormatter: d3.format('.2f'),
                            subTitle: ctwl.CPU_SHARE_PERCENTAGE,
                            yAxisLabel: ctwl.CONFIG_NODE_SERVICE_MONITOR_CPU_SHARE,
                            groupBy: 'name',
                            yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                            title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                        }
                    }
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_SERVICE_MONITOR_CPU_SHARE,
                }
            },
            'confignode-process-contrail-device-manager': {
                baseModel: 'CONFIGNODE_DEVICE_MANAGER_CPU_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: monitorInfraConstants.CONFIGNODE_CPU_SHARE_DEVICE_MANAGER_LINE_CHART_ID,
                    view: 'LineWithFocusChartView',
                    viewConfig: {
                        chartOptions: {
                            yFormatter: d3.format('.2f'),
                            subTitle: ctwl.CPU_SHARE_PERCENTAGE,
                            yAxisLabel: ctwl.CONFIG_NODE_DEVICE_MANAGER_CPU_SHARE,
                            groupBy: 'name',
                            yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                            title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                        }
                    },
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_DEVICE_MANAGER_CPU_SHARE,
                }
            },
            'confignode-process-ifmap': {
                baseModel: 'CONFIGNODE_IFMAP_CPU_MODEL',
                modelCfg: {
                },
                viewCfg: {
                    elementId: monitorInfraConstants.CONFIGNODE_CPU_SHARE_IFMAP_LINE_CHART_ID,
                    view: 'LineWithFocusChartView',
                    viewConfig: {
                        chartOptions: {
                            yFormatter: d3.format('.2f'),
                            subTitle: ctwl.CPU_SHARE_PERCENTAGE,
                            yAxisLabel: ctwl.CONFIG_NODE_IFMAP_CPU_SHARE,
                            groupBy: 'name',
                            yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                            title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                        }
                    }
                },
                itemAttr: {
                    title: ctwl.CONFIG_NODE_IFMAP_CPU_SHARE,
                }
            }
        };
        function getConfigNodeSummaryGridConfig(widgetId, type) {
            var columns = [
               {
                   field: "name",
                   name: "Host name",
                   formatter: function(r,c,v,cd,dc) {
                      return cellTemplateLinks({
                                      cellText: 'name',
                                      name: 'name',
                                      statusBubble: true,
                                      rowData: dc,
                                      tagColorMap: NodeColorMapping.getNodeColorMap(_.without(_.pluck(data, 'key'), failureLabel),null, type)
                               });
                   },
                   events: {
                      onClick: onClickHostName
                   },
                   cssClass: 'cell-hyperlink-blue',
                   searchFn: function(d) {
                       return d['name'];
                   },
                   minWidth: 90,
                   exportConfig: {
                       allow: true,
                       advFormatter: function(dc) {
                           return dc.name;
                       }
                   },
               },
               {
                   field: "ip",
                   name: "IP Address",
                   minWidth: 90,
                   formatter: function(r,c,v,cd,dc){
                       return monitorInfraParsers.summaryIpDisplay(dc['ip'],
                                       dc['summaryIps']);
                   },
                   exportConfig: {
                       allow: true,
                       advFormatter: function(dc) {
                           return dc.ip;
                       }
                   },
                   sorter: comparatorIP
               },
               {
                   field: "version",
                   name: "Version",
                   minWidth: 90
               },
               {
                   field: "status",
                   name: "Status",
                   formatter: function(r,c,v,cd,dc) {
                       return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'html');
                   },
                   searchFn: function(dc) {
                       return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'text');
                   },
                   minWidth: 110,
                   exportConfig: {
                       allow: true,
                       advFormatter: function(dc) {
                           return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'text');
                       }
                   },
                   sortable: {
                       sortBy: function (d) {
                           return monitorInfraUtils.getNodeStatusContentForSummayPages(d,'text');
                       }
                   },
                   sorter: cowu.comparatorStatus
               },
               {
                   field: "cpu",
                   name: ctwl.TITLE_CPU,
                   formatter: function(r,c,v,cd,dc) {
                       return '<div class="gridSparkline display-inline">' +
                               '</div>' +
                              '<span class="display-inline">' +
                              ifNotNumeric(dc['cpu'],'-') + '</span>';
                   },
                   asyncPostRender: renderSparkLines,
                   searchFn: function(d){
                       return d['cpu'];
                   },
                   minWidth: 110,
                   exportConfig: {
                       allow: true,
                       advFormatter: function(dc) {
                           return dc.cpu;
                       }
                   }
               },
               {
                   field: "memory",
                   name: "Memory",
                   minWidth: 150,
                   sortField: "y"
               },{
                   field: "percentileResponse",
                   id: "percentileTime",
                   sortable: true,
                   name: "95% - Responses",
                   minWidth: 200,
                   formatter: function(r,c,v,cd,dc) {
                       var fomattedPct = "";
                       if(dc && dc.percentileTime && dc.percentileSize) {
                           fomattedPct =  '<span><b>'+"Time "+
                               '</b></span>' +
                              '<span class="display-inline">' +
                              (dc['percentileTime']) + '</span>'+'<span><b>'+", Size "+
                               '</b></span>' +
                              '<span class="display-inline">' +
                              (dc['percentileSize']) + '</span>';
                       }
                       return fomattedPct;
                   }
               }

            ];
            var gridElementConfig = {
                header: {
                    title: {
                        text: ctwl.CONFIGNODE_SUMMARY_TITLE
                    }
                },
                columnHeader: {
                    columns: columns
                },
                body: {
                    options: {
                      detail: false,
                      enableAsyncPostRender: true,
                      checkboxSelectable: false,
                      fixedRowHeight: 30
                    },
                    dataSource: {
                    },
                    statusMessages: {
                        loading: {
                            text: 'Loading Config Nodes..',
                        },
                        empty: {
                            text: 'No Config Nodes Found.'
                        }
                    }
                },footer: {
                    pager: {
                        options: {
                            pageSize: 10,
                        }
                    }
                }
            };
            return gridElementConfig;
        }
        function onClickHostName(e, selRowDataItem) {
            var name = selRowDataItem.name, hashParams = null,
                triggerHashChange = true, hostName;
            hostName = selRowDataItem['name'];
            var hashObj = {
                    type: "configNode",
                    view: "details",
                    focusedElement: {
                        node: name,
                        tab: 'details'
                    }
                };
            if(contrail.checkIfKeyExistInObject(true, hashParams,
                        'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {
                p: "mon_infra_config",
                merge: false,
                triggerHashChange: triggerHashChange});

        }
        self.getViewConfig = function(id) {
            return self.viewConfig[id];
        };
    };
    return (new ConfigNodeViewConfig()).viewConfig;
});
