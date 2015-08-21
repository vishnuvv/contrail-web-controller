define([
    'contrail-list-model',
    'monitor-infra-parsers'
], function (ContrailListModel,MonitorInfraParsers) {
    var monInfraParsers = new MonitorInfraParsers();
    var ConfigNodeListModel = function () { 
        if(ConfigNodeListModel.prototype.singletonInstance) {
            return ConfigNodeListModel.prototype.singletonInstance;
        }
        var vlRemoteList = [
            {
                getAjaxConfig: function() {
                    return monitorInfraUtils
                       .getGeneratorsAjaxConfigForInfraNodes('configNodeDS');
                },
                successCallback: function(response,contrailListModel) {
                    monitorInfraUtils
                       .parseAndMergeGeneratorWithPrimaryDataForInfraNodes(
                       response,contrailListModel);
                }
            }
                            //Need to add cpu stats
        ];
        var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : ctwl.CONFIGNODE_SUMMARY_URL
                    },
                    dataParser : monInfraParsers.parseConfigNodesDashboardData
                },
                vlRemoteConfig :{
                    vlRemoteList : vlRemoteList
                },
                cacheConfig : {
                    ucid: ctwc.CACHE_CONFIGNODE
                }
            };
        ConfigNodeListModel.prototype.singletonInstance = 
            new ContrailListModel(listModelConfig);
        return ConfigNodeListModel.prototype.singletonInstance;
    };
    return ConfigNodeListModel;    
    }
);