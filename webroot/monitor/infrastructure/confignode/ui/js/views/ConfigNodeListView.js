/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view','monitor-infra-confignode-model', 'node-color-mapping',
          'monitor-infra-confignode-charts-model', 'legend-view'],
        function(
                _, ContrailView, ConfigNodeListModel, NodeColorMapping, ConfigNodeChartsModel, LegendView) {
            var ConfigNodeListView = ContrailView.extend({
                render : function() {
                    var configNodeListModel = new ConfigNodeListModel(),
                        nodeColorMapping = new NodeColorMapping(),
                        colorFn = nodeColorMapping.getNodeColorMap;

                    this.renderView4Config(this.$el, configNodeListModel,
                            getConfigNodeListViewConfig(colorFn));
                }
            });


            function getConfigNodeListViewConfig(colorFn) {
                var chartModel = new ConfigNodeChartsModel();
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
                                                  elementId : 'configGridStackComponent',
                                                  view : "GridStackView",
                                                  viewConfig : {
                                                      gridAttr: {
                                                          defaultWidth: 6,
                                                          defaultHeight: 10,
                                                      },
                                                      widgetCfgList: [
                                                          {
                                                              modelCfg: chartModel,
                                                              viewCfg: 
                                                                  $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                                                                      elementId : ctwl.CONFIGNODE_SUMMARY_STACKEDCHART_ID,
                                                                      view: 'StackedAreaChartView',
                                                                      viewConfig: {
                                                                          class: 'col-xs-7 mon-infra-chart chartMargin',
                                                                          chartOptions: {
                                                                              showControls: false,
                                                                              height: 480,
                                                                              colors: colorFn,
                                                                              title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                              xAxisLabel: '',
                                                                              yAxisLabel: 'Requests Served',
                                                                              groupBy: 'Source',
                                                                              failureCheckFn: function (d) {
                                                                                  if (parseInt(d['api_stats.resp_code']) != 200) {
                                                                                      return 1;
                                                                                  } else {
                                                                                      return 0;
                                                                                  }
                                                                              },
                                                                              margin: {
                                                                                  left: 40,
                                                                                  top: 20,
                                                                                  right: 0,
                                                                                  bottom: 40
                                                                              }
                                                                          }
                                                                      }
                                                                  }),
                                                              itemAttr: {
                                                                  height: 2
                                                              }
                                                                  
                                                          },{
                                                              modelCfg: chartModel,
                                                              viewCfg: {
                                                                  elementId: ctwl.CONFIGNODE_SUMMARY_LINEBARCHART_ID,
                                                                  view: 'LineBarWithFocusChartView',
                                                                  viewConfig: {
                                                                      class: 'col-xs-5 mon-infra-chart',
                                                                      chartOptions: {
                                                                          y1AxisLabel:ctwl.RESPONSE_TIME,
                                                                          y2AxisLabel:ctwl.RESPONSE_SIZE,
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                          xAxisTicksCnt: 8, //In case of time scale for every 15 mins one tick
                                                                          margin: {top: 20, right: 50, bottom: 40, left: 50},
                                                                          axisLabelDistance: -10,
                                                                          y2AxisWidth: 50,
                                                                          focusEnable: false,
                                                                          height: 245,
                                                                          showLegend: true,
                                                                          xAxisLabel: '',
                                                                          xAxisMaxMin: false,
                                                                          defaultDataStatusMessage: false,
                                                                          insertEmptyBuckets: false,
                                                                          bucketSize: 4,
                                                                          groupBy: 'Source',
                                                                          //Y1 for bar
                                                                          y1Field: 'api_stats.response_time_in_usec',
                                                                          //Y2 for line
                                                                          y2Field: 'api_stats.response_size',
                                                                          y2AxisColor: monitorInfraConstants.CONFIGNODE_RESPONSESIZE_COLOR,
                                                                          y2FieldOperation: 'average',
                                                                          y1FieldOperation: 'average',
                                                                          colors: colorFn,
                                                                          xFormatter: function (xValue, tickCnt) {
                                                                              // Same function is called for
                                                                              // axis ticks and the tool tip
                                                                              // title
                                                                              var date = new Date(xValue);
                                                                              if (tickCnt != null) {
                                                                                  var mins = date.getMinutes();
                                                                                  date.setMinutes(Math.ceil(mins/15) * 15);
                                                                              }
                                                                              return d3.time.format('%H:%M')(date);
                                                                          },
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
                                                                          y2Formatter: function (y2Value) {
                                                                              var formattedValue = formatBytes(y2Value, true);
                                                                              return formattedValue;
                                                                          },
                                                                          legendView: LegendView
                                                                      },
                                                                  }
                                                              }
                                                          },{
                                                              modelCfg: chartModel,
                                                              viewCfg: {
                                                                  elementId: ctwl.CONFIGNODE_SUMMARY_DONUTCHART_SECTION_ID,
                                                                  view: 'ConfigNodeDonutChartView',
                                                                  viewPathPrefix: ctwl.MONITOR_INFRA_VIEW_PATH,
                                                                  app : cowc.APP_CONTRAIL_CONTROLLER,
                                                                  viewConfig: {
                                                                      class: 'col-xs-5 mon-infra-chart',
                                                                      color: colorFn
                                                                  }
                                                              }
                                                          },{
                                                              modelCfg: new ConfigNodeListModel(),
                                                              viewCfg: {
                                                                  elementId : ctwl.CONFIGNODE_SUMMARY_GRID_ID,
                                                                  title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                  view : "GridView",
                                                                  viewConfig : {
                                                                      elementConfig :
                                                                          getConfigNodeSummaryGridConfig()
                                                                  }
                                                              },
                                                              itemAttr: {
                                                                  width: 2
                                                              }
                                                          }
                                                      ]
                                                  }
                                              },
                                          },
                                          {
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
                                                                                             title: 'User Agents',
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: 'Top 5 User Agents',
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
                                                                                             title: 'Object Types',
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: 'Top 5 Object Types',
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
                                                                                             title: "Remote IP's",
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: "Top 5 Remote IP's",
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
                                                                                             title: "Remote IP's",
                                                                                             xAxisLabel: '',
                                                                                             yAxisLabel: "Top 5 Remote IP's",
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
                                                            }, {
                                                                modelCfg: new ConfigNodeListModel(),
                                                                viewCfg: {
                                                                    elementId : ctwl.CONFIGNODE_SUMMARY_GRID_ID,
                                                                    title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                    view : "GridView",
                                                                    viewConfig : {
                                                                        elementConfig :
                                                                            getConfigNodeSummaryGridConfig()
                                                                    }
                                                                },
                                                                itemAttr: {
                                                                    width: 2
                                                                }
                                                            }
                                                      ]
                                                  }
                                              }
                                          },
                                          {
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
                                                                  where: 'process_mem_cpu_usage.__key = contrail-config-nodemgr'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yAxisLabel: 'Node Manager CPU Share (%)',
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              })
                                                          },
                                                          {
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-schema,'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yAxisLabel: 'Schema CPU Share (%)',
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              })
                                                          },
                                                          {
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-discovery:0'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yAxisLabel: 'Discovery CPU Share (%)',
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              })
                                                          },
                                                          {
                                                              modelCfg: monitorInfraUtils.getStatsModelConfig({
                                                                  table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                                                                  select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                                                                  where: 'process_mem_cpu_usage.__key = contrail-api:0'
                                                              }),
                                                              viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                                                                  elementId : ctwl.DATABASENODE_CPU_SHARE_LINE_CHART_ID,
                                                                  viewConfig: {
                                                                      chartOptions: {
                                                                          yAxisLabel: 'Api CPU Share (%)',
                                                                          groupBy: 'name',
                                                                          colors: colorFn,
                                                                          yField: 'MAX(process_mem_cpu_usage.cpu_share)',
                                                                          title: ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                      }
                                                                  }
                                                              })
                                                          }, {
                                                              modelCfg: new ConfigNodeListModel(),
                                                              viewCfg: {
                                                                  elementId : ctwl.CONFIGNODE_SUMMARY_GRID_ID,
                                                                  title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                                                                  view : "GridView",
                                                                  viewConfig : {
                                                                      elementConfig:
                                                                          getConfigNodeSummaryGridConfig(),                                                                                  
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
            function getConfigNodeSummaryGridViewConfig(
                    ) {
                return {
                    elementId : ctwl.CONFIGNODE_SUMMARY_GRID_ID,
                    title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                    view : "GridView",
                    viewConfig : {
                        elementConfig :
                            getConfigNodeSummaryGridConfig()
                    }
                };
            }

            function getConfigNodeSummaryGridConfig(
                    pagerOptions) {
                var columns = [
                   {
                       field:"name",
                       name:"Host name",
                       formatter:function(r,c,v,cd,dc) {
                          return cellTemplateLinks({
                                          cellText:'name',
                                          name:'name',
                                          statusBubble:true,
                                          rowData:dc
                                   });
                       },
                       events: {
                          onClick: onClickHostName
                       },
                       cssClass: 'cell-hyperlink-blue',
                       searchFn:function(d) {
                           return d['name'];
                       },
                       minWidth:90,
                       exportConfig: {
                           allow: true,
                           advFormatter: function(dc) {
                               return dc.name;
                           }
                       },
                   },
                   {
                       field:"ip",
                       name:"IP Address",
                       minWidth:90,
                       formatter:function(r,c,v,cd,dc){
                           return monitorInfraParsers.summaryIpDisplay(dc['ip'],
                                           dc['summaryIps']);
                       },
                       exportConfig: {
                           allow: true,
                           advFormatter: function(dc) {
                               return dc.ip;
                           }
                       },
                       sorter : comparatorIP
                   },
                   {
                       field:"version",
                       name:"Version",
                       minWidth:90
                   },
                   {
                       field:"status",
                       name:"Status",
                       formatter:function(r,c,v,cd,dc) {
                           return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'html');
                       },
                       searchFn:function(dc) {
                           return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'text');
                       },
                       minWidth:110,
                       exportConfig: {
                           allow: true,
                           advFormatter: function(dc) {
                               return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'text');
                           }
                       },
                       sortable:{
                           sortBy: function (d) {
                               return monitorInfraUtils.getNodeStatusContentForSummayPages(d,'text');
                           }
                       },
                       sorter:cowu.comparatorStatus
                   },
                   {
                       field:"cpu",
                       name: ctwl.TITLE_CPU,
                       formatter:function(r,c,v,cd,dc) {
                           return '<div class="gridSparkline display-inline">' +
                                   '</div>' +
                                  '<span class="display-inline">' +
                                  ifNotNumeric(dc['cpu'],'-') + '</span>';
                       },
                       asyncPostRender: renderSparkLines,
                       searchFn:function(d){
                           return d['cpu'];
                       },
                       minWidth:110,
                       exportConfig: {
                           allow: true,
                           advFormatter: function(dc) {
                               return dc.cpu;
                           }
                       }
                   },
                   {
                       field:"memory",
                       name:"Memory",
                       minWidth:150,
                       sortField:"y"
                   }
                ];
                var gridElementConfig = {
                    header : {
                        title : {
                            text : ctwl.CONFIGNODE_SUMMARY_TITLE
                        }
                    },
                    columnHeader : {
                        columns : columns
                    },
                    body : {
                        options : {
                          detail : false,
                          enableAsyncPostRender:true,
                          checkboxSelectable : false,
                          fixedRowHeight: 30
                        },
                        dataSource : {
                        },
                        statusMessages: {
                            loading: {
                                text: 'Loading Config Nodes..',
                            },
                            empty: {
                                text: 'No Config Nodes Found.'
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

            };

            return ConfigNodeListView;
        });
