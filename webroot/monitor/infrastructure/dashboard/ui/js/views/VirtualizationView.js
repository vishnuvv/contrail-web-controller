/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'core-utils',
    'chart-utils'],function(_, ContrailView, CoreUtils, chUtils){
    var cowu = new CoreUtils();
    var VirtualizationView = ContrailView.extend({
        render : function (){
            var self = this,
                viewConfig = self.attributes.viewConfig;
            this.renderView4Config(this.$el, null,
                    getVirtualizationViewConfig(ifNull(viewConfig.color, {})), null, null, null, null);
        }
    });

    function getVirtualizationViewConfig (color) {
        return {
            elementId: 'virtualization_overview',
            view: 'SectionView',
            viewConfig: {
                title: 'Virtualization Overview',
                cssClass: 'panel panel-default',
                rows:[{
                    columns: [{
                        elementId : 'interface_chart',
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
                                    title: "Interfaces",
                                    colors: ['#03a9f4'],
                                    staticColor: true,
                                    area: true,
                                    showTicks: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '100'
                                    },
                                    showXMinMax: false,
                                    margin: {
                                        left: 10,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    }
                                }
                            })
                    }, {
                        elementId : 'instance_chart',
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
                                    title: "Instances",
                                    area: true,
                                    colors: ['#7dc48a'],
                                    staticColor: true,
                                    groupBy: null,
                                    showTicks: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '100'
                                    },
                                    showXMinMax: false,
                                    margin: {
                                        left: 10,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    },
                                }
                            })
                    }]
                }, {
                    columns: [{
                        elementId : 'svcinstance_chart',
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
                                    title: "Service Instances",
                                    colors: cowc.RESOURCE_UTILIZATION_CHART_COLOR,
                                    staticColor: true,
                                    area: true,
                                    groupBy: null,
                                    showTicks: false,
                                    showXMinMax: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '500'
                                    },
                                    margin: {
                                        left: 10,
                                        top: 5,
                                        right: 10,
                                        bottom: 10
                                    }
                                }
                            })
                    }, {
                        elementId : 'fip_chart',
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
                                    colors: ['#c79dcd'],
                                    staticColor: true,
                                    subTitle:"System CPU Utilization (in 3 mins)",
                                    yAxisLabel: 'System CPU Share (%)',
                                    yField: 'MAX(disk_usage_info.partition_space_used_1k)',
                                    title: "Floating IPs",
                                    area: true,
                                    groupBy: null,
                                    showTicks: false,
                                    showXMinMax: false,
                                    overviewCss: 'flex-2',
                                    overviewTextOptions: {
                                        label: '',
                                        value: '100'
                                    },
                                    margin: {
                                        left: 10,
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
    return VirtualizationView;
});
