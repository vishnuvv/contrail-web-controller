/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'underlay-graph-model'
], function (_, ContrailView, UnderlayGraphModel) {
    var UnderlayView = ContrailView.extend({
        el: $(contentContainer),
        model: new UnderlayGraphModel(getUnderlayGraphModelConfig()),
        renderUnderlayPage: function (viewConfig) {
            var self = this,
                graphTabsTemplate = 
                    contrail.getTemplate4Id(cowc.TMPL_2ROW_CONTENT_VIEW);
            this.$el.html(graphTabsTemplate);
            self.renderUnderlayGraph();
            //Rendering the tabs in the page once the data is populated
            this.model.onAllRequestsComplete.subscribe(function () {
                self.renderUnderlayTabs();
            });
        },
        renderUnderlayGraph: function() {
            var topContainerElement = $('#' + ctwl.TOP_CONTENT_CONTAINER),
                underlayGraph = getUnderlayGraphAjaxConfig();
            this.renderView4Config(topContainerElement,
                 this.model, getUnderlayGraphViewConfig(underlayGraph),
                 null, null, null);
        },
        renderUnderlayTabs: function() {
            var bottomContainerElement = $('#' + ctwl.BOTTOM_CONTENT_CONTAINER),
                tabConfig = getUnderlayTabViewConfig();
            this.renderView4Config(bottomContainerElement, this.model, tabConfig, null, null, null);
        }
    });
    
    function getUnderlayGraphModelConfig() {
        return  {
            forceFit: false,
            rankDir: 'TB',
            generateElementsFn: function (response) {
                return this.getElementsForUnderlayGraph(response);
            },
            remote: {
                ajaxConfig: {
                    url: ctwl.URL_UNDERLAY_TOPOLOGY,
                    type: 'GET'
                },
                successCallback: function (response, underlayGraphModel) {
                    if (!contrail.checkIfExist(underlayGraphModel.elementsDataObj)){
                        underlayGraphModel.empty = true;
                        return false;
                    }
                }
            },
            vlRemoteConfig: {
                vlRemoteList: [{
                    getAjaxConfig: function (response) {
                        return {
                            url: ctwl.URL_UNDERLAY_TOPOLOGY_REFRESH
                        };
                    },
                    successCallback: function (response, underlayGraphModel) {
                        if(response.topologyChanged) {
                            underlayGraphModel.clear();
                            $("#"+ ctwl.UNDERLAY_GRAPH_ID).find('div').remove();
                            underlayGraphModel['tree'] = {};
                            underlayGraphModel.generateElements(
                                $.extend(true, {}, response),
                                underlayGraphModel.elementMap,
                                underlayGraphModel.rankDir);
                        }
                    }
                }]
            },
            cacheConfig: {
                ucid: ctwc.UNDERLAY_TOPOLOGY_CACHE
            },
        };
    }
    
    function getUnderlayGraphAjaxConfig() {
        //TODO need to handle the launch points from other pages
        return graphConfig = {
                remote: {
                    ajaxConfig: {
                        url: ctwl.URL_UNDERLAY_TOPOLOGY,
                        type: 'GET'
                    }
                },
                cacheConfig: {
                    ucid: ctwc.UNDERLAY_TOPOLOGY_CACHE
                },
            };
    }
    function getUnderlayGraphViewConfig(underlayGraph) {
        return {
            elementId: cowu.formatElementId([ctwl.MONITOR_PROJECT_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [{
                      columns: [{
                          elementId: ctwl.PROJECT_GRAPH_ID,
                          view: "UnderlayGraphView",
                          viewPathPrefix: ctwl.UNDERLAY_VIEWPATH_PREFIX,
                          app: cowc.APP_CONTRAIL_CONTROLLER,
                          viewConfig: {underlayGraph: underlayGraph}
                      }]
                }]
            }
        };
    };
    
    function getUnderlayTabViewConfig () {
        return {
            elementId: cowu.formatElementId([ctwc.UNDERLAY_TABS_VIEW_ID, 'section']),
            view: "SectionView",
            viewConfig: {
                rows: [{
                        columns: [{
                            elementId: ctwc.UNDERLAY_TABS_VIEW_ID,
                            view: 'UnderlayTabView',
                            viewPathPrefix: ctwl.UNDERLAY_VIEWPATH_PREFIX,
                            app: cowc.APP_CONTRAIL_CONTROLLER,
                            viewConfig : {
                                
                            }
                      }]
                }]
            }
        };
    }

    return UnderlayView;
});