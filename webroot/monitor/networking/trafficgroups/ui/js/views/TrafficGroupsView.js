/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'lodashv4', 'contrail-view', 'contrail-charts-view'],
        function(_, ContrailView, ContrailChartsView) {
            var ControlNodeListView = ContrailView.extend({
                render : function() {
                    var trafficGroupsTmpl = contrail.getTemplate4Id('traffic-groups-template');
                    var collapsableWidgetTmpl = contrail.getTemplate4Id('collapsable-widget-template');

                    this.$el.html(trafficGroupsTmpl());
                    this.$el.addClass('traffic-groups-view');
                    this.$el.find('[name="search-form"]').wrapCollapsibleWidget({
                            title: 'Traffic Groups'
                    });
                    
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
                    var SelectionModel = Backbone.Model.extend({
                        defaults : {
                            select: '',
                            where: []
                        }
                    });
                    var selectionModel = new SelectionModel();

                    //Render-dropdowns
                    $(currElem).find('#multiselect-1').select2({
                        placeholder: 'Select tags',
                        data: tagTypes,
                        multiple:true,
                    });
                    $(currElem).find('.select-dropdown').on('change',function(e) {
                        selectionModel.set('select',e.val);
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
                                if(data['tag'] == null) 
                                    return data;
                                else
                                    return data;
                            }
                        },
                    });

                    $(currElem).find('.where-dropdown').on('select',function(e) {
                        selectionModel.get('where').push(e.added);
                    });
                    $(currElem).find('.where-dropdown').on('unselect',function(e) {
                        _.remove(selectionModel.get('where'),function(val,idx) {
                            var removedElem = e.removed;
                            return (val.id == removedElem.id && val.tag == removedElem.tag && val.text == removedElem.text);
                        });
                    });
                    $(currElem).find('.where-dropdown').on('change',function(e) {
                        if(e.added != null) {
                            selectionModel.get('where').push(e.added);
                        }
                        if(e.removed != null) {
                            _.remove(selectionModel.get('where'),function(val,idx) {
                                var removedElem = e.removed;
                                return (val.id == removedElem.id && val.tag == removedElem.tag && val.text == removedElem.text);
                            });
                        }
                    });

                    $(currElem).find('.btn-update').on('click',function() {
                        var config = {
                            hierarchyConfig: {
                                parse: function (d) {
                                    //Get selected tags
                                    var selTags = selectionModel.get('select');
                                    var matchTags = selectionModel.get('where');
                                    var srcHierarchy = [d.sourcevn, d.sourceip, d.sport];
                                    srcHierarchy = [d.src.application, d.src.deployment];
                                    srcHierarchy = [];
                                    var dstHierarchy = [d.destvn, d.destip, d.dport];
                                    dstHierarchy = [d.dst.application, d.dst.deployment];
                                    dstHierarchy = [];
                                    $.each(selTags,function(idx,val) {
                                        srcHierarchy.push(_.result(d,'src.' + val));
                                        dstHierarchy.push(_.result(d,'dst.' + val));
                                    });
                                    var src = {
                                        names: srcHierarchy,
                                        id: srcHierarchy.join('-'),
                                        value: d['agg-bytes']
                                    };
                                    var dst = {
                                        names: dstHierarchy,
                                        id: dstHierarchy.join('-'),
                                        value: d['agg-bytes']
                                    };
                                    return [src, dst];
                                }
                            }
                        }
                        viewInst.updateConfig(config);
                        // trafficGroupsModel.set('data',cowu.getTrafficGroupsData());
                        //Apply backbone filter
                        trafficGroupsModel.set('data',trafficGroupsCollection.byMatchTags(selectionModel.get('where')));
                        viewInst.render();
                    });

                    var TrafficGroupsCollection = Backbone.Collection.extend({
                        model : Backbone.Model,
                        byMatchTags : function(matchTags) {
                            filtered = this.filter(function(data) {
                                var matched = true;
                                $.each(matchTags,function(idx,obj) {
                                    if(data.get('src')[obj['tag']] != obj['text'] || data.get('dst')[obj['tag']] != obj['text']) {
                                        matched = false;
                                    }
                                });
                                return matched;
                            });
                            return new TrafficGroupsCollection(filtered);
                        }
                    });
                    var trafficGroupsCollection = new TrafficGroupsCollection();

                    // trafficGroupsModel.set('data',cowu.getTrafficGroupsData());
                    trafficGroupsCollection.add(cowu.getTrafficGroupsData());

                    var TrafficGroupsModel = Backbone.Model.extend({
                        defaults: {
                            data: trafficGroupsCollection,
                        }
                    });
                    var trafficGroupsModel = new TrafficGroupsModel();
                    trafficGroupsModel.set('data',trafficGroupsCollection);

                    var viewInst = new ContrailChartsView({
                        el: this.$el.find('#traffic-groups-radial-chart'),
                        model: trafficGroupsModel
                    });
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
