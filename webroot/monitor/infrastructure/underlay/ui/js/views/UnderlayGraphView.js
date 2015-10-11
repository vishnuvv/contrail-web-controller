/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'underlay-graph-model',
    'graph-view',
], function (_, ContrailView, UnderlayGraphModel, GraphView, ContrailListModel) {
    var UnderlayGraphView = ContrailView.extend({
        tooltipConfig: {},
        render: function () {
            var self = this,
                graphTemplate = 
                    contrail.getTemplate4Id(ctwl.TMPL_UNDERLAY_GRAPH_VIEW),
                selectorId = '#' + ctwl.UNDERLAY_GRAPH_ID,
                underlayGraphModel = this.model,
                graphLoadingSelectorId = '#' + ctwl.GRAPH_LOADING_ID;
                
            self.$el.html(graphTemplate());
            var graphView = new GraphView(getUnderlayGraphViewConfig(
                    underlayGraphModel, selectorId, self));
            $(selectorId).data('graphView', graphView);
            graphView.render();
            if (!underlayGraphModel.isRequestInProgress() ||
                 underlayGraphModel.loadedFromCache) {
                $(graphLoadingSelectorId).hide();
            } else {
                underlayGraphModel.onAllRequestsComplete.subscribe(function () {
                    $(graphLoadingSelectorId).hide();
                });
            }
        }
        
    });
    function addDimlightToConnectedElements (type) {
        if (type == 'node') {
            $('div.font-element')
                .removeClass('elementHighlighted')
                .addClass('dimHighlighted');
            $('div.font-element')
                .find('i')
                .css("color", "#555");
            $('g.element')
                .removeClassSVG('elementHighlighted')
                .addClassSVG('dimHighlighted');
        } else if (type == 'link') {
            $('g.link')
                .removeClassSVG('elementHighlighted')
                .addClassSVG('dimHighlighted')
                .css('');
        }
    }
    
    function addHighlightToNodesAndLinks (nodes, els, underlayGraphModel) {
        var elMap = underlayGraphModel['elementMap'];
        if(typeof nodes == "object" && nodes.length > 0) {
            var nodeNames = [];
            for(var i=0; i<nodes.length; i++) {
                var node = nodes[i];
                nodeNames.push(node.name);
                var node_model_id = jsonPath(elMap, '$.node[' + node.name + ']');
                if(false !== node_model_id && typeof node_model_id === "object" &&
                    node_model_id.length === 1) {
                    node_model_id = node_model_id[0];
                    addHighlightToNode(node_model_id);
                }
            }

            $.each(elMap.link, function(link, link_id){
                var endpoints = link.split("<->");
                var endpoint0 = endpoints[0];
                var endpoint1 = endpoints[1];
                if(nodeNames.indexOf(endpoint0) !== -1 &&
                    nodeNames.indexOf(endpoint1) !== -1) {
                    addHighlightToLink(link_id);
                }
            });
        }
    }
    
    function addHighlightToNode (node_model_id) {
        $('div.font-element[font-element-model-id="' + node_model_id + '"]')
            .addClass('elementHighlighted')
            .removeClass('dimHighlighted')
            .removeClass('hidden');

        $('g.element[model-id="' + node_model_id + '"]')
            .addClassSVG('elementHighlighted')
            .removeClassSVG('dimHighlighted')
            .removeClassSVG('hidden');

        $('div.font-element[font-element-model-id="' + node_model_id + '"]')
            .find('i')
            .css("color", "#498AB9");
    }
    
    function addHighlightToLink (link_model_id) {
        $('g.link[model-id="' + link_model_id + '"]')
            .removeClassSVG('hidden')
            .removeClassSVG('dimHighlighted')
            .addClassSVG('elementHighlighted');

        $('g.link[model-id="' + link_model_id + '"]')
            .find('path.connection')
                .css("stroke", "#498AB9");
        $('g.link[model-id="' + link_model_id + '"]')
            .find('path.marker-source')
                .css("fill", "#498AB9")
                .css("stroke", "#498AB9");
        $('g.link[model-id="' + link_model_id + '"]')
            .find('path.marker-target')
                .css("fill", "#498AB9")
                .css("stroke", "#498AB9");
        $('g.link[model-id="' + link_model_id + '"]')
            .find('path.connection-wrap')
            .css("opacity", "")
            .css("fill", "")
            .css("stroke", "");
    }
    function getClickEventConfig (underlayGraphModel) {
        var timeout;
        return {
            'blank:pointerdblclick' :
                 function (evt, x, y) {
                     evt.stopImmediatePropagation();
                     resetTopology({resetBelowTabs: false,
                                    model: underlayGraphModel});
                 },
            'cell:pointerdblclick' :
                 function (cellView, evt, x, y) {
                     evt.stopImmediatePropagation();
                     if (timeout) {
                         clearTimeout(timeout);
                         timeout = null;
                     }
                     var dblClickedElement = cellView.model,
                         elementType       = dblClickedElement['attributes']['type'];
                     var graphView = $("#" + ctwl.UNDERLAY_GRAPH_ID).data('graphView');
                     switch(elementType) {
                         case 'contrail.PhysicalRouter':
                             var chassis_type    = dblClickedElement['attributes']['nodeDetails']['chassis_type'];
                             if(chassis_type === "tor") {
                                 var children = underlayGraphModel.getChildren(dblClickedElement['attributes']['nodeDetails']['name'], "virtual-router");
                                 var adjList = _.clone(underlayGraphModel['underlayAdjacencyList']);
                                 if(children.length > 0) {
                                     var childrenName = [];
                                     for(var i=0; i<children.length; i++) {
                                         childrenName.push(children[i]["name"]);
                                         adjList[children[i]["name"]] = [];
                                     }
                                     adjList[dblClickedElement['attributes']['nodeDetails']['name']] = childrenName;
                                     underlayGraphModel['adjacencyList'] = adjList;
                                     var childElementsArray = underlayGraphModel.createElementsFromAdjacencyList(underlayGraphModel);
                                     underlayGraphModel.addElementsToGraph(childElementsArray, dblClickedElement, underlayGraphModel);
                                     addDimlightToConnectedElements('node');
                                     addDimlightToConnectedElements('link');
                                     var thisNode = [dblClickedElement["attributes"]["nodeDetails"]];
                                     addHighlightToNodesAndLinks(thisNode.concat(children), childElementsArray, underlayGraphModel);
                                     underlayGraphModel.selectedElement = {
                                         nodeType : elementType,
                                         nodeDetail : thisNode
                                     };
                                 }
                             }
                             // Need to call the initClickevents again because
                             // to bind events to newly added elements like vRouters
                             cowu.bindPopoverInTopology(monitorInfraUtils.getUnderlayTooltipConfig(), graphView);
                             $(".popover").popover().hide();
                             break;
    
                         case 'contrail.VirtualRouter':
                             var model_id = $(dblClickedElement).attr('id');
                             var children = underlayGraphModel.getChildren(dblClickedElement['attributes']['nodeDetails']['name'], "virtual-machine");
                             var oldAdjList = _.clone(underlayGraphModel['adjacencyList']);
                             var newAdjList = _.clone(underlayGraphModel['adjacencyList']);
                             if(children.length > 0) {
                                 var childrenName = [];
                                 for(var i=0; i<children.length; i++) {
                                     childrenName.push(children[i]["name"]);
                                     newAdjList[children[i]["name"]] = [];
                                 }
                                 newAdjList[dblClickedElement['attributes']['nodeDetails']['name']] = childrenName;
                             } else {
                                 newAdjList = oldAdjList;
                             }
                             underlayGraphModel['adjacencyList'] = newAdjList;
                             var childElementsArray = underlayGraphModel.createElementsFromAdjacencyList(underlayGraphModel);
                             underlayGraphModel.addElementsToGraph(childElementsArray, dblClickedElement, underlayGraphModel);
                             addDimlightToConnectedElements('node');
                             addDimlightToConnectedElements('link');
                             var thisNode = [dblClickedElement["attributes"]["nodeDetails"]];
                             underlayGraphModel.selectedElement = {
                                 nodeType : elementType,
                                 nodeDetail : thisNode
                             };
                             addHighlightToNodesAndLinks(thisNode.concat(children), childElementsArray, underlayGraphModel);
                             underlayGraphModel['adjacencyList'] = oldAdjList;
                             cowu.bindPopoverInTopology(monitorInfraUtils.getUnderlayTooltipConfig(), graphView);
                             //graphView.initClickEvents(getClickEventConfig(underlayGraphModel));
                             $(".popover").popover().hide();
                             break;
                         case 'link':
                             var modelId = dblClickedElement.id;
                             var targetElement = underlayGraphModel.getCell(dblClickedElement['attributes']['target']['id']),
                                 sourceElement = underlayGraphModel.getCell(dblClickedElement['attributes']['source']['id']);
                             $(".popover").popover().hide();
                             break;
                     }
                 },
                 'cell:pointerclick' : function (cellView, evt, x, y) {
                     evt.stopImmediatePropagation();
                     clearHighlightedConnectedElements();
                     addDimlightToConnectedElements();
                     var clickedElement = cellView.model;
                     var elementType    = clickedElement['attributes']['type'];
                     if(elementType === "link") {
                         addHighlightToLink(clickedElement.id);
                     } else {
                         addHighlightToNode(clickedElement.id);
                     }
                     
                     timeout = setTimeout(function() {
                         //trigger 'click' event after 'doubleclick' is initiated.
                         var data           = {};
                         switch(elementType) {
                             case 'contrail.PhysicalRouter':
                                 var nodeDetails =
                                     clickedElement['attributes']['nodeDetails'];
                                 var interfaceDetails = [];
                                 if(nodeDetails['more_attributes']['ifTable'] == '-')
                                     nodeDetails['more_attributes']['ifTable'] = [];
                                 data = {
                                     hostName : ifNull(nodeDetails['name'],'-'),
                                     description: getValueByJsonPath(nodeDetails,'more_attributes;lldpLocSysDesc','-'),
                                     intfCnt   : getValueByJsonPath(nodeDetails,'more_attributes;ifTable',[]).length,
                                     managementIP : ifNull(nodeDetails['mgmt_ip'],'-'),
                                 };
                                 showHideTabs(ctwc.PROUTER);
                                 // Rendering the details tab
                                 cowu.renderView4Config($('#'+ctwc.UNDERLAY_DETAILS_TAB_ID),
                                     null,
                                     monitorInfraUtils.
                                         getUnderlayDetailsTabViewConfig({data:data}),
                                     null, null, null);
                                 for(var i = 0; i < getValueByJsonPath(nodeDetails,'more_attributes;ifTable',[]).length; i++ ) {
                                     var intfObj = nodeDetails['more_attributes']['ifTable'][i];
                                     var rowObj = {
                                         ifDescr: ifNull(intfObj['ifDescr'],'-'),
                                         ifIndex: ifNull(intfObj['ifIndex'],'-'),
                                         ifInOctets: intfObj['ifInOctets'],
                                         ifOutOctets: intfObj['ifOutOctets'],
                                         ifPhysAddress: ifNull(intfObj['ifPhysAddress'],'-'),
                                         raw_json: intfObj
                                     };
                                     interfaceDetails.push(rowObj);
                                 }
                                 require(['contrail-list-model'], function(ContrailListModel) {
                                     var contrailListModel = new ContrailListModel({data: interfaceDetails});
                                     // Rendering the interfaces tab
                                     cowu.renderView4Config($('#'+ctwc.UNDERLAY_PROUTER_INTERFACE_TAB_ID),
                                         contrailListModel,
                                         monitorInfraUtils.
                                             getUnderlayPRouterInterfaceTabViewConfig({hostName:data.hostName}),
                                         null, null, null);
                                 });
                                 break;
                             case 'contrail.VirtualRouter':
                                 var nodeDetails = clickedElement['attributes']['nodeDetails'];
                                 var vRouterParams = monitorInfraUtils.getUnderlayVRouterParams(nodeDetails);
                                 showHideTabs(ctwc.VROUTER);
                                 var vRouterTabConfig = ctwvc.getVRouterDetailsPageTabs(vRouterParams);
                                 for (var i = 0; i < vRouterTabConfig.length; i++) {
                                     var vRouterTabObj = vRouterTabConfig[i];
                                     // As the tabs are not re-render always tab
                                     // content is appending to the parent element
                                     // on each click, so we are removing the HTML content;
                                     $("#"+vRouterTabObj['elementId']).html('');
                                     cowu.renderView4Config($("#"+vRouterTabObj['elementId']),
                                         null, vRouterTabObj,
                                         null, null, null);
                                 }
                                 break;
                             case 'contrail.VirtualMachine':
                                 var nodeDetails = clickedElement['attributes']['nodeDetails'];
                                 var ip = [],vnList = [],intfLen = 0,vmName,srcVN = "",instDetails = {},inBytes = 0,outBytes = 0;
                                 var instanceUUID = nodeDetails['name'];
                                 var instanceDetails = underlayGraphModel['vmMap'][instanceUUID];
                                 var intfList = getValueByJsonPath(instanceDetails,'more_attributes;interface_list',[]); 
                                 intfLen = intfList.length;
                                 vmName = instanceDetails['more_attributes']['vm_name'];
                                 for(var j = 0; j < intfLen; j++) {
                                     var intfObj = intfList[j];
                                     ip.push(ifNull(intfObj['ip_address'],'-'));
                                     vnList.push(ifNull(intfObj['virtual_network'],'-'));
                                     for(var k = 0; k < ifNull(intfObj['floating_ips'],[]).length > 0; k++) {
                                         ip.push(ifNull(intfObj['floating_ips'][k]['ip_address'],'-'));
                                         vnList.push(ifNull(intfObj['floating_ips'][k]['virtual_network'],'-'));
                                     }
                                 }
                                 var vnNameArr = ifNull(vnList[0].split(':'),[]);
                                 var networkName = ifNull(vnNameArr[2],'-');
                                 var projectName = '('+ifNull(vnNameArr[1],'-')+')';
                                 srcVN += networkName +" "+ projectName;
                                 var instanceObj = {
                                     instanceUUID: instanceUUID,
                                     networkFQN: vnList[0],
                                 };
                                 showHideTabs(ctwc.VIRTUALMACHINE);
                                 var instanceTabConfig = ctwvc.getInstanceDetailPageTabConfig(instanceObj);
                                 var modelMap = {};
                                 var modelKey = ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID);
                                 modelMap[modelKey] =
                                     ctwvc.getInstanceTabViewModelConfig(instanceUUID);
                                 for (var i = 0; i < instanceTabConfig.length; i++) {
                                     var tabObj = instanceTabConfig[i];
                                     cowu.renderView4Config($("#"+tabObj['elementId']), null, tabObj, null, null, modelMap);
                                 }
                                 break;
                             case 'link':
                                 var graph = $("#"+ctwl.UNDERLAY_GRAPH_ID).data('graphView');
                                 var targetElement = graph.model.getCell(clickedElement['attributes']['target']['id']),
                                     sourceElement = graph.model.getCell(clickedElement['attributes']['source']['id']);
                                 var endpoints = [sourceElement['attributes']['nodeDetails']['name'],
                                                  targetElement['attributes']['nodeDetails']['name']];
                                 data['endpoints'] = endpoints;
                                 data['sourceElement'] = sourceElement;
                                 data['targetElement'] = targetElement;
                                 var viewConfig = {
                                     elementId: ctwc.UNDERLAY_TRAFFICSTATS_TAB_ID,
                                     view: 'TrafficStatisticsView',
                                     viewPathPrefix:
                                         ctwl.UNDERLAY_VIEWPATH_PREFIX,
                                     viewConfig: {
                                         linkAttributes: data
                                     }
                                 };
                                 showHideTabs(ctwc.UNDERLAY_LINK);
                                 // Rendering the traffic statistics tab
                                 cowu.renderView4Config(
                                     $('#'+ctwc.UNDERLAY_TRAFFICSTATS_TAB_ID),
                                     null, viewConfig, null, null, null);
                                 break;

                             timeout = null;
                         }
                     }, 500);
                 },

                 'cell:pointerdown' :
                      function (cellView, evt, x, y) {
                          evt.stopImmediatePropagation();
                          _this.removeUnderlayPathIds();
                      },
                 'cell:pointerup' :
                      function (cellView, evt, x, y) {
                          evt.stopImmediatePropagation();
                          var ids = _this.getUnderlayPathIds();
                          _this.showPath(ids);
                      },
             };
         }
    
    function resetTopology (options) {
        /*$("#underlay_topology").data('nodeType',null);
        $("#underlay_topology").data('nodeName',null);*/
        
        var underlayGraphModel = options['model'];
        removeUnderlayPathIds();
        underlayGraphModel['underlayPathIds'] = [];
        clearHighlightedConnectedElements();
        $("#" + ctwl.UNDERLAY_GRAPH_ID).panzoom("resetZoom");
        $("#" + ctwl.UNDERLAY_GRAPH_ID).panzoom("resetPan");
        $("#" + ctwl.UNDERLAY_GRAPH_ID).panzoom("reset");
        //resizeTopology();
        var adjList = _.clone(underlayGraphModel['underlayAdjacencyList']);
        underlayGraphModel['adjacencyList']= adjList;
        var childElementsArray = underlayGraphModel.createElementsFromAdjacencyList(underlayGraphModel);
        underlayGraphModel.addElementsToGraph(childElementsArray, null, underlayGraphModel);
        $("#underlay_topology").removeData('nodeType');
        $("#underlay_topology").removeData('nodeName');
        if(options['resetBelowTabs'] == true) {
            showHideTabs();
        }
    }
    
    function removeUnderlayPathIds() {
        $("#"+ctwl.UNDERLAY_GRAPH_ID).find(".connection-wrap-up").remove();
        $("#"+ctwl.UNDERLAY_GRAPH_ID).find(".connection-wrap-down").remove();
    }
    
    function showHideTabs (contextTabsToShow) {
        var tabContexts = [ctwc.PROUTER, ctwc.VROUTER, ctwc.VIRTUALMACHINE,
            ctwc.UNDERLAY_LINK];
        var underlayTabObj  = $("#"+ctwc.UNDERLAY_TAB_ID).find("#contrail-tabs")
            .data('contrailTabs');
        var nodeTabMap = {
            'physical-router': ctwc.UNDERLAY_PROUTER_TAB_INDEXES,
            'virtual-router': ctwc.UNDERLAY_VROUTER_TAB_INDEXES,
            'virtual-machine': ctwc.UNDERLAY_VM_TAB_INDEXES,
            'link': ctwc.UNDERLAY_LINK_TAB_INDEX
        };
        if(tabContexts.indexOf(contextTabsToShow) > -1) {
            underlayTabObj.enableTab(nodeTabMap[contextTabsToShow]);
        }
        for (var i = 0; i < tabContexts.length; i++) {
            if(tabContexts[i] != contextTabsToShow)
                underlayTabObj.disableTab(nodeTabMap[tabContexts[i]], true);
        }
    }
    
    function clearHighlightedConnectedElements() {
        $('div.font-element')
            .removeClass('elementHighlighted')
            .removeClass('dimHighlighted');
        $('g.element')
            .removeClassSVG('elementHighlighted')
            .removeClassSVG('dimHighlighted');
        $('div.font-element')
            .css('fill', "")
            .css('stroke', "");
        $('div.font-element')
            .find('i')
                .css("color", "#555");
        $('g.element').find('text').css('fill', "#393939");
        $('g.element').find('rect').css('fill', "#393939");
    
        $('g.link')
            .removeClassSVG('elementHighlighted')
            .removeClassSVG('dimHighlighted');
        $("g.link").find('path.connection')
            .css("stroke", "#393939")
            .css("opacity", "0.6")
        $("g.link").find('path.marker-source')
            .css("fill", "#393939")
            .css("stroke", "#393939");
        $("g.link").find('path.marker-target')
            .css("fill", "#393939")
            .css("stroke", "#393939");
        $("g.link").find('path.connection-wrap')
            .css("opacity", "")
            .css("fill", "")
            .css("stroke", "");
    }
    
    function getControlPanelConfig (self, selectorId) {
        return {
            default: {
                zoom: {
                    enabled: true,
                    selectorId: selectorId,
                    config: {
                        duration: 300,
                        increment: 0.3,
                        minScale: 0.3,
                        maxScale: 2,
                        focalZoom: false
                    }
                }
            }
        }
    
    }
    
    function getUnderlayGraphViewConfig(underlayGraphModel, selectorId, self) {
        return {
            el: $(selectorId),
            linkView: joint.shapes.contrail.LinkView,
            model: underlayGraphModel,
            tooltipConfig: monitorInfraUtils.getUnderlayTooltipConfig(),
            clickEvents: getClickEventConfig(underlayGraphModel),
            controlPanel: getControlPanelConfig(self, selectorId),
            emptyCallback: function (contrailGraphModel) {
                var notFoundTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                    notFoundConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_NOT_FOUND_PAGE, {
                        iconClass: false,
                        defaultErrorMessage: false,
                        defaultNavLinks: false
                    });

                if (!contrail.checkIfExist(contrailGraphModel.elementsDataObj)) {
                    notFoundConfig.title = ctwm.NO_DATA_FOUND;
                } else if (contrailGraphModel.attributes.focusedElement.type == ctwc.GRAPH_ELEMENT_PROJECT && contrailGraphModel.elementsDataObj.elements.length == 0) {
                    notFoundConfig.title = ctwm.NO_NETWORK_FOUND;
                } else if (contrailGraphModel.attributes.focusedElement.type == ctwc.GRAPH_ELEMENT_NETWORK) {
                    notFoundConfig.title = ctwm.NO_VM_FOUND;
                }
                $(selectorId).html(notFoundTemplate(notFoundConfig));
            },
            failureCallback: function (contrailGraphModel) {
                var xhr = contrailGraphModel.errorList[0],
                    notFoundTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                    notFoundConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                if (!(xhr.status === 0 && xhr.statusText === 'abort')) {
                    $(selectorId).html(notFoundTemplate(notFoundConfig));
                }
            },
            successCallback: function (graphView) {
                    
            }
        }
    }
    return UnderlayGraphView;
});