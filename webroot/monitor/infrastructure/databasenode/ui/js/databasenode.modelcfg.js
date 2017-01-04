define(['lodash', 'contrail-view', 'legend-view', 'monitor-infra-databasenode-model', 'node-color-mapping'],
        function(_, ContrailView, LegendView, databaseNodeListModelCfg, NodeColorMapping){
    var ConfigNodeModelConfig = function () {
        var self = this;
        self.modelCfg = {
            'DATABASENODE_PERCENTILE_MODEL' : {
                source:'STATTABLE',
                config: {
                    "table_name": "StatTable.VncApiStatsLog.api_stats",
                    "select": "PERCENTILES(api_stats.response_time_in_usec), PERCENTILES(api_stats.response_size)",
                    "parser": monitorInfraParsers.percentileConfigNodeSummaryChart
                }
            }, 
        }
    }

    return (new ConfigNodeModelConfig()).modelCfg;


})
