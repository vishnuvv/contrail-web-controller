/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('monitor-infra-confignode-model',[
    'contrail-list-model'
], function (ContrailListModel) {
    var ConfigNodeListModel = function () {
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
            },
            {
                getAjaxConfig: function(responseJSON) {
                    return monitorInfraUtils.getAjaxConfigForInfraNodesCpuStats(
                            monitorInfraConstants.CONFIG_NODE,responseJSON,'summary');
                },
                successCallback: function(response, contrailListModel) {
                    monitorInfraUtils.parseAndMergeCpuStatsWithPrimaryDataForInfraNodes(
                    response, contrailListModel);
                }
            }
        ];
        var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : ctwl.CONFIGNODE_SUMMARY_URL
                    },
                    dataParser : monitorInfraParsers.parseConfigNodesDashboardData
                },
                vlRemoteConfig :{
                    vlRemoteList : vlRemoteList
                },
                cacheConfig : {
                    ucid: ctwl.CACHE_CONFIGNODE
                }
            };

        return ContrailListModel(listModelConfig);
    };
    return ConfigNodeListModel;
    }
);

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('monitor-infra-analyticsnode-model',['contrail-list-model'], function(ContrailListModel) {
    var AnalyticsNodeListModel = function() {
        var listModelConfig = {
            remote : {
                ajaxConfig : {
                    url : ctwl.ANALYTICSNODE_SUMMARY_URL
                },
                dataParser : monitorInfraParsers.parseAnalyticsNodesDashboardData
            },
            vlRemoteConfig : {
                vlRemoteList : [{
                    getAjaxConfig : function() {
                        return monitorInfraUtils
                            .getGeneratorsAjaxConfigForInfraNodes(
                                'analyticsNodeDS');
                    },
                    successCallback : function(response, contrailListModel) {
                        monitorInfraUtils
                            .parseAndMergeGeneratorWithPrimaryDataForInfraNodes(
                                response, contrailListModel);
                    }
                },
                {
                    getAjaxConfig : function() {
                        var postData =
                            monitorInfraUtils.getPostData("analytics-node", '', '',
                                'CollectorState:generator_infos', '');
                        return {
                            url : TENANT_API_URL,
                            type : 'POST',
                            data : JSON.stringify(postData)
                        };
                    },
                    successCallback : function(response, contrailListModel) {
                        if (response != null && response[0] != null) {
                            monitorInfraUtils
                                .mergeCollectorDataAndPrimaryData(response[0],
                                        contrailListModel);
                        }
                    }
                },
                {
                    getAjaxConfig: function(responseJSON) {
                        return monitorInfraUtils.getAjaxConfigForInfraNodesCpuStats(
                                monitorInfraConstants.ANALYTICS_NODE,responseJSON,'summary');
                    },
                    successCallback: function(response, contrailListModel) {
                        monitorInfraUtils.parseAndMergeCpuStatsWithPrimaryDataForInfraNodes(
                        response, contrailListModel);
                    }
                }
                ]
            },
            cacheConfig : {
                ucid : ctwl.CACHE_ANALYTICSNODE
            }
        };
        return ContrailListModel(listModelConfig);
    };
    return AnalyticsNodeListModel;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('monitor-infra-databasenode-model',[
    'contrail-list-model',
], function (ContrailListModel) {
    var DatabaseNodeListModel = function () {
        var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : ctwl.DATABASENODE_SUMMARY_URL
                    },
                    dataParser : monitorInfraParsers.parseDatabaseNodesDashboardData
                },
                cacheConfig : {
                    ucid: ctwl.CACHE_DATABASENODE
                }
            };
        return ContrailListModel(listModelConfig);
    };
    return DatabaseNodeListModel;
    }
);

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('monitor-infra-controlnode-model',[
    'contrail-list-model'
], function (ContrailListModel) {
    var ControlNodeListModel = function () {
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
          },
          {
              getAjaxConfig: function(responseJSON) {
                  return monitorInfraUtils.getAjaxConfigForInfraNodesCpuStats(
                          monitorInfraConstants.CONTROL_NODE,responseJSON,'summary');
              },
              successCallback: function(response, contrailListModel) {
                  monitorInfraUtils.parseAndMergeCpuStatsWithPrimaryDataForInfraNodes(
                  response, contrailListModel);
              }
          }
        ];
        var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : ctwl.CONTROLNODE_SUMMARY_URL
                    },
                    dataParser : monitorInfraParsers.parseControlNodesDashboardData
                },
                vlRemoteConfig :{
                    vlRemoteList : vlRemoteConfig
                },
                cacheConfig : {
                    ucid: ctwc.CACHE_CONTROLNODE
                }
            };
        return new ContrailListModel(listModelConfig);
    };
    return ControlNodeListModel;
    }
);

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('monitor-infra-vrouter-model',['contrail-list-model'], function(ContrailListModel) {
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
                                url : monitorInfraConstants.monitorInfraUrls.VROUTER_CACHED_SUMMARY + '?forceRefresh'
                            },
                            onAllRequestsCompleteCB: function(fetchedContrailListModel) {
                                var data = fetchedContrailListModel.getItems();
                                contrailListModel.setData(data);
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
                cacheTimeout:0
            }
        };
        return ContrailListModel(listModelConfig);
    };
    return VRouterListModel;
});

define('monitor-infra-utils',[
    'underscore',
    'contrail-list-model',
], function (_, ContrailListModel) {
    var MonitorInfraUtils = function () {
        var self = this;
        var noDataStr = monitorInfraConstants.noDataStr;
        // var isProcessExcluded = self.isProcessExcluded;
        infraMonitorAlertUtils = {
            /**
            * Process-specific alerts
            */
            getProcessAlerts : function(data,obj,processPath) {
                var res,filteredResponse = [],downProcess = 0,backOffProcess = 0,
                    lastExitTime,lastStopTime,strtngProcess = 0;
                if(processPath != null)
                    res = getValueByJsonPath(data['value'],processPath,[]);
                else
                    res = ifNull(jsonPath(data,'$..NodeStatus.process_info')[0],[]);
                var alerts=[];
                var infoObj = {type:obj['display_type'],link:obj['link']};
                if(obj['isUveMissing'] == true)
                    return alerts;
                filteredResponse = $.grep(res,function(obj,idx){
                    return !self.isProcessExcluded(obj['process_name']);
                })
                if(filteredResponse.length == 0){
                    if(IS_NODE_MANAGER_INSTALLED){
                        alerts.push($.extend({
                            sevLevel: sevLevels['ERROR'],
                            name: data['name'],
                            pName: obj['display_type'],
                            msg: infraAlertMsgs['PROCESS_STATES_MISSING']
                        }, infoObj));
                    }
                } else {
                    for(var i=0;i<filteredResponse.length;i++) {
                        lastExitTime =  undefined;
                        lastStopTime =  undefined;
                        if(filteredResponse[i]['core_file_list']!=undefined && filteredResponse[i]['core_file_list'].length>0) {
                            var msg = infraAlertMsgs['PROCESS_COREDUMP'].format(filteredResponse[i]['core_file_list'].length);
                            var restartCount = ifNull(filteredResponse[i]['exit_count'],0);
                            if(restartCount > 0)
                                msg +=", "+ infraAlertMsgs['PROCESS_RESTART'].format(restartCount);
                            alerts.push($.extend({
                                tooltipAlert: false,
                                sevLevel: sevLevels['INFO'],
                                name: data['name'],
                                pName: filteredResponse[i]['process_name'],
                                msg: msg
                            }, infoObj));
                        }
                        var procName = filteredResponse[i]['process_name'];
                        var procState = filteredResponse[i]['process_state'];
                        /*
                        * Different process states and corresponding node color and message
                        * PROCESS_STATE_STOPPPED: red, process stopped message
                        * PROCESS_STATE_STARTING: blue, process starting message
                        * PROCESS_STATE_BACKOFF: orange, process down message
                        * rest all states are with red color and process down message
                        */
                        if (procState != null && procState != 'PROCESS_STATE_STOPPED' && procState != 'PROCESS_STATE_RUNNING'
                            && procState != 'PROCESS_STATE_BACKOFF' && procState != 'PROCESS_STATE_STARTING') {
                            downProcess++;
                            if(filteredResponse[i]['last_exit_time'] != null)
                                lastExitTime = filteredResponse[i]['last_exit_time'];
                            alerts.push($.extend({
                                tooltipAlert: false,
                                name: data['name'],
                                pName: procName,
                                msg: infraAlertMsgs['PROCESS_DOWN_MSG'].format(procName),
                                timeStamp: lastExitTime,
                                sevLevel: sevLevels['ERROR']
                            }, infoObj));
                        } else if (procState == 'PROCESS_STATE_STOPPED') {
                            downProcess++;
                            if(filteredResponse[i]['last_stop_time'] != null)
                                lastStopTime = filteredResponse[i]['last_stop_time'];
                            alerts.push($.extend({
                                tooltipAlert: false,
                                name: data['name'],
                                pName: procName,
                                msg: infraAlertMsgs['PROCESS_STOPPED'].format(procName),
                                timeStamp: lastStopTime,
                                sevLevel: sevLevels['ERROR']
                            }, infoObj));
                        } else if (procState == 'PROCESS_STATE_BACKOFF') {
                            backOffProcess++;
                            if(filteredResponse[i]['last_exit_time'] != null)
                                lastExitTime = filteredResponse[i]['last_exit_time'];
                            alerts.push($.extend({
                                tooltipAlert: false,
                                name: data['name'],
                                pName: procName,
                                msg: infraAlertMsgs['PROCESS_DOWN_MSG'].format(procName),
                                timeStamp: lastExitTime,
                                sevLevel: sevLevels['WARNING']
                            }, infoObj));
                        } else if (procState == 'PROCESS_STATE_STARTING') {
                            strtngProcess++;
                            alerts.push($.extend({
                                tooltipAlert: false,
                                name: data['name'],
                                pName: procName,
                                msg: infraAlertMsgs['PROCESS_STARTING_MSG'].format(procName),
                                timeStamp: undefined, //we are not showing the time stamp for the process in
                                sevLevel: sevLevels['INFO'] // starting state
                            }, infoObj));
                            //Raise only info alert if process_state is missing for a process??
                        } else if  (procState == null) {
                            downProcess++;
                            alerts.push($.extend({
                                tooltipAlert: false,
                                name: data['name'],
                                pName: filteredResponse[i]['process_name'],
                                msg: infraAlertMsgs['PROCESS_DOWN_MSG'].format(filteredResponse[i]['process_name']),
                                timeStamp: filteredResponse[i]['last_exit_time'],
                                sevLevel: sevLevels['INFO']
                            }, infoObj));
                                /*msg +=", "+infraAlertMsgs['RESTARTS'].format(restartCount);
                            alerts.push($.extend({name:data['name'],pName:filteredResponse[i]['process_name'],type:'core',msg:msg},infoObj));*/
                        }
                    }
                    if(downProcess > 0)
                        //Only detail alerts are shown in Alerts Grid/Alerts Container
                        //set deailAlert to false to show an alert only in tooltip
                        alerts.push($.extend({
                            detailAlert: false,
                            sevLevel: sevLevels['ERROR'],
                            msg: infraAlertMsgs['PROCESS_DOWN'].format(downProcess + backOffProcess)
                        }, infoObj));
                    else if(backOffProcess > 0)
                        alerts.push($.extend({
                            detailAlert: false,
                            sevLevel: sevLevels['WARNING'],
                            msg: infraAlertMsgs['PROCESS_DOWN'].format(backOffProcess)
                        }, infoObj));
                    if(strtngProcess > 0)
                        alerts.push($.extend({
                            detailAlert: false,
                            sevLevel: sevLevels['INFO'],
                            msg: infraAlertMsgs['PROCESS_STARTING'].format(strtngProcess)
                        }, infoObj));
                }
                return alerts.sort(dashboardUtils.sortInfraAlerts);
            },
            processvRouterAlerts : function(obj) {
                var alertsList = [];
                var infoObj = {
                    name: obj['name'],
                    type: 'vRouter',
                    ip: obj['ip'],
                    link: obj['link']
                };
                if(obj['isNTPUnsynced']){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['NTP_UNSYNCED_ERROR']
                    }, infoObj));
                }
                if(obj['isUveMissing'] == true)
                    alertsList.push($.extend({}, {
                        msg: infraAlertMsgs['UVE_MISSING'],
                        sevLevel: sevLevels['ERROR'],
                        tooltipLbl: 'Events'
                    }, infoObj));
                if(obj['isConfigMissing'] == true)
                    alertsList.push($.extend({}, {
                        msg: infraAlertMsgs['CONFIG_MISSING'],
                        sevLevel: sevLevels['WARNING']
                    }, infoObj));
                //Alerts that are applicable only when both UVE & config data present
                if(obj['isConfigMissing'] == false && obj['isUveMissing'] == false) {
                    if(obj['uveCfgIPMisMatch'] == true)
                        alertsList.push($.extend({}, {
                            msg: infraAlertMsgs['CONFIG_IP_MISMATCH'],
                            sevLevel: sevLevels['ERROR'],
                            tooltipLbl: 'Events'
                        }, infoObj));
                }
                //Alerts that are applicable only when UVE data is present
                if(obj['isUveMissing'] == false) {
                    if(obj['isPartialUveMissing'] == true)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['INFO'],
                            msg: infraAlertMsgs['PARTIAL_UVE_MISSING'],
                            tooltipLbl: 'Events'
                        }, infoObj));
                    if(obj['errorIntfCnt'] > 0)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['WARNING'],
                            msg: infraAlertMsgs['INTERFACE_DOWN'].format(obj['errorIntfCnt']),
                            tooltipLbl: 'Events'
                        }, infoObj));
                    if(obj['xmppPeerDownCnt'] > 0)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['ERROR'],
                            msg: infraAlertMsgs['XMPP_PEER_DOWN'].format(obj['xmppPeerDownCnt']),
                            tooltipLbl: 'Events'
                        }, infoObj));
                }
                return alertsList.sort(dashboardUtils.sortInfraAlerts);
            },
            processControlNodeAlerts : function(obj) {
                var alertsList = [];
                var infoObj = {
                    name: obj['name'],
                    type: 'Control Node',
                    ip: obj['ip'],
                    link: obj['link']
                };
                if(obj['isNTPUnsynced']){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['NTP_UNSYNCED_ERROR']
                    }, infoObj));
                }
                if(obj['isUveMissing'] == true)
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['UVE_MISSING']
                    }, infoObj));
                if(obj['isConfigMissing'] == true)
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['CONFIG_MISSING']
                    }, infoObj));
                if(obj['isUveMissing'] == false) {
                    //ifmap down alerts for control node
                    if(obj['isIfmapDown']) {
                        alertsList.push($.extend({
                            sevLevel: sevLevels['ERROR'],
                            msg: infraAlertMsgs['IFMAP_DOWN'],
                            timeStamp: obj['ifmapDownAt']
                        }, infoObj));
                    }
                    if(obj['isPartialUveMissing'] == true)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['INFO'],
                            msg: infraAlertMsgs['PARTIAL_UVE_MISSING']
                        }, infoObj));
                    if(obj['downXMPPPeerCnt'] > 0)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['WARNING'],
                            msg: infraAlertMsgs['XMPP_PEER_DOWN'].format(obj['downXMPPPeerCnt'])
                        }, infoObj));
                    if(obj['downBgpPeerCnt'] > 0)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['WARNING'],
                            msg: infraAlertMsgs['BGP_PEER_DOWN'].format(obj['downBgpPeerCnt'])
                        }, infoObj));
                }
                //Alerts that are applicable only when both UVE and config data are present
                if(obj['isUveMissing'] == false && obj['isConfigMissing'] == false) {
                    if(typeof(obj['totalBgpPeerCnt']) == "number" &&
                        obj['configuredBgpPeerCnt'] != obj['totalBgpPeerCnt'])
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['WARNING'],
                            msg: infraAlertMsgs['BGP_CONFIG_MISMATCH']
                        }, infoObj));
                    if(obj['uveCfgIPMisMatch'])
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['ERROR'],
                            msg: infraAlertMsgs['CONFIG_IP_MISMATCH']
                        }, infoObj));
                }
                return alertsList.sort(dashboardUtils.sortInfraAlerts);
            },
            processConfigNodeAlerts : function(obj) {
                var alertsList = [];
                var infoObj = {
                    name: obj['name'],
                    type: 'Config Node',
                    ip: obj['ip'],
                    link: obj['link']
                };
                if(obj['isNTPUnsynced'])
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['NTP_UNSYNCED_ERROR']
                    }, infoObj));
                if(obj['isUveMissing'] == true)
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['UVE_MISSING']
                    }, infoObj));
        //        if(obj['isConfigMissing'] == true)
        //            alertsList.push($.extend({},{sevLevel:sevLevels['ERROR'],msg:infraAlertMsgs['CONFIG_MISSING']},infoObj));
                if(obj['isUveMissing'] == false){
                    if(obj['isPartialUveMissing'] == true)
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['INFO'],
                            msg: infraAlertMsgs['PARTIAL_UVE_MISSING']
                        }, infoObj));
                }
                return alertsList.sort(dashboardUtils.sortInfraAlerts);
            },
            processAnalyticsNodeAlerts : function(obj) {
                var alertsList = [];
                var infoObj = {
                    name: obj['name'],
                    type: 'Analytics Node',
                    ip: obj['ip'],
                    link: obj['link']
                };
                if(obj['isNTPUnsynced']){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['NTP_UNSYNCED_ERROR']
                    }, infoObj));
                }
                if(obj['isUveMissing'] == true){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['UVE_MISSING']
                    }, infoObj));
                }
                if(obj['isUveMissing'] == false) {
                    if(obj['isPartialUveMissing'] == true){
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['INFO'],
                            msg: infraAlertMsgs['PARTIAL_UVE_MISSING']
                        }, infoObj));
                    }
                }
                if(obj['errorStrings'] != null && obj['errorStrings'].length > 0){
                    $.each(obj['errorStrings'],function(idx,errorString){
                        alertsList.push($.extend({}, {
                            sevLevel: sevLevels['WARNING'],
                            msg: errorString
                        }, infoObj));
                    });
                }
                return alertsList.sort(dashboardUtils.sortInfraAlerts);
            },
            processDbNodeAlerts : function(obj) {
                var alertsList = [];
                var infoObj = {
                    name: obj['name'],
                    type: 'Database Node',
                    ip: obj['ip'],
                    link: obj['link']
                };

                if(obj['isNTPUnsynced']){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['NTP_UNSYNCED_ERROR']
                    }, infoObj));
                }
                if(obj['isUveMissing'] == true){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['UVE_MISSING']
                    }, infoObj));
                }
        //        if(obj['isConfigMissing'] == true){
        //            alertsList.push($.extend({},{sevLevel:sevLevels['ERROR'],msg:infraAlertMsgs['CONFIG_MISSING']},infoObj));
        //        }
                if(obj['isUveMissing'] == false && obj['isPartialUveMissing'] == true){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['INFO'],
                        msg: infraAlertMsgs['PARTIAL_UVE_MISSING']
                    }, infoObj));
                }
                if(obj['usedPercentage'] >= 70 && obj['usedPercentage'] < 90){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['WARNING'],
                        msg: infraAlertMsgs['SPACE_USAGE_WARNING'].format('Database')
                    }, infoObj));
                } else if(obj['usedPercentage'] >= 90){
                    alertsList.push($.extend({}, {
                        sevLevel: sevLevels['ERROR'],
                        msg: infraAlertMsgs['SPACE_THRESHOLD_EXCEEDED'].format('Database')
                    }, infoObj));
                }
                return alertsList.sort(dashboardUtils.sortInfraAlerts);
            }
        }

        self.getGridPaginationControls = function() {
            return [
                        '<a class="widget-toolbar-icon"><i class="icon-step-forward"></i></a>',
                        '<a class="widget-toolbar-icon"><i class="icon-forward"></i></a>',
                        '<a class="widget-toolbar-icon"><i class="icon-backward"></i></a>',
                        '<a class="widget-toolbar-icon"><i class="icon-step-backward"></i></a>'
                    ];
        }

        self.formatMemory = function(memory) {
            if(memory == null || memory['res'] == null)
                return noDataStr;
            return self.formatMemoryForDisplay (memory['res']);
        }

        self.formatMemoryForDisplay = function (memory) {
            if (memory == null)
                return noDataStr;
            return contrail.format('{0}', formatBytes(parseInt(memory) * 1024));
        }

        self.getVrouterIpAddresses = function(data,pageType) {
            var ips,controlIp;
            var configip = noDataStr;
            var ipString = "";
            var isConfigMismatch = true;
            try{
                controlIp = getValueByJsonPath(data,'VrouterAgent;control_ip',noDataStr);
                ips = getValueByJsonPath(data,'VRouterAgent;self_ip_list',[]);
                configip = getValueByJsonPath(data,'ConfigData;virtual-router;virtual_router_ip_address');
                if(controlIp != null && controlIp != noDataStr){
                    ipString = controlIp;
                }
                if(configip == controlIp) {
                    isConfigMismatch = false;
                }
                $.each(ips, function (idx, ip){
                    if(ip == configip){
                        isConfigMismatch = false;
                    }
                    if(ip != controlIp){
                        ipString += ", " + ip;
                        if(idx == 0){
                            ipString += "*";
                        }
                    } else {
                        ipString += "*"
                    }
                });
                if(configip != null && isConfigMismatch){
                    if(ipString != ""){
                        ipString += ","
                    }
                    if(pageType == "summary"){
                        ipString = ipString +  configip ;
                    } else if (pageType == "details"){
                        ipString = ipString + "<span class='text-error' title='Config IP mismatch'> "+ configip +"</span>";
                    }
                }
            } catch(e){}
            return ipString;
        }

        self.parseUveHistoricalValues = function(d,path,histPath) {
            var histData;
            if(histPath != null)
                histData = getValueByJsonPath(d,histPath,[]);
            else
                histData = ifNull(jsonPath(d,path)[0],[]);
            var histDataArr = [];
            $.each(histData,function(key,value) {
                histDataArr.push([JSON.parse(key)['ts'],value]);
            });
            histDataArr.sort(function(a,b) { return a[0] - b[0];});
            histDataArr = $.map(histDataArr,function(value,idx) {
                return value[1];
            });
            return histDataArr;
        }

        /**
        * Return false if is there is no severity alert that decides color
        */
        self.getNodeColor = function (obj) {
            obj = ifNull(obj,{});
            //Check if there is any nodeAlert and if yes,
            //get the highest severity alert
            var nodeAlertSeverity = -1,processLevelSeverity = -1;
            if(obj['nodeAlerts'].length > 0) {
                nodeAlertSeverity = obj['nodeAlerts'][0]['sevLevel'];
            }
            //Check if any process Alerts
            if(obj['processAlerts'].length > 0) {
                processLevelSeverity = obj['processAlerts'][0]['sevLevel'];
            }
            if(nodeAlertSeverity == sevLevels['ERROR'] ||
                    processLevelSeverity == sevLevels['ERROR'])
                return cowc.COLOR_SEVERITY_MAP['red'];
            if(nodeAlertSeverity == sevLevels['WARNING'] ||
                    processLevelSeverity == sevLevels['WARNING'])
                return cowc.COLOR_SEVERITY_MAP['orange'];
            return false;
        };

        self.getConfigNodeColor = function (d,obj) {
            obj= ifNull(obj,{});
            var nodeColor;
            if(cowu.getAlarmsFromAnalytics) {
                nodeColor = coreAlarmUtils.getNodeColor(obj);
            } else {
                // nodeColor = coreAlarmUtils.getNodeColor(obj);
            }
            if(nodeColor != false)
                return nodeColor;
            return cowc.COLOR_SEVERITY_MAP['blue'];
        };

        self.getControlNodeColor = function (d,obj) {
            obj= ifNull(obj,{});
            var nodeColor;
            if(cowu.getAlarmsFromAnalytics) {
                nodeColor = coreAlarmUtils.getNodeColor(obj);
            } else {
                // nodeColor = coreAlarmUtils.getNodeColor(obj);
            }
            if(nodeColor != false)
                return nodeColor;
            //If connected to atleast one XMPP Peer
            if(obj['totalXMPPPeerCnt'] - obj['downXMPPPeerCnt'] > 0)
                return cowc.COLOR_SEVERITY_MAP['green'];
            else if(obj['downBgpPeerCnt'] == 0 && obj['downXMPPPeerCnt'] == 0)
                return cowc.COLOR_SEVERITY_MAP['blue'];    //Default color
        };

        self.getDatabaseNodeColor = function (d,obj) {
            obj= ifNull(obj,{});
            var nodeColor;
            if(cowu.getAlarmsFromAnalytics) {
                nodeColor = coreAlarmUtils.getNodeColor(obj);
            } else {
                // nodeColor = coreAlarmUtils.getNodeColor(obj);
            }
            if(nodeColor != false)
                return nodeColor;
            return cowc.COLOR_SEVERITY_MAP['blue'];
        };

        self.getAnalyticsNodeColor = function (d, obj) {
            obj= ifNull(obj,{});
            var nodeColor;
            if(cowu.getAlarmsFromAnalytics) {
                nodeColor = coreAlarmUtils.getNodeColor(obj);
            } else {
                // nodeColor = coreAlarmUtils.getNodeColor(obj);
            }
            if(nodeColor != false)
                return nodeColor;
            return cowc.COLOR_SEVERITY_MAP['blue'];
        };

        self.getvRouterColor = function(d,obj) {
            var nodeColor;
            if(cowu.getAlarmsFromAnalytics) {
                nodeColor = coreAlarmUtils.getNodeColor(obj);
            } else {
                // nodeColor = coreAlarmUtils.getNodeColor(obj);
            }
            if(nodeColor != false)
                return nodeColor;
            obj = ifNull(obj,{});
            var instCnt = obj['instCnt'];
            if(instCnt == 0)
                return cowc.COLOR_SEVERITY_MAP['blue'];
            else if(instCnt > 0)
                return cowc.COLOR_SEVERITY_MAP['green'];
        };

        self.getGeneratorsAjaxConfigForInfraNodes = function (dsName,responseJSON) {
            var ajaxConfig = {};
            var kfilts;
            var cfilts;
            if(dsName == 'controlNodeDS') {
                kfilts =  '*:' + monitorInfraConstants.UVEModuleIds['CONTROLNODE'] + '*';
                cfilts =  'ModuleClientState:client_info,'+
                          'ModuleServerState:generator_info';
            } else if(dsName == 'computeNodeDS') {
                //Handling the case module id will change for the TOR agent/ TSN
                //We need to send all the module ids if different
                var items = responseJSON;
                var kfiltString = ""
                var moduleIds = [];
                $.each(items,function(i,d){
                    if(moduleIds.indexOf(d['moduleId']) == -1){
                        moduleIds.push(d['moduleId']);
                        //Exclude getting contrail-tor-agent generators
                        if(d['moduleId'] == 'contrail-tor-agent') {
                            return;
                        }
                        if(kfiltString != '')
                            kfiltString += ',';
                        kfiltString += '*:' + d['moduleId'] + '*';
                    }
                });
                kfilts =  kfiltString;
                cfilts = 'ModuleClientState:client_info,'+
                         'ModuleServerState:generator_info';
            } else if(dsName == 'analyticsNodeDS') {
                kfilts = '*:' + monitorInfraConstants.UVEModuleIds['COLLECTOR'] + '*,*:' +
                                monitorInfraConstants.UVEModuleIds['OPSERVER'] + '*,*:' +
                                monitorInfraConstants.UVEModuleIds['QUERYENGINE'] + '*';
                cfilts = 'ModuleClientState:client_info,'+
                         'ModuleServerState:generator_info';
            } else if(dsName == 'configNodeDS') {
                kfilts = '*:' + monitorInfraConstants.UVEModuleIds['APISERVER'] + '*';
                cfilts = 'ModuleClientState:client_info,'+
                         'ModuleServerState:generator_info';
            }

            var postData = self.getPostData("generator",'','',cfilts,kfilts);

            ajaxConfig = {
                    url:TENANT_API_URL,
                    type:'POST',
                    data:JSON.stringify(postData)
                };
            return ajaxConfig;
        };

        self.getAjaxConfigForInfraNodesCpuStats = function (dsName,responseJSON,page) {
            var ajaxConfig = {};
            //build the query
            var postData = self.getPostDataForCpuMemStatsQuery({
                nodeType:dsName,
                node:'',
                page:page});
            ajaxConfig = {
                url: monitorInfraConstants.monitorInfraUrls['QUERY'],
                type:'POST',
                data:JSON.stringify(postData)
            }
            return ajaxConfig;
        };


        self.parseInfraGeneratorsData = function(result) {
            var retArr = [];
            if(result != null && result[0] != null){
                result = result[0].value;
            } else {
                result = [];
            }
            $.each(result,function(idx,d){
                var obj = {};
                obj['status'] = self.getOverallNodeStatusFromGenerators(d);
                obj['name'] = d['name'];
                retArr.push(obj);
            });
            return retArr;
        };

        //If current process is part of exclude process list,then return true; else return false
        self.isProcessExcluded = function(procName) {
            //Exclude specific (node mgr,nova-compute for compute node) process alerts
            var excludeProcessList = monitorInfraConstants.excludeProcessList;
            var excludeProcessLen = excludeProcessList.length;
            for(var i=0;i<excludeProcessLen;i++) {
                if(procName.indexOf(excludeProcessList[i]) > -1)
                    return true;
            }
            return false;
        }

        self.isNTPUnsynced = function(nodeStatus) {
            if(nodeStatus == null || !nodeStatus || nodeStatus.process_status == null){
                return false;
            }
            var processStatus = nodeStatus.process_status;
            for(var i = 0; i < processStatus.length; i++){
                var procstat = processStatus[i];
                if(procstat.description != null &&
                    procstat.description.toLowerCase().indexOf("ntp state unsynchronized") != -1){
                    return true;
                }
            }
        }
        self.getPostData = function(type,module,hostname,cfilt,kfilt) {
            var cfiltObj = {};
            var postData;
            if(type != null && type != ""){
                cfiltObj["type"] = type;
            } else {
                return null;
            }
            if(module != null && module != ""){
                cfiltObj["module"] = module;
            }
            if(hostname != null && hostname != ""){
                cfiltObj["hostname"] = hostname;
            }
            if(cfilt != null && cfilt != ""){
                cfiltObj["cfilt"] = cfilt;
            }
            if(kfilt != null && kfilt != ""){
                cfiltObj["kfilt"] = kfilt;
            }
            postData = {data:[cfiltObj]};
            return postData;
        }


        /**
        * Claculates node status based on process_info & generators
        * ToDo: use getOverallNodeStatusFromGenerators
        */
        self.getOverallNodeStatus = function(d,nodeType,processPath) {
            //If the flag is set to fetch alarms from analytics use analytics alarms

            var status = "--";
            var generatorDownTime;
            //For Analytics node if there are error strings in the UVE display it as Down
            if(nodeType != null && nodeType == 'analytics'){
                try{
                    var errorStrings = jsonPath(d,"$..ModuleCpuState.error_strings")[0];
                }catch(e){}
                if(errorStrings && errorStrings.length > 0){
                    return 'Down';
                }
            }
            var procStateList;
            if(processPath != null)
                procStateList = getValueByJsonPath(d,processPath);
            else
                procStateList = jsonPath(d,"$..NodeStatus.process_info")[0];
            if(procStateList != null && procStateList != undefined && procStateList != "") {
                status = self.getOverallNodeStatusFromProcessStateList(procStateList);
                //Check if any generator is down. This may happen if the process_info is not updated due to some reason
                if(status.search("Up") != -1){
                    generatorDownTime = self.getMaxGeneratorDownTime(d);
                    if(generatorDownTime != -1){
                        try{
                            var resetTime = new XDate(generatorDownTime/1000);
                            var currTime = new XDate();
                            status = 'Down since ' + diffDates(resetTime,currTime);
                        }catch(e){
                            status = 'Down';
                        }
                    }
                }
            } else {
                //For each process get the generator_info and fetch the gen_attr which is having the highest connect_time. This is because
                //we are interseted only in the collector this is connected to the latest.
                //From this gen_attr see if the reset_time > connect_time. If yes then the process is down track it in down list.
                //Else it is up and track in uplist.
                //If any of the process is down get the least reset_time from the down list and display the node as down.
                //Else get the generator with max connect_time and show the status as Up.
                try{
                    var genInfos = ifNull(jsonPath(d,"$..ModuleServerState..generator_info"),[]);
                    if(!genInfos){
                        return 'Down';
                    }
                    var upGenAttrs = [];
                    var downGenAttrs = [];
                    var isDown = false;
                    $.each(genInfos,function(idx,genInfo){
                        var genAttr = self.getMaxGeneratorValueInArray(genInfo,"connect_time");
                        var connTime = jsonPath(genAttr,"$..connect_time")[0];
                        var resetTime = jsonPath(genAttr,"$..reset_time")[0];
                        if(resetTime > connTime){
                            isDown = true;
                            downGenAttrs.push(genAttr);
                        } else {
                            upGenAttrs.push(genAttr);
                        }
                    });
                    if(!isDown){
                        var maxConnTimeGen = self.getMaxGeneratorValueInArray(upGenAttrs,"connect_time");
                        var maxConnTime = jsonPath(maxConnTimeGen,"$..connect_time")[0];
                        var connectTime = new XDate(maxConnTime/1000);
                        var currTime = new XDate();
                        status = 'Up since ' + diffDates(connectTime,currTime);
                    } else {
                        var minResetTimeGen = self.getMinGeneratorValueInArray(downGenAttrs,"reset_time");
                        var minResetTime = jsonPath(minResetTimeGen,"$..reset_time")[0];
                        var resetTime = new XDate(minResetTime/1000);
                        var currTime = new XDate();
                        status = 'Down since ' + diffDates(resetTime,currTime);
                    }
                }catch(e){}
            }
            return status;
        }

        self.getOverallNodeStatusFromProcessStateList = function(d) {
            var maxUpTime=0, maxDownTime=0, isAnyNodeDown=false, status = "";
            for(var i=0; i < d.length; i++){
                var currProc = d[i];
                //Exclude specific (node mgr,nova-compute for compute node) process alerts
                if(self.isProcessExcluded(currProc['process_name']))
                    continue;
                if(currProc != null && currProc.process_state != null &&
                    currProc.process_state.toUpperCase() == "PROCESS_STATE_RUNNING"){
                    if(currProc.last_start_time != null && currProc.last_start_time > maxUpTime){
                        maxUpTime = currProc.last_start_time;
                    }
                } else {
                    if(currProc.last_exit_time != null || currProc.last_stop_time != null){
                        isAnyNodeDown = true;
                        var maxProcDownTime=0,exitTime=0,stopTime=0;
                        if(currProc.last_exit_time != null){
                            exitTime = currProc.last_exit_time;
                        }
                        if(currProc.last_stop_time != null){
                            stopTime = currProc.last_stop_time;
                        }
                        maxProcDownTime = (exitTime > stopTime)?exitTime:stopTime;
                        if(maxProcDownTime > maxDownTime){
                            maxDownTime = maxProcDownTime;
                        }
                    }
                }
            }
            if(!isAnyNodeDown && maxUpTime != 0){
                var upTime = new XDate(maxUpTime/1000);
                var currTime = new XDate();
                status = 'Up since ' + diffDates(upTime,currTime);
            } else if(maxDownTime != 0){
                var resetTime = new XDate(maxDownTime/1000);
                var currTime = new XDate();
                status = 'Down since ' + diffDates(resetTime,currTime);
            } else {
                status = 'Down';
            }
            return status;
        }
        //returns max reset time or -1 if none are down
        self.getMaxGeneratorDownTime = function(d) {
            var genInfos = [];
            var genInfoList = [];
            var maxResetTime = -1;
            try{
                genInfoList = jsonPath(d,"$..ModuleServerState..generator_info");
                for(var i=0; i < genInfoList.length; i++){
                    var currGenInfo = genInfoList[i];
                    var maxConnectTimeGenerator = self.getMaxGeneratorValueInArray(currGenInfo,"connect_time");
                    var maxConnectTimeOfProcess = jsonPath(maxConnectTimeGenerator,"$..connect_time")[0];
                    var resetTimeOfMaxConnectTimeGenerator = jsonPath(maxConnectTimeGenerator,"$..reset_time")[0];
                    if(resetTimeOfMaxConnectTimeGenerator > maxConnectTimeOfProcess){
                        if(maxResetTime < resetTimeOfMaxConnectTimeGenerator){
                            maxResetTime = resetTimeOfMaxConnectTimeGenerator
                        }
                    }
                }
            }catch(e){}
            return maxResetTime;
        }

        self.getMaxGeneratorValueInArray = function(inputArray,selector) {
            var maxVal;
            if(inputArray != null && inputArray['length'] != null && inputArray['length'] > 0) {
                maxVal = inputArray[0];
                for(var i = 1; i < inputArray.length; i++){
                    var curSelectorVal = jsonPath(inputArray[i],"$.."+selector)[0];
                    var maxSelectorVal = jsonPath(maxVal,"$.."+selector)[0];
                    if(curSelectorVal > maxSelectorVal){
                        maxVal = inputArray[i];
                    }
                }
                return maxVal;
            } else {
                return inputArray;
            }
        }

        self.getMinGeneratorValueInArray = function(inputArray,selector) {
            var minVal;
            if(inputArray != null && inputArray['length'] != null && inputArray['length'] > 0) {
                minVal = inputArray[0];
                for(var i = 1; i < inputArray.length; i++){
                    var curSelectorVal = jsonPath(inputArray[i],"$.."+selector)[0];
                    var maxSelectorVal = jsonPath(minVal,"$.."+selector)[0];
                    if(curSelectorVal < maxSelectorVal){
                        minVal = inputArray[i];
                    }
                }
                return minVal;
            } else {
                return inputArray;
            }
        }

        self.getOverallNodeStatusFromGenerators = function () {
            var status = "--";
            var generatorDownTime;


            // For each process get the generator_info and fetch the gen_attr
            // which is having the highest connect_time. This is because
            // we are interseted only in the collector this is connected
            // to the latest.

            // From this gen_attr see if the reset_time > connect_time.

            // If yes then the process is down track it in down list.
            // Else it is up and track in uplist.

            // If any of the process is down get the least reset_time
            // from the down list and display the node as down.

            // Else get the generator with max connect_time and
            // show the status as Up.
            try{
                var genInfos = ifNull(jsonPath(d,
                    "$..ModuleServerState..generator_info"),[]);
                if(!genInfos){
                    return 'Down';
                }
                var upGenAttrs = [];
                var downGenAttrs = [];
                var isDown = false;
                $.each(genInfos,function(idx,genInfo){
                    var genAttr =
                        self.getMaxGeneratorValueInArray(genInfo,"connect_time");
                    var connTime = jsonPath(genAttr,"$..connect_time")[0];
                    var resetTime = jsonPath(genAttr,"$..reset_time")[0];
                    if(resetTime > connTime){
                        isDown = true;
                        downGenAttrs.push(genAttr);
                    } else {
                        upGenAttrs.push(genAttr);
                    }
                });
                if(!isDown){
                    var maxConnTimeGen =
                        self.getMaxGeneratorValueInArray(upGenAttrs,"connect_time");
                    var maxConnTime =
                        jsonPath(maxConnTimeGen,"$..connect_time")[0];
                    var connectTime = new XDate(maxConnTime/1000);
                    var currTime = new XDate();
                    status = 'Up since ' + diffDates(connectTime,currTime);
                } else {
                    var minResetTimeGen =
                        self.getMinGeneratorValueInArray(downGenAttrs,"reset_time");
                    var minResetTime =
                        jsonPath(minResetTimeGen,"$..reset_time")[0];
                    var resetTime = new XDate(minResetTime/1000);
                    var currTime = new XDate();
                    status = 'Down since ' + diffDates(resetTime,currTime);
                }
            }catch(e){}

            return status;
        };

        self.parseAndMergeGeneratorWithPrimaryDataForInfraNodes =
            function(response, primaryDS) {

            var genDSData = self.parseInfraGeneratorsData(response);
            var primaryData = primaryDS.getItems();
            var updatedData = [];
            // to avoid the change event getting triggered
            // copy the data into another array and use it.
            var genData = [];
            $.each(genDSData,function (idx,obj){
                genData.push(obj);
            });
            $.each(primaryData,function(i,d){
                var idx=0;
                while(genData.length > 0 && idx < genData.length){
                    if(genData[idx]['name'].split(':')[0] == d['name']){
                        d['status'] = self.getFinalNodeStatusFromGenerators(
                           genData[idx]['status'],primaryData[i]);
                        d['isGeneratorRetrieved'] = true;
                        genData.splice(idx,1);
                        break;
                    }
                    idx++;
                };
                updatedData.push(d);
            });
            primaryDS.updateData(updatedData);
        };

        self.parseAndMergeCpuStatsWithPrimaryDataForInfraNodes =
            function (response,primaryDS) {
            var statsData = self.parseCpuStatsDataToHistory10(response)
            var primaryData = primaryDS.getItems();
            var updatedData = [];
            $.each(primaryData,function(i,d){
                var idx=0;
                while(statsData.length > 0 && idx < statsData.length){
                    if(statsData[idx]['name'] == d['name']){
                        d['histCpuArr'] = self.parseUveHistoricalValues(statsData[idx],'$.value.history-10');
                        statsData.splice(idx,1);
                        break;
                    }
                    idx++;
                };
                updatedData.push(d);
            });
            primaryDS.updateData(updatedData);
        };

        self.mergeCollectorDataAndPrimaryData = function (collectorData,primaryDS){
            var collectors = ifNull(collectorData.value,[]);
            if(collectors.length == 0){
                return;
            }
            var primaryData = primaryDS.getItems();
            var updatedData = [];
            $.each(primaryData,function(i,d){
                var idx=0;
                while(collectors.length > 0 && idx < collectors.length){
                    if(collectors[idx]['name'] == d['name']){
                        var genInfos = ifNull(jsonPath(collectors[idx],
                                "$.value.CollectorState.generator_infos")[0],[]);
                        d['genCount'] = genInfos.length;
                        collectors.splice(idx,1);
                        break;
                    }
                    idx++;
                };
                updatedData.push(d);
            });
            primaryDS.updateData(updatedData);
        };

        self.parseUveHistoricalValues = function (d,path,histPath) {
            var histData;
            if(histPath != null)
                histData = getValueByJsonPath(d,histPath,[]);
            else
                histData = ifNull(jsonPath(d,path)[0],[]);
            var histDataArr = [];
            $.each(histData,function(key,value) {
                histDataArr.push([JSON.parse(key)['ts'],value]);
            });
            histDataArr.sort(function(a,b) { return a[0] - b[0];});
            histDataArr = $.map(histDataArr,function(value,idx) {
                return value[1];
            });
            return histDataArr;
        }

        self.parseCpuStatsDataToHistory10 = function(statsData){
            var ret = {};
            var retArr = [];
            if(statsData == null && statsData['data'] == null && statsData.length == 0){
                return [];
            }
            statsData = statsData['data'];
            $.each(statsData,function(idx,d){
                var source = d['Source'];
                var name = d['name'];
                var t = JSON.stringify({"ts":d['T']});
                if(name != null && source != name) {
                    source = name;//In case of TOR agents the name is the key
                }
                if(ret[source] != null && ret[source]['history-10'] != null){
                    var hist10 = ret[source]['history-10'];
                    hist10[t] = d['cpu_info.cpu_share'];
                } else {
                    ret[source] = {};
                    ret[source]['history-10'] = {};
                    ret[source]['history-10'][t] = d['cpu_info.cpu_share'];
                }
            });
            $.each(ret,function(key,val){
               var t = {};
               t["name"] = key;
               t["value"] = val;
               retArr.push(t);
            });
            return retArr;
        },

        self.isProcessStateMissing = function(dataItem) {
            var noProcessStateAlert = $.grep(dataItem['processAlerts'],function(obj,idx) {
                return obj['msg'] == infraAlertMsgs['PROCESS_STATES_MISSING'];
            });
            if(noProcessStateAlert.length > 0)
                return true;
            return false;
        };

        /**
        * ToDo: can be merged with getOverallNodeStatus
        */
        self.getFinalNodeStatusFromGenerators = function(statusFromGen,dataItem) {
            if(self.isProcessStateMissing(dataItem)) {
                return statusFromGen;
            }
            var statusFromProcessStateList = dataItem['status'];
            if(statusFromProcessStateList.search("Up") != -1){
                if(statusFromGen.search("Down") != -1){
                    return statusFromGen;
                } else {
                    return statusFromProcessStateList;
                }
            } else {
                return statusFromProcessStateList;
            }
        }

        // This function accepts the node data and returns the alerts
        // array which need to displayed in chart tooltip.
        self.getTooltipAlerts = function (data) {
            var tooltipAlerts = [];
            if (ifNull(data['alerts'],[]).length > 0) {
               $.each(data['alerts'],function(idx,obj){
                  if(obj['tooltipAlert'] != false)
                      tooltipAlerts.push({
                          label : 'Alarms',
                          value : ifNull(obj['msg'],"")
                      });
               });
            }
            return tooltipAlerts;
        };

        //Utility get the process uptime given process data
        self.getProcessUpTime = function (d) {
            var upTimeStr = noDataStr;
            if(d != null && d.process_state != null &&
                    d.process_state.toUpperCase() == "PROCESS_STATE_RUNNING") {
                if(d.last_start_time != null){
                    var upTime = new XDate(d.last_start_time/1000);
                    var currTime = new XDate();
                    upTimeStr = 'Up since ' + diffDates(upTime,currTime);
                }
            } else {
                var exitTime=0,stopTime=0;
                var currTime = new XDate();
                if(d.last_exit_time != null){
                    exitTime = d.last_exit_time;
                }
                if(d.last_stop_time != null){
                    stopTime = d.last_stop_time;
                }
                if(exitTime != 0 || stopTime != 0){
                    if(exitTime > stopTime){
                        exitTime = new XDate(exitTime/1000);
                        upTimeStr = 'Down since ' + diffDates(exitTime,currTime);
                    } else {
                        stopTime = new XDate(stopTime/1000);
                        upTimeStr = 'Down since ' + diffDates(stopTime,currTime);
                    }
                } else {
                    upTimeStr = "Down";
                }
            }
            return upTimeStr;
        };

        /*
         * Common function to retrieve the analytics messages count and size
         */
        self.getAnalyticsMessagesCountAndSize = function (d,procList){
            var count = 0,size = 0, obj = {};
            for(var key in d){
                var label = key.toUpperCase();
                $.each(procList,function(idx,proc){
                    if(label.indexOf(":"+proc.toUpperCase()+":") != -1){
                        obj[key] = d[key];
                    }
                });
            }
            var sizes =  ifNull(jsonPath(obj,"$..ModuleClientState.client_info.tx_socket_stats.bytes"),0);
            var counts = ifNull(jsonPath(obj,"$..ModuleClientState.session_stats.num_send_msg"),0);
            $.each(counts,function(i,cnt){
                count += cnt;
            });
            $.each(sizes,function(i,sze){
                size += sze;
            });
            return {count:count,size:size};
        }
        self.getAllLogLevelStats = function(d,proc,logLevelStats) {
            var allStats = [],obj = {};
            for(var key in d){
                var label = key.toUpperCase();
                if(label.indexOf(proc.toUpperCase()) != -1){
                    obj[key] = d[key];
                }
            }
            allStats =  ifNullOrEmptyObject(jsonPath(obj,"$..log_level_stats"),[]);
            if(allStats instanceof Array){
                for(var i = 0; i < allStats.length;i++){
                    if(!($.isEmptyObject(allStats[i]))){
                        if( allStats[i] instanceof Array){
                            logLevelStats = logLevelStats.concat(allStats[i]);
                        } else {
                            logLevelStats.push(allStats[i]);
                        }
                    }
                }
            }
            return logLevelStats;
        }

        //Given the data and the node type get the last log time stamp for the node
        self.getLastLogTimestamp = function (d, nodeType){
            var logLevelStats = [], lastLog, lastTimeStamp;
            var procsList = [];
            if(nodeType != null){
                if(nodeType == "control"){
                    procsList = monitorInfraConstants.controlProcsForLastTimeStamp;
                } else if (nodeType == "compute"){
                    var proces = getValueByJsonPath(d,'NodeStatus;process_status;0;module_id');
                    if(proces != null){
                        procsList = [proces];
                    } else {
                        procsList = monitorInfraConstants.computeProcsForLastTimeStamp;
                    }
                } else if (nodeType =="analytics") {
                    procsList = monitorInfraConstants.analyticsProcsForLastTimeStamp;
                } else if (nodeType =="config"){
                    procsList = monitorInfraConstants.configProcsForLastTimeStamp;
                }
                $.each(procsList,function(idx,proc){
                    logLevelStats = self.getAllLogLevelStats(d,proc,logLevelStats);
                });
            } else {
                logLevelStats = self.getAllLogLevelStats(d,"",logLevelStats);
            }

            if(logLevelStats != null){
                lastLog = self.getMaxGeneratorValueInArray(logLevelStats,"last_msg_timestamp");
                if(lastLog != null){
                    lastTimeStamp = lastLog.last_msg_timestamp;
                }
            }
            return lastTimeStamp;
        }

        /**
         * Returns the post data to be used for the reachable ip call
         */
        self.getPostDataForReachableIpsCall = function(ipPortList) {
            var list = [];
            $.each(ipPortList,function(idx,obj){
                var postObj = {ip:obj.ip,port:obj.port};
                if (null != obj['isConfig']) {
                    postObj['isConfig'] = obj['isConfig'];
                }
                list.push(postObj);
            });
            return {data:list};
        }

        /**
         * Function returns the overall node status html of monitor infra node
         * details page
         */
        self.getOverallNodeStatusForDetails = function (data){
            var statusObj = this.getNodeStatusForSummaryPages(data);
            var templateData = {result:statusObj['alerts'],showMore:true,defaultItems:1};
            return contrail.getTemplate4Id('overallNodeStatusTemplate')(templateData);
        }

        /**
         * This function takes parsed nodeData from the infra parse functions
         * and returns object with all alerts displaying in dashboard tooltip,
         * and tooltip messages array
         */
        self.getNodeStatusForSummaryPages = function (data,page) {
            var result = {},msgs = [],tooltipAlerts = [];
            for(var i = 0;i < data['alerts'].length; i++) {
                if(data['alerts'][i]['tooltipAlert'] != false) {
                    tooltipAlerts.push(data['alerts'][i]);
                    msgs.push(data['alerts'][i]['msg']);
                }
            }
            //Status is pushed to messages array only if the status is "UP"
            //and tooltip alerts(which are displaying in tooltip) are zero
            if(ifNull(data['status'],"").indexOf('Up') > -1 && tooltipAlerts.length == 0) {
                msgs.push(data['status']);
                tooltipAlerts.push({msg:data['status'],sevLevel:sevLevels['INFO']});
            } else if(ifNull(data['status'],"").indexOf('Down') > -1) {
                //Need to discuss and add the down status
                //msgs.push(data['status']);
                //tooltipAlerts.push({msg:data['status'],sevLevel:sevLevels['ERROR']})
            }
            result['alerts'] = tooltipAlerts;
            result['nodeSeverity'] = data['alerts'][0] != null ?
                    data['alerts'][0]['sevLevel'] : sevLevels['INFO'];
            result['messages'] = msgs;
             var statusTemplate = contrail.getTemplate4Id('statusTemplate');
            if(page == 'summary')
                return statusTemplate({sevLevel:result['nodeSeverity'],
                    sevLevels:sevLevels});
            return result;
        }
        /**
        * This function takes parsed nodeData from the infra parse functions and
        * returns the status column text/html for the summary page grid
        */
        self.getNodeStatusContentForSummayPages = function(data,type){
            var obj = getNodeStatusForSummaryPages(data);
            if(obj['alerts'].length > 0) {
                if(type == 'html')
                    return '<span title="'+obj['messages'].join(',&#10 ')+
                        '" class=\"infra-nodesatus-text-ellipsis\">'+
                        obj['messages'].join(',')+'</span>';
                else if(type == 'text')
                    return obj['messages'].join(',');
            } else {
                if(type == 'html')
                    return "<span> "+data['status']+"</span>";
                else if(type == 'text')
                    return data['status'];
            }
        }

        /**
         * Util functions to create the footer links in the monitor infra details pages
         */
        /*self.createFooterLinks = function (parent, config) {
            var template = contrail.getTemplate4Id('monitor-footer-links-template');
            $('#monitor-footer-links-template').remove();
            $(parent).append(template(config));
            if(config.onIntrospectClick != null) {
                $('#linkIntrospect').off('click');
                $('#linkIntrospect').click(config.onIntrospectClick);
            }
            if(config.onStatusClick != null) {
                $('#linkStatus').off('click');
                $('#linkStatus').click(config.onStatusClick);
            }
        }*/

        self.getSandeshPostData = function(ip,port,url) {
            var postData;
            var obj = {};
            if(ip != null && ip != ""){
                obj["ip"] = ip;
            } else {
                return null;
            }
            if(port != null && port != ""){
                obj["port"] = port;
            }
            if(url != null && url != ""){
                obj["url"] = url;
            }
            postData = {data:obj};
            return postData;
        }

        self.createMonInfraDetailsFooterLinks = function (parent, ipList, port) {
            var ipDeferredObj = $.Deferred();
            var ipPortList = [];
            $.each(ipList,function(i,d) {
               ipPortList.push({
                   "ip" : d,
                   "port" : port
               });
            });
            self.getReachableIpFromList(ipPortList,ipDeferredObj);
            ipDeferredObj.done (function (res) {
                if(res != null) {
                    self.
                        createFooterLinks(parent,
                    [
                      {
                          name:'introspect',
                          onClick: function () {
                                    monitorInfraUtils.
                                        onIntrospectLinkClick(res.ip,
                                                res.port);
                                }
                      },
                      {
                          name:'status',
                          onClick : function () {
                                    monitorInfraUtils.
                                        onStatusLinkClick(res.ip);
                                }
                      }
                    ]);
                }
            });
        };

        self.createConfigNodeDetailsFooterLinks = function (parent, ipList) {
            var apiIpPortsDeferredObj = $.Deferred();
            self.getApiServerIpPorts (apiIpPortsDeferredObj);
            apiIpPortsDeferredObj.done (function (apiServerDetails) {
                if (apiServerDetails != null) {
                    var cnt = apiServerDetails.length;
                    var ipPortList = [];
                    for (var i = 0 ; i < cnt; i++) {
                        ipPortList.push({
                            "ip"   : apiServerDetails[i]['ip-address'],
                            "port" : apiServerDetails[i]['port'],
                            "isConfig" : true
                        })
                    }
                    var ipDeferredObj = $.Deferred();
                    self.getReachableIpFromList(ipPortList,
                                                ipDeferredObj);
                    ipDeferredObj.done (function (res){
                        var footerlinks = [];
                        if (res != null) {
                            footerlinks.push({
                              name:'introspect',
                              onClick: function () {
                                        monitorInfraUtils.
                                            onConfigLinkClick(res.ip,
                                                    res.port);
                                    }
                            });
                            footerlinks.push({
                                name:'status',
                                onClick : function () {
                                          monitorInfraUtils.
                                              onStatusLinkClick(res.ip);
                                      }
                            });
                        }
                        self.createFooterLinks(parent,footerlinks);
                    });
                }
            });
        };

        /**
         * Try to get the port from discovery.
         * If not found get it from the config.global.js and return
         */
        self.getApiServerIpPorts = function (deferredObj) {
            var apiServersInfo = [];
            //If discovery is enabled fetch api server details from discovery
            if (getValueByJsonPath(globalObj,
                    'webServerInfo;discoveryEnabled',true)) {
                $.ajax({
                    url:'/api/tenant/monitoring/discovery-service-list',
                    type:'GET',
                }).done(function(result) {
                    var apiServers = getValueByJsonPath(result,
                            'ApiServer;data;ApiServer', []);
                    deferredObj.resolve(apiServers);
                    return;
                }).fail(function(result) {
                    deferredObj.resolve(null);
                });
            } else {
              //Not found in discovery so check in config
                var configServer = getValueByJsonPath(globalObj,
                        'webServerInfo;configServer', null);
                var apiServerPort,apiServerIp;
                if (configServer != null) {
                    apiServerPort = configServer.port;
                    apiServerIp = configServer.ip;
                }
                apiServersInfo.push({
                    "ip-address":apiServerIp,
                    "port":apiServerPort
                });
                deferredObj.resolve(apiServersInfo);
            }
        }

        self.createFooterLinks = function (parent, config) {
            var template = contrail.
                getTemplate4Id('monitor-infra-details-footer-links-template');
            $('#monitor-infra-details-footer-links-template').remove();
            $(parent).append(template(config));
            $.each(config,function(i,d){
                var linkDiv = '<a id="mon_infra_footer_link_'+
                                d.name +'" class="pull-right" >'+
                                cowl.getFirstCharUpperCase(d.name) +'</a>';
                $(parent).find('.footer-links').append(linkDiv);
                if(d.onClick != null) {
                    $('#mon_infra_footer_link_' + d.name).off('click');
                    $('#mon_infra_footer_link_'  + d.name).click(d.onClick);
                }
            });
        }

        self.onIntrospectLinkClick = function (nodeIp, introspectPort) {
            window.open('/proxy?proxyURL=http://'+nodeIp+':'+ introspectPort +
                    '&indexPage', '_blank');
        }

        self.onConfigLinkClick = function (nodeIp, introspectPort) {
            window.open('/proxy?proxyURL=http://'+nodeIp+':'+ introspectPort , '_blank');
        }

        self.onStatusLinkClick = function (nodeIp) {
            var leftColumnContainer = '#left-column-container';
            require(['core-basedir/js/views/LoginWindowView','loginwindow-model'],function(LoginWindowView,LoginWindowModel) {
                var loginWindow = new LoginWindowView();
                loginWindow.model = new LoginWindowModel();
                loginWindow.renderLoginWindow({
                    data:{
                        ip: nodeIp
                    },
                    callback : function (response) {
                        var htmlString = '<pre>' +
                            response + '</pre>';
                        $('.contrail-status-view')
                            .html(htmlString);
                        $(leftColumnContainer)
                            .find('.widget-box')
                            .find('.list-view').hide();
                        $(leftColumnContainer)
                            .find('.widget-box')
                            .find('.advanced-view').hide();
                        $(leftColumnContainer)
                            .find('.widget-box')
                            .find('.contrail-status-view').show();
                    }
                });
            });
        }

        self.getReachableIpFromList = function (ipPortList,deferredObj){
            var res;
            if(ipPortList != null && ipPortList.length > 0){
                var postData = self.getPostDataForReachableIpsCall(ipPortList);
                $.ajax({
                    url:'/api/service/networking/get-network-reachable-ip',
                    type:'POST',
                    data:postData
                }).done(function(result) {
                    if(result == null || $.isEmptyObject(result)) {
                        deferredObj.resolve(null);
                    } else {
                        deferredObj.resolve(result);
                    }
                }).fail(function(err) {
                    deferredObj.resolve(null);
                });
            } else {
                deferredObj.resolve(null);
            }
        }

        //Default tooltip render function for buckets
        self.getNodeTooltipContentsForBucket = function(currObj,formatType) {
            var nodes = currObj['children'];
            //var avgCpu = d3.mean(nodes,function(d){return d.x});
            //var avgMem = d3.mean(nodes,function(d){return d.y});
            var tooltipContents = [
                {label:'', value: 'No. of Nodes: ' + nodes.length},
                {label:'Avg. ' + ctwl.TITLE_CPU, value:$.isNumeric(currObj['x']) ? currObj['x'].toFixed(2)  : currObj['x']},
                {label:'Avg. Memory', value:$.isNumeric(currObj['y']) ? formatBytes(currObj['y'] * 1024* 1024) : currObj['y']}
            ];
            if(formatType == 'simple') {
                return tooltipContents;
            } else {
                return {
                    content: {
                        iconClass: false,
                        info: tooltipContents.slice(1),
                        actions: [
                            {
                                type: 'link',
                                text: 'View',
                                iconClass: 'icon-external-link'
                                // callback: onScatterChartClick
                            }
                        ]
                    },
                    title: {
                        name: tooltipContents[0]['value'],
                        type: 'Virtual Router'
                    }
                }
            }
        }
        //Default tooltip contents to show for infra nodes
        self.getNodeTooltipContents = function(currObj,cfg) {
            var tooltipContents = [
                {label:'Host Name', value: currObj['name']},
                {label:'Version', value:currObj['version']},
                {label: ctwl.TITLE_CPU, value:$.isNumeric(currObj['cpu']) ? currObj['cpu']  : '-'},
                {label:'Memory', value:$.isNumeric(currObj['memory']) ? formatMemory(currObj['memory']) : currObj['memory']}
            ];
            //Get tooltipAlerts
            tooltipContents = tooltipContents.concat(self.getTooltipAlerts(currObj));
            var cfg = ifNull(cfg,{});
            if(cfg['formatType'] == 'simple') {
                return tooltipContents;
            } else {
                return {
                    content: {
                        iconClass : false,
                        info: tooltipContents.slice(1),
                        actions: [
                            {
                                type: 'link',
                                text: 'View',
                                iconClass: 'icon-external-link',
                                callback: cfg.onClickHandler
                            }
                        ]
                    },title : {
                        name: tooltipContents[0]['value'],
                        type: currObj['display_type']
                    }
                }
            }
        }

        self.getControlIpAddresses = function (data,pageType) {
            var ips;
            var configip = noDataStr;
            var ipString = "";
            var isConfigMismatch = true;
            try{
                ips = ifNull(jsonPath(data,'$..bgp_router_ip_list')[0],[]);
                configip = jsonPath(data,'$..ConfigData..bgp_router_parameters.address')[0];
                $.each(ips, function (idx, ip){
                    if(ip == configip){
                        isConfigMismatch = false;
                    }
                    if(idx+1 == ips.length) {
                        ipString = ipString + ip;
                    } else {
                        ipString = ipString + ip + ', ';
                    }
                });
                if(configip != null && isConfigMismatch){
                    if(ipString != ""){
                        ipString += ","
                    }
                    if(pageType == "summary"){
                        ipString = ipString +  configip ;
                    } else if (pageType == "details"){
                        ipString = ipString + "<span class='text-error' title='Config IP mismatch'> "+ configip +"</span>";
                    }
                }
            } catch(e){}
            return ipString;
        }

        self.getDisplayNameForVRouterType = function (d){
            var retType = '';
            var type = getValueByJsonPath(d,'vRouterType','hypervisor');
            var platform = getValueByJsonPath(d,'vRouterPlatform','');
            switch (type){
                case 'tor-agent':
                    retType = 'TOR Agent';
                    break;
                case 'tor-service-node':
                    retType = 'TOR Service Node';
                    break;
                case 'embedded':
                    retType = 'Embedded';
                    break;
                case 'hypervisor':
                    retType = 'Hypervisor';
                    break;
            }
            if(platform == monitorInfraConstants.HOST_DPDK) {
                retType += ' (DPDK)'
            }
            return retType;
        }

        function onPrevNextClick(obj,cfg) {
            var gridSel = $(cfg['gridSel']);
            if(gridSel.length == 0) {
                return;
            }
            var newAjaxConfig = "";
            var cfg = ifNull(cfg,{});
            var parseFn = cfg['parseFn'];
            var paginationInfo = ifNull(cfg['paginationInfo'],{});
            //Populate last_page based on entries and first_page
            paginationInfo['last_page'] = paginationInfo['first_page'];
            var xStrFormat = /(begin:)\d+(,end:)\d+(,table:.*)/;
            var entriesFormat = /.*\/(\d+)/;
            var totalCnt;
            if(paginationInfo['entries'] != null && paginationInfo['entries'].match(entriesFormat) instanceof Array) {
                var patternResults = paginationInfo['entries'].match(entriesFormat);
                //Get the total count from entries as with some filter applied,total count will not be same as table size
                totalCnt = parseInt(patternResults[1]);
            }
            if(paginationInfo['last_page'] != null && paginationInfo['last_page'].match(xStrFormat) instanceof Array) {
                if(totalCnt == null) {
                    totalCnt = parseInt(paginationInfo['table_size']);
                }
                paginationInfo['last_page'] = paginationInfo['last_page'].replace(xStrFormat,'$1' + (totalCnt - (totalCnt%100)) + '$2' + ((totalCnt - (totalCnt%100)) + 99)+ '$3');
            }
            var getUrlFn = ifNull(cfg['getUrlFn'],$.noop);
            var dirType = ifNull(cfg['dirType'],'');
            var gridInst = gridSel.data('contrailGrid');
            var urlObj = getUrlFn();
            var urlStr = null,xKey = null;
            if(dirType == 'next') {
                xKey = 'next_page';
            } else if(dirType == 'prev') {
                xKey = 'prev_page';
            } else if(dirType == 'first') {
                xKey = 'first_page';
            } else if(dirType == 'last') {
                xKey = 'last_page';
            }
            if(paginationInfo[xKey] != null) {
                urlObj['params']['x'] = paginationInfo[xKey];
            }
            if(typeof(urlObj) == 'object') {
                urlStr = urlObj['url'] + '?' + $.param(urlObj['params']);
            }
            newAjaxConfig = {
                        url: urlStr,
                        type:'Get'
                };
            if(gridInst != null) {
                // gridInst.showGridMessage('loading');
                // gridInst.setRemoteAjaxConfig(newAjaxConfig);
                // reloadGrid(gridInst);
                // Issue an ajax call to get the prev/next set of records and set it on dataView
                $.ajax(newAjaxConfig).done(function(response) {
                    var retData = response;
                    if(typeof(parseFn) == 'function') {
                        retData = parseFn(response);
                    }
                    if(gridInst._dataView != null)
                        gridInst._dataView.setData(retData);
                });
            }
        }

        self.getIntrospectPaginationInfo = function(response) {
            var paginationInfo = {};
            var paginationInfo = jsonPath(response,'$..Pagination');
            if(paginationInfo instanceof Array && paginationInfo.length > 0) {
                paginationInfo = getValueByJsonPath(paginationInfo,'0;req;PageReqData');
            }
            return paginationInfo;
        }

        self.updateGridTitleWithPagingInfo = function(gridSel,pagingInfo) {
            var gridHeaderTextElem = $(gridSel).find('.grid-header-text');
            var pageInfoTitle = '';
            var entriesText = getValueByJsonPath(pagingInfo,'entries','');
            var extractedData;
            if(typeof(entriesText) == 'string' ) {
                extractedData = entriesText.match(/(\d+)-(\d+)\/(\d+)/);
            }

            if(extractedData instanceof Array) {
                var startCnt = parseInt(extractedData[1]);
                var endCnt = parseInt(extractedData[2]);
                var totalCnt = parseInt(extractedData[3]);
                pageInfoTitle = contrail.format(' ({0} - {1} of {2})',startCnt+1,endCnt+1,totalCnt);
            } else {
                if(pagingInfo != null && pagingInfo['entries'] != null) {
                    pageInfoTitle = ' (' + pagingInfo['entries'] + ')';
                }
            }
            if(gridHeaderTextElem.find('span').length == 0) {
                gridHeaderTextElem.append($('<span>',{}));
            } else {
                gridHeaderTextElem.find('span').text('');
            }
            gridHeaderTextElem.find('span').text(pageInfoTitle);
        }

        self.bindGridPrevNextListeners = function(cfg) {
            var cfg = ifNull(cfg,{});
            var gridSel = cfg['gridSel'];
            var paginationInfo;
            gridSel.find('i.icon-step-forward').parent().click(function() {
                paginationInfo = cfg['paginationInfoFn']();
                //Ignore if already on first page
                if(paginationInfo['last_page'] == '') {
                    return;
                }
                onPrevNextClick(cfg['obj'], {
                    dirType: 'last',
                    gridSel: gridSel,
                    paginationInfo: paginationInfo,
                    getUrlFn: cfg['getUrlFn'],
                    parseFn: cfg['parseFn']
                });
            });
            gridSel.find('i.icon-forward').parent().click(function() {
                paginationInfo = cfg['paginationInfoFn']();
                //Ignore if already on first page
                if(paginationInfo['next_page'] == '') {
                    return;
                }
                onPrevNextClick(cfg['obj'], {
                    dirType: 'next',
                    gridSel: gridSel,
                    paginationInfo: paginationInfo,
                    getUrlFn: cfg['getUrlFn'],
                    parseFn: cfg['parseFn']
                });
            });
            gridSel.find('i.icon-step-backward').parent().click(function() {
                paginationInfo = cfg['paginationInfoFn']();
                //Ignore if already on last page
                if(paginationInfo['first_page'] == '') {
                    return;
                }
                onPrevNextClick(cfg['obj'], {
                    dirType: 'first',
                    gridSel: gridSel,
                    paginationInfo: paginationInfo,
                    getUrlFn: cfg['getUrlFn'],
                    parseFn: cfg['parseFn']
                });
            });
            gridSel.find('i.icon-backward').parent().click(function() {
                paginationInfo = cfg['paginationInfoFn']();
                //Ignore if already on last page
                if(paginationInfo['prev_page'] == '') {
                    return;
                }
                onPrevNextClick(cfg['obj'], {
                    dirType: 'prev',
                    gridSel: gridSel,
                    paginationInfo: paginationInfo,
                    getUrlFn: cfg['getUrlFn'],
                    parseFn: cfg['parseFn']
                });
            });
            gridSel.parent().find('.btn-display').click(function() {
                paginationInfo = cfg['paginationInfoFn']();
                onPrevNextClick(cfg['obj'], {
                    gridSel: gridSel,
                    paginationInfo: paginationInfo,
                    getUrlFn: cfg['getUrlFn'],
                    parseFn: cfg['parseFn']
                });
            });
            gridSel.parent().find('.btn-reset').click(function() {
                if(typeof(cfg['resetFn']) == 'function')
                    cfg['resetFn']();
                onPrevNextClick(cfg['obj'],{
                    gridSel: gridSel,
                    paginationInfo: paginationInfo,
                    getUrlFn: cfg['getUrlFn'],
                    parseFn: cfg['parseFn']
                });
            });
        }
        self.vRouterBubbleSizeFn = function(mergedNodes) {
            return d3.max(mergedNodes,function(d) {
                return d.size;
            });
        },
        self.onvRouterDrillDown = function(currObj) {
            layoutHandler.setURLHashParams({
                type: "vRouter",
                view: "details",
                focusedElement: {
                    node: currObj['name'],
                    tab: 'details'
                }
            }, {
                p: 'mon_infra_vrouter'
            });
        },
        self.onControlNodeDrillDown = function(currObj) {
            layoutHandler.setURLHashParams({
                node: currObj['name'],
                tab: ''
            }, {
                p: 'mon_infra_control'
            });
        },
        self.onAnalyticNodeDrillDown = function(currObj) {
            layoutHandler.setURLHashParams({
                node: currObj['name'],
                tab: ''
            }, {
                p: 'mon_infra_analytics'
            });
        },
        self.onConfigNodeDrillDown = function(currObj) {
            layoutHandler.setURLHashParams({
                node: currObj['name'],
                tab: ''
            }, {
                p: 'mon_infra_config'
            });
        },
        self.onDbNodeDrillDown = function(currObj) {
            layoutHandler.setURLHashParams({
                node: currObj['name'],
                tab: ''
            }, {
                p: 'mon_infra_database'
            });
        },
        self.vRouterTooltipFn = function(currObj,formatType) {
            if(currObj['children'] != null && currObj['children'].length == 1)
                return self.getNodeTooltipContents(currObj['children'][0], {
                    formatType: formatType,
                    onClickHandler: monitorInfraUtils.onvRouterDrillDown
                });
            else
                return self.getNodeTooltipContents(currObj, {
                    formatType: formatType,
                    onClickHandler: monitorInfraUtils.onvRouterDrillDown
                });
        },
        self.vRouterBucketTooltipFn = function(currObj,formatType) {
            return self.getNodeTooltipContentsForBucket(currObj,formatType);
        },
        self.controlNodetooltipFn = function(currObj,formatType) {
            return self.getNodeTooltipContents(currObj,formatType);
        },
        self.analyticNodeTooltipFn = function(currObj,formatType) {
            var tooltipContents = [];
            if(currObj['pendingQueryCnt'] != null && currObj['pendingQueryCnt'] > 0)
                tooltipContents.push({label:'Pending Queries', value:currObj['pendingQueryCnt']});
            return getNodeTooltipContents(currObj,formatType).concat(tooltipContents);
        },
        self.configNodeTooltipFn = function(currObj,formatType) {
            return getNodeTooltipContents(currObj,formatType);
        },
        self.dbNodeTooltipFn = function(currObj,formatType) {
            return getDbNodeTooltipContents(currObj,formatType);
        },

        //Start: Handlebar register helpers
        Handlebars.registerPartial('statusTemplate',$('#statusTemplate').html());

        Handlebars.registerHelper('renderStatusTemplate', function(sevLevel, options) {
            var selector = '#statusTemplate',
                source = $(selector).html(),
                html = Handlebars.compile(source)({sevLevel:sevLevel,sevLevels:sevLevels});
            return new Handlebars.SafeString(html);
        });

        Handlebars.registerHelper('getInfraDetailsPageCPUChartTitle',function() {
            return infraDetailsPageCPUChartTitle;
        })

        //End: Handlebar register helpers
        self.getMaxGeneratorValueInArray = function (inputArray,selector) {
            var maxVal;
            if(inputArray != null && inputArray['length'] != null && inputArray['length'] > 0) {
                maxVal = inputArray[0];
                for(var i = 1; i < inputArray.length; i++){
                    var curSelectorVal = jsonPath(inputArray[i],"$.."+selector)[0];
                    var maxSelectorVal = jsonPath(maxVal,"$.."+selector)[0];
                    if(curSelectorVal > maxSelectorVal){
                        maxVal = inputArray[i];
                    }
                }
                return maxVal;
            } else {
                return inputArray;
            }
        }

        self.getPostDataForCpuMemStatsQuery = function (options) {
            var dsName = options.nodeType,
                moduleType = options.moduleType,
                node = options.node;
            var postData = {
                    pageSize:10000,
                    page:1,
//                    timeRange:600,
                    tgUnits:'secs',
                    fromTimeUTC:'now-2h',
                    toTimeUTC:'now',
                    async:true,
                    queryId: generateQueryUUID(),
                    reRunTimeRange:600,
                    select:'Source, T, cpu_info.cpu_share, cpu_info.mem_res, cpu_info.module_id',
                    groupFields:['Source'],
                    plotFields:['cpu_info.cpu_share']
            }
            if(options.page != null && options.page == "summary") {
                postData['fromTimeUTC'] = 'now-15m';
            }
            if (dsName == monitorInfraConstants.CONTROL_NODE) {
                postData['table'] = 'StatTable.ControlCpuState.cpu_info';
                if (moduleType != null && moduleType != '') {
                    postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-control)';
                } else {
                    postData['where'] = '(cpu_info.module_id = contrail-control)';
                }
            } else if (dsName == monitorInfraConstants.COMPUTE_NODE) {
                postData['table'] = 'StatTable.ComputeCpuState.cpu_info';
                if (moduleType != null && moduleType != '') {
                    if(moduleType == 'vRouterAgent') {
                        postData['select'] = 'Source, name, T, cpu_info.cpu_share, cpu_info.mem_res';
                    } else if (moduleType == 'vRouterSystem') {
                        postData['select'] = 'Source, name, T, cpu_info.one_min_cpuload, cpu_info.used_sys_mem';
                    } else if (moduleType == 'vRouterBandwidth') {
                        postData['table'] = 'StatTable.VrouterStatsAgent.phy_if_band';
                        postData['select'] = 'Source, name, T=, phy_if_band.in_bandwidth_usage, phy_if_band.out_bandwidth_usage';
                        postData['tgValue'] = 60;
                    } else if (moduleType == 'vRouterFlowRate') {
                        postData['table'] = 'StatTable.VrouterStatsAgent.flow_rate';
                        postData['select'] = 'Source, name, T=, MAX(flow_rate.active_flows)';
                        postData['tgValue'] = 60;
                        postData['plotFields'] = ['MAX(flow_rate.active_flows)'];
                    }
                    postData['where'] = '(Source = '+ node +' OR name = '+ node +')';
                } else {
                    postData['select'] = 'Source, name, T, cpu_info.cpu_share, cpu_info.mem_res';
                    postData['where'] = '';
                }
            } else if (dsName == monitorInfraConstants.ANALYTICS_NODE) {
                postData['table'] = 'StatTable.AnalyticsCpuState.cpu_info';
                postData['select'] = 'Source, T, cpu_info.cpu_share, cpu_info.mem_res';
                if (moduleType != null && moduleType != '') {
                    if(moduleType == 'analyticsCollector') {
                        postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-collector)';
                    } else if (moduleType == 'analyticsQE') {
                        postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-query-engine)';
                    } else if (moduleType == 'analyticsAnalytics') {
                        postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-analytics-api)';
                    }
                } else {
                    postData['where'] = '(cpu_info.module_id = contrail-collector)';
                }
            } else if (dsName == monitorInfraConstants.CONFIG_NODE) {
                postData['table'] = 'StatTable.ConfigCpuState.cpu_info';
                if (moduleType != null && moduleType != '') {
                    if(moduleType == 'configAPIServer') {
                        postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-api)';
                    } else if (moduleType == 'configServiceMonitor') {
                        postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-svc-monitor)';
                    } else if (moduleType == 'configSchema') {
                        postData['where'] = '(Source = '+ node +' AND cpu_info.module_id = contrail-schema)';
                    }
                } else {
                    postData['where'] = '(cpu_info.module_id = contrail-api)';
                }
            } else if (dsName == monitorInfraConstants.DATABASE_NODE) {
                postData['table'] = 'StatTable.DatabaseUsageInfo.database_usage';
                postData['select'] = 'Source, T, database_usage.disk_space_used_1k, database_usage.analytics_db_size_1k';
                postData['plotFields'] = 'database_usage.disk_space_used_1k';
                postData['where'] = '(Source = '+ node +')';
            }
            return postData;
        };

        self.filterTORAgentData = function (data) {
            if(data == null) {
                return [];
            }
            var ret = [];
            $.each(data,function(i,d){
                if (d['Source'] == d['name']) {
                    ret.push(d);
                }
            });
            return ret;
        };

        self.getComputeNodeDetails = function(deferredObj,hostname) {
            $.ajax({
                url: contrail.format(monitorInfraConstants.monitorInfraUrls['VROUTER_DETAILS'] , hostname,true)
            }).done(function(result) {
                deferredObj.resolve(result);
            });
        }
        self.getIPOrHostName = function(obj) {
            return (obj['ip'] == noDataStr) ? obj['name'] : obj['ip'];
        }


        self.getUnderlayPRouterInterfaceTabViewConfig = function (viewConfig) {
            return {
                elementId: ctwc.UNDERLAY_PROUTER_INTERFACE_TAB_ID,
                title: ctwl.UNDERLAY_PROUTER_INTERFACES_TITLE,
                view: "GridView",
                viewConfig: {
                    elementConfig:{
                        header: {
                            title: {
                                text: contrail.format('Interfaces ( {0} )',
                                    viewConfig['hostName'])
                            },
                            defaultControls: {
                                collapseable: true,
                                exportable: true,
                                refreshable: false,
                                searchable: true
                            }
                        },
                        body: {
                            options: {
                                autoRefresh: false,
                                checkboxSelectable: false,
                                detail: ctwu.getDetailTemplateConfigToDisplayRawJSON(),
                                fixedRowHeight: 30
                            },
                            dataSource: {
                                data: viewConfig['data']
                            }
                        },
                        columnHeader: {
                            columns: [{
                                field:'ifDescr',
                                name:'Name',
                                minWidth: 150,
                            },{
                                field:'ifAdminStatus',
                                name:'Status',
                                minWidth: 100,
                                formatter:function(r,c,v,cd,dc) {
                                    var adminStatus =
                                        getValueByJsonPath(dc,'raw_json;ifAdminStatus','-'),
                                        operStatus =
                                        getValueByJsonPath(dc,'raw_json;ifOperStatus','-');
                                    if(adminStatus == 1 && operStatus == 1) {
                                        return 'Up';
                                    } else if (adminStatus == 1 && operStatus != 1) {
                                        return 'Oper Down';
                                    } else if (adminStatus != 1 && operStatus != 1) {
                                        return 'Admin Down';
                                    } else {
                                        return '-';
                                    }
                                }
                            },{
                                field:'ifPhysAddress',
                                name:'MAC Address',
                                minWidth:150,
                            },{
                                field:'ifIndex',
                                name:'Index',
                                minWidth: 150
                            },{
                                field:'bandwidth',
                                name:'Traffic (In/Out)',
                                minWidth:150,
                                formatter:function(r,c,v,cd,dc) {
                                    return contrail.format("{0} / {1}",formatBytes(dc['ifInOctets']),formatBytes(dc['ifOutOctets']));
                                }
                            }]
                        }
                    }
                },
            }
        };

        self.getUnderlayDetailsTabViewConfig = function(viewConfig) {
            return {
                elementId: ctwc.UNDERLAY_DETAILS_TAB_ID,
                title: ctwl.TITLE_DETAILS,
                view: "DetailsView",
                viewConfig: {
                    data: viewConfig.data,
                    templateConfig: monitorInfraUtils.
                        getUnderlayDetailsTabTemplateConfig(viewConfig.data),
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                },
            }
        };

        self.getUnderlayDetailsTabTemplateConfig = function(data) {
            return {
                advancedViewOptions: false,
                templateGenerator: 'RowSectionTemplateGenerator',
                templateGeneratorConfig: {
                    rows: [
                        {
                            templateGenerator: 'ColumnSectionTemplateGenerator',
                            templateGeneratorConfig: {
                                columns: [
                                    {
                                        class: 'span6',
                                        rows: [
                                            {
                                                title: contrail.format('{0} ( {1} )',
                                                   ctwl.UNDERLAY_PROUTER_DETAILS,
                                                   data.hostName),
                                                templateGenerator:
                                                    'BlockListTemplateGenerator',
                                                templateGeneratorConfig: [
                                                    {
                                                        key: 'hostName',
                                                        label: 'Hostname',
                                                        templateGenerator:
                                                            'TextGenerator'
                                                    },{
                                                        key: 'description',
                                                        templateGenerator:
                                                            'TextGenerator'
                                                    },{
                                                        key: 'intfCnt',
                                                        templateGenerator:
                                                            'LinkGenerator',
                                                        valueClass: 'intfCnt',
                                                        templateGeneratorConfig: {
                                                            formatter: 'link',
                                                            params: {}
                                                        }
                                                    },{
                                                        key: 'managementIP',
                                                        label: 'Management IP',
                                                        templateGenerator:
                                                            'TextGenerator',
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                    ]
                }
            }
        };

        self.getTrafficStatisticsTabViewConfig = function (data) {
            var ajaxConfig = {};
            var endpoints = ifNull(data['endpoints'],[]);
            var sourceType = getValueByJsonPath(data,'sourceElement;node_type','-');
            var targetType = getValueByJsonPath(data,'targetElement;node_type','-');
            var view = 'LineWithFocusChartView', modelMap = null;
            var viewConfig = {}, viewPathPrefix, app;
            if(sourceType == ctwc.PROUTER && targetType == ctwc.PROUTER) {
                var postData = {
                        "data": {
                             "endpoints": endpoints,
                             "sampleCnt": 150,
                             "minsSince": 180
                    }
                };
                ajaxConfig = {
                    url: '/api/tenant/networking/underlay/prouter-link-stats',
                    type: 'POST',
                    "data": JSON.stringify(postData),
                };
                viewConfig.view = view;
                viewConfig.link = ctwc.PROUTER;
                viewConfig.modelConfig = {};
                viewConfig.modelConfig.remote = {
                    ajaxConfig: ajaxConfig,
                };
            } else if(sourceType == ctwc.PROUTER && targetType == ctwc.VROUTER) {
                var vrouter = (sourceType == ctwc.VROUTER) ?
                    data['sourceElement']['name']: data['targetElement']['name'];
                var params = {
                    minsSince: 60,
                    sampleCnt: 120,
                    useServerTime: true,
                    vrouter: vrouter,
                };
                ajaxConfig = {
                    url: '/api/tenant/networking/underlay/vrouter/stats?'+$.param(params)
                };
                viewConfig.view = view;
                viewConfig.link = ctwc.VROUTER;
                viewConfig.parseFn = ctwp.parseTrafficLineChartData;
                viewConfig.modelConfig = {};
                viewConfig.modelConfig.remote = {
                     ajaxConfig: ajaxConfig,
                     dataParser: function (response) {
                         return [response];
                     }
                };
                viewConfig.widgetConfig = {
                        view: 'WidgetView',
                        elementId: ctwc.UNDERLAY_TRAFFICSTATS_TAB_ID+ '-widget',
                        viewConfig: {
                            header: {
                                title:
                                    contrail.format('Traffic Statistics of {0}',vrouter),
                            },
                            controls: {
                                top: {
                                    default: {
                                        collapseable: true,
                                    }
                                }
                            }
                        }
                    }
            } else if(sourceType == ctwc.VIRTUALMACHINE ||
                    targetType == ctwc.VIRTUALMACHINE) {
                var instanceUUID = getValueByJsonPath(data, 'targetElement;name','-');
                var vmName = getValueByJsonPath(data,
                    'targetElement;more_attributes;vm_name','-');
                var modelKey = ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID);
                view = 'InstanceTrafficStatsView';
                app = cowc.APP_CONTRAIL_CONTROLLER,
                viewPathPrefix = 'monitor/networking/ui/js/views/';
                modelMap = {};
                modelMap[modelKey] =
                    ctwvc.getInstanceTabViewModelConfig(instanceUUID);
                viewConfig.modelKey = modelKey;
                viewConfig.parseFn = ctwp.parseTrafficLineChartData;
                viewConfig.link = ctwc.VIRTUALMACHINE;
                viewConfig.widgetConfig = {
                    view: 'WidgetView',
                    elementId: ctwc.UNDERLAY_TRAFFICSTATS_TAB_ID+ '-widget',
                    viewConfig: {
                        header: {
                            title:
                                contrail.format('Traffic Statistics of {0}',vmName),
                        },
                        controls: {
                            top: {
                                default: {
                                    collapseable: true,
                                }
                            }
                        }
                    }
                }
            }
            return {
                view: view,
                app: app,
                viewPathPrefix: viewPathPrefix,
                elementId: ctwc.UNDERLAY_TRAFFICSTATS_TAB_ID,
                title: ctwl.TITLE_TRAFFIC_STATISTICS,
                viewConfig: viewConfig,
                modelMap: modelMap
            };
        },

        self.parsePRouterLinkStats = function (response) {
            var result = [];
            for(var i = 0; i < response.length; i++) {
                var rawFlowData = response[i];
                var lclData = ifNull(rawFlowData[0],{});
                var rmtData = ifNull(rawFlowData[1],{});
                var lclFlows =
                    getValueByJsonPath(lclData,'flow-series;value',[]);
                var rmtFlows =
                    getValueByJsonPath(rmtData,'flow-series;value',[]),
                    chartTitle,
                    lclNodeName =
                        getValueByJsonPath(lclData,'summary;name','-'),
                    lclInfName =
                        getValueByJsonPath(lclData,'summary;if_name','-'),
                    rmtNodeName =
                        getValueByJsonPath(rmtData,'summary;name','-'),
                    rmtIntfName =
                        getValueByJsonPath(rmtData,'summary;if_name','-');

                chartTitle = contrail.format('Traffic Statistics of link {0} ({1}) -- {2} ({3})',
                                lclNodeName,lclInfName,rmtNodeName,rmtIntfName);
                var inPacketsLocal = {
                    key: contrail.format('{0} ({1})',lclNodeName,lclInfName),
                        values:[]
                },
                    inPacketsRemote = {
                        key: contrail.format('{0} ({1})',rmtNodeName,rmtIntfName),
                        values:[]
                };
                for(var j = 0; j < lclFlows.length; j++) {
                    var lclFlowObj = lclFlows[j];
                    inPacketsLocal['values'].push({
                        x: Math.floor(lclFlowObj['T=']/1000),
                        y: ifNull(lclFlowObj['SUM(ifStats.ifInPkts)'],0)
                    });
                }
                for(var j = 0; j < rmtFlows.length; j++) {
                    var rmtFlowObj = rmtFlows[j];
                    inPacketsRemote['values'].push({
                        x: Math.floor(rmtFlowObj['T=']/1000),
                        y: ifNull(rmtFlowObj['SUM(ifStats.ifInPkts)'],0)
                    });
                }
                var chartData = [inPacketsLocal,inPacketsRemote];

                options = {
                    height:300,
                    yAxisLabel: 'Packets per 72 secs',
                    y2AxisLabel: 'Packets per 72 secs',
                    defaultSelRange: 9 //(latest 9 samples)
                };
                result.push({
                   chartData: chartData,
                   options: options,
                   chartTitle: chartTitle
                });
                return result;
            }
        },

        self.getTraceFlowVrouterGridColumns = function () {
            var graphModel = monitorInfraUtils.getUnderlayGraphModel();
            computeNodes = graphModel.vRouters;
            return [
                {
                    field:'peer_vrouter',
                    name:"Other Virtual Router",
                    minWidth:170,
                    formatter: function(r,c,v,cd,dc){
                        var name = $.grep(computeNodes,function(value,idx){
                                        return (getValueByJsonPath(value,'more_attributes;VrouterAgent;self_ip_list;0','-') == dc['peer_vrouter']);
                                   });
                        if(validateIPAddress(dc['peer_vrouter']))
                            return contrail.format('{0} ({1})',getValueByJsonPath(name,'0;name','-'),dc['peer_vrouter']);
                        else
                            return '-';
                    }
                },{
                    field:"protocol",
                    name:"Protocol",
                    minWidth:40,
                    formatter:function(r,c,v,cd,dc){
                        return formatProtocol(dc['protocol']);
                    }
                },{
                    field:"src_vn",
                    name:"Source Network",
                    minWidth:110,
                    formatter: function (r,c,v,cd,dc) {
                        var srcVN = dc['src_vn'] != null ? dc['src_vn'] :
                            noDataStr;
                        return formatVN(srcVN);
                    }
                },{
                    field:"sip",
                    name:"Source IP",
                    minWidth:60,
                    formatter:function(r,c,v,cd,dc) {
                        if(validateIPAddress(dc['sip']))
                            return dc['sip']
                        else
                            noDataStr;
                    }
                },{
                    field:"src_port",
                    name:"Source Port",
                    minWidth:50
                },{
                    field:"direction",
                    name:"Direction",
                    minWidth:40,
                    formatter: function(r,c,v,cd,dc) {
                        if (dc['direction'] == 'ingress')
                            return 'INGRESS'
                        else if (dc['direction'] == 'egress')
                            return 'EGRESS'
                        else
                            return '-';
                    }
                },{
                    field:"dst_vn",
                    name:"Destination Network",
                    minWidth:110,
                    formatter: function (r,c,v,cd,dc) {
                        var destVN = dc['dst_vn'] != null ? dc['dst_vn'] :
                            noDataStr;
                        return formatVN(destVN);
                    }
                },{
                    field:"dip",
                    name:"Destination IP",
                    minWidth:60,
                    formatter:function(r,c,v,cd,dc) {
                        if(validateIPAddress(dc['dip']))
                            return dc['dip']
                        else
                            noDataStr;
                    }
                },{
                    field:"dst_port",
                    name:"Destination Port",
                    minWidth:50
                },{
                    field:"stats_bytes",
                    name:"Bytes/Pkts",
                    minWidth:120,
                    formatter:function(r,c,v,cd,dc){
                        return contrail.format("{0}/{1}",
                            formatBytes(dc['stats_bytes']),dc['stats_packets']);
                    },
                    searchFn:function(d){
                        return d['stats_bytes']+ '/ ' +d['stats_packets'];
                    }
                }
            ];
        },
        self.getTraceFlowVMGridColumns = function () {
            return [
                    {
                        field: 'formattedOtherVrouter',
                        name: "Other Virtual Router",
                        minWidth:170,
                    },{
                        field: 'formattedVrouter',
                        name: "Virtual Router",
                        minWidth:170,
                    },{
                        field:"protocol",
                        name:"Protocol",
                        minWidth:40,
                        formatter:function(r,c,v,cd,dc){
                            return formatProtocol(dc['protocol']);
                        }
                    },{
                        field:"formattedSrcVN",
                        name:"Source Network",
                        minWidth:110,
                    },{
                        field:"sourceip",
                        name:"Source IP",
                        minWidth:60,
                        formatter:function(r,c,v,cd,dc) {
                            if(validateIPAddress(dc['sourceip']))
                                return dc['sourceip']
                            else
                                noDataStr;
                        }
                    },{
                        field:"sport",
                        name:"Source Port",
                        minWidth:50
                    },{
                        field:"direction_ing",
                        name:"Direction",
                        minWidth:40,
                        formatter: function(r,c,v,cd,dc) {
                            if (dc['direction_ing'] == 1)
                                return 'INGRESS'
                            else if (dc['direction_ing'] == 0)
                                return 'EGRESS'
                            else
                                return '-';
                        }
                    },{
                        field:"formattedDestVN",
                        name:"Destination Network",
                        minWidth:110,
                        formatter: function (r,c,v,cd,dc) {
                            var destVN = dc['destvn'] != null ? dc['destvn'] :
                                noDataStr;
                            return formatVN(destVN);
                        }
                    },{
                        field:"destip",
                        name:"Destination IP",
                        minWidth:60,
                        formatter:function(r,c,v,cd,dc) {
                            if(validateIPAddress(dc['destip']))
                                return dc['destip']
                            else
                                noDataStr;
                        }
                    },{
                        field:"dport",
                        name:"Destination Port",
                        minWidth:50
                    },{
                        field:"agg-bytes",
                        name:"Bytes/Pkts",
                        minWidth:120,
                        formatter:function(r,c,v,cd,dc){
                            return contrail.format("{0}/{1}",
                                formatBytes(dc['agg-bytes']),dc['agg-packets']);
                        },
                        searchFn:function(d){
                            return d['agg-bytes']+ '/ ' +d['agg-packets'];
                        }
                    }
                ];
        },

        self.getSearchFlowGridColumns = function () {
            return [
                {
                    field: 'formattedOtherVrouter',
                    name: "Other Virtual Router",
                    minWidth:170,
                },{
                    field: 'formattedVrouter',
                    name: "Virtual Router",
                    minWidth:170,
                },{
                    field:"protocol",
                    name:"Protocol",
                    minWidth:40,
                    formatter:function(r,c,v,cd,dc){
                        return formatProtocol(dc['protocol']);
                    }
                },{
                    field:"formattedSrcVN",
                    name:"Source Network",
                    minWidth:110,
                },{
                    field:"sourceip",
                    name:"Source IP",
                    minWidth:60,
                    formatter:function(r,c,v,cd,dc) {
                        if(validateIPAddress(dc['sourceip']))
                            return dc['sourceip']
                        else
                            noDataStr;
                    }
                },{
                    field:"sport",
                    name:"Source Port",
                    minWidth:50
                },{
                    field:"direction_ing",
                    name:"Direction",
                    minWidth:40,
                    formatter: function(r,c,v,cd,dc) {
                        if (dc['direction_ing'] == 1)
                            return 'INGRESS'
                        else if (dc['direction_ing'] == 0)
                            return 'EGRESS'
                        else
                            return '-';
                    }
                },{
                    field:"formattedDestVN",
                    name:"Destination Network",
                    minWidth:110,
                    formatter: function (r,c,v,cd,dc) {
                        var destVN = dc['destvn'] != null ? dc['destvn'] :
                            noDataStr;
                        return formatVN(destVN);
                    }
                },{
                    field:"destip",
                    name:"Destination IP",
                    minWidth:60,
                    formatter:function(r,c,v,cd,dc) {
                        if(validateIPAddress(dc['destip']))
                            return dc['destip']
                        else
                            noDataStr;
                    }
                },{
                    field:"dport",
                    name:"Destination Port",
                    minWidth:50
                },{
                    field:"stats_bytes",
                    name:"Bytes/Pkts",
                    minWidth:120,
                    formatter:function(r,c,v,cd,dc){
                        return contrail.format("{0}/{1}",
                            formatBytes(dc['agg-bytes']),dc['agg-packets']);
                    },
                    searchFn:function(d){
                        return d['agg-bytes']+ '/ ' +d['agg-packets'];
                    }
                }
            ];
        };
        self.getUnderlayGraphModel = function () {
            return $("#"+ctwl.UNDERLAY_GRAPH_ID).data('graphModel');
        };

        self.showFlowPath = function (connectionWrapIds, offsetWidth, graphView) {
            if(offsetWidth == null)
                offsetWidth = 5;
            if(!(connectionWrapIds instanceof Array))
                return;
            var hopLength = connectionWrapIds.length;
            for(var i=0;i<hopLength;i++) {
                var isDirectionCrt =
                    monitorInfraUtils.checkLinkDirection(connectionWrapIds[i], graphView);
                self.addOffsetPath(connectionWrapIds[i], offsetWidth, isDirectionCrt);
            }
        };

        self.checkLinkDirection = function (connectionWrapId, graphView) {
            var connectionWrapElem = $('#' + connectionWrapId),
                flowPath = graphView['flowPath'];
            if(connectionWrapElem.length > 0) {
                connectionWrapElem = $(connectionWrapElem[0]);
            } else {
                return;
            }
            var linkId = $(connectionWrapElem).parent().attr('model-id');
            var linkAttrs = graphView.getCell(linkId).attributes;
            var sourceId = linkAttrs.source.id;
            var destId = linkAttrs.target.id;
            var srcEl = graphView.getCell(sourceId);
            var destEl = graphView.getCell(destId);
            var srcNodeName = getValueByJsonPath(srcEl,'attributes;nodeDetails;name','-');
            var destNodeName = getValueByJsonPath(destEl,'attributes;nodeDetails;name','-');
            var isDirectionCrt = false,links = flowPath.get('links');
            for(var i = 0; i < links.length; i ++) {
                if(srcNodeName == getValueByJsonPath(links[i],'endpoints;0','-') &&
                        destNodeName == getValueByJsonPath(links[i],'endpoints;1','-')) {
                    isDirectionCrt = true
                    break;
                }
            }
            return isDirectionCrt;
        };

        self.addOffsetPath = function (connectionWrapId, offsetWidth, isDirectionCrt) {
            var connectionWrapElem = $('#' + connectionWrapId);
            if(connectionWrapElem.length > 0) {
                connectionWrapElem = $(connectionWrapElem[0]);
            } else {
                return;
            }
            var path = connectionWrapElem.attr('d');
            var pathCoords;
            if(typeof(path) == 'string') {
                pathCoords = path.match(/M ([\d.]+) ([\d.]+) C ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)/);
                if((pathCoords instanceof Array) && pathCoords.length == 9) {
                    pathCoords.shift();
                    pathCoords = $.map(pathCoords,function(val) {
                        return parseFloat(val);
                    });
                    var offsetPath;
                    if(offsetWidth < 0) {
                        offsetPath = connectionWrapElem.clone().prop('id',connectionWrapId + '_down');
                    } else {
                        offsetPath = connectionWrapElem.clone().prop('id',connectionWrapId + '_up');
                    }
                    var curve = new Bezier(pathCoords);
                    var inclinedVerticalLine = false;
                    if(curve._linear != true) {
                        if(!isDirectionCrt) {
                            offsetWidth = -offsetWidth;
                            offsetPath.attr('marker-start',"url(#bezierUp)");
                        } else {
                            offsetPath.attr('marker-end',"url(#bezierDown)");
                        }
                        //Hack,till we fix the issue,links b/w TOR and SPINES are not vertical
                        if(Math.abs(pathCoords[pathCoords.length - 2] - pathCoords[0]) <= 10) {
                            inclinedVerticalLine = true;
                            if(!isDirectionCrt) {
                                offsetPath.attr('marker-start','url(#upDeviated)');
                            } else {
                                offsetPath.attr('marker-end','url(#downDeviated)');
                            }
                        }
                        var offsetPathStr = self.getOffsetBezierPath(pathCoords,offsetWidth);
                        var offsetPathCords = offsetPathStr.split(' ');
                        var offsetPathCordsLen = offsetPathCords.length;
                        var lastX = offsetPathCords[offsetPathCords.length - 2];
                        if(!isDirectionCrt && !inclinedVerticalLine) {
                            lastX = parseFloat(lastX) + 10;
                            offsetPathCords[offsetPathCords.length - 2] = lastX;
                        } else if (isDirectionCrt && !inclinedVerticalLine)  {
                            lastX = parseFloat(lastX) - 10;
                            offsetPathCords[offsetPathCords.length - 2] = lastX;
                        }
                        offsetPath.attr('d',offsetPathCords.join(' '));
                    } else {
                        //Vertical line
                        if(pathCoords[0] == pathCoords[6]) {
                            //Pointing upwards/downwards
                            if(!isDirectionCrt) {
                                offsetPath.attr('transform','translate(' + offsetWidth + ',0)');
                                offsetPath.attr('marker-start',"url(#up)");
                            } else {
                                offsetPath.attr('transform','translate(-' + offsetWidth + ',0)');
                                offsetPath.attr('marker-end',"url(#down)");
                            }
                        }
                        //Horizontal line
                        if(pathCoords[1] == pathCoords[7]) {
                            offsetPath.attr('transform','translate(0,' + offsetWidth + ')');
                        }
                    }

                    if(!isDirectionCrt) {
                        offsetPath.attr('class','connection-wrap-up');
                    } else {
                        offsetPath.attr('class','connection-wrap-down');
                    }
                    offsetPath.insertAfter(connectionWrapElem);
                }
            }
        };

        self.getOffsetBezierPath = function(pathCoords, offsetWidth) {
            var curve = new Bezier(pathCoords);
            if(curve._linear == true) {
            }
            var offsetCurve = curve.offset(offsetWidth);
            var offsetCurvePath = "";
            for(var i=0;i<offsetCurve.length;i++) {
                offsetCurvePath += " " + offsetCurve[i].toSVG();
            }
            return offsetCurvePath;
        };

        /*
         * Function, checks the flag isUnderlayPage in viewConfig
         * In case of true
         *      Appends the hostName in the widget header title
         */

        self.appendHostNameInWidgetTitleForUnderlayPage = function (viewConfig) {
            var isUnderlayPage = viewConfig['isUnderlayPage'];
            var widgetTitle = null;
            if (isUnderlayPage == true) {
                widgetTitle = getValueByJsonPath(viewConfig,
                    'widgetConfig;viewConfig;header;title', null);
                if (widgetTitle != null ) {
                    widgetTitle =
                        contrail.format('{0} ({1})', widgetTitle,
                                ifNull(viewConfig['hostname'], '-'));
                    viewConfig['widgetConfig']['viewConfig']['header']['title'] =
                        widgetTitle;
                }
            }
            return viewConfig;
        };

        self.getMarkersForUnderlay = function () {
            var marker =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', 'head');
            marker.setAttribute('orient', 'auto');
            marker.setAttribute('markerWidth', '30');
            marker.setAttribute('markerHeight', '30');
            marker.setAttribute('refX', '2.5');
            marker.setAttribute('refY', '3');

            var path =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', "M0,0 L0,3 L3,0");
            path.setAttribute('style', "stroke:#85b9dd; fill:#85b9dd;");
            marker.appendChild(path);

            var marker1 =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker1.setAttribute('id', 'up');
            marker1.setAttribute('orient', 'auto');
            marker1.setAttribute('markerWidth', '30');
            marker1.setAttribute('markerHeight', '30');
            marker1.setAttribute('refX', '0');
            marker1.setAttribute('refY', '0');

            var path1 =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttribute('d', "M0,0 L3,3 L0,3");
            path1.setAttribute('style', "stroke:#85b9dd; fill:#85b9dd;");
            marker1.appendChild(path1);

            var marker2 =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker2.setAttribute('id', 'down');
            marker2.setAttribute('orient', 'auto');
            marker2.setAttribute('markerWidth', '30');
            marker2.setAttribute('markerHeight', '30');
            marker2.setAttribute('refX', '3');
            marker2.setAttribute('refY', '3');

            var path2 =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', "M0,0 L3,3 L3,0");
            path2.setAttribute('style', "stroke:#85b9dd; fill:#85b9dd;");
            marker2.appendChild(path2);

            var marker3 =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker3.setAttribute('id', 'bezierUp');
            marker3.setAttribute('orient', 'auto');
            marker3.setAttribute('markerWidth', '30');
            marker3.setAttribute('markerHeight', '30');
            marker3.setAttribute('refX', '.5');
            marker3.setAttribute('refY', '3.7');

            var path3 =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttribute('d', "M0,4 L4,0 L4,4");
            path3.setAttribute('style', "stroke-width:0px;fill:#85b9dd;");
            marker3.appendChild(path3);

            var marker4 =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker4.setAttribute('id', 'upDeviated');
            marker4.setAttribute('orient', 'auto');
            marker4.setAttribute('markerWidth', '30');
            marker4.setAttribute('markerHeight', '30');
            marker4.setAttribute('refX', '-1');
            marker4.setAttribute('refY', '1');

            var path4 =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path4.setAttribute('d', "M0,0 L3,3 L0,3");
            path4.setAttribute('style', "stroke:#85b9dd; fill:#85b9dd;");
            marker4.appendChild(path4);

            var marker5 =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker5.setAttribute('id', 'bezierDown');
            marker5.setAttribute('orient', 'auto');
            marker5.setAttribute('markerWidth', '30');
            marker5.setAttribute('markerHeight', '30');
            marker5.setAttribute('refX', '2.5');
            marker5.setAttribute('refY', '.5');

            var path5 =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path5.setAttribute('d', "M0,0 L0,3 L3,0");
            path5.setAttribute('style', "stroke:#85b9dd; fill:#85b9dd;");
            marker5.appendChild(path5);

            var marker6 =
                document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker6.setAttribute('id', 'downDeviated');
            marker6.setAttribute('orient', 'auto');
            marker6.setAttribute('markerWidth', '30');
            marker6.setAttribute('markerHeight', '30');
            marker6.setAttribute('refX', '5.5');
            marker6.setAttribute('refY', '3');

            var path6 =
                document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path6.setAttribute('d', "M0,0 L3,3 L3,0");
            path6.setAttribute('style', "stroke:#85b9dd; fill:#85b9dd;");
            marker6.appendChild(path6);

            return [marker, marker1, marker2, marker3, marker4, marker5, marker6];


        };

        self.showUnderlayPaths = function (data, graphModel, deferredObj) {
            var currentUrlHashObj = layoutHandler.getURLHashObj(),
                currentPage = currentUrlHashObj.p,
                currentParams = currentUrlHashObj.q;
                var params = {};
                params.srcIP = data.sourceip;
                params.destIP = data.destip;
                params.srcVN = data.sourcevn;
                params.destVN = data.destvn;
                params.sport = data.sport;
                params.dport = data.dport;
                params.protocol = data.protocol;
                params.startAt = data.startAt;
                if(data.direction_ing === 0) {
                    params.direction = 'egress';
                    params.nodeIP = data.other_vrouter_ip;
                } else {
                    params.direction = 'ingress';
                    params.nodeIP = data.vrouter_ip;
                }
                if(currentPage == 'mon_infra_underlay' &&
                    !graphModel.checkIPInVrouterList(params)) {
                    if(deferredObj != null) {
                        deferredObj.resolve(true);
                    }
                    showInfoWindow(
                        "Cannot Map the path for the selected flow", "Info");
                    return;
                }
                if(data.hasOwnProperty('startTime') &&
                    data.hasOwnProperty('endTime')) {
                    params['startTime'] = data['startTime'];
                    params['endTime'] = data['endTime'];
                } else {
                    params['minsSince'] = 300;
                }
                switch(currentPage) {
                    case 'mon_infra_underlay':
                        $.ajax({
                            url: "/api/tenant/networking/underlay-path",
                            type    : "POST",
                            data    : {data: params},
                        }).done (function (response) {
                            if(params['startAt'] != null &&
                                graphModel.lastInteracted > params['startAt']) {
                                if (deferredObj != null) {
                                    deferredObj.resolve(false);
                                }
                                return;
                            }
                            graphModel.underlayPathReqObj = params;
                            graphModel.flowPath.set({
                                'nodes': ifNull(response['nodes'], []),
                                'links': ifNull(response['links'], [])
                            }, {silent:true});
                            graphModel.flowPath.trigger('change:nodes');
                            if (ifNull(response['nodes'], []).length == 0 ||
                                ifNull(response['links'], []).length == 0) {
                            } else {
                                monitorInfraUtils.addUnderlayFlowInfoToBreadCrumb({
                                    action: 'Map Flow',
                                    sourceip: params['srcIP'],
                                    destip: params['destIP'],
                                    sport: params['sport'],
                                    dport: params['dport']
                                });
                            }
                            $('html,body').animate({scrollTop:0}, 500);
                        }).fail (function () {
                            if(params['startAt'] != null &&
                                graphModel.lastInteracted > params['startAt']) {
                                if (deferredObj != null) {
                                    deferredObj.resolve(false);
                                }
                                return;
                            }
                            showInfoWindow('Error in fetching details','Error');
                        }).always (function (ajaxObj, state, error) {
                            if(state == 'timeout') {
                                showInfoWindow('Timeout in fetching details','Error');
                            }
                            if(deferredObj != null) {
                                deferredObj.resolve(true);
                            }
                        });
                        break;
                    case 'query_flow_records':
                        layoutHandler.setURLHashParams(params,{p:'mon_infra_underlay',merge:false});
                        break;
                }
        };

        self.addUnderlayFlowInfoToBreadCrumb = function (data) {
            // Removing the last flow info in the breadcrumb
            self.removeUndelrayFlowInfoFromBreadCrumb();
            // Adding the current flow info to the breadcrumb
            pushBreadcrumb([
                 contrail.getTemplate4Id(ctwc.UNDERLAY_FLOW_INFO_TEMPLATE)(data)
            ]);
        };
        self.removeUndelrayFlowInfoFromBreadCrumb = function () {
            if ($("#breadcrumb li").last().find('div#flow-info').length > 0) {
                $("#breadcrumb li").last().remove();
                $('#breadcrumb li').last().children('span').remove();
            }
        };
        self.getPostDataForGeneratorType = function (options){
            var type,moduleType="",kfilt="";
            var nodeType = options.nodeType;
            var cfilt = options.cfilt;
            var hostName = options['hostname'];
            if(nodeType == monitorInfraConstants.COMPUTE_NODE){
                type = 'vrouter';
                var moduleId = monitorInfraConstants.UVEModuleIds['VROUTER_AGENT'];
//                if(obj['vrouterModuleId'] != null && obj['vrouterModuleId'] != ''){
//                    moduleId = obj['vrouterModuleId'];
//                }
                kfilt = hostName+":*:" + moduleId + ":*";
            } else if (nodeType == monitorInfraConstants.CONTROL_NODE){
                type = 'controlnode';
                kfilt = hostName+":*:" + monitorInfraConstants.UVEModuleIds['CONTROLNODE'] + ":*";
            } else if (nodeType == monitorInfraConstants.ANALYTICS_NODE){
                type = 'contrail-collector';
                kfilt = hostName+":*:" + monitorInfraConstants.UVEModuleIds['COLLECTOR'] + ":*,"+
                        hostName+":*:" + monitorInfraConstants.UVEModuleIds['OPSERVER'] + ":*";
            } else if (nodeType == monitorInfraConstants.CONFIG_NODE){
                type = 'confignode';
                kfilt = hostName+":*:" + monitorInfraConstants.UVEModuleIds['APISERVER'] + "*,"+
                        hostName+":*:" + monitorInfraConstants.UVEModuleIds['DISCOVERY_SERVICE'] + ":*,"+
                        hostName+":*:" + monitorInfraConstants.UVEModuleIds['SERVICE_MONITOR'] + ":*,"+
                        hostName+":*:" + monitorInfraConstants.UVEModuleIds['SCHEMA'] + ":*";
            }
            return self.getPostData("generator","","",cfilt,kfilt);
        };

        self.getPostData = function (type,module,hostname,cfilt,kfilt){
            var cfiltObj = {};
            var postData;
            if(type != null && type != ""){
                cfiltObj["type"] = type;
            } else {
                return null;
            }
            if(module != null && module != ""){
                cfiltObj["module"] = module;
            }
            if(hostname != null && hostname != ""){
                cfiltObj["hostname"] = hostname;
            }
            if(cfilt != null && cfilt != ""){
                cfiltObj["cfilt"] = cfilt;
            }
            if(kfilt != null && kfilt != ""){
                cfiltObj["kfilt"] = kfilt;
            }
            postData = {data:[cfiltObj]};
            return postData;
        };

        self.removeUnderlayTabs = function (underlayTabView) {
            var tabCnt = $('#'+ctwc.UNDERLAY_TAB_ID +'> ul li:visible').length;
            for (var i = (tabCnt - 1); i >= 2; i--) {
                underlayTabView.childViewMap[ctwc.UNDERLAY_TAB_ID].removeTab(i);
            }
        };
       self.getScatterChartLegendConfigForNodes = function() {
           return {
               groups : [{
                   id : 'by-node-color',
                   title : 'Node Color',
                   items : [ {
                       text : 'Critical',
                       labelCssClass : 'icon-circle error',
                       events : {
                           click : function(event) {
                           }
                       }
                   },{
                       text : 'Error',
                       labelCssClass : 'icon-circle warning',
                       events : {
                           click : function(event) {
                           }
                       }
                   },{
                       text : 'Intialized',
                       labelCssClass : 'icon-circle medium',
                       events : {
                           click : function(event) {
                           }
                       }
                   },{
                       text : 'Up',
                       labelCssClass : 'icon-circle okay',
                       events : {
                           click : function(event) {
                           }
                       }
                   }]
               },{
                    id: 'by-node-size',
                    title: 'Bubble Size',
                    items: [
                        {
                            text: 'Bandwidth',
                            labelCssClass: 'icon-circle',
                            events: {
                                click: function (event) {}
                            }
                        }
                    ]
                }]
           };
       };
        self.getScatterChartFilterConfigForNodes = function() {
            return {
                groups: [
                    {
                        id: 'by-node-color',
                        title: false,
                        type: 'checkbox-circle',
                        items: [
                            {
                                text: 'Critical',
                                labelCssClass: 'error'
                            },
                            {
                                text: 'Error',
                                labelCssClass: 'warning'
                            },
                            {
                                text: 'Initialized',
                                labelCssClass: 'default'
                            },
                            {
                                text: 'Up',
                                labelCssClass: 'okay'
                            }
                        ]
                    }
                ]
            };
        }
        self.showObjLogs = function (objId,type) {
            require(['monitor/infrastructure/common/ui/js/views/MonitorInfraObjectLogsPopUpView'],function(MonitorInfraObjectLogsPopUpView) {
                var monInfraObjLogsView = new MonitorInfraObjectLogsPopUpView ();
                monInfraObjLogsView.render ({
                                            type: type,
                                            objId: objId
                                        });
            });
        };

        self.purgeAnalyticsDB = function (purgePercentage) {
            var ajaxConfig = {
                type: "GET",
                url: "/api/analytics/db/purge?purge_input=" + purgePercentage
            };

            contrail.ajaxHandler(ajaxConfig, null, function(response) {
                if(response != null && response['status'] == 'started') {
                    showInfoWindow("Analytics DB purge has been started.", "Success");
                } else if (response != null && response['status'] == 'running') {
                    showInfoWindow ("Analytics DB purge already running.", "Success");
                } else {
                    showInfoWindow(contrail.parseErrorMsgFromXHR(response), "Purge Response");
                }
            }, function(response){
                var errorMsg = contrail.parseErrorMsgFromXHR(response);
                showInfoWindow(errorMsg, "Error");
            });
        };
    };
    return MonitorInfraUtils;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('confignode-scatterchart-view',['underscore', 'contrail-view'],function(_, ContrailView){
   var ConfigNodeScatterChartView = ContrailView.extend({
        render : function (){
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,
                this.model,
                widgetConfig
                );
            }
            this.renderView4Config(this.$el,
            this.model,
            getConfigNodeScatterChartViewConfig()
            );
        }
    });

   function getConfigNodeScatterChartViewConfig() {
       return {
           elementId : ctwl.CONFIGNODE_SUMMARY_SCATTERCHART_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : ctwl.CONFIGNODE_SUMMARY_SCATTERCHART_ID,
                       title : ctwl.CONFIGNODE_SUMMARY_TITLE,
                       view : "ZoomScatterChartView",
                       viewConfig : {
                           loadChartInChunks : true,
                           chartOptions : {
                               xLabel : ctwl.TITLE_CPU,
                               yLabel : 'Memory (MB)',
                               margin: {top:10},
                               forceX : [ 0, 1 ],
                               forceY : [ 0, 20 ],
                               dataParser : function(
                                       response) {
                                   var chartDataValues = [ ];
                                   for ( var i = 0; i < response.length; i++) {
                                       var configNode = response[i];

                                       chartDataValues
                                               .push({
                                                   name : configNode['name'],
                                                   y : configNode['y'],
                                                   x : contrail.handleIfNull(
                                                       configNode['x'],
                                                       0),
                                                   color : configNode['color'],
                                                   size : contrail.handleIfNull(
                                                       configNode['size'],
                                                       0),
                                                   rawData : configNode
                                               });
                                   }
                                   return chartDataValues;
                               },
                               tooltipConfigCB : getConfigNodeTooltipConfig,
                               controlPanelConfig: {
                                   // legend: {
                                   //     enable: true,
                                   //     viewConfig: getControlPanelLegendConfig()
                                   // }
                               },
                               clickCB : onScatterChartClick
                           }
                       }
                   } ]
               } ]
           }
       };

       function onScatterChartClick(
               chartConfig) {
           var configNodeName = chartConfig.name, hashObj = {
                    type: "configNode",
                    view: "details",
                    focusedElement: {
                        node: configNodeName,
                        tab: 'details'
                    }
                };

           layoutHandler.setURLHashParams(hashObj, {
               p : "mon_infra_config",
               merge : false,
               triggerHashChange : true
           });
       };

       function getConfigNodeTooltipConfig(
               data) {
           var configNode = data.rawData;
           var tooltipData = [
                              {
                                  label : 'Version',
                                  value : configNode.version
                              },
                              {
                                  label : ctwl.TITLE_CPU,
                                  value : configNode.cpu,
                              },
                              {
                                  label : 'Memory',
                                  value : configNode.memory,
                              }];
           var tooltipAlerts = monitorInfraUtils.getTooltipAlerts(configNode);
           tooltipData = tooltipData.concat(tooltipAlerts);
           var tooltipConfig = {
               title : {
                   name : data.name,
                   type : 'Config Node'
               },
               content : {
                   iconClass : false,
                   info : tooltipData,
                   actions : [{
                       type : 'link',
                       text : 'View',
                       iconClass : 'icon-external-link',
                       callback : onScatterChartClick
                   }]
               },
               delay : cowc.TOOLTIP_DELAY
           };

           return tooltipConfig;
       };

       function getControlPanelLegendConfig() {
           return {
               groups : [{
                   id : 'by-node-color',
                   title : 'Node Color',
                   items : [{
                       text : infraAlertMsgs['UVE_MISSING']+ ' or ' +
                           infraAlertMsgs['NTP_UNSYNCED_ERROR'],
                       labelCssClass : 'icon-circle error',
                       events : {
                           click : function(
                               event) {
                       }
                   }
                   }]
               }]
           };
       };
   }
   return ConfigNodeScatterChartView;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('controlnode-scatterchart-view',['underscore', 'contrail-view'],function(_, ContrailView){
   var ControlNodeScatterChartView = ContrailView.extend({
        render : function (){
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,
                this.model,
                widgetConfig
                );
            }
            this.renderView4Config(this.$el,
            this.model,
            getControlNodeScatterChartViewConfig()
            );
        }
    });

   function getControlNodeScatterChartViewConfig() {
       return {
           elementId : ctwl.CONTROLNODE_SUMMARY_SCATTERCHART_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : ctwl.CONTROLNODE_SUMMARY_SCATTERCHART_ID,
                       title : ctwl.CONTROLNODE_SUMMARY_TITLE,
                       view : "ZoomScatterChartView",
                       viewConfig : {
                           loadChartInChunks : true,
                           chartOptions : {
                               xLabel : ctwl.TITLE_CPU,
                               yLabel : 'Memory (MB)',
                               margin: {top:10},
                               forceX : [ 0, 1 ],
                               forceY : [ 0, 20 ],
                               dataParser : function(
                                       response) {
                                   var chartDataValues = [ ];
                                   for ( var i = 0; i < response.length; i++) {
                                       var controlNode = response[i];

                                       chartDataValues
                                               .push({
                                                   name : controlNode['name'],
                                                   y : controlNode['y'],
                                                   x : contrail.handleIfNull(
                                                       controlNode['x'],
                                                       0),
                                                   color : controlNode['color'],
                                                   size : contrail.handleIfNull(
                                                       controlNode['size'],
                                                       0),
                                                   rawData : controlNode
                                               });
                                   }
                                   return chartDataValues;
                               },
                               tooltipConfigCB : getControlNodeTooltipConfig,
                               controlPanelConfig: {
                                   // legend: {
                                   //     enable: true,
                                   //     viewConfig: getControlPanelLegendConfig()
                                   // }
                               },
                               clickCB : onScatterChartClick
                           }
                       }
                   } ]
               } ]
           }
       };

       function onScatterChartClick(
               chartConfig) {
           var controlNodeName = chartConfig.name, hashObj = {
               type: 'controlNode',
               view: 'details',
               focusedElement: {
                    node:controlNodeName,
                    tab:'details'
               }
           };

           layoutHandler.setURLHashParams(hashObj, {
               p : "mon_infra_control",
               merge : false,
               triggerHashChange : true
           });
       };

       function getControlNodeTooltipConfig(
               data) {
           var controlNode = data.rawData;
           var tooltipData = [
                              {
                                  label : 'Version',
                                  value : controlNode.version
                              },
                              {
                                  label : ctwl.TITLE_CPU,
                                  value : controlNode.cpu,
                              },
                              {
                                  label : 'Memory',
                                  value : controlNode.memory,
                              }];
           var tooltipAlerts = monitorInfraUtils.getTooltipAlerts(controlNode);
           tooltipData = tooltipData.concat(tooltipAlerts);
           var tooltipConfig = {
               title : {
                   name : data.name,
                   type : 'Control Node'
               },
               content : {
                   iconClass : false,
                   info : tooltipData,
                   actions : [ {
                       type : 'link',
                       text : 'View',
                       iconClass : 'icon-external-link',
                       callback : onScatterChartClick
                   } ]
               },
               delay : cowc.TOOLTIP_DELAY
           };

           return tooltipConfig;
       };

       function getControlPanelLegendConfig() {
           return {
               groups : [{
                   id : 'by-node-color',
                   title : 'Node Color',
                   items : [ {
                       text : infraAlertMsgs['UVE_MISSING'] + ' or ' +
                           infraAlertMsgs['CONFIG_MISSING'] + ' or ' +
                           infraAlertMsgs['CONFIG_IP_MISMATCH'] + ' or ' +
                           infraAlertMsgs['IFMAP_DOWN'] + ' or ' +
                           infraAlertMsgs['NTP_UNSYNCED_ERROR'],
                       labelCssClass : 'icon-circle error',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   },{
                       text : 'XMPP peer down or BGP peer down ' +
                           infraAlertMsgs['BGP_CONFIG_MISMATCH'],
                       labelCssClass : 'icon-circle warning',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   }]
               }]
           };
       };
   }
   return ControlNodeScatterChartView;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('dbnode-scatterchart-view',['underscore', 'contrail-view'],function(_, ContrailView){
   var DatabaseNodeScatterChartView = ContrailView.extend({
        render : function (){
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,
                this.model,
                widgetConfig
                );
            }
            this.renderView4Config(this.$el,
            this.model,
            getDatabaseNodeScatterChartViewConfig());
        }
    });

   function getDatabaseNodeScatterChartViewConfig() {
       return {
           elementId : ctwl.DATABASENODE_SUMMARY_SCATTERCHART_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : ctwl.DATABASENODE_SUMMARY_SCATTERCHART_ID,
                       title : ctwl.DATABASENODE_SUMMARY_TITLE,
                       view : "ZoomScatterChartView",
                       viewConfig : {
                           loadChartInChunks : true,
                           chartOptions : {
                               xLabel : 'Available Space (GB)',
                               yLabel : 'Used Space (GB)',
                               forceX : [ 0, 1 ],
                               forceY : [ 0, 20 ],
                               margin: {top:10},
                               dataParser : function(
                                       response) {
                                   var chartDataValues = [ ];
                                   for ( var i = 0; i < response.length; i++) {
                                       var analyticsNode = response[i];

                                       chartDataValues
                                               .push({
                                                   name : analyticsNode['name'],
                                                   y : analyticsNode['y'],
                                                   x : contrail.handleIfNull(
                                                       analyticsNode['x'],
                                                       0),
                                                   color :
                                                       analyticsNode['color'],
                                                   size : contrail.handleIfNull(
                                                       analyticsNode['size'],
                                                       0),
                                                   rawData : analyticsNode
                                               });
                                   }
                                   return chartDataValues;
                               },
                               tooltipConfigCB : getDatabaseNodeTooltipConfig,
                               controlPanelConfig: {
                                   // legend: {
                                   //     enable: true,
                                   //     viewConfig: getControlPanelLegendConfig()
                                   // }
                               },
                               clickCB : onScatterChartClick
                           }
                       }
                   } ]
               } ]
           }
       };

       function onScatterChartClick(
               chartConfig) {
           var databaseNodeName = chartConfig.name, hashObj = {
                type: "databaseNode",
                view: "details",
                focusedElement: {
                    node: databaseNodeName,
                    tab: 'details'
                }
           };

           layoutHandler.setURLHashParams(hashObj, {
               p : "mon_infra_database",
               merge : false,
               triggerHashChange : true
           });
       };

       function getDatabaseNodeTooltipConfig(
               data) {
           var databaseNode = data.rawData;
           var tooltipData = [
              {
                  label : 'Version',
                  value : databaseNode['version']
              },
              {
                  label : 'Disk Space',
                  value : '',options:{noLabelColon:true}
              },
              {
                  label : 'Available',
                  value : databaseNode['formattedAvailableSpace']
              },
              {
                  label : 'Used',
                  value : databaseNode['formattedUsedSpace']
              },
              {
                  label : 'Usage',
                  value : databaseNode['formattedUsedPercentage']
              },
              {
                  label : 'Analytics DB',
                  value: databaseNode['formattedAnalyticsDbSize']
              }
           ];
           var tooltipAlerts = monitorInfraUtils.getTooltipAlerts(databaseNode);
           tooltipData = tooltipData.concat(tooltipAlerts);
           var tooltipConfig = {
               title : {
                   name : data.name,
                   type : 'Database Node'
               },
               content : {
                   iconClass : false,
                   info : tooltipData,
                   actions : [{
                       type : 'link',
                       text : 'View',
                       iconClass : 'icon-external-link',
                       callback : onScatterChartClick
                   }]
               },
               delay : cowc.TOOLTIP_DELAY
           };

           return tooltipConfig;
       };

       function getControlPanelLegendConfig() {
           return {
               groups : [ {
                   id : 'by-node-color',
                   title : 'Node Color',
                   items : [ {
                       text : 'Disk space usage warning',
                       labelCssClass : 'icon-circle warning',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   }, {
                       text : infraAlertMsgs['UVE_MISSING'] + ' or ' +
                       infraAlertMsgs['NTP_UNSYNCED_ERROR'] + ' or ' +
                       'Disk space usage exceeds threshold',
                       labelCssClass : 'icon-circle error',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   } ]
               }]
           };
       };
   }
   return DatabaseNodeScatterChartView;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('analyticsnode-scatterchart-view',['underscore', 'contrail-view'],function(_, ContrailView){
   var AnalyticsNodeScatterChartView = ContrailView.extend({
        render : function (){
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,
                this.model,
                widgetConfig
                );
            }
            this.renderView4Config(this.$el,
            this.model,
            getConfigNodeScatterChartViewConfig()
            );
        }
    });

   function getConfigNodeScatterChartViewConfig() {
       return {
           elementId : ctwl.ANALYTICSNODE_SUMMARY_SCATTERCHART_SECTION_ID,
           view : "SectionView",
           viewConfig : {
               rows : [ {
                   columns : [ {
                       elementId : ctwl.ANALYTICSNODE_SUMMARY_SCATTERCHART_ID,
                       title : ctwl.ANALYTICSNODE_SUMMARY_TITLE,
                       view : "ZoomScatterChartView",
                       viewConfig : {
                           loadChartInChunks : true,
                           chartOptions : {
                               xLabel : ctwl.TITLE_CPU,
                               yLabel : 'Memory (MB)',
                               forceX : [ 0, 1 ],
                               forceY : [ 0, 20 ],
                               margin: {top:10},
                               dataParser : function(
                                       response) {
                                   var chartDataValues = [ ];
                                   for ( var i = 0; i < response.length; i++) {
                                       var analyticsNode = response[i];
                                       chartDataValues
                                           .push({
                                               name : analyticsNode['name'],
                                               y : analyticsNode['y'],
                                               x : contrail.handleIfNull(
                                                   analyticsNode['x'],
                                                   0),
                                               color : analyticsNode['color'],
                                               size : contrail.handleIfNull(
                                                   analyticsNode['size'],
                                                   0),
                                               rawData : analyticsNode
                                           });
                                   }
                                   return chartDataValues;
                               },
                               tooltipConfigCB : getAnalyticsNodeTooltipConfig,
                               controlPanelConfig: {
                                   // legend: {
                                   //     enable: true,
                                   //     viewConfig: getControlPanelLegendConfig()
                                   // }
                               },
                               clickCB : onScatterChartClick
                           }
                       }
                   } ]
               } ]
           }
       };

       function onScatterChartClick(chartConfig) {
           var analyticsNode = chartConfig.name, hashObj = {
                type: "analyticsNode",
                view: "details",
                focusedElement: {
                    node: analyticsNode,
                    tab: 'details'
                }
            };

           layoutHandler.setURLHashParams(hashObj, {
               p : "mon_infra_analytics",
               merge : false,
               triggerHashChange : true
           });
       };

       function getAnalyticsNodeTooltipConfig(data) {
           var analyticsNode = data.rawData;
           var tooltipData = [
                              {
                                  label : 'Version',
                                  value : analyticsNode.version
                              },
                              {
                                  label : ctwl.TITLE_CPU,
                                  value : analyticsNode.cpu,
                              },
                              {
                                  label : 'Memory',
                                  value : analyticsNode.memory,
                              }];
           var tooltipAlerts = monitorInfraUtils.getTooltipAlerts(analyticsNode);
           tooltipData = tooltipData.concat(tooltipAlerts);
           var tooltipConfig = {
               title : {
                   name : data.name,
                   type : 'Analytics Node'
               },
               content : {
                   iconClass : false,
                   info : tooltipData,
                   actions : [ {
                       type : 'link',
                       text : 'View',
                       iconClass : 'icon-external-link',
                       callback : onScatterChartClick
                   } ]
               },
               delay : cowc.TOOLTIP_DELAY
           };

           return tooltipConfig;
       };

       function getControlPanelLegendConfig() {
           return {
               groups : [ {
                   id : 'by-node-color',
                   title : 'Node Color',
                   items : [{
                       text : 'Errors in UVE', //TODO need to discuss the format
                       labelCssClass : 'icon-circle warning',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   },{
                       text : infraAlertMsgs['UVE_MISSING']+ ' or ' +
                       infraAlertMsgs['NTP_UNSYNCED_ERROR'],
                       labelCssClass : 'icon-circle error',
                       events : {
                           click : function(
                                   event) {
                           }
                       }
                   } ]
               }]
           };
       };
   }
   return AnalyticsNodeScatterChartView;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('vrouter-scatterchart-view',['underscore', 'contrail-view'], function(_, ContrailView) {
   var VRouterScatterChartView = ContrailView.extend({
       render: function() {
            var widgetConfig = getValueByJsonPath(this,'attributes;viewConfig;widgetConfig');
            var self = this;
            self.cfDataSource = getValueByJsonPath(self,'attributes;viewConfig;cfDataSource',null,false);
            if(widgetConfig != null) {
                this.renderView4Config(this.$el,this.model,widgetConfig);
            }
           this.renderView4Config(this.$el,
           this.model,
           getVRouterScatterChartViewConfig(self));
       }
   });

   function getVRouterScatterChartViewConfig(self) {
       return {
           elementId: ctwl.VROUTER_SUMMARY_SCATTERCHART_SECTION_ID,
           view: "SectionView",
           viewConfig: {
               rows: [{
                   columns: [{
                       elementId: ctwl.VROUTER_SUMMARY_SCATTERCHART_ID,
                       title: ctwl.VROUTER_SUMMARY_TITLE,
                       view: "ZoomScatterChartView",
                       viewConfig: {
                           loadChartInChunks: false,
                           cfDataSource : self.cfDataSource,
                           chartOptions: {
                               doBucketize: true,
                               xLabel: ctwl.TITLE_CPU,
                               yLabel: 'Memory (MB)',
                               forceX: [0, 1],
                               forceY: [0, 20],
                               margin: {top:5},
                               // yLabelFormat: d3.format(".02f"),
                               // xLabelFormat: d3.format(".02f"),
                               // dataParser: function(response) {
                               //     var chartDataValues = [];
                               //     for (var i = 0; i < response.length; i++) {
                               //         var vRouterNode = response[i];
                               //
                               //         chartDataValues.push({
                               //             name: vRouterNode['name'],
                               //             y: ifNotNumeric(vRouterNode['y'],0),
                               //             x: ifNotNumeric(vRouterNode['x'],0),
                               //             color: vRouterNode['color'],
                               //             size: contrail.handleIfNull(
                               //                  vRouterNode['size'],0),
                               //             rawData: vRouterNode
                               //         });
                               //     }
                               //     return chartDataValues;
                               // },
                               // tooltipConfigCB: getVRouterTooltipConfig,
                               bubbleSizeFn: function(d) {
                                    return d3.max(d,function(d) { return d.size;});
                               },
                               tooltipConfigCB: monitorInfraUtils.vRouterTooltipFn,
                               controlPanelConfig: {
                                   // legend: {
                                   //     enable: true,
                                   //     viewConfig: monitorInfraUtils.getScatterChartLegendConfigForNodes()
                                   // },
                                    filter: {
                                        enable: false,
                                        viewConfig: monitorInfraUtils.getScatterChartFilterConfigForNodes()
                                    },
                               },
                               bucketTooltipFn: monitorInfraUtils.vRouterBucketTooltipFn,
                               clickCB: monitorInfraUtils.onvRouterDrillDown
                           }
                       }
                   }]
               }]
           }
       };
   }
   return VRouterScatterChartView;
});

/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
    'vrouter-dashboard-view',['underscore', 'contrail-view', 'monitor-infra-vrouter-model',
    'contrail-list-model','cf-datasource'],
    function(_, ContrailView, VRouterListModel,ContrailListModel,
        CFDataSource) {
        var VRouterDashobardView = ContrailView.extend(
           (function() {
                var self = this;
                //Returning inside IIFE to make private static variable
                var totalCntModel = new Backbone.Model({
                    vnCnt:''
                });
                return {
                        render: function() {
                            var self = this;
                            var cfDataSource = new CFDataSource();
                            var vRouterUIListModel = new ContrailListModel({data:[]});
                            self.cfDataSource = cfDataSource;
                            function onUpdatevRouterListModel() {
                                cfDataSource.updateData(self.model.getItems());

                                if(cfDataSource.getDimension('colorFilter') == null) {
                                    cfDataSource.addDimension('colorFilter',function(d) {
                                        return d['color'];
                                    });
                                }
                                cfDataSource.fireCallBacks({source:'fetch'});
                            }
                            cfDataSource.addCallBack('updateCFListModel',function(data) {
                                //Update listUIModel with crossfilter data
                                vRouterUIListModel.setData(cfDataSource.getFilteredData());
                            });
                            this.renderView4Config(self.$el,
                                vRouterUIListModel,
                                getVRouterListViewConfig({totalCntModel:totalCntModel,cfDataSource:cfDataSource}),null,null,null,
                                function() {
                                    self.model.onDataUpdate.subscribe(onUpdatevRouterListModel);
                                    if(self.model.loadedFromCache) {
                                        onUpdatevRouterListModel();
                                    }
                                    updateVnCnt(totalCntModel);
                                });
                        }
                    }
            })()
        );

        function updateVnCnt(totalCntModel) {
            var self = this;
            var vnCnt = 0;
            //Issue a call to get Network count
            $.ajax({
                url:'/api/tenant/networking/virtual-networks/list',
                type:'POST',
                data:{}
            }).done(function(response) {
                if(response != null) {
                    $.each(response,function(idx,obj) {
                        if((obj['name'].indexOf(':default-project:') == -1) && obj['name'] != '__UNKNOWN__') {
                            if($.isNumeric(vnCnt)) {
                                vnCnt++;
                            } else {
                                vnCnt = 1;
                            }
                        }
                    });
                    totalCntModel.set({vnCnt:vnCnt});
                }
            });
        }

        function getVRouterListViewConfig(cfgObj) {
            return {
                elementId: cowu.formatElementId([
                    ctwl.VROUTER_DASHBOARD_SECTION_ID
                ]),
                view: "SectionView",
                viewConfig: {
                    rows: [{
                        columns: [{
                            elementId: ctwl.VROUTER_DASHBOARD_SPARKLINE_ID,
                            title: ctwl.VROUTER_SUMMARY_TITLE,
                            view: "BarChartInfoView",
                            viewConfig: {
                                // class:'span3',
                                width: '135px',
                                config:[{
                                    field:'instCnt',
                                    title:'Instances',
                                    yLbl: 'vRouters'
                                },{
                                    field:'intfCnt',
                                    title:'Interfaces',
                                    yLbl: 'vRouters'
                                },{
                                    field:'vnCnt',
                                    title:'VNs',
                                    yLbl: 'vRouters'
                                }],
                                totalCntModel: cfgObj['totalCntModel']
                            }
                        },{
                            elementId: ctwl.VROUTER_DASHBOARD_CHART_ID,
                            title: ctwl.VROUTER_SUMMARY_TITLE,
                            view: "VRouterScatterChartView",
                            viewConfig : {
                                // class: 'span9'
                                'margin-left': '160px',
                                cfDataSource : cfgObj['cfDataSource']
                            },
                            viewPathPrefix: "monitor/infrastructure/" +
                                "common/ui/js/views/",
                            app: cowc.APP_CONTRAIL_CONTROLLER,
                        }]
                    }]
                }
            };
        };
        return VRouterDashobardView;
    });

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(
       'monitor-infra-parsers',[ 'underscore' ],
       function(_) {
            var MonInfraParsers = function() {
                var self = this;
                var noDataStr = monitorInfraConstants.noDataStr;
                var formatMemory = monitorInfraUtils.formatMemory;
                var UVEModuleIds = monitorInfraConstants.UVEModuleIds;
                var getOverallNodeStatus = monitorInfraUtils.getOverallNodeStatus;

                //Parser for controlnode Dashboard data
                this.parseControlNodesDashboardData = function (result) {

                    var retArr = [];
                    $.each(result,function(idx,d) {
                        var obj = {};
                        var routerType = getValueByJsonPath(d,
                            "value;ConfigData;bgp-router;bgp_router_parameters;router_type",
                            null);
                        if($.inArray(routerType, ctwc.BGP_AAS_ROUTERS) !== -1) {
                            return true;
                        }
                        obj['x'] = parseFloat(jsonPath(d,'$.value.ControlCpuState.cpu_info[0].cpu_share')[0]);
                        //Info:Need to specify the processname explictly
                        //for which we need res memory && Convert to MB
                        obj['y'] = parseInt(jsonPath(d,'$.value.ControlCpuState.cpu_info[0].mem_res')[0])/1024;
                        obj['cpu'] = $.isNumeric(obj['x']) ? obj['x'].toFixed(2) : NaN;
                        obj['x'] = $.isNumeric(obj['x']) ? obj['x'] : 0;
                        obj['y'] = $.isNumeric(obj['y']) ? obj['y'] : 0;
                        obj['histCpuArr'] =
                            monitorInfraUtils.parseUveHistoricalValues(d,'$.cpuStats.history-10');
                        obj['uveIP'] =
                            ifNull(jsonPath(d,'$..bgp_router_ip_list')[0],[]);
                        obj['configIP'] = ifNull(jsonPath(d,
                            '$..ConfigData..bgp_router_parameters.address')[0],'-');
                        obj['isConfigMissing'] = $.isEmptyObject(jsonPath(d,
                            '$..ConfigData')[0]) ? true : false;
                        obj['configuredBgpPeerCnt'] =
                            ifNull(jsonPath(d,'$.value.ConfigData.bgp-router.'+
                            'bgp_router_refs')[0],[]).length;
                        obj['isUveMissing'] =
                            $.isEmptyObject(jsonPath(d,'$..BgpRouterState')[0]) ?
                                    true : false;
                        obj['ip'] =
                            ifNull(jsonPath(d,'$..bgp_router_ip_list[0]')[0],'-');
                        //If iplist is empty will display the config ip
                        if(obj['ip'] == '-') {
                            obj['ip'] = obj['configIP'];
                        }
                        obj['summaryIps'] = monitorInfraUtils.
                                            getControlIpAddresses(d,"summary");
                        obj['memory'] = monitorInfraUtils.
                            formatMemoryForDisplay(ifNull(jsonPath(d,
                                    '$.value.ControlCpuState.cpu_info[0].mem_res')[0]));
                        obj['size'] = ifNull(jsonPath(d,'$..output_queue_depth')[0],0);
                        obj['shape'] = 'circle';
                        obj['name'] = d['name'];
                        obj['link'] =
                            {
                                p: 'mon_infra_control',
                                q: {
                                    type: 'controlNode',
                                    view: 'details',
                                    focusedElement: {
                                        node: obj['name'],
                                        tab:'details'
                                    }
                                }
                            };
                        obj['version'] = ifEmpty(self.getNodeVersion(jsonPath(d,
                            '$.value.BgpRouterState.build_info')[0]),'-');
                        obj['totalPeerCount'] =
                            ifNull(jsonPath(d,'$..num_bgp_peer')[0],0) +
                            ifNull(jsonPath(d,'$..num_xmpp_peer')[0],0);
                        //Assign totalBgpPeerCnt as false if it doesn't exist in UVE
                        obj['totalBgpPeerCnt'] =
                            ifNull(jsonPath(d,'$..num_bgp_peer')[0],null);
                        obj['upBgpPeerCnt'] =
                            ifNull(jsonPath(d,'$..num_up_bgp_peer')[0],null);
                        obj['establishedPeerCount'] =
                            ifNull(jsonPath(d,'$..num_up_bgp_peer')[0],0);
                        obj['activevRouterCount'] =
                            ifNull(jsonPath(d,'$..num_up_xmpp_peer')[0],0);
                        obj['upXMPPPeerCnt'] =
                            ifNull(jsonPath(d,'$..num_up_xmpp_peer')[0],0);
                        obj['totalXMPPPeerCnt'] =
                            ifNull(jsonPath(d,'$..num_xmpp_peer')[0],0);
                        if(obj['totalXMPPPeerCnt'] > 0){
                            obj['downXMPPPeerCnt'] =
                                obj['totalXMPPPeerCnt'] - obj['upXMPPPeerCnt'];
                        } else {
                            obj['downXMPPPeerCnt'] = 0;
                        }
                        obj['downBgpPeerCnt'] = 0;
                        if(typeof(obj['totalBgpPeerCnt']) == "number" &&
                                typeof(obj['upBgpPeerCnt']) == "number"  &&
                                obj['totalBgpPeerCnt'] > 0) {
                            obj['downBgpPeerCnt'] =
                                obj['totalBgpPeerCnt'] - obj['upBgpPeerCnt'];
                        }
                        if(obj['downXMPPPeerCnt'] > 0){
                            obj['downXMPPPeerCntText'] = ", <span class='text-error'>" +
                                obj['downXMPPPeerCnt'] + " Down</span>";
                        } else {
                            obj['downXMPPPeerCntText'] = "";
                        }
                        obj['isPartialUveMissing'] = false;
                        obj['isIfmapDown'] = false;
                        if(obj['isUveMissing'] == false) {
                            obj['isPartialUveMissing'] = (cowu.isEmptyObject(jsonPath(d,
                                '$.value.ControlCpuState.cpu_info')[0]) || cowu.isEmptyObject(
                                jsonPath(d,'$.value.BgpRouterState.build_info')[0]) ||
                                (obj['configIP'] == '-') || obj['uveIP'].length == 0)
                                ? true : false;
                            var ifmapObj =
                                jsonPath(d,'$.value.BgpRouterState.ifmap_info')[0];
                            if(ifmapObj != undefined &&
                                    ifmapObj['connection_status'] != 'Up'){
                                obj['isIfmapDown'] = true;
                                obj['ifmapDownAt'] =
                                    ifNull(ifmapObj['connection_status_change_at'],'-');
                            }
                        }
                        obj['isNTPUnsynced'] =
                            monitorInfraUtils.isNTPUnsynced(jsonPath(d,'$..NodeStatus')[0]);
                        if(obj['downBgpPeerCnt'] > 0){
                            obj['downBgpPeerCntText'] = ", <span class='text-error'>" +
                                obj['downBgpPeerCnt'] + " Down</span>";
                        } else {
                            obj['downBgpPeerCntText'] = "";
                        }
                        obj['uveCfgIPMisMatch'] = false;
                        if(obj['isUveMissing'] == false &&
                                obj['isConfigMissing'] == false &&
                                obj['isPartialUveMissing'] == false) {
                            if(obj['uveIP'].indexOf(obj['configIP']) <= -1){
                                obj['uveCfgIPMisMatch'] = true;
                            }
                        }
                        obj['type'] = 'controlNode';
                        obj['display_type'] = 'Control Node';
                        var upTime = new XDate(jsonPath(d,'$..uptime')[0]/1000);
                        var currTime = new XDate();
                        var procStateList;

                        try{
                            obj['status'] = getOverallNodeStatus(d,"control");
                        }catch(e){
                            obj['status'] = 'Down';
                        }
                        obj['processAlerts'] =
                            infraMonitorAlertUtils.getProcessAlerts(d,obj);
                        obj['nodeAlerts'] =
                            infraMonitorAlertUtils.processControlNodeAlerts(obj);
                        var alarms = getValueByJsonPath(d,'value;UVEAlarms;alarms',[]);
                        if(cowu.getAlarmsFromAnalytics) {
                            obj['alerts'] = coreAlarmUtils.getAlertsFromAnalytics(
                                                            {
                                                                data:obj,
                                                                alarms:alarms,
                                                                nodeType:'control-node'
//                                                                processPath:processPath
                                                            });
                        } else {
                            obj['alerts'] =
                                obj['nodeAlerts'].concat(obj['processAlerts'])
                                                    .sort(dashboardUtils.sortInfraAlerts);
                        }
                        obj['color'] = monitorInfraUtils.getControlNodeColor(d,obj);
                        obj['isGeneratorRetrieved'] = false;


                        obj['rawData'] = d;
                        obj['cores'] = self.getCores(d);
                        retArr.push(obj);
                    });
                    retArr.sort(dashboardUtils.sortNodesByColor);
                    return retArr;

                };

                //Parser for vRouters data
                this.parsevRoutersDashboardData = function (result) {
                    var retArr = [];
                    if(result.data != null) {
                        result = result.data;
                    }
                    var vRouterCnt = result.length;
                    for (var i = 0; i < vRouterCnt; i++) {
                        var obj = {};
                        var d = result[i];
                        var dValue = result[i]['value'];
                        obj['cpu'] = getValueByJsonPath(dValue,
                            'VrouterStatsAgent;cpu_info;cpu_share', '--');
                        obj['x'] = $.isNumeric(obj['cpu']) ? obj['cpu'] : NaN;
                        obj['cpu'] = $.isNumeric(obj['cpu']) ? parseFloat(obj['cpu'].toFixed(
                            2)) : NaN;
                        obj['ip'] = getValueByJsonPath(dValue,
                            'VrouterAgent;control_ip', '-');
                        obj['xField'] = 'cpu';
                        obj['yField'] = 'resMemory';
                        obj['uveIP'] = obj['ip'];
                        obj['summaryIps'] = monitorInfraUtils.getVrouterIpAddresses(dValue, "summary");
                        var iplist = getValueByJsonPath(dValue,
                            'VrouterAgent;self_ip_list', []);
                        if (obj['ip'] != '-')
                            iplist.push(obj['ip']);
                        obj['uveIP'] = iplist;
                        obj['isConfigMissing'] = $.isEmptyObject(getValueByJsonPath(
                            dValue, 'ConfigData')) ? true : false;
                        obj['isUveMissing'] = ($.isEmptyObject(getValueByJsonPath(
                                dValue, 'VrouterAgent')) && $.isEmptyObject(
                                getValueByJsonPath(dValue, 'VrouterStatsAgent'))) ?
                            true : false;
                        obj['isNTPUnsynced'] =
                            monitorInfraUtils.isNTPUnsynced(jsonPath(dValue,
                            '$..NodeStatus')[0]);
                        obj['configIP'] = getValueByJsonPath(dValue,
                            'ConfigData;virtual-router;virtual_router_ip_address',
                            '-');
                        obj['vRouterType'] = getValueByJsonPath(dValue,
                            'ConfigData;virtual-router;virtual_router_type',
                            'hypervisor');
                        obj['vRouterPlatform'] = getValueByJsonPath(dValue,
                                'VrouterAgent;platform',
                                 '');
                        if(obj['vRouterType'] instanceof Array) {
                            obj['vRouterType'] = obj['vRouterType'][0];
                        }
                        if (obj['vRouterType'] == '' ||
                            obj['vRouterType'] == null) {
                            obj['vRouterType'] = 'hypervisor'; //set default to hypervisor
                        }
                        obj['moduleId'] = getValueByJsonPath(dValue,
                            'NodeStatus;process_status;0;module_id', UVEModuleIds[
                                'VROUTER_AGENT']);
                        if (obj['ip'] == '-') {
                            obj['ip'] = obj['configIP'];
                        }
                        obj['histCpuArr'] = monitorInfraUtils.parseUveHistoricalValues(d,
                            '$.cpuStats.history-10');

                        obj['status'] = getOverallNodeStatus(d, 'compute');
                        var processes = ['contrail-vrouter-agent',
                            'contrail-vrouter-nodemgr', 'supervisor-vrouter'
                        ];
                        obj['memory'] = formatMemory(getValueByJsonPath(dValue,
                            'VrouterStatsAgent;cpu_info;meminfo', '--'));
                        //Used for plotting in scatterChart
                        obj['resMemory'] = getValueByJsonPath(dValue,
                            'VrouterStatsAgent;cpu_info;meminfo;res', '-');
                        obj['resMemory'] = $.isNumeric(obj['resMemory']) ? parseFloat(
                            parseFloat(obj['resMemory'] / 1024).toFixed(2)) : NaN;
                        obj['y'] = obj['resMemory'];
                        obj['virtMemory'] = parseInt(getValueByJsonPath(dValue,
                                'VrouterStatsAgent;cpu_info;meminfo;virt', '--')) /
                            1024;
                        obj['size'] = getValueByJsonPath(dValue,
                                'VrouterStatsAgent;phy_if_5min_usage;0;out_bandwidth_usage',
                                0) +
                            getValueByJsonPath(dValue,
                                'VrouterStatsAgent;phy_if_5min_usage;0;in_bandwidth_usage',
                                0);
                        obj['shape'] = 'circle';
                        var xmppPeers = getValueByJsonPath(dValue,
                            'VrouterAgent;xmpp_peer_list', []);
                        obj['xmppPeerDownCnt'] = 0;
                        $.each(xmppPeers, function(idx, currPeer) {
                            if (currPeer['status'] != true) {
                                obj['xmppPeerDownCnt']++;
                            }
                        });
                        obj['name'] = d['name'];
                        obj['link'] = {
                            p: 'mon_infra_vrouter',
                            q: {
                                type: "vRouter",
                                view: "details",
                                focusedElement: {
                                    node: obj['name'],
                                    tab: 'details'
                                }
                            }
                        };
                        obj['instCnt'] = getValueByJsonPath(dValue,
                            'VrouterAgent;virtual_machine_list', []).length;
                        obj['intfCnt'] = getValueByJsonPath(dValue,
                            'VrouterAgent;total_interface_count', 0);

                        obj['vnCnt'] = getValueByJsonPath(dValue,
                            'VrouterAgent;vn_count', 0);
                        obj['version'] = ifNullOrEmpty(self.getNodeVersion(
                            getValueByJsonPath(dValue,
                                'VrouterAgent;build_info')), noDataStr);
                        obj['type'] = 'vRouter';
                        obj['display_type'] = 'Virtual Router';
                        obj['isPartialUveMissing'] = false;
                        obj['errorIntfCnt'] = 0;
                        if (obj['isUveMissing'] == false) {
                            var xmppPeers = getValueByJsonPath(dValue,
                                'VrouterAgent;xmpp_peer_list', []);
                            obj['xmppPeerDownCnt'] = 0;
                            $.each(xmppPeers, function(idx, currPeer) {
                                if (currPeer['status'] != true) {
                                    obj['xmppPeerDownCnt']++;
                                }
                            });
                            obj['isPartialUveMissing'] = $.isEmptyObject(
                                    getValueByJsonPath(dValue,
                                        'VrouterStatsAgent;cpu_info')) ||
                                $.isEmptyObject(getValueByJsonPath(dValue,
                                    'VrouterAgent;build_info')) ||
                                obj['uveIP'].length == 0 ? true : false;
                            obj['errorIntfCnt'] = getValueByJsonPath(dValue,
                                'VrouterAgent;down_interface_count', 0);
                        }
                        if (obj['errorIntfCnt'] > 0) {
                            obj['errorIntfCntText'] = ", <span class='text-error'>" +
                                obj['errorIntfCnt'] + " Down</span>";
                        } else {
                            obj['errorIntfCntText'] = "";
                        }
                        obj['uveCfgIPMisMatch'] = false;
                        if (obj['isUveMissing'] == false && obj['isConfigMissing'] ==
                            false && obj['isPartialUveMissing'] == false) {
                            obj['uveCfgIPMisMatch'] = (obj['uveIP'].indexOf(obj[
                                    'configIP']) == -1 && obj['configIP'] != '-') ?
                                true : false;
                        }
                        obj['processAlerts'] = infraMonitorAlertUtils.getProcessAlerts(
                            d, obj, 'NodeStatus;process_info');
                        obj['isGeneratorRetrieved'] = false;
                        obj['nodeAlerts'] = infraMonitorAlertUtils.processvRouterAlerts(
                            obj);
                        var alarms = getValueByJsonPath(d,'value;UVEAlarms;alarms',[]);
                        if(cowu.getAlarmsFromAnalytics) {
                            obj['alerts'] = coreAlarmUtils.getAlertsFromAnalytics(
                                                            {
                                                                data:obj,
                                                                alarms:alarms,
                                                                nodeType:'vrouter',
                                                            });
                        } else {
                            obj['alerts'] = obj['nodeAlerts'].concat(obj['processAlerts']).sort(
                                    dashboardUtils.sortInfraAlerts);
                        }
                        //Decide color based on parameters
                        obj['color'] = monitorInfraUtils.getvRouterColor(d, obj);
                        obj['cores'] = self.getCores(d);
                        obj['rawData'] = d;
                        retArr.push(obj);
                    }
                    retArr.sort(dashboardUtils.sortNodesByColor);
                    return retArr;
                };

              //Parser for analytics node dashboard data
                this.parseAnalyticsNodesDashboardData = function (result) {

                    var retArr = [];
                    $.each(result, function(idx, d) {
                        var obj = {};
                        obj['x'] =
                            parseFloat(jsonPath(d,'$..ModuleCpuState.module_cpu_info' +
                            '[?(@.module_id=="contrail-collector")]..cpu_share')[0]);
                        obj['y'] =
                            parseInt(jsonPath(d,'$..ModuleCpuState.module_cpu_info' +
                            '[?(@.module_id=="contrail-collector")]..meminfo.res')[0])
                            / 1024;
                        obj['cpu'] = $.isNumeric(obj['x']) ? obj['x'].toFixed(2) : NaN;
                        obj['memory'] = formatBytes(obj['y'] * 1024 * 1024);
                        obj['x'] = $.isNumeric(obj['x']) ? obj['x'] : 0;
                        obj['y'] = $.isNumeric(obj['y']) ? obj['y'] : 0;
                        obj['histCpuArr'] =
                            monitorInfraUtils.parseUveHistoricalValues(d,'$.cpuStats.history-10');
                        obj['pendingQueryCnt'] = ifNull(jsonPath(d,
                            '$..QueryStats.queries_being_processed')[0], []).length;
                        obj['pendingQueryCnt'] = ifNull(jsonPath(d,
                            '$..QueryStats.pending_queries')[0], []).length;
                        obj['size'] = obj['pendingQueryCnt'];
                        obj['shape'] = 'circle';
                        obj['type'] = 'analyticsNode';
                        obj['display_type'] = 'Analytics Node';
                        obj['version'] = ifEmpty(self.getNodeVersion(jsonPath(d,
                            '$.value.CollectorState.build_info')[0]), '-');
                        try {
                            obj['status'] = getOverallNodeStatus(d, "analytics");
                        } catch(e) {
                            obj['status'] = 'Down';
                        }
                        //get the ips
                        var iplist = ifNull(jsonPath(d,'$..self_ip_list')[0],
                           noDataStr);
                        obj['ip'] = obj['summaryIps'] = noDataStr;
                        if (iplist != null && iplist != noDataStr
                           && iplist.length > 0) {
                            obj['ip'] = iplist[0];
                            var ipString = "";
                            $.each(iplist, function(idx, ip) {
                                if (idx + 1 == iplist.length) {
                                    ipString = ipString + ip;
                                } else {
                                    ipString = ipString + ip + ', ';
                                }
                            });
                            obj['summaryIps'] = ipString;
                        }
                        obj['name'] = d['name'];
                        obj['link'] = {
                            p : 'mon_infra_analytics',
                            q : {
                                type: "analyticsNode",
                                view: "details",
                                focusedElement: {
                                    node: obj['name'],
                                    tab: 'details'
                                }
                            }
                        };
                        obj['errorStrings'] = ifNull(jsonPath(d,
                            "$.value.ModuleCpuState.error_strings")[0], []);
                        obj['isNTPUnsynced'] =
                            monitorInfraUtils.isNTPUnsynced(jsonPath(d,'$..NodeStatus')[0]);
                        var isConfigDataAvailable = $.isEmptyObject(jsonPath(d,
                            '$..ConfigData')[0]) ? false : true;
                        obj['isUveMissing'] =
                            ($.isEmptyObject(jsonPath(d,'$..CollectorState')[0])
                            && isConfigDataAvailable) ? true : false;
                        obj['processAlerts'] =
                            infraMonitorAlertUtils.getProcessAlerts(d, obj);
                        obj['isPartialUveMissing'] = false;
                        if (obj['isUveMissing'] == false) {
                            if (cowu.isEmptyObject(jsonPath(d,
                                '$.value.ModuleCpuState.module_cpu_info'+
                                '[?(@.module_id=="contrail-collector")].cpu_info')[0])
                                || cowu.isEmptyObject(jsonPath(d,
                                        '$.value.CollectorState.build_info')[0])) {
                                        obj['isPartialUveMissing'] = true;
                            }
                        }
                        //get the cpu for analytics node
                        var cpuInfo =
                            jsonPath(d,'$..ModuleCpuState.module_cpu_info')[0];
                        obj['isGeneratorRetrieved'] = false;
                        var genInfos = ifNull(jsonPath(d,
                            '$.value.CollectorState.generator_infos')[0], []);
                        obj['genCount'] = genInfos.length;
                        obj['nodeAlerts'] = infraMonitorAlertUtils
                                                .processAnalyticsNodeAlerts(obj);
                        var alarms = getValueByJsonPath(d,'value;UVEAlarms;alarms',[]);
                        if(cowu.getAlarmsFromAnalytics) {
                            obj['alerts'] = coreAlarmUtils.getAlertsFromAnalytics(
                                                            {
                                                                data:obj,
                                                                alarms:alarms,
                                                                nodeType:'analytics-node'
                                                            });
                        } else {
                            obj['alerts'] = obj['nodeAlerts'].concat(obj['processAlerts'])
                                            .sort(dashboardUtils.sortInfraAlerts);
                        }
                        obj['color'] = monitorInfraUtils.getAnalyticsNodeColor(d, obj);
                        obj['cores'] = self.getCores(d);
                        obj['rawData'] = d;
                        retArr.push(obj);
                    });
                    retArr.sort(dashboardUtils.sortNodesByColor);
                    return retArr;

                };

                this.parseConfigNodesDashboardData = function (result) {

                    var retArr = [];
                    $.each(result,function(idx,d) {
                        var obj = {};
                        obj['x'] = parseFloat(jsonPath(d,
                            '$..ModuleCpuState.module_cpu_info'+
                            '[?(@.module_id=="contrail-api")]..cpu_share')[0]);
                        obj['y'] = parseInt(jsonPath(d,
                            '$..ModuleCpuState.module_cpu_info'+
                            '[?(@.module_id=="contrail-api")]..meminfo.res')[0])/1024;
                        obj['cpu'] = $.isNumeric(obj['x']) ? obj['x'].toFixed(2) : NaN;
                        obj['memory'] = formatBytes(obj['y']*1024*1024);
                        obj['x'] = $.isNumeric(obj['x']) ? obj['x'] : 0;
                        obj['y'] = $.isNumeric(obj['y']) ? obj['y'] : 0;
                        //Re-visit once average response time added for config nodes
                        obj['size'] = 0;
                        obj['version'] = ifEmpty(self.getNodeVersion(jsonPath(d,
                            '$.value.configNode.ModuleCpuState.build_info')[0]),'-');
                        obj['shape'] = 'circle';
                        obj['type'] = 'configNode';
                        obj['display_type'] = 'Config Node';
                        obj['name'] = d['name'];
                        obj['link'] =
                            {
                                p: 'mon_infra_config',
                                q: {
                                    type: "configNode",
                                    view: "details",
                                    focusedElement: {
                                        node: obj['name'],
                                        tab: 'details'
                                    }
                                }
                            };
                        obj['isNTPUnsynced'] =
                            monitorInfraUtils.isNTPUnsynced(jsonPath(d,'$..NodeStatus')[0]);
                        obj['isConfigMissing'] =
                            $.isEmptyObject(getValueByJsonPath(d,
                                                    'value;ConfigData')) ? true : false;
                        obj['isUveMissing'] =
                            ($.isEmptyObject(getValueByJsonPath(d,'value;configNode')))
                                ? true : false;
                        obj['processAlerts'] =
                            infraMonitorAlertUtils.getProcessAlerts(d,obj);
                        obj['isPartialUveMissing'] = false;
                        try{
                            obj['status'] = getOverallNodeStatus(d,"config");
                        }catch(e){
                            obj['status'] = 'Down';
                        }
                        obj['histCpuArr'] =
                            monitorInfraUtils.parseUveHistoricalValues(d,'$.cpuStats.history-10');
                        var iplist = jsonPath(d,'$..config_node_ip')[0];
                        obj['ip'] = obj['summaryIps'] = noDataStr;
                        if(iplist != null && iplist != noDataStr && iplist.length > 0){
                        obj['ip'] = iplist[0];
                        var ipString = "";
                            $.each(iplist, function (idx, ip){
                                if(idx+1 == iplist.length) {
                                    ipString = ipString + ip;
                                   } else {
                                    ipString = ipString + ip + ', ';
                                   }
                            });
                            obj['summaryIps'] = ipString;
                        }
                        if(cowu.isEmptyObject(jsonPath(d,
                           '$.value.configNode.ModuleCpuState.module_cpu_info'+
                           '[?(@.module_id=="contrail-api")].cpu_info')[0]) ||
                           cowu.isEmptyObject(jsonPath(d,
                                '$.value.configNode.ModuleCpuState.build_info')[0])) {
                           obj['isPartialUveMissing'] = true;
                        }
                        obj['isGeneratorRetrieved'] = false;
                        obj['nodeAlerts'] =
                            infraMonitorAlertUtils.processConfigNodeAlerts(obj);
                        var alarms = getValueByJsonPath(d,'value;configNode;UVEAlarms;alarms',[]);
                        if(cowu.getAlarmsFromAnalytics) {
                            obj['alerts'] = coreAlarmUtils.getAlertsFromAnalytics(
                                                            {
                                                                data:obj,
                                                                alarms:alarms,
                                                                nodeType:'config-node'
                                                            });
                        } else {
                            obj['alerts'] =
                                obj['nodeAlerts'].concat(obj['processAlerts'])
                                    .sort(dashboardUtils.sortInfraAlerts);
                        }
                        obj['color'] = monitorInfraUtils.getConfigNodeColor(d,obj);
                        obj['cores'] = self.getCores(d);
                        obj['rawData'] = d;
                        retArr.push(obj);
                    });
                    retArr.sort(dashboardUtils.sortNodesByColor);
                    return retArr;

                };

                //Parser for DBNode
                this.parseDatabaseNodesDashboardData = function (result) {

                    var retArr = [];
                    $.each(result,function(idx,d) {
                        var obj = {};
                        var dbSpaceAvailable =
                            parseFloat(jsonPath(d,
                            '$.value.databaseNode.DatabaseUsageInfo.'+
                            'database_usage[0].disk_space_available_1k')[0]);
                        var dbSpaceUsed = parseFloat(jsonPath(d,
                            '$.value.databaseNode.DatabaseUsageInfo.'+
                            'database_usage[0].disk_space_used_1k')[0]);
                        var analyticsDbSize = parseFloat(jsonPath(d,
                            '$.value.databaseNode.DatabaseUsageInfo.'+
                            'database_usage[0].analytics_db_size_1k')[0]);

                        obj['x'] = $.isNumeric(dbSpaceAvailable)?
                            dbSpaceAvailable / 1024 / 1024 : 0;
                        obj['y'] = $.isNumeric(dbSpaceUsed)?
                            dbSpaceUsed / 1024 / 1024 : 0;

                        obj['isConfigMissing'] = $.isEmptyObject(getValueByJsonPath(d,
                            'value;ConfigData')) ? true : false;
                        obj['isUveMissing'] = ($.isEmptyObject(getValueByJsonPath(d,
                            'value;databaseNode'))) ? true : false;
                        obj['version'] = ifEmpty(self.getNodeVersion(getValueByJsonPath(d,
                                            'value;databaseNode;NodeStatus;build_info')),'-');
                        var configData;
                        if(!obj['isConfigMissing']){
                            configData = getValueByJsonPath(d,'value;ConfigData');
                            obj['ip'] = configData.database_node_ip_address;
                        } else {
                            obj['ip'] = noDataStr;
                        }
                        obj['dbSpaceAvailable'] = dbSpaceAvailable;
                        obj['dbSpaceUsed'] = dbSpaceUsed;
                        obj['analyticsDbSize'] = analyticsDbSize;
                        obj['formattedAvailableSpace'] = $.isNumeric(dbSpaceAvailable)?
                            formatBytes(dbSpaceAvailable * 1024) : '-';
                        obj['formattedUsedSpace'] = $.isNumeric(dbSpaceUsed)?
                            formatBytes(dbSpaceUsed * 1024) : '-';
                        //Use the db usage percentage for bubble size
                        var usedPercentage = (obj['y'] * 100) / (obj['y']+obj['x']);
                        obj['usedPercentage'] = usedPercentage;
                        obj['formattedUsedPercentage'] = $.isNumeric(usedPercentage)?
                                usedPercentage.toFixed(2) + ' %': '-' ;
                        obj['formattedAnalyticsDbSize'] = $.isNumeric(analyticsDbSize)?
                            formatBytes(analyticsDbSize * 1024) : '-';
                        obj['formattedUsedSpaceWithPercentage'] =
                            (obj['formattedUsedSpace'] != '-')?
                            obj['formattedUsedSpace']  + ' (' +
                            obj['formattedUsedPercentage'] + ')' :
                                '-';
                        obj['size'] = obj['usedPercentage'];
                        obj['shape'] = 'circle';
                        obj['type'] = 'dbNode';
                        obj['display_type'] = 'Database Node';
                        obj['name'] = d['name'];
                        obj['link'] = {
                            p: 'mon_infra_database',
                            q: {
                                type: "databaseNode",
                                view: "details",
                                focusedElement: {
                                    node: obj['name'],
                                    tab: 'details'
                                }
                            }
                        };
                        obj['processAlerts'] =
                            infraMonitorAlertUtils.getProcessAlerts(d,obj);
                        obj['isPartialUveMissing'] = false;
                        try{
                            obj['status'] = getOverallNodeStatus(d,"db");
                        }catch(e){
                            obj['status'] = 'Down';
                        }
                        obj['isNTPUnsynced'] =
                            monitorInfraUtils.isNTPUnsynced(jsonPath(d,'$..NodeStatus')[0]);
                        obj['nodeAlerts'] =
                            infraMonitorAlertUtils.processDbNodeAlerts(obj);
                        var alarms = getValueByJsonPath(d,'value;databaseNode;UVEAlarms;alarms',[]);
                        if(cowu.getAlarmsFromAnalytics) {
                            obj['alerts'] = coreAlarmUtils.getAlertsFromAnalytics(
                                                            {
                                                                data:obj,
                                                                alarms:alarms,
                                                                nodeType:'database-node',
                                                            });
                        } else {
                            obj['alerts'] = obj['nodeAlerts'].concat(obj['processAlerts'])
                                        .sort(dashboardUtils.sortInfraAlerts);
                        }
                        obj['color'] = monitorInfraUtils.getDatabaseNodeColor(d,obj);
                        obj['cores'] = self.getCores(d);
                        obj['rawData'] = d;
                        retArr.push(obj);
                    });
                    retArr.sort(dashboardUtils.sortNodesByColor);
                    return retArr;

                }

                this.getNodeVersion = function (buildStr) {
                    var verStr = '';
                    if(buildStr != null) {
                        var buildInfo;
                        try {
                             buildInfo = JSON.parse(buildStr);
                        } catch(e) {
                        }
                        if((buildInfo != null) && (buildInfo['build-info']
                            instanceof Array)) {
                            var buildObj = buildInfo['build-info'][0];
                            verStr = buildObj['build-version'] + ' (Build ' +
                            buildObj['build-number'] + ')'
                        }
                    }
                    return verStr;
                };
                //Parser function for Control Node Routes

                this.getSecurityGroup = function (sg){
                    var ret = "";
                    sg = ifNullOrEmptyObject(sg,[]);
                    for(var i=0; i < sg.length; i++){
                        if(sg[i].search("security group") != -1) {
                            if(ret == ""){
                                ret = sg[i].split(":")[1];
                            } else {
                                ret = ret + ", " + sg[i].split(":")[1];
                            }
                        }
                    }
                    return ret;
                }

                this.parseRoutes = function (response,routesQueryString) {
                    var routesArr = [], routeTables = [], routeInstances = [];
                    var routes = response;
                    var selAddFamily = (routesQueryString['addrFamily'] == null ||
                            routesQueryString['addrFamily'] == '')? 'All' :
                                routesQueryString['addrFamily'];
                    var selPeerSrc = (routesQueryString['peerSource'] == null ||
                            routesQueryString['peerSource'] == '')? 'All' :
                                routesQueryString['peerSource'];
                    var selProtocol = (routesQueryString['protocol'] == null ||
                            routesQueryString['protocol'] == '')? 'All' :
                                routesQueryString['protocol'];
                    routes = jsonPath(response, '$..ShowRoute');
                    routeTables = jsonPath(response, '$..routing_table_name');
                    routeInstances = jsonPath(response, '$..routing_instance');
                    //routes = flattenList(routes);
                    var routesLen = routes.length;
                    for (var i = 0; i < routesLen; i++) {
                     var isRtTableDisplayed = false;
                     if(!(routes[i] instanceof Array)) {
                        routes[i] = [routes[i]];
                        }
                        $.each(routes[i], function (idx, value) {
                            var currRoute = value;
                            var paths = jsonPath(currRoute,"$..ShowRoutePath")[0];
                            if(!(paths instanceof Array)) {
                              paths = [paths];
                            }
                            var pathsLen = paths.length;
                            var alternatePaths = [],bestPath = {};
                            var rtTable = routeTables[i];
                            var securityGroup = "--";
                            //Multiple paths can be there for a given prefix
                            $.each(paths, function (idx,obj) {
                              if(isRtTableDisplayed){
                                 rtTable = '';
                                }
                              var rtable= routeTables[i];
                              var origVn = obj['origin_vn'];
                              var addfamily = '-';
                              if(rtable != null){
                                 addfamily = (rtable.split('.').length == 3) ?
                                         rtable.split('.')[1] : rtable;
                              }
                              var rawJson = obj;
                              var sg = self.getSecurityGroup(jsonPath(obj,
                                      "$..communities..element")[0]);
                              //Fitering based on Address Family, Peer Source and Protocol selection
                              if((selAddFamily == "All" || selAddFamily == addfamily) &&
                                    (selPeerSrc == "All" || selPeerSrc == obj['source']) &&
                                    (selProtocol == "All" || selProtocol == obj['protocol'])){
                                 var src = obj['source'];
                                 var protocol = ifNullOrEmptyObject(
                                         obj['protocol'],noDataStr);
                                 var nextHop = ifNullOrEmptyObject(
                                         obj['next_hop'],noDataStr);
                                 var label = ifNullOrEmptyObject(
                                         obj['label'],noDataStr);
                                 var prefix = ifNullOrEmptyObject(
                                         currRoute['prefix'],noDataStr);
                                 src = ifNullOrEmptyObject(src, noDataStr).
                                         split(":").pop();
                                 origVn = ifNullOrEmptyObject(origVn, noDataStr) ;

                                    if(idx == 0) {
                                       routesArr.push({
                                          prefix:prefix,
                                          dispPrefix:prefix,
                                          table:rtTable,
                                          instance:routeInstances[i],
                                          addrFamily:addfamily,
                                          sg:ifEmpty(sg,'-'),
                                          raw_json:rawJson,
                                          originVn:origVn,
                                          protocol:protocol,
                                          source:src,
                                          next_hop:nextHop,
                                          label:label
                                       });
                                    } else {
                                       routesArr.push({
                                          prefix:prefix,
                                          dispPrefix:prefix,
                                          table:rtTable,
                                          instance:routeInstances[i],
                                          addrFamily:addfamily,
                                          sg:ifEmpty(sg,'-'),
                                          raw_json:rawJson,
                                          originVn:origVn,
                                          protocol:protocol,
                                          source:src,
                                          next_hop:nextHop,
                                          label:label
                                       });
                                    }
                                    isRtTableDisplayed = true;
                              }
                            });
                        });
                    }
                    routesArr = cowu.flattenList(routesArr);
                    return routesArr;

                }
                this.parseGeneratorsData = function(result){
                    var retArr = [];
                    if(result != null && result[0] != null){
                        result = result[0].value;
                    } else {
                        result = [];
                    }
                    $.each(result,function(idx,d){
                        var obj = {};
                        obj['status'] = getOverallNodeStatusFromGenerators(d);
                        obj['name'] = d['name'];
                        retArr.push(obj);
                    });
                    return retArr;
                };
                this.parseCpuStatsData = function(statsData){
                    var ret = {};
                    var retArr = [];
                    if(statsData == null){
                        return [];
                    }
                    $.each(statsData,function(idx,d){
                        var source = d['Source'];
                        var t = JSON.stringify({"ts":d['T']});

                        if(ret[source] != null && ret[source]['history-10'] != null){
                            var hist10 = ret[source]['history-10'];
                            hist10[t] = d['cpu_info.cpu_share'];
                        } else {
                            ret[source] = {};
                            ret[source]['history-10'] = {};
                            ret[source]['history-10'][t] = d['cpu_info.cpu_share'];
                        }
                    });
                    $.each(ret,function(key,val){
                    var t = {};
                    t["name"] = key;
                    t["value"] = val;
                    retArr.push(t);
                    });
                    return retArr;
                };
                this.parseCpuMemStats = function(statsData,nodeType){
                    var ret = {};
                    var retArr = {};
                    if(statsData == null || statsData['data'] == null){
                        return [];
                    }
                    statsData = statsData['data'];
                    $.each(statsData,function(idx,d){
                        var module = d['cpu_info.module_id'];
                        var t = JSON.stringify({"ts":d['T']});
                        var cpuForModule = module + '-cpu-share';
                        var memForModule = module + '-mem-res';


                        if(nodeType == "computeNodeDS"){
                            cpuForModule = "contrail-vrouter-agent-cpu-share";
                            memForModule = "contrail-vrouter-agent-mem-res";
                            var oneMinCpuLoadModule = "contrail-vrouter-agent-one-min-cpuload";
                            var useSysMemModule = "contrail-vrouter-agent-used-sys-mem";
                            if(ret[oneMinCpuLoadModule] != null && ret[oneMinCpuLoadModule][0]['history-10'] != null){
                                var memhist10 = ret[oneMinCpuLoadModule][0]['history-10'];
                                memhist10[t] = d['cpu_info.mem_res'];
                            } else {
                                ret[oneMinCpuLoadModule] = [];
                                ret[oneMinCpuLoadModule][0]={'history-10':{}};
                                ret[oneMinCpuLoadModule][0]['history-10'][t] = d['cpu_info.one_min_cpuload'];
                            }
                            if(ret[useSysMemModule] != null && ret[useSysMemModule][0]['history-10'] != null){
                                var memhist10 = ret[useSysMemModule][0]['history-10'];
                                memhist10[t] = d['cpu_info.mem_res'];
                            } else {
                                ret[useSysMemModule] = [];
                                ret[useSysMemModule][0]={'history-10':{}};
                                ret[useSysMemModule][0]['history-10'][t] = d['cpu_info.used_sys_mem'];
                            }
                        }
                        if(ret[cpuForModule] != null && ret[cpuForModule][0]['history-10'] != null){
                            var cpuhist10 = ret[cpuForModule][0]['history-10'];
                            cpuhist10[t] = d['cpu_info.cpu_share'];
                        } else {
                            ret[cpuForModule] = [];
                            ret[cpuForModule][0]={'history-10':{}};
                            ret[cpuForModule][0]['history-10'][t] = d['cpu_info.cpu_share'];
                        }
                        if(ret[memForModule] != null && ret[memForModule][0]['history-10'] != null){
                            var memhist10 = ret[memForModule][0]['history-10'];
                            memhist10[t] = d['cpu_info.mem_res'];
                        } else {
                            ret[memForModule] = [];
                            ret[memForModule][0]={'history-10':{}};
                            ret[memForModule][0]['history-10'][t] = d['cpu_info.mem_res'];
                        }

                    });
                    retArr['value'] = ret;
                    return retArr;
                };

                this.parseVRouterDetails = function (data) {
                    var vRouterDetails = {};
                    //If IP address is not available in UVE,pick it from ConfigData
                    vRouterDetails['ip'] = getValueByJsonPath(data,'VrouterAgent;self_ip_list;0',
                            getValueByJsonPath(data,'ConfigData;virtual-router;virtual_router_ip_address'));
                    vRouterDetails['introspectPort'] = getValueByJsonPath(data,'VrouterAgent;sandesh_http_port',
                            monitorInfraConstants.defaultIntrospectPort);
                    vRouterDetails['vrouterModuleId'] = getValueByJsonPath(data,'NodeStatus;process_status;0;module_id',
                            monitorInfraConstants.UVEModuleIds['VROUTER_AGENT']);
                    vRouterDetails['vRouterType'] = getValueByJsonPath(data,
                            'ConfigData;virtual-router;virtual_router_type','hypervisor');
                        if(vRouterDetails['vRouterType'] instanceof Array) {
                            vRouterDetails['vRouterType'] =
                                vRouterDetails['vRouterType'][0];
                        }
                        if(vRouterDetails['vRouterType'] == '' ||
                                vRouterDetails['vRouterType'] == null) {
                            vRouterDetails['vRouterType'] = 'hypervisor';
                        }
                   return vRouterDetails;
                };

                this.parseVRouterInterfaceData = function(response) {
                    var retArray = [];
                    var sandeshData = jsonPath(response,'$..ItfSandeshData');
                    paginationInfo = getIntrospectPaginationInfo(response);
                    var sdata = [];
                    if(sandeshData != null){
                        $.each(sandeshData,function(idx,obj){
                            if(!(obj instanceof Array)){
                                sdata = sdata.concat([obj]);
                            } else {
                                sdata = sdata.concat(obj)
                            }
                        });

                        $.each(sdata, function (idx, obj) {
                            var rawJson = $.extend({},obj,true);
                            obj['vn_name'] = ifNullOrEmptyObject(obj['vn_name'],noDataStr);
                            obj['vm_uuid'] = ifNullOrEmptyObject(obj['vm_uuid'],noDataStr);
                            obj['vm_name'] = ifNullOrEmptyObject(obj['vm_name'],noDataStr);

                            var parts = obj['vn_name'].split(":"), dispVNName=obj['vn_name'];
                            if(parts.length == 3){
                                if(parts[2] != null) {dispVNName = parts[2];}
                                if(parts[1] != null) {dispVNName += " ("+parts[1]+")";}
                            }
                            var dispVMName = obj['vm_uuid'] + ' / ' + obj['vm_name'];
                            if(obj['vm_uuid'] == "" && obj['vm_name'] == "") {
                                dispVMName = '';
                            }
                            obj['dispName'] = obj['name'];
                            if(new RegExp(/remote-physical-port/).test(obj['type'])) {
                                var parts = obj['name'].split(":");
                                if(parts.length == 3) {
                                    if(parts[0] == 'default-global-system-config') {
                                        obj['dispName'] = contrail.format('{0}<br/> ({1})',parts[2],parts[1]);
                                    } else {
                                    obj['dispName'] = contrail.format('{0}<br/> ({1}:{2})',parts[2],parts[0],parts[1]);
                                    }
                                }
                            }
                            if(new RegExp(/logical-port/).test(obj['type'])) {
                                var parts = obj['name'].split(":");
                                if(parts.length == 4) {
                                    if(parts[0] == 'default-global-system-config') {
                                        obj['dispName'] = contrail.format('{0}<br/> ({1}:{2})',parts[3],parts[1],parts[2]);
                                    } else {
                                    obj['dispName'] = contrail.format('{0}<br/> ({1}:{2}:{3})',parts[3],parts[0],parts[1],parts[2]);
                                    }
                                }
                            }
                            // if(new RegExp(/vport|logical-port|remote-physical-port/).test(obj['type'])) {
                                if(obj.fip_list != null) {
                                    var fipList = [];
                                    fipList = ifNull(jsonPath(obj,"$..FloatingIpSandeshList")[0],[]);
                                    obj['disp_fip_list'] = self.floatingIPCellTemplate(fipList);
                                }
                                retArray.push({
                                    uuid: obj['uuid'],
                                    name: obj['name'],
                                    label: obj['label'],
                                    active: obj['active'],
                                    dispName: obj['dispName'],
                                    type: obj['type'],
                                    vn_name: obj['vn_name'],
                                    disp_vn_name: dispVNName,
                                    vm_uuid: obj['vm_uuid'],
                                    vm_name: obj['vm_name'],
                                    disp_vm_name: dispVMName,
                                    ip_addr: obj['ip_addr'],
                                    disp_fip_list: obj['disp_fip_list'],
                                    raw_json: rawJson
                                });
                            // }
                        });
                    }
                    return {
                        paginationInfo: paginationInfo,
                        data: retArray
                    };
                }

                this.parseVRouterVNData = function(response) {
                    var data = jsonPath(response,'$..VnSandeshData')[0];
                    var paginationInfo = monitorInfraUtils.getIntrospectPaginationInfo(response);
                    var ret = [];
                    if(data != null){
                        if(!(data instanceof Array)){
                            data = [data];
                        }
                        $.each(data, function (idx, obj) {
                            //Create clone of obj for rawJson if you are adding/modifying any keys in obj
                            var rawJson = obj, acl = noDataStr, vrf = noDataStr;
                            if(!$.isEmptyObject(obj['acl_uuid'])){
                                acl = obj['acl_uuid'];
                            }
                            if(!$.isEmptyObject(obj['vrf_name'])){
                                vrf = obj['vrf_name'];
                            }
                            ret.push({
                                acl_uuid:acl,
                                vrf_name:vrf,
                                name:obj['name'],
                                raw_json:rawJson
                            });
                        });
                        return  {
                            paginationInfo: paginationInfo,
                            data : ret
                        }
                    }
                    else {
                        return {
                            data: []
                        }
                    }
                }

                this.parseVRouterUnicastRoutesData = function(response){

                    var ucastPaths = jsonPath(response,'$..PathSandeshData');
                    paginationInfo = getIntrospectPaginationInfo(response);
                    var paths = [];
                    var uPaths = [];
                    ucastPaths = $.each(ucastPaths,function(idx,obj) {
                        if(obj instanceof Array) {
                            uPaths.push(obj);
                        } else {
                            uPaths.push([obj]);
                        }
                    });
                    var srcIPs = jsonPath(response,'$..src_ip');
                    var srcPrefixLens = jsonPath(response,'$..src_plen');
                    var srcVRFs = jsonPath(response,'$..src_vrf');

                    $.each(uPaths,function(idx,obj) {
                        $.each(obj,function(i,currPath) {
                            var rawJson = currPath;
                            if(i == 0)
                                paths.push({
                                    dispPrefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    prefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    path: currPath,
                                    src_ip: srcIPs[idx],
                                    src_plen: srcPrefixLens[idx],
                                    src_vrf: srcVRFs[idx],
                                    raw_json: rawJson
                                });
                            else
                                paths.push({
                                    dispPrefix: '',
                                    prefix: srcIPs[idx] +
                                        ' / ' + srcPrefixLens[idx],
                                    path: currPath,
                                    src_ip: srcIPs[idx],
                                    src_plen: srcPrefixLens[idx],
                                    src_vrf: srcVRFs[idx],
                                    raw_json: rawJson
                                });

                        });
                    });
                /* paths = $.map(paths,function(obj,idx) {
                        if(obj['path']['nh']['NhSandeshData']['type'] == 'Composite')
                            return null;
                        else
                            return obj;
                    });*/
                    //console.info(paths);
                    return {
                        paginationInfo: paginationInfo,
                        data: paths
                    };
                }

                this.parseVRouterMulticastRoutesData = function(response){

                    var ucastPaths = jsonPath(response,'$..RouteMcSandeshData');
                    paginationInfo = getIntrospectPaginationInfo(response);
                    var paths = [];
                    var uPaths = [];
                    ucastPaths = $.each(ucastPaths,function(idx,obj) {
                        if(obj instanceof Array) {
                            uPaths.push(obj);
                        } else {
                            uPaths.push([obj]);
                        }
                    });
                    var srcIPs = jsonPath(response,'$..src');
                    var srcPrefixLens = jsonPath(response,'$..grp');

                    $.each(uPaths,function(idx,obj) {
                        $.each(obj,function(i,currPath) {
                            var rawJson = currPath;
                            if(i == 0)
                                paths.push({
                                    dispPrefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    prefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    path: currPath,
                                    src_ip: srcIPs[idx],
                                    src_plen: srcPrefixLens[idx],
                                    raw_json: rawJson
                                });
                            else
                                paths.push({
                                    dispPrefix: '',
                                    prefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    path: currPath,
                                    src_ip: srcIPs[idx],
                                    src_plen: srcPrefixLens[idx],
                                    raw_json: rawJson
                                });

                        });
                    });
                /* TODO i am not ignoring the composite paths for the multicast
                    * paths = $.map(paths,function(obj,idx) {
                        if(obj['path']['nh']['NhSandeshData']['type'] == 'Composite')
                            return null;
                        else
                            return obj;
                    }); */
                    //console.info(paths);
                    return {
                        paginationInfo: paginationInfo,
                        data: paths
                    };
                }

                this.parseVRouterL2RoutesData = function(response){
                    var paths = [];
                    var l2Data = jsonPath(response,'$..RouteL2SandeshData')[0];
                    paginationInfo = getIntrospectPaginationInfo(response);
                    if(l2Data != null){
                        if(!(l2Data instanceof Array)){
                            l2Data = [l2Data];
                        }
                        $.each(l2Data, function(i,obj){
                            var mac = getValueByJsonPath(obj,'mac',noDataStr);
                            var srcVRF = getValueByJsonPath(obj,'src_vrf',noDataStr);
                            var pathSandeshData = getValueByJsonPath(obj,'path_list;list;PathSandeshData',[]);
                            if(!(pathSandeshData instanceof Array)){
                                pathSandeshData = [pathSandeshData];
                            }
                            $.each(pathSandeshData,function(j,currPath){
                                var rawJson = currPath;
                                if(j == 0)
                                    paths.push({
                                        mac: mac,
                                        searchMac: mac,
                                        path: currPath,
                                        src_vrf: srcVRF,
                                        raw_json: rawJson
                                    });
                                else
                                    paths.push({
                                        mac: '',
                                        searchMac: mac,
                                        path: currPath,
                                        src_vrf: srcVRF,
                                        raw_json: rawJson
                                    });
                            });
                        });
                    }
                    return {
                        paginationInfo: paginationInfo,
                        data: paths
                    };
                }

                this.parseVRouterIPv6RoutesData = function(response){

                    var ucastPaths = jsonPath(response,'$..PathSandeshData');
                    paginationInfo = getIntrospectPaginationInfo(response);
                    var paths = [];
                    var uPaths = [];
                    ucastPaths = $.each(ucastPaths,function(idx,obj) {
                        if(obj instanceof Array) {
                            uPaths.push(obj);
                        } else {
                            uPaths.push([obj]);
                        }
                    });
                    var srcIPs = jsonPath(response,'$..src_ip');
                    var srcPrefixLens = jsonPath(response,'$..src_plen');
                    var srcVRFs = jsonPath(response,'$..src_vrf');

                    $.each(uPaths,function(idx,obj) {
                        $.each(obj,function(i,currPath) {
                            var rawJson = currPath;
                            if(i == 0)
                                paths.push({
                                    dispPrefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    prefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    path: currPath,
                                    src_ip: srcIPs[idx],
                                    src_plen: srcPrefixLens[idx],
                                    src_vrf: srcVRFs[idx],
                                    raw_json: rawJson
                                });
                            else
                                paths.push({
                                    dispPrefix: '',
                                    prefix: srcIPs[idx] + ' / ' + srcPrefixLens[idx],
                                    path: currPath,
                                    src_ip: srcIPs[idx],
                                    src_plen: srcPrefixLens[idx],
                                    src_vrf: srcVRFs[idx],
                                    raw_json: rawJson
                                });

                        });
                    });
                    return {
                        paginationInfo: paginationInfo,
                        data: paths
                    };
                }

                this.parseVRouterFlowsData = function(response,aclUUID) {
                    var origResponse = response;
                    var isFromACLFlows = false;
                    var ret = [];
                    response = jsonPath(origResponse,"$..SandeshFlowData")[0];
                    if (response == null){
                        isFromACLFlows = true;
                        response = jsonPath(origResponse,"$..FlowSandeshData")[0];
                    }
                    var flowKey = jsonPath(origResponse,"$..flow_key")[0];
                    var iterationKey = jsonPath(origResponse,"$..iteration_key")[0];
                // var retArr = [];
                /* for (var i = 0; i < response.length; i++) {
                        var currACL = response[i];
                        for (var j = 0; j < currACL['flowData'].length; j++) {
                            var currFlow = currACL['flowData'][j];
                            var aclUuid = currACL['acl_uuid'];
                            retArr.push($.extend(currFlow, {acl_uuid:aclUuid}));
                        }
                    }*/
                    if( response != null ){
                        if(!(response instanceof Array)){
                            response = [response];
                        }
                        if(isFromACLFlows) {
                            $.each(response,function(idx,obj) {
                                var rawJson = obj;

                                ret.push({
                                    acl_uuid: (idx != 0) ? '' : aclUUID,
                                    searchUUID: aclUUID,
                                    src_vn: ifNullOrEmptyObject(obj['source_vn'], noDataStr),
                                    dst_vn: ifNullOrEmptyObject(obj['dest_vn'], noDataStr),
                                    sip: ifNullOrEmptyObject(obj['src'], noDataStr),
                                    src_port: ifNullOrEmptyObject(obj['src_port'], noDataStr),
                                    dst_port: ifNullOrEmptyObject(obj['dst_port'], noDataStr),
                                    setup_time_utc: ifNullOrEmptyObject(obj['setup_time_utc'], noDataStr),
                                    protocol: ifNullOrEmptyObject(obj['protocol'], noDataStr),
                                    dip: ifNullOrEmptyObject(obj['dst'], noDataStr),
                                    stats_bytes: ifNullOrEmptyObject(obj['bytes'], noDataStr),
                                    stats_packets: ifNullOrEmptyObject(obj['packets'], noDataStr),
                                    direction: ifNullOrEmptyObject(obj['direction'], noDataStr),
                                    peer_vrouter: ifNullOrEmptyObject(obj['peer_vrouter'], noDataStr),
                                    deny: ifNullOrEmptyObject(obj['implicit_deny'], noDataStr),
                                    raw_json: rawJson
                                });
                            });
                        } else {
                            $.each(response,function(idx,obj) {
                                var rawJson = obj;
                                ret.push({src_vn:ifNullOrEmptyObject(obj['src_vn_match'],noDataStr),
                                    dst_vn:ifNullOrEmptyObject(obj['dst_vn_match'],noDataStr),
                                    protocol:ifNullOrEmptyObject(obj['protocol'],noDataStr),
                                    sip:ifNullOrEmptyObject(obj['sip'],noDataStr),
                                    src_port:ifNullOrEmptyObject(obj['src_port'],noDataStr),
                                    dip:ifNullOrEmptyObject(obj['dip'],noDataStr),
                                    dst_port:ifNullOrEmptyObject(obj['dst_port'],noDataStr),
                                    setup_time_utc:ifNullOrEmptyObject(obj['setup_time_utc'],noDataStr),
                                    stats_bytes:ifNullOrEmptyObject(obj['stats_bytes'],noDataStr),
                                    stats_packets:ifNullOrEmptyObject(obj['stats_packets'],noDataStr),
                                    direction: ifNullOrEmptyObject(obj['direction'],noDataStr),
                                    peer_vrouter:ifNullOrEmptyObject(obj['peer_vrouter'],noDataStr),
                                    deny:ifNullOrEmptyObject(obj['implicit_deny'],noDataStr),
                                    raw_json:rawJson});
                            });
                        }
                    }
                    //Push the flowKey to the stack for Next use
                    if(flowKey != null && !$.isEmptyObject(flowKey)){
                        //Had to add this hack because sometimes we get into to
                        //this parse function twice leading this to be added twice to the stack
                        if(flowKey != "0:0:0:0:0.0.0.0:0.0.0.0" &&
                            flowKeyStack[flowKeyStack.length - 1] != flowKey)
                            flowKeyStack.push(flowKey);
                    }
                    if((flowKey == null) || (flowKey == "0:0:0:0:0.0.0.0:0.0.0.0")) {
                        lastFlowReq = true;
                    }
                    //Push the aclIterKey to the stack for Next use
                    if(iterationKey != null && !$.isEmptyObject(iterationKey)){
                        //Had to add this hack because sometimes we get into to
                        //this parse function twice leading this to be added twice to the stack
                        if(iterationKey.indexOf('0:0:0:0:0.0.0.0:0.0.0.0') == -1 &&
                            aclIterKeyStack[aclIterKeyStack.length - 1] != iterationKey)
                            aclIterKeyStack.push(iterationKey);
                    }
                    //$('#flowCnt').text(response.flowData.length);
                    return  ret;
                }

                self.mergeACLAndSGData = function(sgData,aclListModel) {
                    var primaryData = aclListModel.getItems();
                    //map all the sg ids with uuids
                    var sgMap = {};
                    var sgList = ifNull(jsonPath(sgData,"$.SgListResp.sg_list.list.SgSandeshData")[0],[]);
                    if(!(sgList instanceof Array)){
                        sgList = [sgList];
                    }
                    $.each(sgList,function(idx,obj){
                        sgMap[sgList[idx]['sg_id']] =  sgList[idx]['sg_uuid'];
                    });
                    $.each(primaryData,function(idx,obj){
                        if(obj['srcType'] == 'sg'){
                            if(sgMap[obj['srcSgId']] != null){
                                obj['src_vn'] = 'SG : ' + sgMap[obj['srcSgId']];
                            } else {
                                obj['src_vn'] = obj['srcSgId'];
                            }
                        }
                        if(obj['dstType'] == 'sg'){
                            if(sgMap[obj['dstSgId']] != null){
                                obj['dst_vn'] = 'SG : ' + sgMap[obj['dstSgId']];
                            } else {
                                obj['dst_vn'] = obj['dstSgId'];
                            }
                        }
                    });
                    aclListModel.setItems(primaryData);
                    // aclGrid._grid.invalidate();
                    // aclGrid.refreshView();
                }

                this.parseVRouterACLData = function(response) {

                    var retArr = [];
                    paginationInfo = getIntrospectPaginationInfo(response);
                    response = getValueByJsonPath(response,"__AclResp_list;AclResp;acl_list;list;AclSandeshData");
                    //Loop through ACLs
                    if(response != null){
                        if(!(response instanceof Array)) {
                            response = [response];
                        }
                        for (var i = 0; i < response.length; i++) {
                            var currACL = [];
                            currACL = getValueByJsonPath(response[i],"entries;list;AclEntrySandeshData",[]);
                            //Loop through ACEs
                            if(!(currACL instanceof Array)) {
                                currACL = [currACL];
                            }
                            for (var j = 0; j < currACL.length; j++) {
                                var currACE = currACL[j];
                                    var dispuuid = uuid = response[i]['uuid'];
                                    var flowCnt = response[i]['flow_count'];
                                    if(flowCnt == null){
                                        flowCnt = 0;
                                    }
                                    if(j > 0) {
                                        dispuuid = '';
                                        flowCnt = '';
                                    }
                                    var protoRange = srcPortRange = dstPortRange =
                                        actionVal = srcVn = destVn = aceid =
                                        srcType = dstType = srcSgId = dstSgId =
                                        noDataStr;
                                    protoRange = getValueByJsonPath(currACE,
                                        "proto_l;list;SandeshRange;min") + " - " +
                                        getValueByJsonPath(currACE,"proto_l;list;SandeshRange;max");
                                    srcPortRange = getValueByJsonPath(currACE,
                                        "src_port_l;list;SandeshRange;min") + " - " +
                                        getValueByJsonPath(currACE,"src_port_l;list;SandeshRange;max");
                                    dstPortRange = getValueByJsonPath(currACE,
                                        "dst_port_l;list;SandeshRange;min") + " - " +
                                        getValueByJsonPath(currACE,"dst_port_l;list;SandeshRange;max");
                                    var actionList = jsonPath(currACE,'$.action_l.list.ActionStr..action');
                                    if(!(actionList instanceof Array)){
                                        actionList = [actionList];
                                    }
                                    srcType = getValueByJsonPath(currACE,"src_type");
                                    dstType = getValueByJsonPath(currACE,"dst_type");
                                    try{
                                        srcVn = ifNullOrEmptyObject(getValueByJsonPath(currACE,"src"),noDataStr);
                                        if(srcType == 'sg'){
                                            srcSgId = srcVn;
                                            srcVn = noDataStr;
                                        } else {
                                            var srcVnParts = srcVn.split(' ');
                                            if(srcVnParts.length > 1){
                                                srcVn = '';
                                                $.each(srcVnParts,function(i,part){
                                                    if(i != 0){
                                                        srcVn = srcVn + ' / ' + part;
                                                    } else {
                                                        srcVn = part;
                                                    }
                                                });
                                            }
                                        }
                                    }catch(e){}
                                    try{
                                        destVn = ifNullOrEmptyObject(getValueByJsonPath(currACE,"dst"),noDataStr);
                                        if(dstType == 'sg'){
                                            dstSgId = destVn;
                                            destVn = noDataStr;
                                        } else {
                                            var dstVnParts = destVn.split(' ');
                                            if(dstVnParts.length > 1){
                                                destVn = '';
                                                $.each(dstVnParts,function(i,part){
                                                    if(i != 0){
                                                        destVn = destVn + ' / ' + part;
                                                    } else {
                                                        destVn = part;
                                                    }
                                                });
                                            }
                                        }
                                    }catch(e){}
                                    try{
                                        aceid = ifNull(currACE['ace_id'],noDataStr);
                                    }catch(e){}
                                    retArr.push({uuid:uuid,
                                        dispuuid:dispuuid,
                                        dst_vn:destVn,
                                        src_vn:srcVn,
                                        srcSgId:srcSgId,
                                        dstSgId:dstSgId,
                                        srcType:srcType,
                                        dstType:dstType,
                                        flow_count:flowCnt,
                                        aceId:aceid,
                                        proto:protoRange,
                                        src_port:srcPortRange,
                                        dst_port:dstPortRange,
                                        actionList:actionList,
                                        raw_json:response[i]});
                            }
                        }
                    /* TODO for context switching if(selectedAcl != null){
                            comboAcl.select(function(dataItem) {
                                return dataItem.text === selectedAcl;
                            });
                        } else {
                            onAclSelect();
                        } */
                    }
                    return {
                        data: retArr,
                        paginationInfo: paginationInfo
                    }
                }

                this.summaryIpDisplay = function (ip,tooltip){
                    return '<span title="'+ tooltip +'">' + ip + '</span>';
                }

                self.floatingIPCellTemplate = function(fip) {
                    var fipArray = [];
                    if(!(fip instanceof Array)){
                        if($.isEmptyObject(fip))
                            fip = [];
                        else
                            fip = [fip];
                    }
                    $.each(fip, function (idx, obj) {
                        fipArray.push(obj['ip_addr']);
                    });
                    if (fipArray.length == 0)
                        return 'None';
                    else
                        return fipArray.join(', ');
                }
                self.formatProtcolRange = function(rangeStr) {
                    if (rangeStr == "0 - 255")
                        return "any";
                    else
                        return rangeStr;
                }
                self.formatPortRange = function(rangeStr) {
                    if (rangeStr == null || rangeStr == "undefined - undefined" || rangeStr == "0 - 65535")
                        return "any";
                    else
                        return rangeStr;
                }
                self.getNextHopType = function (data) {
                    var type = data['path']['nh']['NhSandeshData']['type'];
                    if($.type(type) != "string"){
                        return '-';
                    } else {
                        return type;
                    }
                }
                self.getNextHopDetails = function (data) {
                    var nhType = self.getNextHopType(data);
                    //var nhData = jsonPath(data,'$..PathSandeshData').pop();
                    var nhData = data['path'];
                    var peer = nhData['peer'];
                    //nhData['nh'] = nhData['nh']['NhSandeshData'];
                    var nextHopData = nhData['nh']['NhSandeshData'];
                    var intf = nextHopData['itf'], mac = nextHopData['mac'], destVN = nhData['dest_vn'], source = nhData['peer'], policy = nextHopData['policy'], lbl = nhData['label'];
                    var sip = nextHopData['sip'], dip = nextHopData['dip'], tunnelType = nextHopData['tunnel_type'], valid = nextHopData['valid'], vrf = nextHopData['vrf'];
                    var destVNList = getValueByJsonPath(nhData,'dest_vn_list;list;element','');
                    if(destVNList instanceof Array)
                        destVNList = destVNList.join(',');
                    if (nhType == 'arp') {
                        return contrail.format(wrapLabelValue('Interface', nextHopData['itf']) +
                                wrapLabelValue('Mac', nextHopData['mac']) +
                                wrapLabelValue('IP', nextHopData['sip']) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'resolve' || nhType == 'receive') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']) +
                                wrapLabelValue('Destination VN', destVNList)  +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'interface') {
                        return contrail.format(wrapLabelValue('Interface', intf) +
                                wrapLabelValue('Destination VN', destVNList) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'tunnel') {
                        return contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('Destination VN', destVNList) +
                                wrapLabelValue('Label', lbl) +
                                wrapLabelValue('Tunnel type', tunnelType) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'vlan') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']) +
                                wrapLabelValue('Destination VN', destVNList) +
                                wrapLabelValue('Label', lbl) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'discard') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType.toLowerCase() == 'composite' || nhType.toLowerCase().search('l3 composite') != -1) {
                        var vrf = nextHopData['vrf'];
                        var refCount = nextHopData['ref_count'];
                        var policy = nextHopData['policy'];
                        var valid = nextHopData['valid'];
                        var label = nhData['label'];
                        var mcDataString = '';
                        var mcData;
                        if (nextHopData['mc_list'] != null &&
                                nextHopData['mc_list']['list'] != null && nextHopData['mc_list']['list']['McastData'] != null) {
                            mcData = nextHopData['mc_list']['list']['McastData'];
                            if (mcData.length > 1) {
                                for (var a = 0; a < mcData.length; a++) {
                                    mcDataString = mcDataString.concat("{");
                                    var dataObj = mcData[a]
                                    for (x in dataObj) {
                                        if (x == "type" || x == "sip" || x == "dip" || x == "label" || x == "itf")
                                            mcDataString = mcDataString.concat(' ' + x + ': ' + dataObj[x]);
                                    }
                                    mcDataString = mcDataString.concat("}");
                                }
                            } else {
                                mcDataString = mcDataString.concat("{");
                                for (x in mcData) {
                                    if (x == "type" || x == "sip" || x == "dip" || x == "label" || x == "itf")
                                        mcDataString = mcDataString.concat(' ' + x + ': ' + mcData[x]);
                                }
                                mcDataString = mcDataString.concat("}");
                            }
                        }
                        var x = contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('vrf', vrf) +
                                wrapLabelValue('Ref count', refCount) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Label', label) +
                                wrapLabelValue('Multicast Data', mcDataString));
                        return x;
                    } else {
                        var x = contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('vrf', vrf) +
                                wrapLabelValue('Ref count', refCount) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Label', lbl));
                            return x;
                    }
                }
                self.getNextHopDetailsForMulticast = function (data) {
                    var nhType = self.getNextHopType(data);
                    var nhData = data['path'];
                    var peer = nhData['peer'];
                    var nextHopData = nhData['nh']['NhSandeshData'];
                    var refCount = nextHopData['ref_count'];
                    var valid = nextHopData['valid'];
                    var policy = nextHopData['policy'];
                    var sip = nextHopData['sip'];
                    var dip = nextHopData['dip'];
                    var vrf = nextHopData['vrf'];
                    var label = nextHopData['label'];
                    var mcDataString = '';
                    var mcData;
                    if (nextHopData['mc_list'] != null && nextHopData['mc_list']['list'] != null && nextHopData['mc_list']['list']['McastData'] != null) {
                        mcData = nextHopData['mc_list']['list']['McastData'];
                        if (mcData.length > 1) {
                            for (var a = 0; a < mcData.length; a++) {
                                mcDataString = mcDataString.concat("{");
                                var dataObj = mcData[a]
                                for (x in dataObj) {
                                    if (x == "type" || x == "sip" || x == "dip" || x == "label" || x == "itf")
                                        mcDataString = mcDataString.concat(' ' + x + ': ' + dataObj[x]);
                                }
                                mcDataString = mcDataString.concat("}");
                            }
                        } else {
                            mcDataString = mcDataString.concat("{");
                            for (x in mcData) {
                                if (x == "type" || x == "sip" || x == "dip" || x == "label" || x == "itf")
                                    mcDataString = mcDataString.concat(' ' + x + ': ' + mcData[x]);
                            }
                            mcDataString = mcDataString.concat("}");
                        }
                    }
                    if (nhType == 'arp') {
                        return contrail.format(wrapLabelValue('Interface', nextHopData['itf']) +
                                wrapLabelValue('Mac', nextHopData['mac']) +
                                wrapLabelValue('Source IP', nextHopData['sip']) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'resolve') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']) +
                                wrapLabelValue('Destination VN', nhData['dest_vn']) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'receive') {
                        return contrail.format(wrapLabelValue('Reference Count', refCount) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Policy', policy));
                    } else if (nhType == 'interface') {
                        return contrail.format(wrapLabelValue('Interface', intf) +
                                wrapLabelValue('Destination VN', destVN) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'tunnel') {
                        return contrail.format(wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('Destination VN', destVN) +
                                wrapLabelValue('Label', lbl) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else {
                        var x = contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('vrf', vrf) +
                                wrapLabelValue('Ref count', refCount) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Label', label) +
                                wrapLabelValue('Multicast Data', mcDataString));
                        return x;
                    }
                }
                self.getNextHopDetailsForL2 = function (data) {
                    var nhType = self.getNextHopType(data);
                    //var nhData = jsonPath(data,'$..PathSandeshData').pop();
                    var nhData = data['path'];
                    var peer = nhData['peer'];
                    //nhData['nh'] = nhData['nh']['NhSandeshData'];
                    var nextHopData = nhData['nh']['NhSandeshData'];
                    var intf = nextHopData['itf'], mac = nextHopData['mac'], destVN = nhData['dest_vn'], source = nhData['peer'], policy = nextHopData['policy'], lbl = nhData['label'];
                    var sip = nextHopData['sip'], dip = nextHopData['dip'], valid = nextHopData['valid'], vrf = nextHopData['vrf'], tunnelType = nextHopData['tunnel_type'];
                    if (nhType == 'arp') {
                        //return contrail.format('Intf: {0} VRF: {1} Mac: {2} Source IP: {3}',nextHopData['itf'],nextHopData['vrf'],nextHopData['mac'],nextHopData['sip']);
                        return contrail.format(wrapLabelValue('Interface', nextHopData['itf']) +
                                wrapLabelValue('Mac', nextHopData['mac']) +
                                wrapLabelValue('IP', nextHopData['sip']) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'resolve' || nhType == 'receive') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']) +
                                wrapLabelValue('Destination VN', nhData['dest_vn']) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'interface') {
                        return contrail.format(wrapLabelValue('Interface', intf) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Policy', policy));
                    } else if (nhType == 'tunnel') {
                        return contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Vrf', vrf) +
                                wrapLabelValue('Label', lbl) +
                                wrapLabelValue('Tunnel type', tunnelType));
                    } else if (nhType == 'vlan') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']) +
                                wrapLabelValue('Destination VN', destVN) +
                                wrapLabelValue('Label', lbl) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid));
                    } else if (nhType == 'discard') {
                        return contrail.format(wrapLabelValue('Source', nhData['peer']));
                    } else if (nhType.toLowerCase() == 'composite'  || nhType.toLowerCase().search('l2 composite') != -1) {
                        var vrf = nextHopData['vrf'];
                        var refCount = nextHopData['ref_count'];
                        var policy = nextHopData['policy'];
                        var valid = nextHopData['valid'];
                        var label = nhData['label'];
                        var mcDataString = '';
                        var mcData;
                        if (nextHopData['mc_list'] != null && nextHopData['mc_list']['list'] != null && nextHopData['mc_list']['list']['McastData'] != null) {
                            mcData = nextHopData['mc_list']['list']['McastData'];
                            if (mcData.length > 1) {
                                for (var a = 0; a < mcData.length; a++) {
                                    mcDataString = mcDataString.concat("{");
                                    var dataObj = mcData[a]
                                    for (x in dataObj) {
                                        if (x == "type" || x == "sip" || x == "dip" || x == "label" || x == "itf")
                                            mcDataString = mcDataString.concat(' ' + x + ': ' + dataObj[x]);
                                    }
                                    mcDataString = mcDataString.concat("}");
                                }
                            } else {
                                mcDataString = mcDataString.concat("{");
                                for (x in mcData) {
                                    if (x == "type" || x == "sip" || x == "dip" || x == "label" || x == "itf")
                                        mcDataString = mcDataString.concat(' ' + x + ': ' + mcData[x]);
                                }
                                mcDataString = mcDataString.concat("}");
                            }
                        }
                        var x = contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('vrf', vrf) +
                                wrapLabelValue('Ref count', refCount) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Label', label) +
                                wrapLabelValue('Multicast Data', mcDataString));
                        return x;
                    } else {
                        var x = contrail.format(wrapLabelValue('Source IP', sip) +
                                wrapLabelValue('Destination IP', dip) +
                                wrapLabelValue('vrf', vrf) +
                                wrapLabelValue('Policy', policy) +
                                wrapLabelValue('Peer', peer) +
                                wrapLabelValue('Valid', valid) +
                                wrapLabelValue('Label', lbl));
                            return x;
                    }
                };
                this.parseUnderlayFlowRecords = function (response, vRouters) {
                    vRouters = ifNull(vRouters,[]);
                    $.each(ifNull(response['data'],[]),function (idx,obj) {
                        var formattedVrouter,formattedOtherVrouter,
                            formattedSrcVN,formattedDestVN;
                        var vRouterIp =
                            validateIPAddress(cowu.handleNull4Grid(obj['vrouter_ip'])) == true ?
                            cowu.handleNull4Grid(obj['vrouter_ip']) : noDataStr,
                                formattedVrouter = vRouterIp;
                        var vrouter = ifNull(obj['vrouter'],noDataStr);
                        if(vRouterIp != noDataStr || vrouter != noDataStr)
                            formattedVrouter =
                                contrail.format('{0} ({1})',vrouter, vRouterIp);
                        var othervRouterIp =
                            validateIPAddress(cowu.handleNull4Grid(obj['other_vrouter_ip'])) == true ?
                                cowu.handleNull4Grid(obj['other_vrouter_ip']) : noDataStr,
                                formattedOtherVrouter = othervRouterIp;
                            if(othervRouterIp != noDataStr) {
                                $.each(vRouters,function(idx,obj){
                                    var ipList = getValueByJsonPath(obj,
                                        'more_attributes;VrouterAgent;self_ip_list',[]);
                                    if(ipList.indexOf(othervRouterIp) > -1)
                                        formattedOtherVrouter = contrail.format('{0} ({1})',
                                            ifNull(obj['name'],noDataStr), othervRouterIp);
                                });
                            }
                       var formattedSrcVN = cowu.handleNull4Grid(obj['sourcevn']);
                       formattedSrcVN = formatVN(formattedSrcVN);
                       var formattedDestVN = cowu.handleNull4Grid(obj['destvn']);
                       formattedDestVN = formatVN(formattedSrcVN);
                       obj['formattedVrouter'] = formattedVrouter;
                       obj['formattedOtherVrouter'] = formattedOtherVrouter;
                       obj['formattedSrcVN'] = formattedSrcVN[0];
                       obj['formattedDestVN'] = formattedDestVN[0];
                    });
                    response['data'].sort(function(dataItem1,dataItem2){
                        if((dataItem1['vrouter_ip'] != null  && dataItem1['other_vrouter_ip']!= null)
                            && (dataItem2['vrouter_ip'] == null || dataItem2['other_vrouter_ip'] == null)) {
                            return -1;
                        } else if ((dataItem2['vrouter_ip'] != null  && dataItem2['other_vrouter_ip']!= null)
                            && (dataItem1['vrouter_ip'] == null || dataItem1['other_vrouter_ip'] == null)) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    return response['data'];
                }

                self.getCores = function (data) {
                    var fileList=[];
                    var fileArrList=[];
                    var procCoreList = jsonPath(data,'$..NodeStatus.process_info[*].core_file_list');
                    if (procCoreList){
                        fileArrList = ifNull(procCoreList,[]);
                    }
                    // var allCoresList = ifNull(jsonPath(data,'$..NodeStatus.all_core_file_list')[0],[]);
                    // fileArrList = fileArrList.concat([allCoresList]);
                    for (var i=0;i<fileArrList.length;i++){
                        var files=fileArrList[i];
                       for (var j=0;j<files.length;j++)
                           fileList.push(files[j])
                    }
                    return (fileList.length == 0)? '-' : fileList;
                }

                self.getCpuText = function (cpu, noCpuText) {
                    var ret = ifNotNumeric(cpu,noCpuText)
                    return ret;
                }
            };

            return MonInfraParsers;
       }
);

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('monitor-infra-constants',[
    'underscore'
], function (_) {
    var MonitorInfraConstants = function () {
        this.infraNodesTree;
        this.noDataStr = '-';
        this.controlNodetabs = ['details', 'peers', 'routes', 'console','servicechaining'];
        this.computeNodeTabs = ['details', 'interfaces', 'networks', 'acl', 'flows','routes', 'console'];
        this.analyticsNodeTabs = ['details', 'generators', 'qequeries', 'console'];
        this.configNodeTabs = ['details', 'console', 'generators', 'qequeries'];
        this.dbNodeTabs = ['details'];

        this.COMPUTE_NODE = 'computeNode';
        this.CONTROL_NODE = 'controlNode';
        this.ANALYTICS_NODE = 'analyticsNode';
        this.CONFIG_NODE = 'configNode';
        this.DATABASE_NODE = 'databaseNode';

        this.excludeProcessList = ['contrail-config-nodemgr','contrail-analytics-nodemgr','contrail-control-nodemgr','contrail-snmp-collector','contrail-topology',
            'contrail-vrouter-nodemgr','openstack-nova-compute','contrail-svc-monitor','contrail-schema','contrail-discovery','contrail-zookeeper','redis-sentinel','contrail-device-manager'];
        this.vRouterDashboardChartInitialized = false;
        this.controlNodesDashboardChartInitialized = false;
        this.analyticsNodesDashboardChartInitialized = false;
        this.configNodesDashboardChartInitialized = false;
        this.computeNodeTabStrip = "compute_tabstrip";
        this.configNodeTabStrip = "config_tabstrip";
        this.aNodeTabStrip = "analytics_tabstrip";
        this.ctrlNodeTabStrip = "control_tabstrip";
        this.dbNodeTabStrip = "db_tabstrip";
        this.infraDetailsPageCPUChartTitle = ctwl.TITLE_CPU;
        this.CONSOLE_LOGS_REFRESH_INTERVAL = 90000;//Auto refresh interval in console tab (ms)

        this.IS_NODE_MANAGER_INSTALLED = true;

        this.HOST_DPDK = 'HOST_DPDK';

        this.monitorInfraUrls = {
                TENANT_API_URL              : "/api/tenant/get-data",

                VROUTER_BASE                : '/api/admin/monitor/infrastructure/vrouter/',
                VROUTER_SUMMARY             : '/api/admin/monitor/infrastructure/vrouters/summary',
                VROUTER_CACHED_SUMMARY      : '/api/admin/monitor/infrastructure/vrouters/cached-summary',
                VROUTER_DETAILS             : '/api/admin/monitor/infrastructure/vrouter/details?hostname={0}&basic={1}',
                VROUTER_INTERFACES          : '/api/admin/monitor/infrastructure/vrouter/interface',
                VROUTER_NETWORKS            : '/api/admin/monitor/infrastructure/vrouter/vn',
                VROUTER_ACL                 : '/api/admin/monitor/infrastructure/vrouter/acl',
                VROUTER_FLOWS               : '/api/admin/monitor/infrastructure/vrouter/flows',
                VROUTER_VRF_LIST            : '/api/admin/monitor/infrastructure/vrouter/vrf-list?ip={0}&introspectPort={1}',
                VROUTER_UNICAST_ROUTES      : '/api/admin/monitor/infrastructure/vrouter/ucast-routes',
                VROUTER_MCAST_ROUTES        : '/api/admin/monitor/infrastructure/vrouter/mcast-routes',
                VROUTER_L2_ROUTES           : '/api/admin/monitor/infrastructure/vrouter/l2-routes',
                VROUTER_UCAST6_ROUTES       : '/api/admin/monitor/infrastructure/vrouter/ucast6-routes',
                VROUTER_INSTANCES_IN_CHUNKS : '/api/tenant/networking/vrouter-virtual-machines/details?vRouter={0}&count={1}&startAt={2}',
                CONTROLNODE_SUMMARY         : '/api/admin/monitor/infrastructure/controlnodes/summary',
                CONTROLNODE_DETAILS         : '/api/admin/monitor/infrastructure/controlnode/details?hostname={0}',
                CONTROLNODE_PEERS           : '/api/admin/monitor/infrastructure/controlnode/paged-bgppeer?hostname={0}&count={1}',
                CONTROLNODE_ROUTE_INST_LIST : '/api/admin/monitor/infrastructure/controlnode/routes/rout-inst-list?ip={0}',
                CONTROLNODE_PEER_LIST       : '/api/admin/monitor/infrastructure/controlnode/peer-list?hostname={0}',
                CONTROLNODE_ROUTES          : '/api/admin/monitor/infrastructure/controlnode/routes',

                ANALYTICS_SUMMARY           : '/api/admin/monitor/infrastructure/analyticsnodes/summary',
                ANALYTICS_DETAILS           : '/api/admin/monitor/infrastructure/analyticsnode/details?hostname={0}',
                ANALYTICS_GENERATORS        : '/api/admin/monitor/infrastructure/analyticsnode/generators?hostname={0}&count={1}',

                CONFIG_SUMMARY              : '/api/admin/monitor/infrastructure/confignodes/summary',
                CONFIG_DETAILS              : '/api/admin/monitor/infrastructure/confignode/details?hostname={0}',

                DATABASE_SUMMARY            : '/api/admin/monitor/infrastructure/dbnodes/summary',
                DATABASE_DETAILS            : '/api/admin/monitor/infrastructure/dbnode/details?hostname={0}',

                FLOWSERIES_CPU              : '/api/tenant/networking/flow-series/cpu?moduleId={0}&minsSince={1}&sampleCnt={2}&source={3}&endTime={4}',
                QUERY                       : '/api/admin/reports/query',
                MSGTABLE_CATEGORY           : '/api/admin/table/values/MessageTable/Category',
                MSGTABLE_LEVEL              : '/api/admin/table/values/MessageTable/Level'
        }

        this.UVEModuleIds = {
                VROUTER_AGENT       : 'contrail-vrouter-agent',
                CONTROLNODE         : 'contrail-control',
                COLLECTOR           : 'contrail-collector',
                OPSERVER            : 'contrail-analytics-api',
                QUERYENGINE         : 'contrail-query-engine',
                APISERVER           : 'contrail-api',
                DISCOVERY_SERVICE   : 'contrail-discovery',
                SERVICE_MONITOR     : 'contrail-svc-monitor',
                SCHEMA              : 'contrail-schema',
                ANALYTICS_NODEMGR   : 'contrail-analytics-nodemgr',
                CONFIG_NODE         : 'ConfigNode',
                IFMAP               : 'ifmap',
                DATABASE            : 'contrail-database',
                KAFKA               : 'kafka'
        }

        this.controlProcsForLastTimeStamp = [this.UVEModuleIds['CONTROLNODE']];
        this.computeProcsForLastTimeStamp = [this.UVEModuleIds['VROUTER_AGENT']];
        this.analyticsProcsForLastTimeStamp = [this.UVEModuleIds['COLLECTOR'],
                                               this.UVEModuleIds['OPSERVER']];
        this.configProcsForLastTimeStamp = [this.UVEModuleIds['APISERVER'],
                                            this.UVEModuleIds['DISCOVERY_SERVICE'],
                                            this.UVEModuleIds['SERVICE_MONITOR'],
                                            this.UVEModuleIds['SCHEMA']];
        this.defaultIntrospectPort = '8085';

    };

    return MonitorInfraConstants;
});

/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define('mon-infra-controller-dashboard',[
    'underscore',
    'backbone',
    'confignode-scatterchart-view',
    // 'controller-basedir/monitor/infrastructure/common/ui/js/views/ConfigNodeScatterChartView',
    'controlnode-scatterchart-view',
    // 'controller-basedir/monitor/infrastructure/common/ui/js/views/ControlNodeScatterChartView',
    'dbnode-scatterchart-view',
    // 'controller-basedir/monitor/infrastructure/common/ui/js/views/DatabaseNodeScatterChartView',
    'analyticsnode-scatterchart-view',
    // 'controller-basedir/monitor/infrastructure/common/ui/js/views/AnalyticsNodeScatterChartView',
    'mon-infra-dashboard-view',
    'vrouter-dashboard-view',
    'monitor-infra-analyticsnode-model',
    'monitor-infra-databasenode-model',
    'monitor-infra-confignode-model',
    'monitor-infra-controlnode-model',
    'monitor-infra-vrouter-model'
], function(_,Backbone,ConfigNodeScatterChartView,
        ControlNodeScatterChartView,DatabaseNodeScatterChartView,
        AnalyticsNodeScatterChartView,MonitorInfraDashboardView,VRouterDashboardView,
        AnalyticsNodeListModel,DatabaseNodeListModel,ConfigNodeListModel,
        ControlNodeListModel,VRouterListModel) {

    var ControllerDashboardView = Backbone.View.extend({
        el: $(contentContainer),
        render: function () {
            var self = this;
            //No need to instantiate as it's a singleton class
            var monitorInfraDashboardView = MonitorInfraDashboardView;
            monitorInfraDashboardView.addInfoboxes(getInfoboxesConfig());
            // console.info('added infoboxes',performance.now());
        }
    });

    function getInfoboxesConfig() {
        var vRouterListModel = new VRouterListModel();
        var analyticsNodeListModel = new AnalyticsNodeListModel();
        var controlNodeListModel = new ControlNodeListModel();
        var databaseNodeListModel = new DatabaseNodeListModel();
        var configNodeListModel = new ConfigNodeListModel();

        return [{
            title: 'Virtual Routers',
            view: VRouterDashboardView,
            model: vRouterListModel,
            downCntFn: dashboardUtils.getDownNodeCnt
        }, {
            title: 'Control Nodes',
            view: ControlNodeScatterChartView,
            model: controlNodeListModel,
            downCntFn: dashboardUtils.getDownNodeCnt
        },{
            title: 'Analytics Nodes',
            view: AnalyticsNodeScatterChartView,
            model: analyticsNodeListModel,
            downCntFn: dashboardUtils.getDownNodeCnt
        },{
            title: 'Config Nodes',
            view: ConfigNodeScatterChartView,
            model: configNodeListModel,
            downCntFn: dashboardUtils.getDownNodeCnt
        },{
            title: 'Database Nodes',
            view: DatabaseNodeScatterChartView,
            model: databaseNodeListModel,
            downCntFn: dashboardUtils.getDownNodeCnt
        }];
    };

    return ControllerDashboardView;
});

define('js/controller-dashboard-libs',[
    'monitor-infra-confignode-model',
    'monitor-infra-analyticsnode-model',
    'monitor-infra-databasenode-model',
    'monitor-infra-controlnode-model',
    'monitor-infra-vrouter-model',
    'monitor-infra-utils',
    'confignode-scatterchart-view',
    'controlnode-scatterchart-view',
    'dbnode-scatterchart-view',
    'analyticsnode-scatterchart-view',
    'vrouter-scatterchart-view',
    'vrouter-dashboard-view',
    'monitor-infra-parsers',
    'monitor-infra-utils',
    'monitor-infra-constants',
    'mon-infra-controller-dashboard'
    ], function() {
        
        });

