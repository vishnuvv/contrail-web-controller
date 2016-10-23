/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view',
       'monitor-infra-analyticsnode-model',
       'monitor-infra-analytics-sandesh-chart-model',
       'monitor-infra-analytics-queries-chart-model',
       'monitor-infra-analytics-database-read-write-chart-model',
       'monitor-infra-analytics-database-usage-model','gs-view'],
       function(_, ContrailView,AnalyticsNodeListModel,AnalyticsNodeSandeshChartModel,
            AnalyticsNodeQueriesChartModel, AnalyticsNodeDataBaseReadWriteChartModel,
            AanlyticsNodeDatabaseUsageModel,GridStackView){
        var AnalyticsNodesSummaryChartsView = ContrailView.extend({
        render : function (){
            var self = this,
                viewConfig = self.attributes.viewConfig,
                colorFn = viewConfig['colorFn'];

            self.$el.append($("<div class='gs-container'></div>"));
            self.renderView4Config(self.$el.find('.gs-container'),{},getGridStackWidgetConfig(colorFn));

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
                       elementId : 'analytics-node-grid-stackview-0',
                       view : "GridStackView",
                       viewConfig : {
                            gridAttr : {
                                defaultWidth : 6,
                                defaultHeight : 8
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
                                        height:0.25
                                    }
                                },
                                {
                                    modelCfg: sandeshModel,
                                    viewCfg: getAnalyticsNodeSandeshChartViewConfig(colorFn)
                                },
                                {
                                    modelCfg: queriesModel,
                                    viewCfg: getAnalyticsNodeQueriesChartViewConfig(colorFn)
                                },
                                /*{
                                    modelCfg: monitorInfraUtils.getStatsModelConfig({
                                        table_name: 'StatTable.SandeshMessageStat.msg_info',
                                        select: 'Source,name, T=, SUM(msg_info.messages),SUM(msg_info.bytes)',
                                        parser: monitorInfraParsers.generatorsChartsParseData
                                    }),
                                    viewCfg: getGeneratorsScatterChartViewConfig()
                                },*/
                                {
                                    modelCfg: dbUsageModel,
                                    viewCfg: getAnalyticsNodeDatabaseUsageChartViewConfig(colorFn)
                                },

                                {
                                    modelCfg: databseReadWritemodel,
                                    viewCfg: getAnalyticsNodeDatabaseWriteChartViewConfig(colorFn),
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
                   }]
               }]
           }
       }
   }

   return AnalyticsNodesSummaryChartsView;
});
