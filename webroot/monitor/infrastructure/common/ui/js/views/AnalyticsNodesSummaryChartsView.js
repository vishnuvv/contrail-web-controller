/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view',
       'monitor-infra-analyticsnode-model',
       'monitor-infra-analytics-sandesh-chart-model',
       'monitor-infra-analytics-queries-chart-model',
       'monitor-infra-analytics-database-read-write-chart-model',
       'monitor-infra-analytics-generators-chart-model',
       'monitor-infra-analytics-database-usage-model','gs-view'],
       function(_, ContrailView,AnalyticsModel,AnalyticsNodeSandeshChartModel,
            AnalyticsNodeQueriesChartModel, AnalyticsNodeDataBaseReadWriteChartModel,AnalyticsNodeGeneratorsChartModel,
            AanlyticsNodeDatabaseUsageModel,GridStackView){
        var AnalyticsNodesSummaryChartsView = ContrailView.extend({
        render : function (){
            var anlyticsTemplate = contrail.getTemplate4Id(
                    cowc.TMPL_4COLUMN__2ROW_CONTENT_VIEW);
            var percentileWrapperTemplate = contrail.getTemplate4Id(
                    cowc.TMPL_1COLUMN__1ROW_CONTENT_VIEW);
            var self = this,
                viewConfig = self.attributes.viewConfig,
                colorFn = viewConfig['colorFn'];
            self.$el.append(anlyticsTemplate);
            self.$el.append(percentileWrapperTemplate({cssClass: 'percentileWrapper col-xs-6 col-xs-offset-6'}));
            var topleftColumn = self.$el.find(".top-container .left-column"),
                toprightCoulmn = self.$el.find(".top-container .right-column"),
                bottomleftColumn = self.$el.find(".bottom-container .left-column"),
                bottomrightCoulmn = self.$el.find(".bottom-container .right-column"),
                bottomRow = self.$el.find(".percentileWrapper"),

                sandeshModel = new AnalyticsNodeSandeshChartModel(),
                queriesModel = new AnalyticsNodeQueriesChartModel(),
                dbUsageModel = new AanlyticsNodeDatabaseUsageModel();
                databseReadWritemodel = new AnalyticsNodeDataBaseReadWriteChartModel();
                analyticsnodeGeneratorsModel = new AnalyticsNodeGeneratorsChartModel();


            self.$el.append($("<div class='gs-container'></div>"));

            self.renderView4Config(self.$el.find('.gs-container'),{},getGridStackWidgetConfig(colorFn));

            // self.renderView4Config(topleftColumn.find('.gridstack-item-content'),  sandeshModel,
            //        getAnalyticsNodeSandeshChartViewConfig(colorFn));
            // self.renderView4Config(toprightCoulmn,  queriesModel,
            //         getAnalyticsNodeQueriesChartViewConfig(colorFn));
            // self.renderView4Config(bottomrightCoulmn,  dbUsageModel,
            //         getAnalyticsNodeDatabaseUsageChartViewConfig(colorFn));
            // self.renderView4Config(bottomleftColumn,  databseReadWritemodel,
            //         getAnalyticsNodeDatabaseWriteChartViewConfig(colorFn));


            // self.renderView4Config(bottomRow, null,getPercentileTextViewConfig());

        }
    });

   function getGridStackWidgetConfig(colorFn) {
        var sandeshModel = new AnalyticsNodeSandeshChartModel(),
            queriesModel = new AnalyticsNodeQueriesChartModel(),
            dbUsageModel = new AanlyticsNodeDatabaseUsageModel();
            databseReadWritemodel = new AnalyticsNodeDataBaseReadWriteChartModel();
       return {
           elementId : 'analyticsGridStackSection',
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : 'analyticsGridStackComponent',
                       view : "GridStackView",
                       viewConfig : {
                            gridAttr : {
                                defaultWidth : 6,
                                defaultHeight : 10
                            },
                            widgetCfgList: [
                                {
                                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                                        "table_name": "StatTable.SandeshMessageStat.msg_info",
                                        "select": "PERCENTILES(msg_info.bytes), PERCENTILES(msg_info.messages)",
                                        "parser": monitorInfraParsers.percentileAnalyticsNodeSummaryChart
                                    }),
                                    viewCfg: {
                                        elementId : ctwl.ANALYTICS_CHART_PERCENTILE_SECTION_ID,
                                        view : "SectionView",
                                        viewConfig : {
                                            rows : [ {
                                                columns : [ {
                                                    elementId :ctwl.ANALYTICS_CHART_PERCENTILE_TEXT_VIEW,
                                                    title : '',
                                                    view : "PercentileTextView",
                                                    viewPathPrefix:
                                                        ctwl.ANALYTICSNODE_VIEWPATH_PREFIX,
                                                    app : cowc.APP_CONTRAIL_CONTROLLER,
                                                    viewConfig : {
                                                        percentileTitle : ctwl.ANALYTICSNODE_CHART_PERCENTILE_TITLE,
                                                        percentileXvalue : ctwl.ANALYTICSNODE_CHART_PERCENTILE_COUNT,
                                                        percentileYvalue : ctwl.ANALYTICSNODE_CHART_PERCENTILE_SIZE,
                                                    }
                                                }]
                                            }]
                                        }
                                    },
                                    itemAttr: {
                                        width: 2,
                                        height:0.2
                                    }
                                },
                                {
                                    modelCfg: sandeshModel,
                                    viewCfg: getAnalyticsNodeSandeshChartViewConfig(colorFn)
                                },
                                {
                                    modelCfg: analyticsnodeGeneratorsModel,
                                    viewCfg: getGeneratorsScatterChartViewConfig()
                                },
                                {
                                    modelCfg: dbUsageModel,
                                    viewCfg: getAnalyticsNodeDatabaseUsageChartViewConfig(colorFn)
                                },
                               
                                {
                                    modelCfg: databseReadWritemodel,
                                    viewCfg: getAnalyticsNodeDatabaseWriteChartViewConfig(colorFn),
                                },{
                                    modelCfg: new AnalyticsModel(),
                                    viewCfg: {
                                        elementId : ctwl.ANALYTICSNODE_SUMMARY_GRID_ID,
                                        title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                        view : "GridView",
                                        viewConfig : {
                                            elementConfig :
                                                getAnalyticsNodeSummaryGridConfig()
                                        }
                                    },
                                    itemAttr: {
                                        width: 4
                                    }
                                }, {
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
                                                                 title: 'Message Type',
                                                                 xAxisLabel: '',
                                                                 yAxisLabel: 'Top 5 Message Type',
                                                                 groupBy: 'msg_info.type',
                                                                 limit: 5,
                                                                 yField: 'SUM(msg_info.messages)',
                                                             }
                                                         }
                                                     })
                                                ]
                                            }]
                                        }
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
                                                                 title: 'Message Type',
                                                                 xAxisLabel: '',
                                                                 yAxisLabel: 'Top 5 Generators',
                                                                 groupBy: 'name',
                                                                 limit: 5,
                                                                 yField: 'SUM(msg_info.messages)',
                                                             }
                                                         }
                                                     })
                                                ]
                                            }]
                                        }
                                    }
                                }
                            ]
                       }
                   }]
               }]
           }
       }
   }

    function getAnalyticsNodeSummaryGridConfig(
            pagerOptions) {
        var columns = [
            {
                field:"name",
                id:"name",
                name:"Host name",
                formatter:function(r,c,v,cd,dc) {
                    return cellTemplateLinks({
                        cellText:'name',
                        name:'name',
                        statusBubble:true,
                        rowData:dc});
                },
                exportConfig: {
                    allow: true,
                    advFormatter: function(dc) {
                        return dc.name;
                    }
                },
                events: {
                    // onClick: onClickHostName
                },
                cssClass: 'cell-hyperlink-blue',
                minWidth:110,
                sortable:true
            },
            {
                field:"ip",
                id:"ip",
                name:"IP Address",
                minWidth:110,
                sortable:true,
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
                id:"version",
                name:"Version",
                sortable:true,
                minWidth:110
            },
            {
                field:"status",
                id:"status",
                name:"Status",
                sortable:true,
                formatter:function(r,c,v,cd,dc) {
                    return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'html');
                },
                searchFn:function(d) {
                    return monitorInfraUtils.getNodeStatusContentForSummayPages(d,'text');
                },
                minWidth:110,
                exportConfig: {
                    allow: true,
                    advFormatter: function(dc) {
                        return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,
                            'text');
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
                id:"analyticsCpu",
                name: ctwl.TITLE_CPU,
                formatter:function(r,c,v,cd,dc) {
                    return '<div class="gridSparkline display-inline">' +
                            '</div><span class="display-inline">' +
                            ifNotNumeric(dc['cpu'],'-')  + '</span>';
                },
                asyncPostRender: renderSparkLines,
                searchFn:function(d){
                    return d['cpu'];
                },
                minWidth:120,
                exportConfig: {
                    allow: true,
                    advFormatter: function(dc) {
                        return dc.cpu
                    }
                }
            },
            {
                field:"memory",
                id:"analyticsMem",
                sortable:true,
                name:"Memory",
                minWidth:150,
                sortField:"y"
            },
            {
                field:"genCount",
                id:"genCount",
                sortable:true,
                name:"Generators",
                minWidth:85
            },
            {
                id:"percentileMessagesSize",
                sortable:true,
                name:"95% - Messages",
                minWidth:200,
                formatter:function(r,c,v,cd,dc) {
                    return '<span><b>'+"Count "+
                            '</b></span>' +
                           '<span>' +
                           (dc['percentileMessages']) + '</span>'+'<span><b>'+", Size "+
                            '</b></span>' +
                           '<span>' +
                           (dc['percentileSize']) + '</span>';
                }
            }
        ];
        var gridElementConfig = {
            header : {
                title : {
                    text : ctwl.ANALYTICSNODE_SUMMARY_TITLE
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
                    remote : {
                        ajaxConfig : {
                            url : ctwl.ANALYTICSNODE_SUMMARY
                        }
                    },
                    cacheConfig : {
                        ucid: ctwl.CACHE_ANALYTICSNODE
                    }
                },
                statusMessages: {
                    loading: {
                        text: 'Loading Analytics Nodes..',
                    },
                    empty: {
                        text: 'No Analytics Nodes Found.'
                    }
                }
            }

        };
        return gridElementConfig;
    }

   function getAnalyticsNodeSandeshChartViewConfig(colorFn) {
       return {
           elementId : ctwl.ANALYTICS_CHART_SANDESH_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [{
                   columns : [ $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                       elementId : ctwl.ANALYTICS_CHART_SANDESH_STACKEDBARCHART_ID,
                       viewConfig: {
                           chartOptions: {
                               colors: colorFn,
                               title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                               xAxisLabel: '',
                               yAxisLabel: ctwl.ANALYTICS_CHART_SANDESH_LABEL,
                               groupBy: 'Source',
                               yField: 'SUM(msg_info.messages)',
                           }
                       }
                   })]
               }]
           }
       }

   }

   function getAnalyticsNodeQueriesChartViewConfig(colorFn) {
       return {
           elementId : ctwl.ANALYTICS_CHART_QUERIES_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                       elementId : ctwl.ANALYTICS_CHART_QUERIES_STACKEDBARCHART_ID,
                       viewConfig: {
                           chartOptions: {
                               colors: colorFn,
                               title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                               xAxisLabel: '',
                               yAxisLabel: ctwl.ANALYTICS_CHART_QUERIES_LABEL,
                               groupBy: 'Source',
                               failureCheckFn: function (d) {
                                   if (d['query_stats.error'] != "None") {
                                       return 1;
                                   } else {
                                       return 0;
                                   }
                               },
                           }
                       }
                   })]
               }]
           }
       }

   }

   function getAnalyticsNodeDatabaseUsageChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICS_CHART_DATABASE_READ_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                       elementId : ctwl.ANALYTICS_CHART_DATABASE_READ_STACKEDBARCHART_ID,
                       viewConfig: {
                           chartOptions: {
                               title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                               xAxisLabel: '',
                               yAxisLabel: ctwl.ANALYTICS_CHART_DATABASE_USAGE,
                               yField: 'MAX(database_usage.analytics_db_size_1k)',
                           }
                       }
                   })]
               }]
           }
       }

   }

   function getGeneratorsScatterChartViewConfig() {
       return {
           elementId :"generatorsScatterChartView",
           view : "SectionView",
           viewConfig : {
               rows: [{
                   columns: [{
                       elementId: "generatorsScatterChart",
                       //title: ctwl.VROUTER_SUMMARY_TITLE,
                       view: "ZoomScatterChartView",
                       //app: cowc.APP_CONTRAIL_CONTROLLER,
                       viewConfig: {
                           loadChartInChunks: true,
                           cfDataSource : self.cfDataSource,
                           chartOptions:{
                               sortFn:function(data){
                                   return data.reverse();
                               },
                               fetchDataLabel : false,
                               doBucketize: true,
                               xLabel: 'Bytes (KB)/ min',
                               yLabel: 'Generators (Messages /min)',
                               forceX : [ 0, 1 ],
                               forceY : [ 0, 20 ],
                               margin: {top:5},
                               doBucketize:false,
                             
                               showLegend: false,
                              bubbleCfg : {
                                   defaultMaxValue : monitorInfraConstants.VROUTER_DEFAULT_MAX_THROUGHPUT
                              },
                             
                              tooltipConfigCB: monitorInfraUtils.generatorsTooltipFn,
                              bucketTooltipFn: monitorInfraUtils.generatorsBucketTooltipFn,
                           },
                           
                       }
                   
                   }]
               }]
           }
       }

   }
   function getAnalyticsNodeDatabaseWriteChartViewConfig(colorFn) {
       return {
           elementId : ctwl.ANALYTICS_CHART_DATABASE_WRITE_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {

                   columns : [
                               $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                       elementId : ctwl.ANALYTICS_CHART_DATABASE_WRITE_STACKEDBARCHART_ID,
                       viewConfig: {
                           chartOptions: {
                               colors: colorFn,
                               title: ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                               xAxisLabel: '',
                               yAxisLabel: ctwl.ANALYTICS_CHART_DATABASE_WRITE_LABEL,
                               groupBy: 'Source',
                               failureCheckFn: function (d) {
                                   return d[ctwl.ANALYTICS_CHART_DATABASE_WRITE_FAILS];
                               },
                               yField: ctwl.ANALYTICS_CHART_DATABASE_WRITE,
                           }
                       }
                   })]
               }]
           }
       }

   }
   function getPercentileTextViewConfig() {
       var queryPostData = {
           "autoSort": true,
           "async": false,
           "formModelAttrs": {
            "table_name": "StatTable.SandeshMessageStat.msg_info",
             "table_type": "STAT",
             "query_prefix": "stat",
             "from_time": Date.now() - (2 * 60 * 60 * 1000),
             "from_time_utc": Date.now() - (2 * 60 * 60 * 1000),
             "to_time": Date.now(),
             "to_time_utc": Date.now(),
             "select": "PERCENTILES(msg_info.bytes), PERCENTILES(msg_info.messages)",
             "time_granularity": 30,
             "time_granularity_unit": "mins",
             "limit": "150000"
           },
       };
       return {
           elementId : ctwl.ANALYTICS_CHART_PERCENTILE_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId :ctwl.ANALYTICS_CHART_PERCENTILE_TEXT_VIEW,
                       title : '',
                       view : "PercentileTextView",
                       viewPathPrefix:
                           ctwl.ANALYTICSNODE_VIEWPATH_PREFIX,
                       app : cowc.APP_CONTRAIL_CONTROLLER,
                       viewConfig : {
                              modelConfig : {
                                   remote : {
                                       ajaxConfig : {
                                           url : "/api/qe/query",
                                           type: 'POST',
                                           data: JSON.stringify(queryPostData),
                                           timeout : 120000 //2 mins
                                       },
                                       dataParser : function (response) {
                                           console.log("Hii");
                                           console.log(response);
                                           return monitorInfraParsers.percentileAnalyticsNodeSummaryChart(response['data']);
                                       }
                                   },
                                   cacheConfig : {}
                               },
                       }
                   }]
               }]
           }
       }

   }
   return AnalyticsNodesSummaryChartsView;
});
