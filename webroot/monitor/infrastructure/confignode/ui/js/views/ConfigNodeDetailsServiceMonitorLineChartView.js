/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
], function (_, ContrailView) {
    var ConfigNodeDetailsServiceMonitorLineChartView = ContrailView.extend({
        el: $(contentContainer),

        render: function (viewConfig) {
            var self = this;

            self.renderView4Config(this.$el, this.model,
                    getConfigNodeDetailLineChartViewConfig(viewConfig));
        }
    });
    
    var getConfigNodeDetailLineChartViewConfig = function (viewConfig, endTime) {

//        var hostname = viewConfig['hostname'];

        return {
            elementId: ctwl.CONFIGNODE_DETAILS_SERVICE_MONITOR_CHART_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwl.CONFIGNODE_DETAILS_SERVICE_MONITOR_LINE_CHART_ID,
                                view: "LineBarWithFocusChartView",
                                viewConfig: {
//                                    modelConfig: getNodeCPUMemModelConfig(hostname, endTime),
                                    parseFn: function (response) {
                                        var dimensions = ['cpu_info.cpu_share', 'cpu_info.mem_res'];
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
    
    return ConfigNodeDetailsServiceMonitorLineChartView;
});