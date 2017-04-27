/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'joint.contrail',
    'contrail-element',
    'networking-graph-view',
    'config/networking/networks/ui/js/models/vnCfgModel',
    'config/networking/networks/ui/js/views/vnCfgEditView',
    'config/networking/policy/ui/js/models/policyModel',
    'config/networking/policy/ui/js/views/policyEditView',
    'config/networking/securitygroup/ui/js/models/SecGrpModel',
    'config/networking/securitygroup/ui/js/views/SecGrpEditView',
    'config/networking/securitygroup/ui/js/SecGrpUtils',
    'config/networking/ipam/ui/js/models/ipamCfgModel',
    'config/networking/ipam/ui/js/views/ipamCfgEditView',
    'config/networking/fip/ui/js/models/fipCfgModel',
    'config/networking/fip/ui/js/views/fipCfgEditView',
    'config/networking/port/ui/js/models/portModel',
    'config/networking/port/ui/js/views/portEditView',
    'config/networking/port/ui/js/views/portFormatters',
    'config/networking/logicalrouter/ui/js/models/logicalRouterModel',
    'config/networking/logicalrouter/ui/js/views/logicalRouterEditView'
], function (_, ContrailView, joint, ContrailElement, NetworkingGraphView,
     VNCfgModel, VNCfgEditView, PolicyModel, PolicyEditView,
    SecGrpModel, SecGrpEditView, SecGrpUtils, IPAMCfgModel, IPAMCfgEditView,
    FipCfgModel, FipCfgEditView, PortModel, PortEditView, PortFormatters,
    LogicalRouterModel, LogicalRouterEditView) {
    var vnCfgEditView = new VNCfgEditView(),
        policyEditView = new PolicyEditView(),
        secGrpEditView = new SecGrpEditView(),
        ipamEditView = new IPAMCfgEditView(),
        fipCfgEditView = new FipCfgEditView(),
        portCfgEditView = new PortEditView(),
        logicalRouterEditView = new LogicalRouterEditView(),
        portFormatters = new PortFormatters(),
        sgUtils = new SecGrpUtils();
        
    var elementModelViewMap = {
        'virtual-network': {
            model: VNCfgModel,
            view: vnCfgEditView,
            label: 'Virtual Network',
            gridId: ctwl.CFG_VN_GRID_ID
        },
        'network-policy': {
            model: PolicyModel,
            view: policyEditView,
            label: 'Policy',
            gridId: ctwl.POLICIES_GRID_ID
        },
        'security-group': {
            model: SecGrpModel,
            view: secGrpEditView,
            label: 'Security Group',
            gridId: ctwl.SEC_GRP_GRID_ID
        },
        'network-ipam': {
            model: IPAMCfgModel,
            view: ipamEditView,
            label: 'IPAM',
            gridId: ctwl.CFG_IPAM_GRID_ID
        },
        'floating-ip': {
            model: FipCfgModel,
            view: fipCfgEditView,
            label: 'Floating IP',
            iconClass: 'networking-Floating_IP',
            gridId: ctwl.CFG_FIP_GRID_ID
        },
        'port': {
            model: PortModel,
            view: portCfgEditView,
            label: 'Port',
            iconClass: 'networking-port',
            //id: 'virtual-machine',
            gridId: ctwc.PORT_GRID_ID
        },
        'router': {
            model: LogicalRouterModel,
            view: logicalRouterEditView,
            label: 'Router',
            gridId: ctwl.LOGICAL_ROUTER_GRID_ID
        }

    }
    var CfgNetworkingGraphView = NetworkingGraphView.extend({
        render: function () {
            var self = this;
            self.constructor.__super__.render.call(self, {
                connectedGraph: {
                    tooltipConfig: getConnectedGraphTooltipConfig()
                    ,clickEvents: {},
                },configGraph: {
                    tooltipConfig: getConfigGraphTooltipConfig(), 
                    clickEvents: {},
                },
                templateId: 'config-networking-graph-template',
                controlPanelConfig: {
                    custom: {
                        resize: {
                            iconClass: 'fa fa-compress'
                        }
                    }
                }
            });
            self.renderConfigNetworkElements();
        },
        renderConfigNetworkElements: function () {
            var graph = new joint.dia.Graph;

            var paper = new joint.dia.Paper({
                el: $('.top-row-config-elements'),
                gridSize: 1,
                width: 1250,
                height: 60,
                interactive: function(cellView) {
                    return false;
                },
                model: graph
            });
            var options = {
                            "attrs": {
                                "text": {
                                    //"text": "Virtual Network"
                                }
                            },
                            "position": {
                                x: 50,
                                y: 15
                            },
                            "size": {
                                "width": 25,
                                "height": 25
                            },
                            "nodeDetails": {
                                "name": "Virtual Network",
                                "node_type": "virtual-network",
                                "status": "Active"
                            },
                            "font": {
                                "iconClass": "icon-contrail-virtual-network"
                            },
                            "elementType": "virtual-network"
                        };
            $.each(_.keys(elementModelViewMap), function(idx, id) {
                //options['attrs']['text']['text'] = nodeMap[id];
                options['nodeDetails']['name'] = elementModelViewMap[id]['label'];
                options['nodeDetails']['node_type'] = id;
                options['elementType'] = id;
                options['position']['x'] =  890+ idx * 50;
                options['font']['iconClass'] = elementModelViewMap[id]['iconClass'] != null ? elementModelViewMap[id]['iconClass'] : 'icon-contrail-'+id;
                graph.addCell(new ContrailElement(id, options));
            });
            paper.on('cell:pointerclick', function (cellView, evt, x, y) {
                var node = paper.model.getCell(cellView.$el.attr('model-id'));
                var nodeType = cowu.getValueByJsonPath(node, 'attributes;nodeDetails;node_type');
                var model = new elementModelViewMap[nodeType]['model']();
                var editView = elementModelViewMap[nodeType]['view'];
                var dataView = $('#' + elementModelViewMap[nodeType]['gridId']).data("contrailGrid")._dataView;
                editView.model = model;
                switch (nodeType) {
                    case 'virtual-network': 
                        subscribeVNModelChangeEvents(editView.model)
                        editView.renderAddVNCfg({
                            "title": ctwl.CFG_VN_TITLE_CREATE,
                            callback: function () {
                                refreshPage(dataView);
                                //dataView.refreshData();
                            }
                        });
                    break;
                    
                    case 'network-policy':
                         editView.renderPolicyPopup({
                             "title": ctwl.TITLE_ADD_POLICY,
                             mode : "add",
                             callback: function () {
                                 refreshPage(dataView);
                            }
                        });
                    break;
                    
                    case 'security-group':
                        var projFqn = [getCookie('domain'),
                            getCookie('project')];
                        sgUtils.addCurrentSG();
                        editView.renderConfigureSecGrp({
                            "title": ctwl.TITLE_CREATE_SEC_GRP,
                            "isEdit": false,
                            projFqn: projFqn,
                            callback: function() {
                                refreshPage(dataView);
                            }
                        });
                    break;

                    case 'network-ipam':
                        editView.renderAddIpamCfg({
                            "title": ctwl.CFG_IPAM_TITLE_CREATE,
                            callback: function () {
                                refreshPage(dataView);
                            }
                        });
                    break;

                    case 'floating-ip':
                        editView.renderAllocateFipCfg({
                           "title": "Allocate",
                           callback: function () {
                                refreshPage(dataView);
                           }
                        });
                    break;

                    case 'port':
                        var dataItem = {};
                        dataItem.securityGroupValue = portFormatters.getProjectFqn()+":default";
                        dataItem.is_sec_grp = true;
                        //var portModel = new PortModel(dataItem);
                        editView.model = new elementModelViewMap[nodeType]['model'](dataItem);
                        showHidePortModelAttrs(editView.model);
                        subscribePortModelChangeEvents(editView.model, ctwl.CREATE_ACTION);
                        editView.renderPortPopup({
                            "title": ctwl.CREATE,
                            mode : ctwl.CREATE_ACTION,
                            callback: function () {
                                refreshPage(dataView);
                            }
                        });
                    break;

                    case 'router':
                        editView.renderLogicalRouterPopup({
                             "title": ctwl.CREATE,
                             mode : "add",
                            callback: function () {
                                refreshPage(dataView);
                            }
                        });

                }
            });

        }      
    });
    
    function subscribeVNModelChangeEvents (vnModel) {
        vnModel.__kb.view_model.model().on('change:router_external',
            function(backBoneModel, value) {
                vnModel.externalRouterHandler(value);
        });
        vnModel.__kb.view_model.model().on('change:address_allocation_mode',
            function(backBoneModel, value) {
                vnModel.updateModelAttrsForCurrentAllocMode(value);
        });
    };
    function subscribePortModelChangeEvents(portModel, mode) {
        portModel.__kb.view_model.model().on('change:virtualNetworkName',
            function(model, newValue){
                portModel.onVNSelectionChanged(portFormatters, newValue, mode);
            }
        );
    };
    function showHidePortModelAttrs(portModel) {
        portModel.is_sec_grp_disabled = ko.computed((function() {
            if(this.port_security_enabled() == true) {
                if (this.securityGroupValue() == "") {
                    var sgDefaultVal = [portFormatters.getProjectFqn()+":default"];
                    this.securityGroupValue(sgDefaultVal);
                }
                return false;
            } else {
                this.securityGroupValue([]);
                return true;
            }
        }), portModel);
        portModel.deviceComputeShow = ko.computed((function(){
            return (this.deviceOwnerValue().toLowerCase() === "compute");
        }), portModel);
        portModel.deviceRouterShow = ko.computed((function(){
            return (this.deviceOwnerValue().toLowerCase() === "router");
        }), portModel);
    };
    function getConnectedGraphTooltipConfig() {
        var tooltipTitleTmpl = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_TITLE),
            tooltipContentTmpl = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_CONTENT),
            defaultActions = [
                {
                    text: 'Delete',
                    iconClass: 'fa fa-trash'
                },{
                    text: 'Edit',
                    iconClass: 'fa fa-pencil-square-o',
                }
            ];

        return {
            VirtualNetwork: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    //Seems this config is getting applied to all the vn elements 
                    if (viewElement == null) {
                        return;
                    }
                    var virtualNetworkName = viewElement.attributes.nodeDetails['name'].split(':')[2];

                    return tooltipTitleTmpl({name: virtualNetworkName, type: ctwl.TITLE_GRAPH_ELEMENT_VIRTUAL_NETWORK});

                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var networkFQN = viewElement.attributes.nodeDetails['name'],
                        virtualNetworkName = networkFQN.split(':'),
                        actions = defaultActions;

                    return tooltipContentTmpl({
                        info: [
                            {label: 'Project', value: virtualNetworkName[0] + ':' + virtualNetworkName[1]},
                            {label: 'Instance Count', value: contrail.checkIfExist(viewElement.attributes.nodeDetails.more_attributes.vm_count) ? viewElement.attributes.nodeDetails.more_attributes.vm_count : '-'},
                            {label: 'Interface Count', value: contrail.checkIfExist(viewElement.attributes.nodeDetails.more_attributes.vmi_count) ? viewElement.attributes.nodeDetails.more_attributes.vmi_count : '-'},
                            {label: 'Throughput In/Out', value: formatThroughput(viewElement.attributes.nodeDetails.more_attributes.in_throughput) + " / " + formatThroughput(viewElement.attributes.nodeDetails.more_attributes.out_throughput)},
                        ],
                        iconClass: 'icon-contrail-virtual-network',
                        actions: actions
                    });
                },
                dimension: {
                    width: 340
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        uuid = getValueByJsonPath(viewElement, 'attributes;nodeDetails;more_attributes;uuid'),
                        actions = [];
                    var dataView = $("#"+ctwl.CFG_VN_GRID_ID).data('contrailGrid')._dataView;
                    var rowItem = rowItemByUUID(uuid, ctwl.CFG_VN_GRID_ID);
                    actions.push({
                        callback: function (key, options) {
                            //Delete block
                            if (rowItem != null) {
                                vnCfgEditView.model = new VNCfgModel();
                                vnCfgEditView.renderMultiDeleteVNCfg({
                                    "title": ctwl.CFG_VN_TITLE_DELETE,
                                    checkedRows: [rowItem],
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                }});
                            }
                        }
                    });
                    actions.push({
                        callback: function (key, options) {
                            //Edit block
                            if (rowItem != null) {
                                var vnModel = new VNCfgModel(rowItem);
                                vnCfgEditView.model = vnModel;
                                vnCfgEditView.renderEditVNCfg({
                                    "title": ctwl.EDIT,
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                    }});
                            }
                        }
                    });
                    return actions;
                }
            },
            ServiceInstance: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        serviceInstanceName = viewElement.attributes.nodeDetails['name'].split(':')[2];

                    return tooltipTitleTmpl({name: serviceInstanceName, type: ctwl.TITLE_GRAPH_ELEMENT_SERVICE_INSTANCE});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        actions = [];

                    actions.push({
                        text: 'Configure',
                        iconClass: 'fa fa-cog'
                    });

                    return tooltipContentTmpl({
                        info: [
                            {label: 'Status', value: viewElement.attributes.nodeDetails['status']}
                        ],
                        iconClass: 'fa fa-square-o icon-rotate-45 icn-service-instance',
                        actions: actions
                    });
                },
                dimension: {
                    width: 355
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        actions = [];

                    actions.push({
                        callback: function (key, options) {
                            loadFeature({p: 'config_sc_svcInstances'});
                        }
                    });

                    return actions;
                }
            },
            VirtualMachine: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        vmUVE = viewElement.attributes.nodeDetails.uve,
                        virtualMachineName = viewElement.attributes.nodeDetails['fqName'];

                    if(contrail.checkIfExist(vmUVE)) {
                        virtualMachineName = vmUVE['UveVirtualMachineAgent']['vm_name'];
                    }

                    return tooltipTitleTmpl({name: virtualMachineName, type: ctwl.TITLE_GRAPH_ELEMENT_VIRTUAL_MACHINE});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        actions = [],
                        srcVNDetails = viewElement.attributes.nodeDetails.srcVNDetails,
                        vmUVE = viewElement.attributes.nodeDetails.uve,
                        tooltipContent, uveVirtualMachineAgent, cpuInfo;

                    actions.push({
                        text: 'View',
                        iconClass: 'fa fa-external-link'
                    });

                    tooltipContent = {
                        iconClass: 'icon-contrail-virtual-machine font-size-30',
                        actions: actions
                    };

                    if(contrail.checkIfExist(vmUVE)) {
                        uveVirtualMachineAgent = vmUVE['UveVirtualMachineAgent'];
                        cpuInfo = uveVirtualMachineAgent.cpu_info;
                        tooltipContent['info'] = [
                            {label: 'UUID', value: viewElement.attributes.nodeDetails['fqName']},
                            {label: 'CPU Utilization', value: contrail.checkIfExist(cpuInfo) ? ((Math.round(cpuInfo.cpu_one_min_avg * 100) / 100) + " %") : '-'},
                            {label: 'Memory Usage', value: contrail.checkIfExist(cpuInfo) ? cowu.addUnits2Bytes(cpuInfo.rss, false) : '-'},
                            {label: 'Interfaces', value: uveVirtualMachineAgent.interface_list.length}
                        ];
                    } else {
                        tooltipContent['info'] = [
                            {label: 'UUID', value: viewElement.attributes.nodeDetails['fqName']}
                        ];
                    }

                    return tooltipContentTmpl(tooltipContent);
                },
                dimension: {
                    width: 355
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        actions = [];

                    actions.push({
                        callback: function (key, options) {
                            var srcVN = viewElement.attributes.nodeDetails.srcVNDetails.name,
                                vmUVE = viewElement.attributes.nodeDetails.uve,
                                vmName = contrail.checkIfExist(vmUVE) ? vmUVE['UveVirtualMachineAgent']['vm_name'] : null;

                            loadFeature({
                                p: 'mon_networking_instances',
                                q: {
                                    type: 'instance',
                                    view: 'details',
                                    focusedElement: {
                                        fqName: srcVN,
                                        uuid: viewElement.attributes.nodeDetails['fqName'],
                                        vmName: vmName,
                                        type: ctwc.GRAPH_ELEMENT_NETWORK
                                    }
                                }
                            });
                        }
                    });

                    return actions;
                }
            },
            link: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        viewElementDetails = viewElement.attributes.linkDetails,
                        srcArray = viewElementDetails.src.split(':'),
                        dstArray = viewElementDetails.dst.split(':'),
                        sourceNetwork = (srcArray.length > 2) ? srcArray[2] : viewElementDetails.src,
                        destinationNetwork = (dstArray.length > 2) ? dstArray[2] : viewElementDetails.dst;

                    return tooltipTitleTmpl({name: sourceNetwork + ctwc.LINK_CONNECTOR_STRING + destinationNetwork, type: ctwl.TITLE_GRAPH_ELEMENT_CONNECTED_NETWORK});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        viewElementDetails = viewElement.attributes.linkDetails,
                        data = [], partialMessage = "";

                    if (viewElementDetails.error == 'Other link marked as unidirectional, attach policy'
                        || viewElementDetails.error == "Other link marked as bidirectional, attach policy") {
                            partialMessage = "Link partially connected";
                    }

                    var inStats = viewElementDetails.more_attributes.in_stats,
                        outStats = viewElementDetails.more_attributes.out_stats;

                    if (contrail.checkIfExist(inStats) && contrail.checkIfExist(outStats) && outStats.length > 0 && inStats.length > 0) {
                        var src = viewElementDetails.src,
                            dst = viewElementDetails.dst;

                        if (partialMessage != "") {
                            data.push({label: "", value: partialMessage});
                        }

                        for (var i = 0; i < inStats.length; i++) {
                            if (src == inStats[i].src && dst == inStats[i].dst) {
                                data.push({ label: "Link", value: inStats[i].src.split(':').pop() + ctwc.LINK_CONNECTOR_STRING + inStats[i].dst.split(':').pop()});
                                data.push({ label: "Traffic In",  value: cowu.addUnits2Packets(inStats[i].pkts, false, null, 1) + " | " + cowu.addUnits2Bytes(inStats[i].bytes) });

                                for (var j = 0; j < outStats.length; j++) {
                                    if (src == outStats[j].src && dst == outStats[j].dst) {
                                        data.push({ label: "Traffic Out", value: cowu.addUnits2Packets(outStats[j].pkts, false, null, 1) + " | " + cowu.addUnits2Bytes(outStats[i].bytes) });
                                    }
                                }
                            } else if (src == inStats[i].dst && dst == inStats[i].src) {
                                data.push({ label: "Link", value: inStats[i].src.split(':').pop() + ctwc.LINK_CONNECTOR_STRING + inStats[i].dst.split(':').pop(), dividerClass: 'margin-5-0-0' });
                                data.push({ label: "Traffic In", value: cowu.addUnits2Packets(inStats[i].pkts, false, null, 1) + " | " + cowu.addUnits2Bytes(inStats[i].bytes) });
                                for (var j = 0; j < outStats.length; j++) {
                                    if (src == outStats[j].dst && dst == outStats[j].src) {
                                        data.push({ label: "Traffic Out", value: cowu.addUnits2Packets(outStats[j].pkts, false, null, 1) + " | " + cowu.addUnits2Bytes(outStats[i].bytes) });
                                    }
                                }
                            }
                        }
                    } else {
                        var src = viewElementDetails.src.split(':').pop(),
                            dst = viewElementDetails.dst.split(':').pop();

                        if (partialMessage != "")
                            data.push({label: "", value: partialMessage});

                        data.push({label: "Link", value: src + ctwc.LINK_CONNECTOR_STRING + dst});
                        data.push({label: "Traffic In", value: "0 packets | 0 B"});
                        data.push({label: "Traffic Out", value: "0 packets | 0 B"});

                        if (viewElementDetails.dir == 'bi') {
                            data.push({label: "Link", value: dst + ctwc.LINK_CONNECTOR_STRING + src, dividerClass: 'margin-5-0-0'});
                            data.push({label: "Traffic In", value: "0 packets | 0 B"});
                            data.push({label: "Traffic Out", value: "0 packets | 0 B"});
                        }
                    }

                    return tooltipContentTmpl({info: data, iconClass: 'fa-arrows-h'});
                },
                dimension: { width: 400 }
            }
        };
    }
    function getConfigGraphTooltipConfig () {

        var tooltipTitle = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_TITLE),
            tooltipContent = contrail.getTemplate4Id(cowc.TMPL_ELEMENT_TOOLTIP_CONTENT);

        return {
            NetworkPolicy: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var networkPolicyName = viewElement.attributes.nodeDetails['fq_name'][2];

                    return tooltipTitle({name: networkPolicyName, type: ctwl.TITLE_GRAPH_ELEMENT_NETWORK_POLICY});

                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var   actions = [], nodeDetails = viewElement.attributes.nodeDetails;

                    actions.push({
                        text: 'Edit',
                        iconClass: 'fa fa-pencil-square-o',
                    });

                    return tooltipContent({
                        info: [
                            {
                                label: 'Project',
                                value: viewElement.attributes.nodeDetails['fq_name'][0] + ':' + viewElement.attributes.nodeDetails['fq_name'][1]
                            },
                            {
                                label: 'UUID',
                                value: nodeDetails['uuid']
                            },
                            {
                                label: 'Rule Count',
                                value: cowu.getValueByJsonPath(nodeDetails, 'network_policy_entries;policy_rule', []).length
                            }

                        ],
                        iconClass: 'icon-contrail-network-policy',
                        actions: actions
                    });
                },
                dimension: {
                    width: 360
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        uuid = getValueByJsonPath(viewElement, 'attributes;nodeDetails;uuid'),
                        actions = [];

                    var dataView = $("#"+elementModelViewMap['network-policy']['gridId']).data('contrailGrid')._dataView;
                    var rowItem = rowItemByUUID(uuid, elementModelViewMap['network-policy']['gridId']);
                    actions.push({
                        callback: function (key, options) {
                            //Edit block
                            if (rowItem != null) {
                                var polModel = new elementModelViewMap['network-policy']['model'](rowItem);
                                elementModelViewMap['network-policy']['view'].model = polModel;
                                elementModelViewMap['network-policy']['view'].renderPolicyPopup({
                                    "title": ctwl.EDIT,
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                    }});
                            }
                        }
                    });

                    return actions;
                }
            },
            SecurityGroup: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var securityGroupName = viewElement.attributes.nodeDetails['fq_name'][2];

                    return tooltipTitle({name: securityGroupName, type: ctwl.TITLE_GRAPH_ELEMENT_SECURITY_GROUP});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var actions = [], nodeDetails = viewElement.attributes.nodeDetails;

                    actions.push({
                        text: 'Edit',
                        iconClass: 'fa fa-pencil-square-o',
                    });

                    return tooltipContent({
                        info: [
                            {
                                label: 'Project',
                                value: viewElement.attributes.nodeDetails['fq_name'][0] + ':' + viewElement.attributes.nodeDetails['fq_name'][1]
                            },
                            {
                                label: 'UUID',
                                value: nodeDetails['uuid']
                            }
                        ],
                        iconClass: 'icon-contrail-security-group',
                        actions: actions
                    });
                },
                dimension: {
                    width: 355
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        uuid = getValueByJsonPath(viewElement, 'attributes;nodeDetails;uuid'),
                        actions = [];

                    var dataView = $("#"+elementModelViewMap['security-group']['gridId']).data('contrailGrid')._dataView;
                    var rowItem = rowItemByUUID(uuid, elementModelViewMap['security-group']['gridId']);
                    actions.push({
                        callback: function (key, options) {
                            //Edit block
                            if (rowItem != null) {
                                var polModel = new elementModelViewMap['security-group']['model'](rowItem);
                                sgUtils.deleteCurrentSG();
                                elementModelViewMap['security-group']['view'].model = polModel;
                                elementModelViewMap['security-group']['view'].renderConfigureSecGrp({
                                    "title": ctwl.EDIT,
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                    }});
                            }
                        }
                    });

                    return actions;
                }
            },
            NetworkIPAM: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var NetworkIPAMName = viewElement.attributes.nodeDetails['fq_name'][2];

                    return tooltipTitle({name: NetworkIPAMName, type: ctwl.TITLE_GRAPH_ELEMENT_NETWORK_IPAM});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var actions = [], nodeDetails = viewElement.attributes.nodeDetails;

                    actions.push({
                        text: 'Edit',
                        iconClass: 'fa fa-pencil-square-o',
                    });

                    return tooltipContent({
                        info: [
                            {
                                label: 'Project',
                                value: viewElement.attributes.nodeDetails['fq_name'][0] + ':' + viewElement.attributes.nodeDetails['fq_name'][1]
                            },
                            {
                                label: 'UUID',
                                value: nodeDetails['uuid']
                            }
                        ],
                        iconClass: 'icon-contrail-network-ipam',
                        actions: actions
                    });
                },
                dimension: {
                    width: 355
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        uuid = getValueByJsonPath(viewElement, 'attributes;nodeDetails;uuid'),
                        actions = [];

                    var dataView = $("#"+elementModelViewMap['network-ipam']['gridId']).data('contrailGrid')._dataView;
                    var rowItem = rowItemByUUID(uuid, elementModelViewMap['network-ipam']['gridId']);
                    actions.push({
                        callback: function (key, options) {
                            //Edit block
                            if (rowItem != null) {
                                var polModel = new elementModelViewMap['network-ipam']['model'](rowItem);
                                elementModelViewMap['network-ipam']['view'].model = polModel;
                                elementModelViewMap['network-ipam']['view'].renderEditIpamCfg({
                                    "title": ctwl.EDIT,
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                    }});
                            }
                        }
                    });

                    return actions;
                }
            },
            FloatingIP: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var NetworkIPAMName = viewElement.attributes.nodeDetails['fq_name'][2];

                    return tooltipTitle({name: NetworkIPAMName, type: ctwl.TITLE_GRAPH_ELEMENT_FLOATING_IP});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var actions = [], nodeDetails = viewElement.attributes.nodeDetails;

                    actions.push({
                        text: 'Edit',
                        iconClass: 'fa fa-pencil-square-o',
                    });

                    return tooltipContent({
                        info: [
                            {
                                label: 'Project',
                                value: viewElement.attributes.nodeDetails['fq_name'][0] + ':' + viewElement.attributes.nodeDetails['fq_name'][1]
                            },
                            {
                                label: 'UUID',
                                value: nodeDetails['uuid']
                            }
                        ],
                        iconClass: 'networking-Floating_IP',
                        actions: actions
                    });
                },
                dimension: {
                    width: 355
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        uuid = getValueByJsonPath(viewElement, 'attributes;nodeDetails;uuid'),
                        actions = [];

                    var dataView = $("#"+elementModelViewMap['floating-ip']['gridId']).data('contrailGrid')._dataView;
                    var rowItem = rowItemByUUID(uuid, elementModelViewMap['floating-ip']['gridId']);
                    actions.push({
                        callback: function (key, options) {
                            //Edit block
                            if (rowItem != null) {
                                var polModel = new elementModelViewMap['floating-ip']['model'](rowItem);
                                elementModelViewMap['floating-ip']['view'].model = polModel;
                                elementModelViewMap['floating-ip']['view'].renderAssociateFipCfg({
                                    "title": ctwl.EDIT,
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                    }});
                            }
                        }
                    });

                    return actions;
                }
            },
            LogicalRouter: {
                title: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var NetworkIPAMName = viewElement.attributes.nodeDetails['fq_name'][2];

                    return tooltipTitle({name: NetworkIPAMName, type: ctwl.TITLE_GRAPH_ELEMENT_LOGICAL_ROUTER});
                },
                content: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id'));
                    if (viewElement == null) {
                        return;
                    }
                    var actions = [], nodeDetails = viewElement.attributes.nodeDetails;

                    actions.push({
                        text: 'Edit',
                        iconClass: 'fa fa-pencil-square-o',
                    });

                    return tooltipContent({
                        info: [
                            {
                                label: 'Project',
                                value: viewElement.attributes.nodeDetails['fq_name'][0] + ':' + viewElement.attributes.nodeDetails['fq_name'][1]
                            },
                            {
                                label: 'UUID',
                                value: nodeDetails['uuid']
                            }
                        ],
                        iconClass: 'icon-contrail-router',
                        actions: actions
                    });
                },
                dimension: {
                    width: 355
                },
                actionsCallback: function (element, graphView) {
                    var viewElement = graphView.model.getCell(element.attr('model-id')),
                        uuid = getValueByJsonPath(viewElement, 'attributes;nodeDetails;uuid'),
                        actions = [];

                    var dataView = $("#"+elementModelViewMap['router']['gridId']).data('contrailGrid')._dataView;
                    var rowItem = rowItemByUUID(uuid, elementModelViewMap['router']['gridId']);
                    actions.push({
                        callback: function (key, options) {
                            //Edit block
                            if (rowItem != null) {
                                var polModel = new elementModelViewMap['router']['model'](rowItem);
                                elementModelViewMap['router']['view'].model = polModel;
                                elementModelViewMap['router']['view'].renderLogicalRouterPopup({
                                    "title": ctwl.EDIT,
                                    callback: function () {
                                        refreshPage(dataView, graphView);
                                    }});
                            }
                        }
                    });

                    return actions;
                }
            }
        }
    }
    function refreshPage(dataView, graphView) {
        $('.top-row-config-elements .spinner').show();
        setTimeout(function(){
            dataView.refreshData();
            $('#graph-config-elements').data('graphView').model.refreshData();
            $('#graph-connected-elements').data('graphView').model.refreshData();
            $('.top-row-config-elements .spinner').hide();
        }, 4000);
    }
    function rowItemByUUID(uuid, gridId) {
        var gridObj = $("#"+gridId).data('contrailGrid'),
            item = null;
        if (gridObj != null && gridObj._dataView != null && uuid != null) {
            var items = gridObj._dataView.getItems(),
            item = _.filter(items, function(item){return item['uuid'] == uuid.replace(/^"(.*)"$/, '$1');});
            item = item[0];
        }
        return item;
    };
    
    return CfgNetworkingGraphView;
});