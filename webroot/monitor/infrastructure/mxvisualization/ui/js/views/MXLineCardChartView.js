/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define(
        [ 'underscore','contrail-view','contrail-list-model'],
        function(
                _, ContrailView, MXGraphModel) {
            var MXLineCardChartView = ContrailView.extend({
                render : function() {
                    var instanceTrafficStatsTemplate = contrail.getTemplate4Id(ctwc.TMPL_TRAFFIC_STATS_TAB),
                        viewConfig = this.attributes.viewConfig;
                        lineChartConfig = {
                            modelConfig: {
                                remote: {
                                    ajaxConfig: {
                                        url : ctwl.MX_LINECARDSTATS_URL,
                                        type: 'GET'
                                    },
                                },
                           },
                            widgetConfig: viewConfig.widgetConfig,
                            parseFn: function (response) {
                                return response;
                            }
                        };
                    this.renderView4Config(this.$el, null,
                            getMXLineCardChartViewConfig(lineChartConfig));
                }
            });
            function getMXLineCardChartViewConfig(lineChartConfig) {
                return {
                    elementId: ctwc.MX_LINECARDS_STAT_TAB_ID,
                    title: ctwl.TITLE_LINECARDS,
                    view: "LineWithFocusChartView",
                    viewConfig: lineChartConfig,
                };
            }
            return MXLineCardChartView;
        });
