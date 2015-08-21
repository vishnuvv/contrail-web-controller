define([
    'contrail-list-model',
    'monitor-infra-parsers'
], function (ContrailListModel,MonitorInfraParsers) {
    var monInfraParsers = new MonitorInfraParsers();
    var DatabaseNodeListModel = function () { 
        if(DatabaseNodeListModel.prototype.singletonInstance) {
            return DatabaseNodeListModel.prototype.singletonInstance;
        }
        var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : ctwl.DATABASENODE_SUMMARY_URL
                    },
                    dataParser : monInfraParsers.parseDatabaseNodesDashboardData
                },
                cacheConfig : {
                    ucid: ctwc.CACHE_DATABASENODE
                }
            };
        DatabaseNodeListModel.prototype.singletonInstance = 
            new ContrailListModel(listModelConfig);
        return DatabaseNodeListModel.prototype.singletonInstance;
    };
    return DatabaseNodeListModel;    
    }
);