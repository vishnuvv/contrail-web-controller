
/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['lodash', 'contrail-view', 'monitor-infra-controlnode-model', 'node-color-mapping'],
        function(_, ContrailView,  controlNodeListModelCfg, NodeColorMapping) {
    var ControlNodeModelCfg = function () {
        var self = this;
        self.modelCfg = {
            'CONTROLNODE_SENT_UPDATES_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.PeerStatsData.tx_update_stats',
                    select: 'T=, Source, SUM(tx_update_stats.reach), SUM(tx_update_stats.unreach)'
                }
            },
            'CONTROLNODE_RECEIVED_UPDATES_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.PeerStatsData.rx_update_stats',
                    select: 'T=, Source, SUM(rx_update_stats.reach), SUM(rx_update_stats.unreach)'
                }
            },
            'CONTROLNODE_SYSTEM_CPU_SHARE_MODEL': {
                baseModel: 'SYSTEM_CPU_MODEL',
                baseView: 'SYSTEM_CPU_SHARE_VIEW',
                modelCfg : {
                    config: {
                        where:'node-type = control-node'
                    }
                },
            },
            'CONTROLNODE_SYSTEM_MEMORY_USAGE_MODEL': {
                baseModel: 'SYSTEM_MEMORY_MODEL',
                baseView:'SYSTEM_MEMORY_USAGE_VIEW',
                modelCfg : {
                    config: {
                        where:'node-type = control-node'
                    }
                },
            },
            'CONTROLNODE_DISK_USAGE_INFO_MODEL': {
                baseModel:'SYSTEM_DISK_USAGE_MODEL',
                baseView:'SYSTEM_DISK_USAGE_VIEW',
                modelCfg : {
                    config: {
                        where:'node-type = control-node'
                    }
                },
            },
            'CONTROLNODE_SYSTEM_LOGS_MODEL': {
                type: "controlNode",
                source:'LOG',
                config: {
                    table_name: 'MessageTable',
                    table_type: 'LOG',
                    select: 'Source,ModuleId,MessageTS,Messagetype,Level,Category,Xmlmessage',
                    where:'ModuleId=contrail-control'
                }
            },
            'CONTROLNODE_OBJECTBGPROUTER_LOGS_MODEL': {
                type: "controlNode",
                source:'OBJECT',
                config: {
                    table_name: 'ObjectBgpRouter',
                    table_type: 'OBJECT',
                    select: 'Source,ModuleId,MessageTS,ObjectId,Messagetype,ObjectLog,SystemLog',
                    where:'ModuleId=contrail-control'
                }
            },
            'CONTROLNODE_OBJECTXMPPPEER_LOGS_MODEL': {
                type: "controlNode",
                source:'OBJECT',
                config: {
                    table_name: 'ObjectXmppPeerInfo',
                    table_type: 'OBJECT',
                    select: 'Source,ModuleId,MessageTS,ObjectId,Messagetype,ObjectLog,SystemLog',
                    where:'ModuleId=contrail-control'
                }
            },
            'CONTROLNODE_OBJECTBGPPEER_LOGS_MODEL': {
                type: "controlNode",
                source:'OBJECT',
                config: {
                    table_name: 'ObjectBgpPeer',
                    table_type: 'OBJECT',
                    select: 'Source,ModuleId,MessageTS,ObjectId,Messagetype,ObjectLog,SystemLog',
                    where:'ModuleId=contrail-control'
                }
            },
            'CONTROLNODE_MEMORY_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.mem_res)',
                    where:'process_mem_cpu_usage.__key = contrail-control'
                }
            },
            'CONTROLNODE_CONTROL_CPU_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                    where:'process_mem_cpu_usage.__key = contrail-control'
                }
            },
            'CONTROLNODE_NODEMGR_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                    where:'process_mem_cpu_usage.__key = contrail-control-nodemgr'
                }
            },
            'CONTROLNODE_DNS_CPU_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                    where:'process_mem_cpu_usage.__key = contrail-dns'
                }
            },
            'CONTROLNODE_NAMED_CPU_MODEL': {
                type: "controlNode",
                source:'STATTABLE',
                config: {
                    table_name: 'StatTable.NodeStatus.process_mem_cpu_usage',
                    select: 'name, T=, MAX(process_mem_cpu_usage.cpu_share)',
                    where:'process_mem_cpu_usage.__key = contrail-named'
                }
            },
            'CONTROLNODE_LIST_MODEL': {
                type: "controlNode",
                config: controlNodeListModelCfg
            }
        };
        function getControlNodeSummaryGridConfig(widgetId, colorFn) {
            var columns = [
                           {
                               field:"name",
                               name:"Host name",
                               formatter:function(r,c,v,cd,dc) {
                                  return cellTemplateLinks({cellText:'name',
                                      name:'name',
                                      statusBubble:true,
                                      rowData:dc,
                                      tagColorMap:colorFn(_.pluck(cowu.getGridItemsForWidgetId(widgetId), 'name'))});
                               },
                               events: {
                                  onClick: onClickHostName
                               },
                               cssClass: 'cell-hyperlink-blue',
                               minWidth:110,
                               exportConfig: {
                                   allow: true,
                                   advFormatter: function(dc) {
                                       return dc.name;
                                   }
                               }
                           },
                           {
                               field:"ip",
                               name:"IP Address",
                               formatter:function(r,c,v,cd,dc){
                                   return monitorInfraParsers.summaryIpDisplay(dc['ip'],dc['summaryIps']);
                               },
                               minWidth:90,
                               exportConfig: {
                                   allow: true,
                                   advFormatter: function(dc) {
                                       return dc.ip;
                                   }
                               },
                               sorter : comparatorIP
                           },
                           {
                               field:"version",
                               name:"Version",
                               minWidth:150
                           },
                           {
                               field:"status",
                               name:"Status",
                               sortable:true,
                               formatter:function(r,c,v,cd,dc) {
                                   return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,'html');
                               },
                               searchFn:function(d) {
                                   return monitorInfraUtils.getNodeStatusContentForSummayPages(d,'text');
                               },
                               exportConfig: {
                                   allow: true,
                                   advFormatter: function(dc) {
                                       return monitorInfraUtils.getNodeStatusContentForSummayPages(dc,
                                           'text');
                                   }
                               },
                               sortable:{
                                   sortBy: function (d) {
                                       return monitorInfraUtils.getNodeStatusContentForSummayPages(d,'text');
                                   }
                               },
                               sorter:cowu.comparatorStatus,
                               minWidth:150
                           },
                           {
                               field:"cpu",
                               name: ctwl.TITLE_CPU,
                               formatter:function(r,c,v,cd,dc) {
                                   return '<div class="gridSparkline display-inline">'+
                                       '</div><span class="display-inline">'
                                       + ifNotNumeric(dc['cpu'],'_') + '</span>';
                               },
                               asyncPostRender: renderSparkLines,
                               searchFn:function(d){
                                   return d['cpu'];
                               },
                               minWidth:150,
                               exportConfig: {
                                   allow: true,
                                   advFormatter: function(dc) {
                                       return dc['cpu'];
                                   }
                               }
                           },
                           {
                               field:"memory",
                               name:"Memory",
                               minWidth:110,
                               sortField:"y"
                           },
                           {
                               field:"establishedPeerCount",
                               name:"BGP Peers",
                               minWidth:140,
                               formatter:function(r,c,v,cd,dc){
                                   return contrail.format("{0} Total {1}",
                                       ifNull(dc['totalBgpPeerCnt'],0),
                                       dc['downBgpPeerCntText']);
                               }
                           },
                           {
                               field:"activevRouterCount",
                               name:"vRouters",
                               formatter:function(r,c,v,cd,dc){
                                   return contrail.format("{0} Total {1}",
                                       dc['totalXMPPPeerCnt'],
                                       dc['downXMPPPeerCntText']);
                               },
                               minWidth:140
                           }
                        ];
                        var gridElementConfig = {
                            header : {
                                title : {
                                    text : ctwl.CONTROLNODE_SUMMARY_TITLE
                                }
                            },
                            columnHeader : {
                                columns : columns
                            },
                            body : {
                                options : {
                                  detail : false,
                                  checkboxSelectable : false,
                                  enableAsyncPostRender:true,
                                  fixedRowHeight: 30
                                },
                                dataSource : {
                                    remote : {
                                        ajaxConfig : {
                                            url : ctwl.CONTROLNODE_SUMMARY
                                        }
                                    },
                                    cacheConfig : {
                                        ucid: ctwl.CACHE_CONTROLNODE
                                    }
                                },
                                statusMessages: {
                                    loading: {
                                        text: 'Loading Control Nodes..'
                                    },
                                    empty: {
                                        text: 'No Control Nodes Found.'
                                    }
                                }
                            },
                            footer: {
                                pager: {
                                    options: {
                                        pageSize: 10,
                                    }
                                }
                            }
            };
            return gridElementConfig;
        }
        function onClickHostName(e, selRowDataItem) {
            var name = selRowDataItem.name, hashParams = null,
                triggerHashChange = true, hostName;

            hostName = selRowDataItem['name'];
            var hashObj = {
                    type: "controlNode",
                    view: "details",
                    focusedElement: {
                        node: name,
                        tab: 'details'
                    }
                };

            if(contrail.checkIfKeyExistInObject(true,
                            hashParams,
                            'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {
                p: "mon_infra_control",
                merge: false,
                triggerHashChange: triggerHashChange});
        };
        function xCPUChartFormatter(xValue, tickCnt) {
            var date = xValue > 1 ? new Date(xValue) : new Date();
            if (tickCnt != null) {
               var mins = date.getMinutes();
               date.setMinutes(Math.ceil(mins/15) * 15);
            }
            return d3.time.format('%H:%M')(date);
        }
        function cpuChartYTickFormat(value){
            return d3.format('.2f')(value);
        }
        self.getModelCfg = function(id) {
            return self.modelCfg[id];
        };
    };
    return (new ControlNodeModelCfg()).modelCfg;
});
