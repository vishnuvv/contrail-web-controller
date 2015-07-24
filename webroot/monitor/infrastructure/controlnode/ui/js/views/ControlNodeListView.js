/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'underscore', 'contrail-view', 'monitor-infra-controlnode-model'],
        function(
                _, ContrailView, ControlNodeListModel) {
            var ControlNodeListView = ContrailView.extend({
                render : function() {
                    var controlNodeListModel = new ControlNodeListModel();
                    this.renderView4Config(this.$el, controlNodeListModel,
                            getControlNodeListViewConfig());
                }
            });
            
            function getControlNodeListViewConfig() {
                return {
                    elementId : cowu.formatElementId([ 
                         ctwl.CONTROLNODE_SUMMARY_LIST_SECTION_ID ]),
                    view : "SectionView",
                    viewConfig : {
                        rows : [{
                                    columns : [{
                                        elementId : 
                                            ctwl.CONTROLNODE_SUMMARY_CHART_ID,
                                        title : ctwl.CONTROLNODE_SUMMARY_TITLE,
                                        view : "ControlNodeScatterChartView",
                                        app : cowc.APP_CONTRAIL_CONTROLLER,
                                            }]
                                },
                                {
                                    columns : [ {
                                        elementId : 
                                            ctwl.CONTROLNODE_SUMMARY_GRID_ID,
                                        title : ctwl.CONTROLNODE_SUMMARY_TITLE,
                                        view : "ControlNodeGridView",
                                        app : cowc.APP_CONTRAIL_CONTROLLER,
                                        viewConfig : {
                                            
                                        }
                                    } ]
                                }]
                    }
                };
            };
        return ControlNodeListView;
    });