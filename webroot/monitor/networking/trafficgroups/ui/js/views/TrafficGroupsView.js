/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'lodashv4', 'contrail-view', 'contrail-charts-view'],
        function(_, ContrailView, ContrailChartsView) {
            var ControlNodeListView = ContrailView.extend({
                render : function() {
                    var trafficGroupsTmpl = contrail.getTemplate4Id('traffic-groups-template');
                    this.$el.html(trafficGroupsTmpl());
                    this.$el.addClass('traffic-groups-view');
                    //Render-dropdowns
                    
                    var tagTypes = [{
                            id: 'application', 
                            text: 'Application'
                        },{
                            id: 'tier',
                            text: 'Tier',
                        },{
                            id:'deployment',
                            text:'Deployment'
                        },{
                            id:'Site',
                            text:'Site'
                    }];

                    var data = [{
                        text: 'Application',
                        children: [{
                                tag: 'application',
                                id:'hr',
                                text:'HR'
                            },{
                                tag: 'application',
                                id:'finance',
                                text:'Finance'
                            }]
                    },{
                        text: 'Tier',
                        children: [{
                                tag: 'tier',
                                id:'web',
                                text:'Web'
                            },{
                                tag: 'tier',
                                id:'database',
                                text:'Database'
                            }]
                    },{
                        text: 'Deployment',
                        children: [{
                                tag: 'deployment',
                                id:'production',
                                text:'Production'
                            },{
                                tag: 'deployment',
                                id:'development',
                                text:'Development'
                            }]
                    },{
                        text: 'Site',
                        children: [{
                                tag: 'site',
                                id:'bangalore',
                                text:'Bangalore'
                            },{
                                tag: 'site',
                                id:'sunnyvalue',
                                text:'Sunnyvale'
                            }]
                    }];


                    var currElem = this.$el;

                    $(currElem).find('#multiselect-1').select2({
                        placeholder: 'Select tags',
                        data: tagTypes,
                        multiple:true,
                        change: function(e) {
                        }
                    });

                    $(currElem).find('.where-dropdown').select2({
                        placeholder: 'Match tags',
                        data: data,
                        multiple:true,
                        formatSelection: function(d) {
                            return '<span class="tag">' + _.capitalize(d.tag) + '</span>: ' + d.text;
                        },
                        matcher: function(searchParams,text,data) {
                            if(searchParams.indexOf(':') > 0) {
                                if(data['tag'] == _.split(searchParams,':')[0] && 
                                     (_.toLower(data.text).indexOf(_.toLower(_.trim(_.split(searchParams,':')[1]))) > -1))
                                    return text;
                                else
                                    return null;
                            } else {
                                // console.info("Hello");
                                if(data['tag'] == null) 
                                    return data;
                                else
                                    return data;
                                    // return null;
                            }
                        },
                        change: function(e) {
                        }
                    });

                    $(currElem).find('.btn-update').on('click',function() {
                        // trafficGroupsModel.set('data',cowu.getTrafficGroupsData());
                        viewInst.render();
                    });
                    /*$(currElem).find('.widget-dropdown').on('change',function(e) {
                        //Remove the current widget
                        var currView = $(currElem).find('.item-content').data('ContrailView');
                        if(currView != null)
                        currView.destroy();
                        $(currElem).find('.item-content').empty();
                        self.renderWidget({widgetCfg:{id:e.val}},currElem);
                    });*/
                    // this.$el.find('#multiselect-1').select2({
                    // });

                    var TrafficGroupsModel = Backbone.Model.extend({
                        data: []
                    });
                    var trafficGroupsModel = new TrafficGroupsModel();
                    trafficGroupsModel.set('data',cowu.getTrafficGroupsData());
                    var viewInst = new ContrailChartsView({
                        el: this.$el.find('#traffic-groups-radial-chart'),
                        model: trafficGroupsModel
                    });
                    viewInst.render();
                    // this.renderView4Config(this.$el.find('#traffic-groups-radial-chart'), trafficGroupsModel,
                    //         getControlNodeListViewConfig(colorFn));
                }
            });
            function getControlNodeListViewConfig(colorFn) {
                var viewConfig = {
                    rows : [
                        /*monitorInfraUtils.getToolbarViewConfig(),*/
                        {
                            columns : [{
                                elementId: 'traffic-groups-carousel-view',
                                view: "CarouselView",
                                viewConfig: {
                                pages : [
                                         {
                                             page: {
                                                 elementId : 'traffic-groups-grid-stackview-0',
                                                 view : "GridStackView",
                                                 viewConfig: {
                                                     elementId : 'traffic-groups-grid-stackview-0',
                                                     gridAttr : {
                                                         defaultWidth : cowc.GRID_STACK_DEFAULT_WIDTH,
                                                         defaultHeight : 8
                                                     },
                                                     widgetCfgList: [
                                                         {id:'radial-chart'}
                                                     ]
                                                  }
                                               }
                                         }/*,{
                                             page: {
                                                 elementId : 'traffic-groups-grid-stackview-1',
                                                 view : "GridStackView",
                                                 viewConfig: {
                                                     elementId : 'traffic-groups-grid-stackview-1',
                                                     gridAttr : {
                                                         defaultWidth : cowc.GRID_STACK_DEFAULT_WIDTH,
                                                         defaultHeight : 8
                                                     },
                                                     widgetCfgList: [
                                                         {id:'controlnode-dns'},
                                                         {id:'controlnode-named'},
                                                         {id:'controlnode-system-cpu-share',
                                                             itemAttr:{
                                                                 config:{
                                                                     nodeType:'traffic-groups'
                                                                 }
                                                             }
                                                         },
                                                         {id:'controlnode-system-memory-usage',
                                                             itemAttr:{
                                                                 config:{
                                                                     nodeType:'traffic-groups'
                                                                 }
                                                             }
                                                         },
                                                         {id:'controlnode-grid-view'}
                                                     ]
                                                }
                                             },
                                         },{
                                             page: {
                                             elementId : 'traffic-groups-grid-stackview-2',
                                             view : "GridStackView",
                                             viewConfig: {
                                                 elementId : 'traffic-groups-grid-stackview-2',
                                                 gridAttr : {
                                                     defaultWidth : cowc.GRID_STACK_DEFAULT_WIDTH,
                                                     defaultHeight : 8
                                                 },
                                                 widgetCfgList: [
                                                     {id:'controlnode-disk-usage-info',
                                                         itemAttr:{
                                                             config:{
                                                                 nodeType:'control-node'
                                                             }
                                                         }
                                                     },
                                                     {id:'controlnode-grid-view'}
                                                 ]
                                            }
                                         },
                                      }*/
                                   ]
                                }
                            }]
                        }]
                };
                return {
                    elementId : cowu.formatElementId([
                          ctwl.CONTROLNODE_SUMMARY_LIST_SECTION_ID ]),
                    view : "SectionView",
                    viewConfig : viewConfig
                };
            }
            return ControlNodeListView;
        });
