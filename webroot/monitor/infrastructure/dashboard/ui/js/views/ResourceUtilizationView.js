/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'core-utils',
    'chart-utils'],function(_, ContrailView, CoreUtils, chUtils){
    var cowu = new CoreUtils();
    var ResourceUtilizationView = ContrailView.extend({
        render : function (){
            var self = this,
                viewConfig = self.attributes.viewConfig;
            this.renderView4Config(this.$el, null,
                    getResourceUtilizationViewConfig(ifNull(viewConfig.color, {})), null, null, null, null);
        }
    });

    function getResourceUtilizationViewConfig (color) {
        return {
            elementId: ctwl.CONFIGNODE_SUMMARY_DONUTCHART_SECTION_ID,
            view: 'SectionView',
            viewConfig: {
                title: 'Resource Utilization',
                cssClass: 'panel panel-default',
                rows:[{
                    columns: [{
                        elementId : 'system_cpu_utilization',
                            view:'LineWithFocusChartView',
                            viewConfig: $.extend(true, {}, chUtils.getDefaultViewConfig('LineWithFocusChartView')['viewConfig'],{
                                class: 'col-xs-6 utilization-chart',
                                modelConfig: cowu.getStatsModelConfig({
                                    "table_name": "StatTable.NodeStatus.system_cpu_usage",
                                    "select": "T=, MAX(system_cpu_usage.cpu_share)"
                                }),
                                chartOptions: {
                                    yFormatter: d3.format('.2f'),
                                    subTitle:"System CPU Utilization (in 3 mins)",
                                    yAxisLabel: 'System CPU Share (%)',
                                    yField: 'MAX(system_cpu_usage.cpu_share)',
                                    groupBy: null,
                                    title: "CPU",
                                    colors: cowc.RESOURCE_UTILIZATION_CHART_COLOR,
                                    staticColor: true,
                                    area: true,
                                    showTicks: false,
                                    showXMinMax: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '20 %'
                                    },
                                    margin: {
                                        left: 0,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    }
                                }
                            })
                    }, {
                        elementId : 'system_memory_utilization',
                            view:'LineWithFocusChartView',
                            viewConfig: $.extend(true, {}, chUtils.getDefaultViewConfig('LineWithFocusChartView')['viewConfig'],{
                                class: 'col-xs-6 utilization-chart',
                                modelConfig: cowu.getStatsModelConfig({
                                    "table_name": "StatTable.NodeStatus.system_mem_usage",
                                    "select": "T=, MAX(system_mem_usage.used)"
                                }),
                                chartOptions: {
                                    yFormatter: function(d){
                                        return formatBytes(d * 1024, true);
                                    },
                                    subTitle: "System CPU Utilization (in 3 mins)",
                                    yAxisLabel: 'System CPU Share (%)',
                                    yField: 'MAX(system_mem_usage.used)',
                                    title: "Memory",
                                    area: true,
                                    colors: cowc.RESOURCE_UTILIZATION_CHART_COLOR,
                                    staticColor: true,
                                    groupBy: null,
                                    showTicks: false,
                                    showXMinMax: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '10 GB'
                                    },
                                    margin: {
                                        left: 0,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    },
                                }
                            })
                    }]
                }, {
                    columns: [{
                        elementId : 'system_disk_utilization',
                            view:'LineWithFocusChartView',
                            viewConfig: $.extend(true, {}, chUtils.getDefaultViewConfig('LineWithFocusChartView')['viewConfig'],{
                                class: 'col-xs-6 utilization-chart',
                                modelConfig: cowu.getStatsModelConfig({
                                    "table_name": "StatTable.NodeStatus.disk_usage_info",
                                    "select": "T=, MAX(disk_usage_info.partition_space_used_1k)"
                                }),
                                chartOptions: {
                                    yFormatter : function(d){
                                        return formatBytes(d * 1024, true);
                                    },
                                    subTitle:"System CPU Utilization (in 3 mins)",
                                    yAxisLabel: 'System CPU Share (%)',
                                    yField: 'MAX(disk_usage_info.partition_space_used_1k)',
                                    title: "Disk",
                                    colors: cowc.RESOURCE_UTILIZATION_CHART_COLOR,
                                    staticColor: true,
                                    area: true,
                                    groupBy: null,
                                    showTicks: false,
                                    showXMinMax: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '17 GB'
                                    },
                                    margin: {
                                        left: 0,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    }
                                }
                            })
                    }, {
                        elementId : 'system_bandwidth_utilization',
                            view:'LineWithFocusChartView',
                            viewConfig: $.extend(true, {}, chUtils.getDefaultViewConfig('LineWithFocusChartView')['viewConfig'],{
                                class: 'col-xs-6 utilization-chart',
                                modelConfig: cowu.getStatsModelConfig({
                                    "table_name": "StatTable.NodeStatus.disk_usage_info",
                                    "select": "T=, MAX(disk_usage_info.partition_space_used_1k)"
                                }),
                                chartOptions: {
                                    yFormatter : function(d){
                                        return formatBytes(d * 1024, true);
                                    },
                                    colors: cowc.RESOURCE_UTILIZATION_CHART_COLOR,
                                    staticColor: true,
                                    subTitle:"System CPU Utilization (in 3 mins)",
                                    yAxisLabel: 'System CPU Share (%)',
                                    yField: 'MAX(disk_usage_info.partition_space_used_1k)',
                                    title: "Bandwidth",
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '15 Mbps'
                                    },
                                    area: true,
                                    groupBy: null,
                                    showTicks: false,
                                    showXMinMax: false,
                                    margin: {
                                        left: 0,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    }
                                }
                            })
                    }]
                }]
            }
        }
    }
    return ResourceUtilizationView;
});
