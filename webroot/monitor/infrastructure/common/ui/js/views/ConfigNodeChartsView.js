/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'legend-view',
        'monitor-infra-confignode-charts-model'],
        function(_, ContrailView, LegendView, ConfigNodeChartsModel){
   var ConfigNodeChartView = ContrailView.extend({
        render : function (){
            var self = this,
                viewConfig = self.attributes.viewConfig,
                colorFn = viewConfig['colorFn'];
            //var chartModel = new ConfigNodeChartsModel();
            //self.renderView4Config(self.$el, chartModel,
              //      getConfigNodeChartViewConfig(colorFn));
            self.$el.append($("<div class='gs-container'></div>"));
            self.renderView4Config(self.$el.find('.gs-container'),{},getGridStackWidgetConfig(colorFn));
        }
    });

   function getGridStackWidgetConfig(colorFn) {
       var chartModel = new ConfigNodeChartsModel();  
       return {
           elementId : 'configGridStackSection',
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
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
                               }, {
                                   modelCfg: {
                                       remote : {
                                           ajaxConfig : {
                                               url : "/api/qe/query",
                                               type: 'POST',
                                               data: JSON.stringify({
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
                                               }),
                                               timeout : 120000 //2 mins
                                           },
                                           dataParser : function (response) {
                                               return monitorInfraParsers.percentileAnalyticsNodeSummaryChart(response['data']);
                                           }
                                       },
                                       cacheConfig : {}
                                   },
                                   viewCfg: {
                                       elementId :ctwl.ANALYTICS_CHART_PERCENTILE_TEXT_VIEW,
                                       title : '',
                                       view : "PercentileTextView",
                                       viewPathPrefix:
                                           ctwl.ANALYTICSNODE_VIEWPATH_PREFIX,
                                   },
                                   itemAttr: {
                                       height: 2
                                   }
                               }
                           ]
                       }
                   }]
               }]
           }
       };

   }
   return ConfigNodeChartView;
});
