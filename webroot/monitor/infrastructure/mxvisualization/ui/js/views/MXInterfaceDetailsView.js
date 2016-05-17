/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define(
        [ 'underscore','contrail-view','monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'],
        function(
                _, ContrailView, MXGraphModel) {
            var MXInterfaceDetailsView = ContrailView.extend({
                render : function() {
                    var self = this,
                    viewConfig = this.attributes.viewConfig;
                    this.renderView4Config(this.$el, null,
                            getMXInterfaceViewConfig(viewConfig));
                }
            });
            function getMXInterfaceViewConfig(viewConfig) {
                var self = this,
                    clickedElement = viewConfig.viewConfig.viewConfig.clickedElement,
                    hostName = clickedElement.options.name,
                    intfCount = clickedElement.options.more_attributes.ifTable.length,
                    data = [];
                    for(i=0; i<intfCount; i++){
                      var inTraffic = clickedElement.options.more_attributes.ifTable[i].ifInOctets;
                      var outTraffic = clickedElement.options.more_attributes.ifTable[i].ifOutOctets;
                      var inOutTraffic = formatBytes(inTraffic) +'/'+ formatBytes(outTraffic);
                      var adminStatus = clickedElement.options.more_attributes.ifTable[i].ifAdminStatus;
                      var operStatus  = clickedElement.options.more_attributes.ifTable[i].ifOperStatus;
                      if(ifPhysAddress!=null)
                          var ifPhysAddress = clickedElement.options.more_attributes.ifTable[i].ifPhysAddress;
                      else
                          var ifPhysAddress = '-';
                      var ifAdminStatus;
                      if(adminStatus == 1 && operStatus == 1) {
                          ifAdminStatus = 'Up';
                      } else if (adminStatus == 1 && operStatus != 1) {
                          ifAdminStatus = 'Oper Down';
                      } else if (adminStatus != 1 && operStatus != 1) {
                          ifAdminStatus = 'Admin Down';
                      } else {
                          ifAdminStatus = '-';
                      }
                      data.push({
                          ifDescr:clickedElement.options.more_attributes.ifTable[i].ifDescr,
                          ifAdminStatus: ifAdminStatus,
                          ifPhysAddress: ifPhysAddress,
                          ifIndex: clickedElement.options.more_attributes.ifTable[i].ifIndex,
                          bandwidth: inOutTraffic,
                      });
                    }
                    return {
                    elementId: ctwc.MX_INTERFACES_TAB_ID,
                    title: ctwl.TITLE_LINECARDS,
                    view: "GridView",
                    viewConfig: {
                        elementConfig:{
                            header: {
                                title: {
                                    text: contrail.format('Interfaces ( {0} )',
                                            hostName)
                                },
                                defaultControls: {
                                    collapseable: true,
                                    exportable: false,
                                    refreshable: false,
                                    searchable: true
                                }
                            },
                            body: {
                                options: {
                                    autoRefresh: false,
                                    checkboxSelectable: false,
                                    detail: ctwu.getDetailTemplateConfigToDisplayRawJSON(),
                                    fixedRowHeight: 30,
                                },
                                dataSource: {
                                    data: data
                                }
                            },
                            columnHeader: {
                                columns: [{
                                    field:'ifDescr',
                                    name:'Name',
                                     minWidth: 250,
                                },{
                                    field:'ifAdminStatus',
                                    name:'Status',
                                     minWidth: 250,
                                },{
                                    field:'ifPhysAddress',
                                    name:'MAC Address',
                                    minWidth:250,
                                },{
                                    field:'ifIndex',
                                    name:'Index',
                                    minWidth: 250,
                                },
                                {
                                    field:'bandwidth',
                                    name:'Traffic (In/Out)',
                                    minWidth:250,
                                }]
                            }
                        }
                    },
                };
            }
            return MXInterfaceDetailsView;
        });
