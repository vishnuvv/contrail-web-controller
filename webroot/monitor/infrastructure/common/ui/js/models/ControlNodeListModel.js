define([
    'contrail-list-model',
    'monitor-infra-parsers'
], function (ContrailListModel, MonitorInfraParsers) {
    var monInfraParsers = new MonitorInfraParsers ();
    var ControlNodeListModel = function () { 
        if(ControlNodeListModel.prototype.singletonInstance) {
            return ControlNodeListModel.prototype.singletonInstance;
        }
        var vlRemoteConfig = [
          {
              getAjaxConfig: function() {
                  return monitorInfraUtils
                      .getGeneratorsAjaxConfigForInfraNodes('controlNodeDS');
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
                        url : ctwl.CONTROLNODE_SUMMARY_URL
                    },
                    dataParser : monInfraParsers.parseControlNodesDashboardData
                },
                vlRemoteConfig :{
                    vlRemoteList : vlRemoteConfig
                },
                cacheConfig : {
                    ucid: ctwc.CACHE_CONTROLNODE
                }
            };
        ControlNodeListModel.prototype.singletonInstance = 
            new ContrailListModel(listModelConfig);
        return ControlNodeListModel.prototype.singletonInstance;
    };
    return ControlNodeListModel;    
    }
);