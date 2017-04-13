/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'node-color-mapping'],
        function(_, ContrailView, NodeColorMapping){
    var MonitorInfraViewConfig = function () {
        var self = this;
        self.viewConfig = {
                'system-cpu-percentiles': {
                    baseModel:'SYSTEM_CPU_PERCENTILES_MODEL',
                    baseView:'SYSTEM_CPU_PERCENTILES_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                    }
                },
                'system-overall-cpu-share': {
                    baseModel: 'SYSTEM_OVERALL_CPU_MODEL',
                    baseView: 'SYSTEM_CPU_SHARE_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                        viewConfig: {
                            class: 'mon-infra-chart chartMargin',
                            parseFn: cowu.chartDataFormatter,
                            chartOptions: {
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
                        }
                    }
                },
                'system-overall-memory-usage': {
                    baseModel: 'SYSTEM_OVERALL_MEMORY_MODEL',
                    baseView: 'SYSTEM_MEMORY_USAGE_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                        viewConfig: {
                            class: 'mon-infra-chart chartMargin',
                            parseFn: cowu.chartDataFormatter,
                            chartOptions: {
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
                        }
                    }
                },
                'system-overall-disk-usage': {
                    baseModel: 'SYSTEM_OVERALL_DISK_MODEL',
                    baseView: 'SYSTEM_DISK_USAGE_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                        viewConfig: {
                            class: 'mon-infra-chart chartMargin',
                            parseFn: cowu.chartDataFormatter,
                            chartOptions: {
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
                        }
                    }
                },
                'system-overall-bandwidth-usage': {
                    baseModel: 'SYSTEM_OVERALL_DISK_MODEL',
                    baseView: 'SYSTEM_DISK_USAGE_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                        viewConfig: {
                            class: 'mon-infra-chart chartMargin',
                            parseFn: cowu.chartDataFormatter,
                            chartOptions: {
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
                        }
                    }
                },
                'system-cpu-share': {
                    baseModel:'SYSTEM_CPU_MODEL', 
                    baseView: 'SYSTEM_CPU_SHARE_VIEW',
                    modelCfg: {
                    },
                    viewCfg:{
                    },
                    itemAttr: {
                        title: ctwl.SYSTEM_CPU_SHARE,
                        width: 1/2
                    }
                },
                'system-memory-usage': {
                    baseModel:'SYSTEM_MEMORY_MODEL',
                    baseView:'SYSTEM_MEMORY_USAGE_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                    },itemAttr: {
                        title: ctwl.SYSTEM_MEMORY_USED,
                        width: 1/2
                    }
                },
                'disk-usage-info': function (config){
                    return {
                        baseModel:'SYSTEM_DISK_USAGE_MODEL', 
                        baseView:'SYSTEM_DISK_USAGE_VIEW',
                        modelCfg: {
                        },
                        viewCfg: {
                        },
                        itemAttr: {
                            title: ctwl.DISK_USAGE,
                            width: 1/2
                        }
                    }
                },
                'dashboard-resource-utilization': function (){
                    return {
                        viewCfg: {
                            elementId: 'dashboard_resource_utilization_view',
                            view: 'CustomView',
                            //viewPathPrefix: ctwl.DASHBOARD_VIEWPATH_PREFIX,
                            //app : cowc.APP_CONTRAIL_CONTROLLER,
                            viewConfig: {
                                template: 'four-quadrant-template',
                                childWidgets: [
                                    'system-overall-cpu-share',
                                    'system-overall-memory-usage',
                                    'system-overall-disk-usage',
                                    'system-overall-bandwidth-usage'
                                ]
                            }
                        },
                        modelCfg: {
                        },
                        itemAttr: {
                            width: 0.9,
                            height: 0.6,
                            title: 'Resource Utilization'
                        }
                    }
                },
        };
        self.getViewConfig = function(id) {
            return self.viewConfig[id];
        };

};
 return (new MonitorInfraViewConfig()).viewConfig;

});
