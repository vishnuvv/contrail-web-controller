/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view','monitor-infra-analyticsnode-model' ],
        function(
                _, ContrailView, AnalyticsNodeListModel) {
            var AnalyticsNodeListView = ContrailView.extend({
                render : function() {
                    var analyticsNodeListModel = new AnalyticsNodeListModel();
                    this.renderView4Config(this.$el, analyticsNodeListModel,
                            getAnalyticsNodeListViewConfig());
                }
            });
            
            function getAnalyticsNodeListViewConfig() {
                return {
                    elementId : cowu.formatElementId([ 
                         ctwl.ANALYTICSNODE_SUMMARY_LIST_SECTION_ID ]),
                    view : "SectionView",
                    viewConfig : {
                        rows : [
                            {
                                columns : [{
                                    elementId : 
                                        ctwl.ANALYTICSNODE_SUMMARY_CHART_ID,
                                    title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                    view : "AnalyticsNodeScatterChartView",
                                    app : cowc.APP_CONTRAIL_CONTROLLER,
                                }]
                            },
                            {
                                columns : [{
                                    elementId : 
                                        ctwl.ANALYTICSNODE_SUMMARY_GRID_ID,
                                    title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                                    view : "AnalyticsNodeGridView",
                                    app : cowc.APP_CONTRAIL_CONTROLLER,
                                    viewConfig : {
                                        
                                    }
                                }]
                            } 
                        ]
                    }
                };
            }
            ;

            function onScatterChartClick(
                    chartConfig) {
                var analyticsNodeName = chartConfig.name, hashObj = {
                    node : analyticsNodeName,
                    tab : ''
                };

                layoutHandler.setURLHashParams(hashObj, {
                    p : "monitor_infra_analytics",
                    merge : false,
                    triggerHashChange : true
                });
            }
            ;

            function getAnalyticsNodeTooltipConfig(
                    data) {
                var databaseNode = data.rawData;

                var tooltipConfig = {
                    title : {
                        name : data.name,
                        type : 'Analytics Node'
                    },
                    content : {
                        iconClass : false,
                        info : [
                                {
                                    label : 'Version',
                                    value : databaseNode.version
                                },
                                {
                                    label : 'CPU',
                                    value : databaseNode.cpu,
                                },
                                {
                                    label : 'Memory',
                                    value : databaseNode.memory,
                                }],
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
            }
            ;

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
            }
            ;

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
            }
            ;

            return AnalyticsNodeListView;
        });