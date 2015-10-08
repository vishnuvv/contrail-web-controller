/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
], function (_, ContrailView) {
    var DatabaseNodeDetailsCollectorLineChartView = ContrailView.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var self = this;

            self.renderView4Config(this.$el, this.model,
                    getDatabaseNodeDetailLineChartViewConfig(viewConfig));
        }
    });
    
    var getDatabaseNodeDetailLineChartViewConfig = function (viewConfig, endTime) {

//        var hostname = viewConfig['hostname'];

        return {
            elementId: ctwl.DATABASENODE_DETAILS_CHART_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwl.DATABASENODE_DETAILS_LINE_CHART_ID,
                                view: "LineBarWithFocusChartView",
                                viewConfig: {
//                                    modelConfig: getNodeCPUMemModelConfig(hostname, endTime),
                                    parseFn: function (response) {
                                        var dimensions = ['database_usage.disk_space_used_1k', 'database_usage.analytics_db_size_1k'];
                                        var options = {dimensions:dimensions}
                                        return ctwp.parseCPUMemLineChartDataForNodeDetails(response,options);
                                    },
                                    chartOptions: {
                                        forceY1: [0, 1]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
    
    return DatabaseNodeDetailsCollectorLineChartView;
});