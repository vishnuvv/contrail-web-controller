/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([ 
         'underscore',
         'contrail-view',
         'knockback',
         'traceflow-model' ],
        function(_, ContrailView, Knockback,TraceFlowTabModel) {
            var TraceFlowTabView = ContrailView.extend({
                render : function() {
                    var self = this,
                        viewConfig = this.attributes.viewConfig;
                    var traceFlowModel = new TraceFlowTabModel();
                    traceFlowModel.showvRouter = ko.computed((function() {
                        return (this.traceflow_radiobtn_name() == 'vRouter') ? true : false; 
                    }), traceFlowModel);
                     
                    traceFlowModel.showInstance = ko.computed((function() {
                        return (this.traceflow_radiobtn_name() == 'instance') ? true : false; 
                    }), traceFlowModel);
                    
                    // Setting the first vRouter in the dropdown to model
                    // as workaround once the defaultValueId is setting to model
                    // can be removed
                    
                    var vRouters = getValueByJsonPath(self,'model;vRouters',[]);
                    var virtualMachines = getValueByJsonPath(self,'model;VMs',[]);
                    if(vRouters.length > 0) {
                        traceFlowModel.vrouter_dropdown_name(vRouters[0]['name']);
                    }
                    
                    if(virtualMachines.length > 0) {
                        traceFlowModel.instance_dropdown_name(virtualMachines[0]['name']);
                    }
                    self.model = traceFlowModel;
                    this.renderView4Config(self.$el, traceFlowModel,
                        self.getTraceFlowTabViewConfig(),null, null, null,
                            function () {
                                $(self.$el).append("<div id='"+ctwc.TRACEFLOW_RESULTS_GRID_ID+"'></div>");
                                self.renderTraceFlowResult();
                                $('input[type=radio][name=traceflow_radiobtn_name]')
                                    .on('change',function () {
                                        self.renderTraceFlowResult();
                                    });
                                Knockback.applyBindings(self.model,
                                    document.getElementById(
                                    ctwc.UNDERLAY_TRACEFLOW_TAB_ID));
                    });
                    var widgetConfig = viewConfig['widgetConfig'];
                    if (widgetConfig !== null) {
                        self.renderView4Config(self.$el, null, widgetConfig, null, null, null);
                    }
                },
                renderTraceFlowResult: function() {
                    var self = this,
                        traceFlowResultId = "#"+ctwc.TRACEFLOW_RESULTS_GRID_ID,
                        responseViewConfig = {
                            view: "TraceFlowResultView",
                            viewPathPrefix: ctwl.UNDERLAY_VIEWPATH_PREFIX,
                            app: cowc.APP_CONTRAIL_CONTROLLER,
                            viewConfig: {
                                
                            }
                        };
    
                    self.renderView4Config($(self.$el).find(traceFlowResultId), self.model, responseViewConfig);
                },
                
                getTraceFlowTabViewConfig: function () {
                    var self = this;
                    return {
                        elementId : ctwl.CONTROLNODE_SUMMARY_GRID_SECTION_ID,
                        view : "SectionView",
                        viewConfig : {
                            rows : [{
                                columns : [ {
                                    elementId : 'traceflow_radiobtn_name',
                                    view : "FormRadioButtonView",
                                    viewConfig : {
                                        label : '',
                                        class : 'span3',
                                        path : 'traceflow_radiobtn_name',
                                        dataBindValue : 'traceflow_radiobtn_name',
                                        elementConfig: {
                                            dataObj: [
                                                {'label': 'Virtual Router',
                                                'value': 'vRouter'},
                                                {'label': 'Virtual Machine',
                                                'value': 'instance'}
                                            ]
                                        }
                                    }
                                }, {
                                    elementId : 'vrouter_dropdown_name',
                                    view : "FormDropdownView",
                                    viewConfig : {
                                        label : 'Virtual Router',
                                        visible : 'showvRouter',
                                        class : 'span4',
                                        path : 'vrouter_dropdown_name',
                                        dataBindValue : 'vrouter_dropdown_name',
                                        elementConfig : {
                                            dataTextField : "text",
                                            dataValueField : "id",
                                            defaultValueId : 0,
                                            data : getTraceFlowDropdown('vRouter'),
                                            change: function () {
                                                self.renderTraceFlowResult();
                                            } 
                                        }
                                    }
                               }, {
                                   elementId : 'instance_dropdown_name',
                                   view : "FormDropdownView",
                                   viewConfig : {
                                       label : 'Virtual Machine',
                                       visible : 'showInstance',
                                       class : 'span4',
                                       path : 'instance_dropdown_name',
                                       dataBindValue : 'instance_dropdown_name',
                                       elementConfig : {
                                           dataTextField : "text",
                                           dataValueField : "id",
                                           defaultValueId : 0,
                                           data : getTraceFlowDropdown('instance'),
                                           change: function () {
                                               self.renderTraceFlowResult();
                                           }
                                       }
                                   }
                               }]
                            }]
                        }
                    };
                }
                
            });
            
            function getTraceFlowDropdown(type) {
                var graphView = $("#"+ctwl.UNDERLAY_GRAPH_ID).data('graphView');
                var graphModel = graphView.model;
                if(type == 'vRouter') {
                    var vRouters = graphModel.vRouters;
                    var vRoutersCombobox = [];
                    for(var i = 0; i < vRouters.length; i++) {
                        var vRouterData = vRouters[i];
                        vRoutersCombobox.push({
                            text:contrail.format('{0} ({1})',vRouterData['name'],
                                    getValueByJsonPath(vRouterData,'more_attributes;VrouterAgent;self_ip_list;0','-')),
                            id:vRouterData['name']
                        });
                    }
                    return vRoutersCombobox;
                } else if (type == 'instance') {
                    var virtualMachines = graphModel.VMs,instComboboxData = [];
                    for(var i = 0; i < virtualMachines.length; i++) {
                        var instObj = virtualMachines[i];
                        var instAttributes = ifNull(instObj['more_attributes'],{});
                        var interfaceList = ifNull(instAttributes['interface_list'],[])
                        var vmIp = '-',vmIpArr = [];
                        for(var j = 0; j < interfaceList.length; j++) {
                            var intfObj = interfaceList[j];
                            if(intfObj['ip6_active']) {
                                vmIpArr.push(isValidIP(intfObj['ip6_address']) ? intfObj['ip6_address'] : '-');
                            } else {
                                vmIpArr.push(isValidIP(intfObj['ip_address']) ? intfObj['ip_address'] : '-');
                            }
                            for(var k = 0; k < ifNull(intfObj['floating_ips'],[]).length; k++) {
                                var floatingIpObj = intfObj['floating_ips'][k];
                                vmIpArr.push(isValidIP(floatingIpObj['ip_address']) ? floatingIpObj['ip_address'] : '-');
                            }
                        }
                        if(vmIpArr.length > 0)
                            vmIp = vmIpArr.join(',');
                        instComboboxData.push({
                            text: instAttributes['vm_name']+' ('+vmIp+')',
                            id: instObj['name']
                        });
                    }
                    return instComboboxData;
                }
            }
            return TraceFlowTabView;
        });