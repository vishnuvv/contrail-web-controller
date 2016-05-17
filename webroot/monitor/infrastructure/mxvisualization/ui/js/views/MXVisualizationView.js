/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define(
        [ 'underscore', 'contrail-view',
          'monitor/infrastructure/mxvisualization/ui/js/models/MXVisualizationModel',
          'monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'],
        function(
                _, ContrailView, MXVisualizationModel, MXGraphModel) {
            var MXVisualizationView = ContrailView.extend({
                render : function(viewConfig) {
                    var mxVisualizationModel = new MXVisualizationModel(),
                        viewConfig = this.attributes.viewConfig,
                        clickedElement = viewConfig.clickedElement,
                        nodeName = clickedElement.options.name;
                        pushBreadcrumb([nodeName]);
                        this.renderView4Config(this.$el, mxVisualizationModel,
                            getMXVisualizationViewConfig(viewConfig));
                }
            });
            function getMXVisualizationViewConfig(viewConfig) {
                var viewConfig = {
                    rows : [
                         {
                            columns : [ {
                                elementId :
                                    ctwl.MX_VISUALIZATION_ID,
                                title : ctwl.MX_VISUALIZATION_TITLE,
                                view : "MXGraphView",
                                viewPathPrefix:
                                    ctwl.URL_MX_VISUALIZATION,
                                app : cowc.APP_CONTRAIL_CONTROLLER,
                                viewConfig: {
                                    viewConfig: viewConfig
                                }
                                    } ]
                        },{
                            columns : [ {
                                elementId :
                                    ctwl.MX_VISUALIZATION_TAB_ID,
                                view : "MXTabView",
                                viewPathPrefix:
                                    ctwl.URL_MX_VISUALIZATION,
                                app : cowc.APP_CONTRAIL_CONTROLLER,
                                viewConfig: {
                                    viewConfig: viewConfig
                                }
                            } ]
                        } ]
                };
                return {
                    elementId : cowu.formatElementId(
                        [ctwl.CONFIGNODE_SUMMARY_LIST_SECTION_ID ]),
                    view : "SectionView",
                    viewConfig : viewConfig
                };
            }
            return MXVisualizationView;
        });
