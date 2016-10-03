/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['contrail-list-model','async'], function(ContrailListModel,async) {
    var vRouterModel = Backbone.Model.extend({
            idAttribute:'name'
        });
    var VRouterCollection = Backbone.Collection.extend({
        model: vRouterModel,
        url: monitorInfraConstants.monitorInfraUrls.VROUTER_CACHED_SUMMARY,
        parse: function(data) {
            return monitorInfraParsers.parsevRoutersDashboardData(data);
        }
    });
    vRouterCollection = new VRouterCollection();
    vRouterCollection.fetch().done(function() {
        async.mapSeries([{
            ajaxCfg: monitorInfraUtils.getGeneratorsAjaxConfigForInfraNodes('computeNodeDS'),
            parseFn: monitorInfraUtils.parseInfraGeneratorsData
        }/*, {
            ajaxCfg: monitorInfraUtils.getAjaxConfigForInfraNodesCpuStats(monitorInfraConstants.COMPUTE_NODE),
            parseFn: monitorInfraUtils.parseAndMergeCpuStatsWithPrimaryDataForInfraNodes
        }*/], function(data) {
            data['ajaxCfg']['contentType'] = 'application/json';
            $.ajax(data['ajaxCfg']).done(function(response) {
                var retData = data['parseFn'](response);
                vRouterCollection.set(retData,{add:false,remove:false});
            });
        }, function(err,results) {
            console.info("Error in fetching vRouter collection",err);
        });
    });
                            
    var VRouterListModel = function() {
        var vlRemoteConfig = {
                vlRemoteList: [{
                    getAjaxConfig: function(responseJSON) {
                        return monitorInfraUtils.getGeneratorsAjaxConfigForInfraNodes(
                            'computeNodeDS',responseJSON);
                    },
                    successCallback: function(response, contrailListModel) {
                        monitorInfraUtils.parseAndMergeGeneratorWithPrimaryDataForInfraNodes(
                        response, contrailListModel);
                    }
                },
                {
                    getAjaxConfig: function(responseJSON) {
                        return monitorInfraUtils.getAjaxConfigForInfraNodesCpuStats(
                                monitorInfraConstants.COMPUTE_NODE,responseJSON,'summary');
                    },
                    successCallback: function(response, contrailListModel) {
                        monitorInfraUtils.parseAndMergeCpuStatsWithPrimaryDataForInfraNodes(
                        response, contrailListModel);
                    }
                }
                ]
            };
        var listModelConfig = {
            remote : {
                ajaxConfig : {
                    url : monitorInfraConstants.monitorInfraUrls.VROUTER_CACHED_SUMMARY
                },
                onAllRequestsCompleteCB: function(contrailListModel) {
                    var fetchContrailListModel = new ContrailListModel({
                        remote : {
                            ajaxConfig : {
                                url : monitorInfraConstants.monitorInfraUrls.VROUTER_CACHED_SUMMARY + '?forceRefresh',
                                timeout : 300000 // 5 mins as this may take more time with more nodes
                            },
                            onAllRequestsCompleteCB: function(fetchedContrailListModel) {
                                var data = fetchedContrailListModel.getItems();
                                if(!fetchedContrailListModel.error) {
                                    contrailListModel.setData(data);
                                }
                                if (contrailListModel.ucid != null) {
                                    cowch.setData2Cache(contrailListModel.ucid, {
                                        listModel: fetchedContrailListModel
                                    });
                                }
                            },
                            dataParser : monitorInfraParsers.parsevRoutersDashboardData,
                        },
                        vlRemoteConfig: vlRemoteConfig
                    });
                },
                dataParser : monitorInfraParsers.parsevRoutersDashboardData,
            },
            vlRemoteConfig: vlRemoteConfig,
            cacheConfig : {
                ucid : ctwl.CACHE_VROUTER,
                cacheTimeout: getValueByJsonPath(globalObj,
                                'webServerInfo;sessionTimeout', 3600000)
            }
        };
        return ContrailListModel(listModelConfig);
    };
    return VRouterListModel;
});
