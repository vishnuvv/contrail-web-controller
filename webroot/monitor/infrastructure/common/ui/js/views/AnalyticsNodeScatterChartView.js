/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view'],function(_, ContrailView){
   var AnalyticsNodeScatterChartView = ContrailView.extend({
                                       render : function (){
                                           this.renderView4Config(this.$el, 
                                           this.model, 
                                           getConfigNodeScatterChartViewConfig()
                                           );
                                       }
                                    });
   
   function getConfigNodeScatterChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICSNODE_SUMMARY_SCATTERCHART_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : ctwl.ANALYTICSNODE_SUMMARY_SCATTERCHART_ID,
                       title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                       view : "ZoomScatterChartView",
                       viewConfig : {
                           loadChartInChunks : true,
                           chartOptions : {
                               xLabel : 'CPU (%)',
                               yLabel : 'Memory (MB)',
                               forceX : [ 0, 1 ],
                               forceY : [ 0, 20 ],
                               dataParser : function(
                                       response) {
                                   var chartDataValues = [ ];
                                   for ( var i = 0; i < response.length; i++) {
                                       var analyticsNode = response[i];
                                       chartDataValues
                                           .push({
                                               name : analyticsNode['name'],
                                               y : analyticsNode['y'],
                                               x : contrail.handleIfNull(
                                                   analyticsNode['x'],
                                                   0),
                                               color : analyticsNode['color'],
                                               size : contrail.handleIfNull(
                                                   analyticsNode['size'],
                                                   0),
                                               rawData : analyticsNode
                                           });
                                   }
                                   return chartDataValues;
                               },
                               tooltipConfigCB : getClusterTooltipConfig,
                               clickCB : onScatterChartClick
                           }
                       }
                   } ]
               } ]
           }
       };
       
       function onScatterChartClick(
               chartConfig) {
           var analyticsNode = chartConfig.name, hashObj = {
               node : clusterID,
               tab : ''
           };

           layoutHandler.setURLHashParams(hashObj, {
               p : "mon_infra_analytics",
               merge : false,
               triggerHashChange : true
           });
       };

       function getClusterTooltipConfig(
               data) {
           var analyticsNode = data.rawData;
           var tooltipData = [
                              {
                                  label : 'Version',
                                  value : analyticsNode.version
                              },
                              {
                                  label : 'CPU',
                                  value : analyticsNode.cpu,
                              },
                              {
                                  label : 'Memory',
                                  value : analyticsNode.memory,
                              }];          
           var tooltipAlerts = monitorInfraUtils.getTooltipAlerts(analyticsNode);
           tooltipData = tooltipData.concat(tooltipAlerts);
           var tooltipConfig = {
               title : {
                   name : data.name,
                   type : 'Analytics Node'
               },
               content : {
                   iconClass : false,
                   info : tooltipData,
                   actions : [ {
                       type : 'link',
                       text : 'View',
                       iconClass : 'icon-external-link',
                       callback : function(
                               data) {
                           var nodeName = data.name, hashObj = {
                               node : nodeName,
                               tab : ''
                           };
                           layoutHandler.setURLHashParams(hashObj, {
                               p : "mon_infra_analytics",
                               merge : false,
                               triggerHashChange : true
                           });
                       }
                   } ]
               },
               delay : cowc.TOOLTIP_DELAY
           };

           return tooltipConfig;
       };

       function getControlPanelFilterConfig() {
           return {
               groups : [ {
                   id : 'by-node-color',
                   title : 'By Node Color',
                   type : 'radio',
                   items : [ {
                       text : 'Filter 1',
                       labelCssClass : 'okay',
                       events : {
                           click : function(
                                   event) {
                               console.log('Filter 1');
                           }
                       }
                   }, {
                       text : 'Filter 2',
                       labelCssClass : 'medium',
                       events : {
                           click : function(
                                   event) {
                               console.log('Filter 2');
                           }
                       }
                   } ]
               } ]
           };
       };

       function getControlPanelLegendConfig() {
           return {
               groups : [ {
                   id : 'by-node-color',
                   title : 'Cluster Color',
                   items : [ {
                       text : 'Provisioned Server = Total Servers',
                       labelCssClass : 'icon-circle okay',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   }, {
                       text : 'Provisioned Server != Total Servers',
                       labelCssClass : 'icon-circle medium',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   } ]
               }, {
                   id : 'by-node-size',
                   title : 'Cluster Size',
                   items : [ {
                       text : 'Total Network Traffic',
                       labelCssClass : 'icon-circle',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   } ]
               } ]
           };
       };
   }
   return AnalyticsNodeScatterChartView;
});