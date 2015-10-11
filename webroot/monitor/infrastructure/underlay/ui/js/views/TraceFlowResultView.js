/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'knockback'
], function (_, ContrailView, Knockback) {

    var TraceFlowResultView = ContrailView.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig;
            self.renderView4Config(self.$el, null, self.getViewConfig());
        },
        getViewConfig: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                traceFlowGridColumns = [];
            var graphView = $("#"+ctwl.UNDERLAY_GRAPH_ID).data('graphView');
            var underlayGraphModel = graphView.model, traceFlowRemoteConfig = {};
            if(self.model.traceflow_radiobtn_name() == 'vRouter') {
                var vRouterMap = underlayGraphModel.vRouterMap;
                var vRouterData =
                    ifNull(vRouterMap[self.model.vrouter_dropdown_name()], {});
                var ip = getValueByJsonPath(vRouterData,
                    'more_attributes;VrouterAgent;self_ip_list;0',
                    getValueByJsonPath(vRouterData,
                    'more_attributes;ConfigData;virtual-router;virtual_router_ip_address'));
                var introspectPort = getValueByJsonPath(vRouterData,
                    'more_attributes;VrouterAgent;sandesh_http_port',ctwl.DEFAULT_INTROSPECTPORT);
                traceFlowRemoteConfig = {
                    url: '/api/admin/monitor/infrastructure/vrouter/flows?ip='+
                        ip+'&introspectPort='+introspectPort,
                    dataParser: monitorInfraParsers.parseVRouterFlowsData
                };
                traceFlowGridColumns =
                    monitorInfraUtils.getTraceFlowVrouterGridColumns();
            } else if (self.model.traceflow_radiobtn_name() == 'instance') {
                var vmUUID = self.model.instance_dropdown_name();
                var vmData = underlayGraphModel.vmMap[vmUUID];
                var vRouters = underlayGraphModel.vRouters;
                var ajaxData = {
                    pageSize: 50,
                    timeRange: 300,
                    select: 'agg-bytes,agg-packets,vrouter_ip,other_vrouter_ip',
                    fromTimeUTC: 'now-300s',
                    toTimeUTC: 'now',
                    startAt: new Date().getTime(),
                    async: false,
                    table:'FlowRecordTable',
                    filters : "limit: 5000"

                };
                var intfData = getValueByJsonPath(vmData,
                    'more_attributes;interface_list',[]);
                var where = '',floatingIp = [];
                for(var i = 0; i < intfData.length; i++) {
                    for(var k = 0;k < ifNull(intfData[i]['floating_ips'],[]).length; k++) {
                        var floatingIpData = intfData[i]['floating_ips'][k];
                        where += '(sourcevn = '+floatingIpData['virtual_network']+' AND destvn = '+floatingIpData['virtual_network'];
                        where += ' AND sourceip = '+floatingIpData['ip_address']+') OR '
                    }
                    where += '(sourcevn = '+intfData[i]['virtual_network']+' AND sourceip = '+intfData[i]['ip_address']+')';
                    where += ' OR ';
                    where += '(destvn = '+intfData[i]['virtual_network']+' AND destip = '+intfData[i]['ip_address']+')';
                    if(i+1 < intfData.length)
                        where+= ' OR ';
                }
                ajaxData['where'] = where;
                ajaxData['engQueryStr'] = JSON.stringify(ajaxData);
                traceFlowRemoteConfig = {
                    url: '/api/admin/reports/query',
                    //url:'/FlowRecordReponse1.json',
                    data: ajaxData,
                    dataParser: monitorInfraParsers.parseUnderlayFlowRecords,
                };
                traceFlowGridColumns =
                    monitorInfraUtils.getTraceFlowVMGridColumns();
            }
            return {
                elementId: ctwc.TRACEFLOW_RESULTS_GRID_ID,
                title: ctwl.TITLE_RESULTS,
                view: "GridView",
                viewConfig: {
                    elementConfig:
                        getTraceFlowGridConfig(traceFlowRemoteConfig,
                            traceFlowGridColumns, self.model)
                }
            };
        }
    });

    function getTraceFlowGridConfig(traceFlowRemoteConfig,
            traceFlowGridColumns,
            formModel) {
        var gridElementConfig = {
            header: {
                title: {
                    text: ctwl.UNDERLAY_TRACEFLOW_TITLE,
                },
                defaultControls: {
                    collapseable: true,
                    exportable: true,
                    refreshable: false,
                    searchable: false
                }
            },
            body: {
                options: {
                    autoRefresh: false,
                    checkboxSelectable: false,
                    fixedRowHeight: 30,
                    detail: false,
                    actionCellPosition: 'start',
                    actionCell: [{
                        title:'TraceFlow',
                        iconClass: 'icon-contrail-trace-flow',
                        onClick: function(rowId,targetElement){
                            doTraceFlow(rowId, formModel);
                            /*if(typeof underlayRenderer === 'object') {
                                $("#"+options.elementId+" div.selected-slick-row").each(function(idx,obj){
                                    $(obj).removeClass('selected-slick-row');
                                });
                                $(targetElement).parent().parent().addClass('selected-slick-row');
                                //underlayRenderer.getView().doTraceFlow(rowId);
                            }*/
                        }
                    },{
                        title:'Reverse TraceFlow',
                        iconClass: 'icon-contrail-reverse-flow',
                        onClick: function(rowId,targetElement){
                            doReverseTraceFlow(rowId, formModel);
                            /*if(typeof underlayRenderer === 'object') {
                                $("#"+options.elementId+" div.selected-slick-row").each(function(idx,obj){
                                    $(obj).removeClass('selected-slick-row');
                                });
                                $(targetElement).parent().parent().addClass('selected-slick-row');
                                //underlayRenderer.getView().doReverseTraceFlow(rowId);
                            }*/
                        }
                    }],
                },
                dataSource: {
                    remote: {
                        ajaxConfig: traceFlowRemoteConfig,
                        dataParser: function(response) {
                            /*var graphView = $("#"+ctwl.UNDERLAY_GRAPH_ID).data('graphView');
                            response['vRouters'] = graphView.model.vRouters;*/
                            var parsedResponse =
                                traceFlowRemoteConfig['dataParser'](response);
                            return parsedResponse['data'] != null ? parsedResponse['data'] : parsedResponse;
                        }
                    }
                }
            },
            columnHeader: {
                columns: traceFlowGridColumns
            }
        };
        return gridElementConfig;
    };
    
    function getSelectedvRouterIP (vRouterName, graphModel) {
        var ip = "";
        if (graphModel != null && graphModel.vRouterMap[vRouterName] != null) {
            var vRouterDetails = graphModel.vRouterMap[vRouterName];
            ip = getValueByJsonPath(vRouterDetails,
                    'more_attributes;VrouterAgent;self_ip_list;0','-');
        }
        return ip;
    }
    
    function doTraceFlow (rowId, formModel) {
        var flowGrid = $("#" +ctwc.TRACEFLOW_RESULTS_GRID_ID).data('contrailGrid');
        var graphView = monitorInfraUtils.getUnderlayGraphInstance();
        var graphModel = graphView.model;
        var contextVrouterIp;
        if(formModel != null && formModel.showvRouter())
            contextVrouterIp = 
                getSelectedvRouterIP(formModel.vrouter_dropdown_name(), graphModel);
        var dataItem = ifNull(flowGrid._grid.getDataItem(rowId),{});
        /*
         * For egress flows the source vm ip may not spawned in the same vrouter,
         * so need to pick the peer_vrouter
         */
        var nwFqName = '';
        var postData = {
            srcIP: dataItem['sourceip'] != null ? dataItem['sourceip'] : dataItem['sip'],
            destIP: dataItem['destip'] != null ? dataItem['destip'] : dataItem['dip'],
            srcPort: dataItem['sport'] != null ? dataItem['sport'] : dataItem['src_port'],
            destPort: dataItem['dport'] != null ? dataItem['dport'] : dataItem['dst_port'],
            srcVN: dataItem['src_vn'] != null ? dataItem['src_vn'] : dataItem['sourcevn'],
            destVN: dataItem['dst_vn'] != null ? dataItem['dst_vn'] : dataItem['destvn'],
            protocol: dataItem['protocol'],
            maxAttempts: 3,
            interval: 5,
         };
        //We are sending the VrfId of the flow for trace router request, in some cases like egress flows, the Vrf Id is in context with the
        //current Vrouter introspect but we are issuing the trace route request to other vrouter,which throws error to fix these cases
        //resolveVrfId IP used.
        if(dataItem['direction_ing'] == 1 || dataItem['direction'] == 'ingress') {
            if(formModel != null && formModel.showvRouter()) {
                postData['nodeIP'] = contextVrouterIp;
                postData['resolveVrfId'] = contextVrouterIp;
            } else if(formModel != null && formModel.showInstance()) {
                if (dataItem['vrouter_ip'] != null) {
                    postData['nodeIP'] = dataItem['vrouter_ip'];
                } 
            }
            if(dataItem['raw_json'] != null && dataItem['raw_json']['vrf'] != null) {
                postData['vrfId'] = parseInt(dataItem['raw_json']['vrf']);
            }
            nwFqName = dataItem['sourcevn'] != null ? dataItem['sourcevn'] : dataItem['src_vn'];
        } else if(dataItem['direction_ing'] == 0 || dataItem['direction'] == 'egress') {
            if(dataItem['raw_json'] != null && dataItem['raw_json']['vrf'] != null) {
                postData['vrfId'] = parseInt(dataItem['raw_json']['vrf']);
                postData['resolveVrfId'] = contextVrouterIp;
            }
            postData['nodeIP'] = dataItem['other_vrouter_ip'] != null ? dataItem['other_vrouter_ip'] : dataItem['peer_vrouter'];
            nwFqName = dataItem['sourcevn'] != null ? dataItem['sourcevn'] : dataItem['src_vn'];
        }
        if(graphModel.checkIPInVrouterList(postData['nodeIP'])) {
            showInfoWindow("Cannot Trace route for the selected flow", "Info");
            return;
        }
        if (postData['vrfId'] != null) {
            doTraceFlowRequest(postData);
        } else {
            $.ajax({
                url:'api/tenant/networking/virtual-network/summary?fqNameRegExp='+nwFqName,
            }).always(function(networkDetails){
                if(networkDetails['value']!= null && networkDetails['value'][0] != null &&  networkDetails['value'][0]['value'] != null) {
                    var vrfList = getValueByJsonPath(networkDetails,'value;0;value;UveVirtualNetworkConfig;routing_instance_list',[]);
                    if(vrfList[0] != null)
                        nwFqName += ":"+vrfList[0];
                } else 
                    // if there is no vrf name in the response then just constructing it in general format
                    nwFqName += ":"+nwFqName.split(':')[2];
                postData['vrfName'] = nwFqName;
                doTraceFlowRequest(postData);
            });
        }
    }
    
    function doReverseTraceFlow (rowId, formModel) {
        var flowGrid = $("#" +ctwc.TRACEFLOW_RESULTS_GRID_ID).data('contrailGrid');
        var graphView = monitorInfraUtils.getUnderlayGraphInstance();
        var graphModel = graphView.model;
        var dataItem = ifNull(flowGrid._grid.getDataItem(rowId),{});
        var contextVrouterIp = '';
        if(formModel != null && formModel.showvRouter())
            contextVrouterIp = 
                getSelectedvRouterIP(formModel.vrouter_dropdown_name(), graphModel);
        /*
         * For egress flows the source vm ip may not spawned in the same vrouter,
         * so need to pick the peer_vrouter
         */
        var postData = {
            srcIP: dataItem['destip'] != null ? dataItem['destip'] : dataItem['dip'],
            destIP: dataItem['sourceip'] != null ? dataItem['sourceip'] : dataItem['sip'],
            srcPort: dataItem['dport'] != null ? dataItem['dport'] : dataItem['dst_port'],
            destPort: dataItem['sport'] != null ? dataItem['sport'] : dataItem['src_port'],
            srcVN: dataItem['src_vn'] != null ? dataItem['src_vn'] : dataItem['sourcevn'],
            destVN: dataItem['dst_vn'] != null ? dataItem['dst_vn'] : dataItem['destvn'],
            protocol: dataItem['protocol'],
            maxAttempts: 3,
            interval: 5,
        };
        if(dataItem['direction_ing'] == 0 || dataItem['direction'] == 'egress') {
            if(formModel != null && formModel.showvRouter()) {
                postData['nodeIP'] = contextVrouterIp;
                postData['resolveVrfId'] = contextVrouterIp;
            } else if(formModel != null && formModel.showInstance()) {
                if (dataItem['vrouter_ip'] != null) {
                    postData['nodeIP'] = dataItem['vrouter_ip'];
                } 
            }
            nwFqName = dataItem['destvn'] != null ? dataItem['destvn'] : dataItem['dst_vn'];
            if(dataItem['raw_json'] != null && dataItem['raw_json']['dest_vrf'] != null) {
                postData['vrfId'] = parseInt(dataItem['raw_json']['dest_vrf']);
            }
        } else if(dataItem['direction_ing'] == 1 || dataItem['direction'] == 'ingress') {
            postData['nodeIP'] = dataItem['other_vrouter_ip'] != null ? dataItem['other_vrouter_ip'] : dataItem['peer_vrouter'];
            nwFqName = dataItem['destvn'] != null ? dataItem['destvn'] : dataItem['dst_vn'];
            if(dataItem['raw_json'] != null && dataItem['raw_json']['dest_vrf'] != null) {
                postData['vrfId'] = parseInt(dataItem['raw_json']['dest_vrf']);
                postData['resolveVrfId'] = contextVrouterIp;
            }
        }
        if(graphModel.checkIPInVrouterList(postData['nodeIP'])) {
            showInfoWindow("Cannot Trace route for the selected flow", "Info");
            return;
        }
        if(postData['vrfId'] != null) {
            doTraceFlowRequest(postData);
        } else {
            $.ajax({
                url:'api/tenant/networking/virtual-network/summary?fqNameRegExp='+nwFqName,
            }).always(function(networkDetails){
                if(networkDetails['value']!= null && networkDetails['value'][0] != null &&  networkDetails['value'][0]['value'] != null) {
                    var vrfList = getValueByJsonPath(networkDetails,'value;0;value;UveVirtualNetworkConfig;routing_instance_list',[]);
                    if(vrfList[0] != null)
                        nwFqName += ":"+vrfList[0];
                } else 
                    // if there is no vrf name in the response then just constructing it in general format
                    nwFqName += ":"+nwFqName.split(':')[2];
                postData['vrfName'] = nwFqName;
                doTraceFlowRequest(postData);
            });
        }
    }
    
    function doTraceFlowRequest (postData) {
        $.ajax({
            url:'/api/tenant/networking/trace-flow',
            type:'POST',
            timeout:5000,
            data:{
                data: postData
            }
        }).done(function(response) {
            if(postData['startAt'] != null && underlayLastInteracted > postData['startAt'])
                return;
            var graphView = monitorInfraUtils.getUnderlayGraphInstance();
            graphView.model.flowPath = response;
            if(response.nodes.length <=0 || response.links.length <= 0){
                showInfoWindow("Cannot Trace the path for the selected flow.", "Info");
                if(null !== underlayRenderer && typeof underlayRenderer === "object"){
                    underlayRenderer.getView().resetTopology(false);
                }
                return;
            }
            if(response.nodes.length > 0) {
                var maxAttempts = postData.maxAttempts;
                var starString = '';
                var fillString = '* ';

                for (;;) {
                    if (maxAttempts & 1)
                        starString += fillString;
                    maxAttempts >>= 1;
                    if (maxAttempts)
                        fillString += fillString;
                    else
                        break;
                }

                for(var i=0; i<response.nodes.length; i++) {
                    var node = response.nodes[i];
                    if(node.name === starString) {
                        response.nodes.splice(i, 1);
                        i--;
                    }
                }
                for(var i=0; i<response.links.length; i++) {
                    var link = response.links[i];
                    var endpoint0 = link.endpoints[0];
                    var endpoint1 = link.endpoints[1];
                    if(endpoint0 === starString ||
                        endpoint1 === starString) {
                        response.links.splice(i, 1);
                        i--;
                    }
                }
            }
            highlightPath(response, {data: postData});
            if(typeof response != 'string')
                $('html,body').animate({scrollTop:0}, 500);
        }).fail(function(error,status) {
            if(postData['startAt'] != null && underlayLastInteracted > postData['startAt'])
                return;
            $(progressBar).hide();
            if(typeof underlayRenderer == 'object') {
                underlayRenderer.getView().resetTopology(false);
            }
            if(status == 'timeout') {
                showInfoWindow('Timeout in fetching details','Error');
            } else if (status != 'success') {
                showInfoWindow('Error in fetching details','Error');
            } 
        });
    }
    
    function highlightPath (response, postData) {
        $("#network_topology").find('.topology-visualization-loading').hide();
        if(null !== response && typeof response !== "undefined" &&
            null !== response.nodes && typeof response.nodes !== "undefined"){

        }
        if(response.nodes.length <=0 || response.links.length <= 0){
            showInfoWindow("Cannot Map the path for selected flow", "Info");
            if(null !== underlayRenderer && typeof underlayRenderer === "object"){
                underlayRenderer.getView().resetTopology(false);
            }
            return false;
        }
        if(typeof response === "string") {
            showInfoWindow(response, "Info");
            if(null !== underlayRenderer && typeof underlayRenderer === "object"){
                underlayRenderer.getView().resetTopology(false);
            }
            return false;
        }
        
        highlightedElements = {
            nodes: [],
            links: []
        };
        var graphView = monitorInfraUtils.getUnderlayGraphInstance();
        var graphModel = graphView.model;
        var elementMap = graphModel['elementMap'];
        var conElements = graphModel['connectedElements'];
        var nodes      = ifNull(response.nodes,[]);
        var links      = ifNull(response.links,[]);
        var adjList = graphModel.prepareData("virtual-router");
        var nodeNames = [];
        for(var i=0; i<nodes.length; i++) {
            nodeNames.push(nodes[i].name);
            if(!adjList.hasOwnProperty(nodes[i].name)) {
                adjList[nodes[i].name] = [];
            }
        }

        for (var i = 0; i < links.length; i++) {
            var endpoints = links[i].endpoints;
            var endpoint0 = endpoints[0];
            var endpoint1 = endpoints[1];
            if(adjList.hasOwnProperty(endpoint0)) {
                if(adjList[endpoint0].indexOf(endpoint1) == -1)
                    adjList[endpoint0][adjList[endpoint0].length] = endpoint1;
            } 
            if(adjList.hasOwnProperty(endpoint1)) {
                if(adjList[endpoint1].indexOf(endpoint0) == -1)
                    adjList[endpoint1][adjList[endpoint1].length] = endpoint0;
            }
        }
        graphModel['adjacencyList'] = adjList;
        var childElementsArray = graphModel.createElementsFromAdjacencyList();

        var tors = graphModel['tors'];
        for(var i=0; i<tors.length; i++) {
            var tor = tors[i];
            var torName = tor.name;
            var virtualRouters = tor.children;
            for(var vrName in virtualRouters) {
                if(nodeNames.indexOf(vrName) === -1) {
                    var vr_id = elementMap.node[vrName];
                    for(var j=0; j<childElementsArray.length; j++) {
                        var childEl = childElementsArray[j];
                        if(null === childEl || typeof childEl === "undefined")
                            continue;
                        if(childEl.id === vr_id) {
                            childElementsArray[j] = null;
                            break;
                        }
                    }
                }
            }
        }
        childElementsArray = childElementsArray.filter(function(n){ return n != undefined });
        for(var i=0; i<tors.length; i++) {
            var tor = tors[i];
            var torName = tor.name;
            var virtualRouters = tor.children;
            for(var vrName in virtualRouters) {
                if(nodeNames.indexOf(vrName) === -1) {
                    var link = torName + "<->" + vrName;
                    var altLink = vrName + "<->" + torName;
                    var link_id = elementMap.link[link];
                    var alt_link_id = elementMap.link[altLink];
                    for(var j=0; j<childElementsArray.length; j++) {
                        var childEl = childElementsArray[j];
                        if(null === childEl || typeof childEl === "undefined")
                            continue;
                        if(childEl.id === link_id || 
                            childEl.id === alt_link_id) {
                            childElementsArray[j] = null;
                        }
                    }
                }
            }
        }
        childElementsArray = childElementsArray.filter(function(n){ return n != undefined });
        graphModel.addElementsToGraph(childElementsArray);
        //_this.renderUnderlayViz();
        var connectionWrapIds = [];
        for (var i = 0; i < links.length; i++) {
            var endpoints = links[i].endpoints;
            var endpoint0 = endpoints[0];
            var endpoint1 = endpoints[1];
            var link = elementMap.link[endpoint0 + "<->" + endpoint1];
            if(null == link || typeof link === "undefined")
                continue;
            else {
                if(typeof $("g.link[model-id='" + link + "']").find('path.connection-wrap') == "object" &&
                    $("g.link[model-id='" + link + "']").find('path.connection-wrap').length === 1) {
                    connectionWrapIds.push($("g.link[model-id='" + link + "']").find('path.connection-wrap')[0].id);
                    $("g.link[model-id='" + link + "']")
                        .css("opacity", "1");
                }
            }
        }
        if(connectionWrapIds.length > 0) {
            graphModel['underlayPathIds'] = connectionWrapIds;
            monitorInfraUtils.showFlowPath(connectionWrapIds, null, graphModel);
        }

        var srcIP = postData.data['srcIP'];
        var destIP = postData.data['destIP'];
        var instances = graphModel['VMs'],srcVM = [],destVM = [];
        for(var i = 0; i < instances.length; i++) {
            $.each(ifNull(instances[i]['more_attributes']['interface_list'],[]),function(idx,intfObj){
               if((intfObj['ip_address'] == srcIP && intfObj['ip_address'] != '0.0.0.0') || 
                       (intfObj['ip6_address'] == srcIP && intfObj['ip6_address'] != '0.0.0.0'))
                   srcVM = instances[i]['name'];
               else if((intfObj['ip_address'] == destIP && intfObj['ip_address'] != '0.0.0.0') || 
                       (intfObj['ip6_address'] == destIP && intfObj['ip6_address'] != '0.0.0.0'))
                   destVM = instances[i]['name'];
            });
        }
        for(var i=0; i<nodes.length; i++) {
            var hlNode = nodes[i];
            if(hlNode.node_type === 'virtual-machine') {
                var model_id = elementMap.node[hlNode.name];
                var associatedVRouter =
                jsonPath(instances, '$[?(@.name =="' + hlNode.name + '")]');
                var associatedVRouterUID = "";
                if(false !== associatedVRouter &&
                    "string" !== typeof associatedVRouter &&
                    associatedVRouter.length > 0 ) {
                    associatedVRouter = associatedVRouter[0]['more_attributes']['vrouter'];
                    if(null !== associatedVRouter && typeof associatedVRouter !== "undefined") {
                        associatedVRouterUID = elementMap['node'][associatedVRouter];
                    }
                }
                if(hlNode.name == srcVM) {
                    //Plot green
                    $('div.font-element[font-element-model-id="' + model_id + '"]')
                        .find('i')
                        .css("color", "green");
                } else if(hlNode.name == destVM) {
                    //Plot red
                    $('div.font-element[font-element-model-id="' + model_id + '"]')
                        .find('i')
                        .css("color", "red");
                }
            }
        }

    }
    return TraceFlowResultView;
});