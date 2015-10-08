/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
], function (_, ContrailView) {
    var VRouterDetailsSystemLineChartView = ContrailView.extend({
//        el: $(contentContainer),

        render: function (viewConfig) {
            var self = this;

            self.renderView4Config(this.$el, this.model,
                    getVRouterDetailLineChartViewConfig(viewConfig));
        }
    });
    
    var getVRouterDetailLineChartViewConfig = function (viewConfig, endTime) {

//        var hostname = viewConfig['hostname'];

        return {
            elementId: ctwl.VROUTER_DETAILS_SYSTEM_CHART_SECTION_ID,
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwl.VROUTER_DETAILS_SYSTEM_LINE_CHART_ID,
                                view: "LineBarWithFocusChartView",
                                viewConfig: {
//                                    modelConfig: getNodeCPUMemModelConfig(hostname, endTime),
                                    parseFn: function (response) {
                                        var dimensions = ['cpu_info.one_min_cpuload', 'cpu_info.used_sys_mem'];
                                        var options = {dimensions:dimensions}
                                        return ctwp.parseCPUMemLineChartDataForNodeDetails(response,options);
                                    },
                                    chartOptions: {
//                                        forceY1: [0, 1]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };
    
    return VRouterDetailsSystemLineChartView;
});