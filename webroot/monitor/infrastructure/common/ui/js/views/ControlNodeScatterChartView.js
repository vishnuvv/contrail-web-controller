/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view'],function(_, ContrailView){
   var ControlNodeScatterChartView = ContrailView.extend({
                                       render : function (){
                                           this.renderView4Config(this.$el, 
                                           this.model, 
                                           getControlNodeScatterChartViewConfig()
                                           );
                                       }
                                    });
   
   function getControlNodeScatterChartViewConfig() {
       return {
           elementId : ctwl.CONTROLNODE_SUMMARY_SCATTERCHART_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : ctwl.CONTROLNODE_SUMMARY_SCATTERCHART_ID,
                       title : ctwl.CONTROLNODE_SUMMARY_TITLE,
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
                                       var controlNode = response[i];

                                       chartDataValues
                                               .push({
                                                   name : controlNode['name'],
                                                   y : controlNode['y'],
                                                   x : contrail.handleIfNull(
                                                       controlNode['x'],
                                                       0),
                                                   color : controlNode['color'],
                                                   size : contrail.handleIfNull(
                                                       controlNode['size'],
                                                       0),
                                                   rawData : controlNode
                                               });
                                   }
                                   return chartDataValues;
                               },
                               tooltipConfigCB : getControlNodeTooltipConfig,
                               clickCB : onScatterChartClick
                           }
                       }
                   } ]
               } ]
           }
       };
       
       function onScatterChartClick(
               chartConfig) {
           var controlNodeName = chartConfig.name, hashObj = {
               name : controlNodeName,
               tab : ''
           };

           layoutHandler.setURLHashParams(hashObj, {
               p : "monitor_infra_control",
               merge : false,
               triggerHashChange : true
           });
       };

       function getControlNodeTooltipConfig(
               data) {
           var controlNode = data.rawData;
           var tooltipData = [
                              {
                                  label : 'Version',
                                  value : controlNode.version
                              },
                              {
                                  label : 'CPU',
                                  value : controlNode.cpu,
                              },
                              {
                                  label : 'Memory',
                                  value : controlNode.memory,
                              }];          
           var tooltipAlerts = monitorInfraUtils.getTooltipAlerts(controlNode);
           tooltipData = tooltipData.concat(tooltipAlerts);
           var tooltipConfig = {
               title : {
                   name : data.name,
                   type : 'Control Node'
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
                               node : nodeName
                           };
                           layoutHandler.setURLHashParams(hashObj, {
                               p : "mon_infra_control",
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
   return ControlNodeScatterChartView;
});