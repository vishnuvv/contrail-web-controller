/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define(
        [ 'underscore','contrail-view','monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'],
        function(
                _, ContrailView, MXGraphModel) {
            var MXLineCardsDetailsView = ContrailView.extend({
                render : function() {
                    var self = this,
                        linkCardsLength = self.model.rawData()[0].linecards.length,
                        data = [];
                        for(i=0; i<linkCardsLength; i++){
                              data.push({
                                  slot:self.model.rawData()[0].link_details[i].src_slot,
                                  Model: self.model.rawData()[0].linecards[i].model_type,
                                  CPUs: self.model.rawData()[0].linecards[i].cpu_count,
                                  PFEs: self.model.rawData()[0].linecards[i].pfe_count 
                              });
                         }
                    this.renderView4Config(this.$el, null,
                            getMXLineCardsViewConfig({data:data}));
                }
            });
        function getMXLineCardsViewConfig(viewConfig) {
                var self = this,
                    data = viewConfig.data;
                return {
                    elementId: ctwc.MX_LINECARDS_TAB_ID,
                    title: ctwl.TITLE_LINECARDS,
                    view: "GridView",
                    viewConfig: {
                        elementConfig:{
                            header: {
                                title: {
                                    text: contrail.format('{0} ( {1} )',
                                            ctwl.TITLE_LINECARDS,
                                    "MX1")
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
                                    field:'slot',
                                    name:'slot',
                                     minWidth: 250,
                                },{
                                    field:'Model',
                                    name:'Model',
                                     minWidth: 250,
                                },{
                                    field:'CPUs',
                                    name:'CPUs',
                                    minWidth:250,
                                },{
                                    field:'PFEs',
                                    name:'PFEs',
                                    minWidth: 250,
                                }]
                            }
                        }
                    },
                   
                };
            }
            return MXLineCardsDetailsView;
        });
