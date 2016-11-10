/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'node-color-mapping'],
        function(_, ContrailView, NodeColorMapping){
    var MonitorInfraViewConfig = function () {
        var nodeColorMapping = new NodeColorMapping(),
        colorFn = nodeColorMapping.getNodeColorMap;
        var self = this;
        self.viewConfig = {
                'system-cpu-share': function () {
                    return {
                        modelCfg: monitorInfraUtils.getStatsModelConfig({
                            table_name: 'StatTable.NodeStatus.system_mem_cpu_usage',
                            select: 'Source, T=, MAX(system_mem_cpu_usage.cpu_share)'
                        }),
                        viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                            elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_API_LINE_CHART_ID,
                            viewConfig: {
                                chartOptions: {
                                    yFormatter: d3.format('.2f'),
                                    yAxisLabel: 'System CPU Share (%)',
                                    groupBy: 'Source',
                                    colors: colorFn,
                                    yField: 'MAX(system_mem_cpu_usage.cpu_share)',
                                    title: "System",
                                }
                            }
                        }),itemAttr: {
                            title: ctwl.SYSTEM_CPU_SHARE
                        }
                    };
                },
                'system-memory-usage': function () {
                    return {
                        modelCfg: monitorInfraUtils.getStatsModelConfig({
                            table_name: 'StatTable.NodeStatus.system_mem_usage',
                            select: 'Source,T=,MAX(system_mem_usage.used)'
                        }),
                        viewCfg: $.extend(true, {}, monitorInfraConstants.defaultLineChartViewCfg, {
                            elementId : monitorInfraConstants.CONFIGNODE_CPU_SHARE_API_LINE_CHART_ID,
                            viewConfig: {
                                chartOptions: {
                                    yFormatter: d3.format('.2f'),
                                    yAxisLabel: 'System Memory Used',
                                    groupBy: 'Source',
                                    colors: colorFn,
                                    yField: 'MAX(system_mem_usage.used)',
                                    title: "System",
                                    yFormatter : function(d){
                                        return formatBytes(d * 1024, true);
                                   }
                                }
                            }
                        }),itemAttr: {
                            title: ctwl.SYSTEM_MEMORY_USED
                        }
                    };
                },
                'disk-usage-info': function (){
                    return {
                        modelCfg: monitorInfraUtils.getStatsModelConfig({
                            table_name: 'StatTable.NodeStatus.disk_usage_info',
                            select: 'T=, Source, MAX(disk_usage_info.partition_space_used_1k)',
                            parser: function(response){
                                var stats = response;
                                $.each(stats, function(idx, obj) {
                                    obj['MAX(disk_usage_info.partition_space_used_1k)'] =
                                        ifNull(obj['MAX(disk_usage_info.partition_space_used_1k)'],0) * 1024; //Converting KB to Bytes
                                });
                                return stats;
                            }
                        }),
                        viewCfg: $.extend(true, {}, monitorInfraConstants.stackChartDefaultViewConfig, {
                            elementId : "databsenode_dbusage_chart",
                            viewConfig: {
                                chartOptions: {
                                    title: "Disk Usage",
                                    xAxisLabel: '',
                                    yAxisLabel: "Disk Usage",
                                    yField: 'MAX(disk_usage_info.partition_space_used_1k)',
                                    yFormatter : function(d){
                                        return formatBytes(d * 1024, true);
                                   }
                                }
                            }
                        }),
                        itemAttr: {
                            title: ctwl.ANALYTICS_NODE_DB_USAGE
                        }
                    }
                }
        };
        self.getViewConfig = function(id) {
            return self.viewConfig[id];
        };
};
return MonitorInfraViewConfig;
});
