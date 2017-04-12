define(['lodash', 'contrail-view', 'legend-view', 'monitor-infra-confignode-model', 'node-color-mapping'],
        function(_, ContrailView, LegendView, configNodeListModelCfg, NodeColorMapping){
    var MonitorInfraModelConfig = function () {
        var self = this;
        self.modelCfg = {
            'SYSTEM_CPU_MODEL' : {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    "table_name": "StatTable.NodeStatus.system_cpu_usage",
                    "select": "Source,T=,MAX(system_cpu_usage.cpu_share)",
                }
            },
            'SYSTEM_CPU_PERCENTILES_MODEL' : {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    table_name: "StatTable.NodeStatus.system_cpu_usage",
                    select: "T=, PERCENTILES(system_cpu_usage.cpu_share)",
                },
            },
            'SYSTEM_MEMORY_PERCENTILES_MODEL' : {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    table_name: "StatTable.NodeStatus.system_cpu_usage",
                    select: "T=, PERCENTILES(system_cpu_usage.cpu_share)",
                },
            },
            'SYSTEM_MEMORY_MODEL' : {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    "table_name": "StatTable.NodeStatus.system_mem_usage",
                    "select": "Source,T=,MAX(system_mem_usage.used)",
                }
            },
            'SYSTEM_DISK_USAGE_MODEL' : {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    "table_name": "StatTable.NodeStatus.disk_usage_info",
                    "select": "T=, Source, MAX(disk_usage_info.partition_space_used_1k)",
                }
            },
            'NODE_PROCESS_CPU_MODEL': {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                }
            },
            'NODE_PROCESS_MEMORY_MODEL': {
                type: 'common',
                source: 'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.mem_res)',
                }
            },
        }
    }
    return (new MonitorInfraModelConfig()).modelCfg;
});
