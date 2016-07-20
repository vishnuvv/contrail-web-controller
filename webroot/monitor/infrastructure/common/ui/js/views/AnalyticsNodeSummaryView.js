/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view',
       'monitor-infra-analytics-sandesh-chart-model', 'monitor-infra-analytics-queries-chart-model', 'monitor-infra-analytics-database-read-write-chart-model'],function(_, ContrailView,AnalyticsNodeSandeshChartModel, AnalyticsNodeQueriesChartModel, AnalyticsNodeDataBaseReadWriteChartModel){
        var AnalyticsNodeScatterChartView = ContrailView.extend({
        render : function (){
            var anlyticsTemplate = contrail.getTemplate4Id(
                    cowc.TMPL_4COLUMN__2ROW_CONTENT_VIEW);
            var self = this;
            this.$el.html(anlyticsTemplate);
            
            var topleftColumn = this.$el.find(".top-container .left-column");
            var toprightCoulmn = this.$el.find(".top-container .right-column");
            var bottomleftColumn = this.$el.find(".bottom-container .left-column");
            var bottomrightCoulmn = this.$el.find(".bottom-container .right-column");
            var sandeshModel = new AnalyticsNodeSandeshChartModel();
            var queriesModel = new AnalyticsNodeQueriesChartModel();
            var databseReadWritemodel = new AnalyticsNodeDataBaseReadWriteChartModel();
            
            self.renderView4Config(topleftColumn,  sandeshModel,
                    getAnalyticsNodeSandeshChartViewConfig());
            
            self.renderView4Config(toprightCoulmn,  queriesModel,
                    getAnalyticsNodeQueriesChartViewConfig());
            
            self.renderView4Config(bottomleftColumn,  databseReadWritemodel,
                    getAnalyticsNodeDatabaseReadChartViewConfig());
            
            self.renderView4Config(bottomrightCoulmn,  databseReadWritemodel,
                    getAnalyticsNodeDatabaseWriteChartViewConfig());

        }
    });

   function getAnalyticsNodeSandeshChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICS_CHART_SANDESH_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   
                   columns : [ {
                       elementId : ctwl.ANALYTICS_CHART_SANDESH_STACKEDBARCHART_ID,
                       view : "StackedBarChartWithFocusView",
                       viewConfig : {
                           widgetConfig: {
                               elementId: ctwl.ANALYTICS_CHART_SANDESH_STACKEDBARCHART_ID + '-widget',
                               view: "WidgetView",
                               viewConfig: {
                                  /* header: {
                                       title: 'Response Statistics',
                                   },*/
                                   controls: {
                                       top: {
                                           default: {
                                               collapseable: false
                                           }
                                       }
                                   }
                               }
                           },
                           class: 'confignode-chart marginLeft',
                           chartOptions:{
                               brush: false,
                               height: 230,
                               xAxisLabel: '',
                               yAxisLabel: 'Sandesh messages',
                               yAxisOffset: 25,
                               axisLabelFontSize: 11,
                               tickPadding: 8,
                               margin: {
                                   left: 40,
                                   top: 35,
                                   right: 0,
                                   bottom: 40
                               },
                               bucketSize: monitorInfraConstants.CONFIGNODESTATS_BUCKET_DURATION/(1000 * 1000 * 60),//converting to minutes
                               sliceTooltipFn: function (data) {
                                   var tooltipConfig = {},
                                       time = data['time'];
                                       tooltipConfig['title'] = {
                                               name : data['name'],
                                               type: 'Analytic Nodes'
                                       };
                                       tooltipConfig['content'] = {
                                           iconClass : false,
                                           info : [{
                                               label: 'Time',
                                               value: time
                                           },{
                                               label: 'Sandesh Messages',
                                               value: ifNull(data['msgCnt'], '-')
                                           }
                                           ]
                                       };
                                   var tooltipElementTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP),
                                   tooltipElementTitleTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_TITLE),
                                   tooltipElementContentTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_CONTENT),
                                   tooltipElementObj, tooltipElementTitleObj, tooltipElementContentObj;

                                   tooltipConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ELEMENT_TOOLTIP, tooltipConfig);

                                   tooltipElementObj = $(tooltipElementTemplate(tooltipConfig));
                                   tooltipElementTitleObj = $(tooltipElementTitleTemplate(tooltipConfig.title));
                                   tooltipElementContentObj = $(tooltipElementContentTemplate(tooltipConfig.content));

                                   tooltipElementObj.find('.popover-title').append(tooltipElementTitleObj);
                                   tooltipElementObj.find('.popover-content').append(tooltipElementContentObj);
                                   return $(tooltipElementObj).wrapAll('<div>').parent().html();
                               },
                               showLegend: true,
                               legendFn: function (data, container, chart) {
                                  // console.log(data);
                                   if (container != null && $(container).find('svg') != null
                                       && data != null && data.length > 0) {
                                       var colorCodes = data[0]['colorCodes'];
                                       var svg = $(container).find('svg');
                                       var width = parseInt($(svg).css('width') || svg.getBBox()['width']);
                                       var legendWrap = d3.select($(svg)[0]).append('g')
                                              .attr('class','legend-wrap')
                                              .attr('transform','translate('+width+',0)')
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-stackedbar',
                                           data: colorCodes,
                                           //offset: 70,
                                           colors: colorCodes,
                                           label: 'Analytics Node',
                                       });
                                   }
                               }
                           },
                           parseFn: function (response) {
                               //console.log(response);
                               return monitorInfraParsers.parseSandeshMessageRequestsStackChartData(response);
                           }
                       }
                   }]
               }]
           }
       }

   }
   
   function getAnalyticsNodeQueriesChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICS_CHART_QUERIES_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   
                   columns : [ {
                       elementId : ctwl.ANALYTICS_CHART_QUERIES_STACKEDBARCHART_ID,
                       view : "StackedBarChartWithFocusView",
                       viewConfig : {
                           widgetConfig: {
                               elementId: ctwl.ANALYTICS_CHART_QUERIES_STACKEDBARCHART_ID + '-widget',
                               view: "WidgetView",
                               viewConfig: {
                                  /* header: {
                                       title: 'Response Statistics',
                                   },*/
                                   controls: {
                                       top: {
                                           default: {
                                               collapseable: false
                                           }
                                       }
                                   }
                               }
                           },
                           class: 'confignode-chart marginLeft',
                           chartOptions:{
                               brush: false,
                               height: 230,
                               xAxisLabel: '',
                               yAxisLabel: 'Queries',
                               yAxisOffset: 25,
                               axisLabelFontSize: 11,
                               tickPadding: 8,
                               margin: {
                                   left: 40,
                                   top: 35,
                                   right: 0,
                                   bottom: 40
                               },
                               bucketSize: monitorInfraConstants.CONFIGNODESTATS_BUCKET_DURATION/(1000 * 1000 * 60),//converting to minutes
                              sliceTooltipFn: function (data) {
                                  var tooltipConfig = {},
                                  time = data['time'];
                              if (data['name'] != monitorInfraConstants.CONFIGNODE_FAILEDREQUESTS_TITLE) {
                                  tooltipConfig['title'] = {
                                      name : data['name'],
                                      type : 'Analytics Node'
                                  };
                                  tooltipConfig['content'] = {
                                      iconClass : false,
                                      info : [{
                                          label: 'Time',
                                          value: time
                                      }, {
                                          label: 'Queries',
                                          value: ifNull(data['nodeReqCnt'], '-')
                                      }, {
                                          label: 'Failed Requests (%)',
                                          value: ifNull(data['reqFailPercent'], '-')
                                      }]
                                  };
                              } else {
                                  tooltipConfig['title'] = {
                                          name : data['name'],
                                          type: 'Analytics'
                                  };
                                  tooltipConfig['content'] = {
                                      iconClass : false,
                                      info : [{
                                          label: 'Time',
                                          value: time
                                      },{
                                          label: 'Total Requests',
                                          value: ifNull(data['totalReqs'], '-')
                                      }, {
                                          label: 'Failed Requests',
                                          value: ifNull(data['totalFailedReq'], '-')
                                      }]
                                  };
                              }
                              var tooltipElementTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP),
                              tooltipElementTitleTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_TITLE),
                              tooltipElementContentTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_CONTENT),
                              tooltipElementObj, tooltipElementTitleObj, tooltipElementContentObj;

                              tooltipConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ELEMENT_TOOLTIP, tooltipConfig);

                              tooltipElementObj = $(tooltipElementTemplate(tooltipConfig));
                              tooltipElementTitleObj = $(tooltipElementTitleTemplate(tooltipConfig.title));
                              tooltipElementContentObj = $(tooltipElementContentTemplate(tooltipConfig.content));

                              tooltipElementObj.find('.popover-title').append(tooltipElementTitleObj);
                              tooltipElementObj.find('.popover-content').append(tooltipElementContentObj);
                              return $(tooltipElementObj).wrapAll('<div>').parent().html();
                          },
                               showLegend: true,
                               legendFn: function (data, container, chart) {
                                   //console.log(data);
                                   if (container != null && $(container).find('svg') != null
                                       && data != null && data.length > 0) {
                                       var colorCodes = data[0]['colorCodes'];
                                       var svg = $(container).find('svg');
                                       var width = parseInt($(svg).css('width') || svg.getBBox()['width']);
                                       var legendWrap = d3.select($(svg)[0]).append('g')
                                              .attr('class','legend-wrap')
                                              .attr('transform','translate('+width+',0)')
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-error',
                                           data: [data],
                                           offset: -10,
                                           colors: monitorInfraConstants.CONFIGNODE_FAILEDREQUESTS_COLOR,
                                           label: 'Failures',
                                       });
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-stackedbar',
                                           data: colorCodes,
                                           offset: 70,
                                           colors: colorCodes,
                                           label: 'Analytics Node',
                                       });
                                   }
                               }
                           },
                           parseFn: function (response) {
                               //console.log(response);
                               return monitorInfraParsers.parseAnlyticsQueriesChartData(response);
                           }
                       }
                   }]
               }]
           }
       }

   }
   
   function getAnalyticsNodeDatabaseReadChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICS_CHART_DATABASE_READ_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   
                   columns : [ {
                       elementId : ctwl.ANALYTICS_CHART_DATABASE_READ_STACKEDBARCHART_ID,
                       view : "StackedBarChartWithFocusView",
                       viewConfig : {
                           widgetConfig: {
                               elementId: ctwl.ANALYTICS_CHART_DATABASE_READ_STACKEDBARCHART_ID + '-widget',
                               view: "WidgetView",
                               viewConfig: {
                                  /* header: {
                                       title: 'Response Statistics',
                                   },*/
                                   controls: {
                                       top: {
                                           default: {
                                               collapseable: false
                                           }
                                       }
                                   }
                               }
                           },
                           class: 'confignode-chart marginLeft',
                           chartOptions:{
                               brush: false,
                               height: 230,
                               xAxisLabel: '',
                               yAxisLabel: 'DB Writes',
                               yAxisOffset: 25,
                               axisLabelFontSize: 11,
                               tickPadding: 8,
                               margin: {
                                   left: 40,
                                   top: 35,
                                   right: 0,
                                   bottom: 40
                               },
                               bucketSize: monitorInfraConstants.CONFIGNODESTATS_BUCKET_DURATION/(1000 * 1000 * 60),//converting to minutes
                               sliceTooltipFn: function (data) {
                                   var tooltipConfig = {},
                                   time = data['time'];
                               if (data['name'] != monitorInfraConstants.CONFIGNODE_FAILEDREQUESTS_TITLE) {
                                   tooltipConfig['title'] = {
                                       name : data['name'],
                                       type : 'Analytics Node'
                                   };
                                   tooltipConfig['content'] = {
                                       iconClass : false,
                                       info : [{
                                           label: 'Time',
                                           value: time
                                       }, {
                                           label: 'DB Writes',
                                           value: ifNull(data['nodeReqCnt'], '-')
                                       }, {
                                           label: 'Failed Requests (%)',
                                           value: ifNull(data['reqFailPercent'], '-')
                                       }]
                                   };
                               } else {
                                   tooltipConfig['title'] = {
                                           name : data['name'],
                                           type: 'Analytics'
                                   };
                                   tooltipConfig['content'] = {
                                       iconClass : false,
                                       info : [{
                                           label: 'Time',
                                           value: time
                                       },{
                                           label: 'Total Requests',
                                           value: ifNull(data['totalReqs'], '-')
                                       }, {
                                           label: 'Failed Requests',
                                           value: ifNull(data['totalFailedReq'], '-')
                                       }]
                                   };
                               }
                               var tooltipElementTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP),
                               tooltipElementTitleTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_TITLE),
                               tooltipElementContentTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_CONTENT),
                               tooltipElementObj, tooltipElementTitleObj, tooltipElementContentObj;

                               tooltipConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ELEMENT_TOOLTIP, tooltipConfig);

                               tooltipElementObj = $(tooltipElementTemplate(tooltipConfig));
                               tooltipElementTitleObj = $(tooltipElementTitleTemplate(tooltipConfig.title));
                               tooltipElementContentObj = $(tooltipElementContentTemplate(tooltipConfig.content));

                               tooltipElementObj.find('.popover-title').append(tooltipElementTitleObj);
                               tooltipElementObj.find('.popover-content').append(tooltipElementContentObj);
                               return $(tooltipElementObj).wrapAll('<div>').parent().html();
                           },
                               showLegend: true,
                               legendFn: function (data, container, chart) {
                                   if (container != null && $(container).find('svg') != null
                                       && data != null && data.length > 0) {
                                       var colorCodes = data[0]['colorCodes'];
                                       var svg = $(container).find('svg');
                                       var width = parseInt($(svg).css('width') || svg.getBBox()['width']);
                                       var legendWrap = d3.select($(svg)[0]).append('g')
                                              .attr('class','legend-wrap')
                                              .attr('transform','translate('+width+',0)')
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-error',
                                           data: [data],
                                           offset: -10,
                                           colors: monitorInfraConstants.CONFIGNODE_FAILEDREQUESTS_COLOR,
                                           label: 'Failures',
                                       });
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-stackedbar',
                                           data: colorCodes,
                                           offset: 70,
                                           colors: colorCodes,
                                           label: 'Analytics Node',
                                       });
                                   }
                               }
                           },
                           parseFn: function (response) {
                               var databasereqfailed = 'table_info.read_fails';
                               var databasereqdata = 'table_info.reads';
                               return monitorInfraParsers.parseAnlyticsNodeDataBaseReadWriteChartData(response, databasereqfailed, databasereqdata);
                           }
                       }
                   }]
               }]
           }
       }

   }
   
   function getAnalyticsNodeDatabaseWriteChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICS_CHART_DATABASE_WRITE_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   
                   columns : [ {
                       elementId : ctwl.ANALYTICS_CHART_DATABASE_WRITE_STACKEDBARCHART_ID,
                       view : "StackedBarChartWithFocusView",
                       viewConfig : {
                           widgetConfig: {
                               elementId: ctwl.ANALYTICS_CHART_DATABASE_WRITE_STACKEDBARCHART_ID + '-widget',
                               view: "WidgetView",
                               viewConfig: {
                                  /* header: {
                                       title: 'Response Statistics',
                                   },*/
                                   controls: {
                                       top: {
                                           default: {
                                               collapseable: false
                                           }
                                       }
                                   }
                               }
                           },
                           class: 'confignode-chart marginLeft',
                           chartOptions:{
                               brush: false,
                               height: 230,
                               xAxisLabel: '',
                               yAxisLabel: 'DB Reads',
                               yAxisOffset: 25,
                               axisLabelFontSize: 11,
                               tickPadding: 8,
                               margin: {
                                   left: 40,
                                   top: 35,
                                   right: 0,
                                   bottom: 40
                               },
                               bucketSize: monitorInfraConstants.CONFIGNODESTATS_BUCKET_DURATION/(1000 * 1000 * 60),//converting to minutes
                               sliceTooltipFn: function (data) {
                                   var tooltipConfig = {},
                                   time = data['time'];
                               if (data['name'] != monitorInfraConstants.CONFIGNODE_FAILEDREQUESTS_TITLE) {
                                   tooltipConfig['title'] = {
                                       name : data['name'],
                                       type : 'Analytics Node'
                                   };
                                   tooltipConfig['content'] = {
                                       iconClass : false,
                                       info : [{
                                           label: 'Time',
                                           value: time
                                       }, {
                                           label: 'DB Reads',
                                           value: ifNull(data['nodeReqCnt'], '-')
                                       }, {
                                           label: 'Failed Requests (%)',
                                           value: ifNull(data['reqFailPercent'], '-')
                                       }]
                                   };
                               } else {
                                   tooltipConfig['title'] = {
                                           name : data['name'],
                                           type: 'Analytics'
                                   };
                                   tooltipConfig['content'] = {
                                       iconClass : false,
                                       info : [{
                                           label: 'Time',
                                           value: time
                                       },{
                                           label: 'Total Requests',
                                           value: ifNull(data['totalReqs'], '-')
                                       }, {
                                           label: 'Failed Requests',
                                           value: ifNull(data['totalFailedReq'], '-')
                                       }]
                                   };
                               }
                               var tooltipElementTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP),
                               tooltipElementTitleTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_TITLE),
                               tooltipElementContentTemplate = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_CONTENT),
                               tooltipElementObj, tooltipElementTitleObj, tooltipElementContentObj;

                               tooltipConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ELEMENT_TOOLTIP, tooltipConfig);

                               tooltipElementObj = $(tooltipElementTemplate(tooltipConfig));
                               tooltipElementTitleObj = $(tooltipElementTitleTemplate(tooltipConfig.title));
                               tooltipElementContentObj = $(tooltipElementContentTemplate(tooltipConfig.content));

                               tooltipElementObj.find('.popover-title').append(tooltipElementTitleObj);
                               tooltipElementObj.find('.popover-content').append(tooltipElementContentObj);
                               return $(tooltipElementObj).wrapAll('<div>').parent().html();
                           },
                               showLegend: true,
                               legendFn: function (data, container, chart) {
                                   //console.log(data);
                                   if (container != null && $(container).find('svg') != null
                                       && data != null && data.length > 0) {
                                       var colorCodes = data[0]['colorCodes'];
                                       var svg = $(container).find('svg');
                                       var width = parseInt($(svg).css('width') || svg.getBBox()['width']);
                                       var legendWrap = d3.select($(svg)[0]).append('g')
                                              .attr('class','legend-wrap')
                                              .attr('transform','translate('+width+',0)')
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-error',
                                           data: [data],
                                           offset: -10,
                                           colors: monitorInfraConstants.CONFIGNODE_FAILEDREQUESTS_COLOR,
                                           label: 'Failures',
                                       });
                                       monitorInfraUtils.addLegendToSummaryPageCharts({
                                           container: legendWrap,
                                           cssClass: 'contrail-legend-stackedbar',
                                           data: colorCodes,
                                           offset: 70,
                                           colors: colorCodes,
                                           label: 'Analytics Node',
                                       });
                                   }
                               }
                           },
                           parseFn: function (response) {
                               //console.log(response);
                               var databasereqfailed = 'table_info.write_fails';
                               var databasereqdata = 'table_info.writes';
                               return monitorInfraParsers.parseAnlyticsNodeDataBaseReadWriteChartData(response, databasereqfailed, databasereqdata);
                           }
                       }
                   }]
               }]
           }
       }

   }
   return AnalyticsNodeScatterChartView;
});
