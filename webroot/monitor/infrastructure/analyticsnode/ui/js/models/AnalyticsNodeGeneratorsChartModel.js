/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'contrail-list-model'
], function (ContrailListModel) {
    var AnalyticsNodeGeneratorsChartModel = function () {
        var queryPostData = {
            "autoSort": true,
            "async": false,
            "formModelAttrs": {
             "table_name": "StatTable.SandeshMessageStat.msg_info",
              "table_type": "STAT",
              "query_prefix": "stat",
              "from_time": Date.now() - (2 * 60 * 60 * 1000),
              "from_time_utc": Date.now() - (2 * 60 * 60 * 1000),
              "to_time": Date.now(),
              "to_time_utc": Date.now(),
              "select": "Source,name, T=, SUM(msg_info.messages),SUM(msg_info.bytes)",
              "time_granularity": 150,
              "time_granularity_unit": "secs",
              //"limit": "5"
            },
        };
        var listModelConfig = {
            remote : {
                ajaxConfig : {
                    url : "/api/qe/query",
                    type: 'POST',
                    data: JSON.stringify(queryPostData),
                    timeout : 120000 //2 mins
                },
                dataParser : function (response) {
                    listModel.queryJSON = response['queryJSON'];
                    //return response['data'];
                    return monitorInfraParsers.generatorsChartsParseData(response['data']);
                }
            },
            cacheConfig : {
            }
        };
        var listModel = new ContrailListModel(listModelConfig)
        return listModel;
    };
    return AnalyticsNodeGeneratorsChartModel;
    }
);
