/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'contrail-list-model'
], function (ContrailListModel) {
    var AnalyticsNodeSandeshChartModel = function () {
        var queryPostData = {
            "autoSort": true,
            "async": false,
            "formModelAttrs": {
             "table_name": "StatTable.SandeshMessageStat.msg_info",
              "table_type": "STAT",
              "query_prefix": "stat",
              "time_range": "3600",
              "from_time": Date.now() - (2 * 60 * 60 * 1000),
              "from_time_utc": Date.now() - (2 * 60 * 60 * 1000),
              "to_time": Date.now(),
              "to_time_utc": Date.now(),
              "select": "Source, T, UUID, msg_info.messages," +
              " name",
              "time_granularity_unit": "secs",
              "limit": "150000"
            },
        };
        var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : monitorInfraConstants.monitorInfraUrls.STATS_QUERY,
                        type: 'POST',
                        data: JSON.stringify(queryPostData)
                    },
                    dataParser : function (response) {
                        return response['data'];
                    }
                },
                vlRemoteConfig: {
                    vlRemoteList: [{
                        getAjaxConfig: function () {
                            return {
                                url: monitorInfraConstants.monitorInfraUrls.STATS_QUERY+'?forceRefresh',
                                type:'POST',
                                data: JSON.stringify(queryPostData)
                            }
                        },successCallback: function(response, contrailListModel) {
                            contrailListModel.queryJSON = response['queryJSON'];
                            contrailListModel.setData(response['data']);
                        }
                    }]
                },
                cacheConfig : {

                }
            };

        return ContrailListModel(listModelConfig);
    };
    return AnalyticsNodeSandeshChartModel;
    }
);
