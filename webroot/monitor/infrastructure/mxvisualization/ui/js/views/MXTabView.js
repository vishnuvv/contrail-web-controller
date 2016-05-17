/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define([
    'underscore',
    'contrail-view','monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'], 
    function (_, ContrailView, MXGraphModel, underlayUtils) {
    var MXTabView = ContrailView.extend({
        el: $(contentContainer),
        callBackExecuted : false,
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig;
                mxVizModel = self.model;
            if(self.model.isRequestInProgress()){
                self.model.onAllRequestsComplete.subscribe(function(){
                    self.graphModel = new MXGraphModel(mxVizModel.getItems()[0]);
                    self.renderView4Config(self.$el, self.graphModel,
                            getMXVisualizationTabConfig(viewConfig), null, null, null,
                            function (MXTabView) {
                               if(!self.callBackExecuted) {
                                   self.listenToGraphModel(MXTabView, self.graphModel);
                                   self.callbackExecuted = true;
                               }
                            }
                       );
                });
          }
          else{
              self.graphModel = new MXGraphModel(mxVizModel.getItems()[0]);
              self.renderView4Config(self.$el, self.graphModel,
                      getMXVisualizationTabConfig(viewConfig), null, null, null,
                      function (MXTabView) {
                         if(!self.callBackExecuted) {
                             self.listenToGraphModel(MXTabView, self.graphModel);
                             self.callbackExecuted = true;
                         }
                      }
                 );
          }
        },
        listenToGraphModel : function (MXTabView, model) {
            var _this = this;
            graphModel = model;
            if(graphModel != null) {
                MXTabView.stopListening(graphModel.selectedElement().model());
                MXTabView.listenTo(graphModel.selectedElement().model(),
                    'change', function (selectedElement) {
                   var nodeDetails = selectedElement['attributes']['nodeDetail'];
                   showLinkTrafficStatistics(nodeDetails, MXTabView);
                });
            }
        }
    });
    var getMXVisualizationTabConfig = function (viewConfig) {
        var mxVisualizationDefaultTabConfig =
            getMXVisualizationDefaultTabConfig(viewConfig);
        return {
            elementId: ctwc.MX_VISUALIZATION_TAB_ID,
            view: "TabsView",
            viewConfig: {
                theme: 'classic',
                disabled: ifNull(
                    viewConfig['tabsToDisable'], []),
                activate: function (e, ui) {
                },
                tabs: mxVisualizationDefaultTabConfig
            }
        };
    };
    function showLinkTrafficStatistics (linkDetails, MXTabView) {
        var lineCardStatsTitle = 'Traffic Statistics of link '+linkDetails;
        var viewConfig = {
            elementId: ctwc.MX_TRAFFIC_STAT_TAB_ID,
            title: ctwl.MX_TRAFFIC_STAT_TITLE,
            view: 'MXLineCardChartView',
            viewPathPrefix: ctwl.URL_MX_VISUALIZATION,
            viewConfig: {
                widgetConfig: {
                    elementId: ctwc.MX_TRAFFIC_STAT_WIDGET,
                    view: "WidgetView",
                    viewConfig: {
                        header: {
                            title: lineCardStatsTitle,
                        },
                        controls: {
                            top: {
                                default: {
                                    collapseable: true
                                }
                            }
                        }
                    }
                }
            },
            tabConfig: {
                activate: function (event, ui){
               if($("#"+ ctwc.MX_TRAFFIC_STAT_TAB_ID).data('contrailGrid') != null) {
                   $("#"+ ctwc.MX_TRAFFIC_STAT_TAB_ID).data('contrailGrid').refreshView();
                }
                },
                renderOnActivate: true
            }
        };
        if(MXTabView.childViewMap[ctwc.MX_VISUALIZATION_TAB_ID].tabs.length > 3) 
            MXTabView.childViewMap[ctwc.MX_VISUALIZATION_TAB_ID].removeTab(3);
        MXTabView.childViewMap[ctwc.MX_VISUALIZATION_TAB_ID].renderNewTab(
                ctwc.MX_VISUALIZATION_TAB_ID, [viewConfig]);
        $("#"+ctwc.MX_VISUALIZATION_TAB_ID).tabs({active:3});
    }
  function getMXVisualizationDefaultTabConfig(viewConfig){
        return [
            {
                elementId: ctwc.MX_DETAILS_TAB_ID,
                title: ctwl.MX_DETAILS_TAB_TITLE,
                view: "MXDetailsView",
                viewPathPrefix: ctwl.URL_MX_VISUALIZATION,
                app: cowc.APP_CONTRAIL_CONTROLLER,
                viewConfig: {
                    viewConfig: viewConfig,
                    widgetConfig: {
                        elementId: ctwc.MX_DETAILS_TAB_WIDGET,
                        view: "WidgetView",
                        viewConfig: {
                            controls: {
                                top: {
                                    default: {
                                        collapseable: true
                                    }
                                }
                            }
                        }
                    }
                },
                tabConfig: {
                    activate: function (event, ui){
                        if($("#"+ ctwc.MX_DETAILS_TAB_ID).data('contrailGrid') != null) {
                            $("#"+ ctwc.MX_DETAILS_TAB_ID).data('contrailGrid').refreshView();
                        }
                    },
                    renderOnActivate: true
                }
            },
            {
                elementId: ctwc.MX_LINECARDS_DETAILS_TAB_ID,
                title: ctwl.MX_LINECARD_TITLE,
                view: "MXLineCardsDetailsView",
                viewPathPrefix: ctwl.URL_MX_VISUALIZATION,
                app: cowc.APP_CONTRAIL_CONTROLLER,
                viewConfig: {
                    widgetConfig: {
                        elementId: ctwc.MX_LINECARDS_DETAILS_TAB_WIDGET,
                        view: "WidgetView",
                        viewConfig: {
                            controls: {
                                top: {
                                    default: {
                                        collapseable: true
                                    }
                                }
                            }
                        }
                    }
                },
                tabConfig: {
                    activate: function (event, ui){
                        if($("#"+ ctwc.MX_LINECARDS_DETAILS_TAB_ID).data('contrailGrid') != null) {
                            $("#"+ ctwc.MX_LINECARDS_DETAILS_TAB_ID).data('contrailGrid').refreshView();
                        }
                    },
                    renderOnActivate: true
                }
            },
            {
                elementId: ctwc.MX_INTERFACES_DETAILS_TAB_ID,
                title: ctwl.MX_INTERFACE_TITLE,
                view: "MXInterfaceDetailsView",
                viewPathPrefix: ctwl.URL_MX_VISUALIZATION,
                app: cowc.APP_CONTRAIL_CONTROLLER,
                viewConfig: {
                    viewConfig: viewConfig,
                    widgetConfig: {
                        elementId: ctwc.MX_INTERFACES_DETAILS_TAB_WIDGET,
                        view: "WidgetView",
                        viewConfig: {
                            controls: {
                                top: {
                                    default: {
                                        collapseable: true
                                    }
                                }
                            }
                        }
                    }
                },
                tabConfig: {
                    activate: function (event, ui){
                        if($("#"+ ctwc.MX_INTERFACES_DETAILS_TAB_ID).data('contrailGrid') != null) {
                            $("#"+ ctwc.MX_INTERFACES_DETAILS_TAB_ID).data('contrailGrid').refreshView();
                        }
                    },
                    renderOnActivate: true
                }
            }
        ];
    };
    return MXTabView;
});
