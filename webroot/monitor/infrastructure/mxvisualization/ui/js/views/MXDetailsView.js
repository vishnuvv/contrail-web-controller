/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define(
        [ 'underscore','contrail-view','monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'],
        function(
                _, ContrailView, MXGraphModel) {
            var MXDetailsView = ContrailView.extend({
                render : function() {
                    var self = this,
                    model = self.model,
                    viewConfig = this.attributes.viewConfig;
                    this.renderView4Config(this.$el, null,
                            getMXDeatilsViewConfig(viewConfig,model));
                }
            });
            $(document ).ready(function() {
                $(document).on('click', "a.value-link", function(event) {
                     event.stopPropagation();
                     event.preventDefault();
                     $("#"+ctwc.MX_VISUALIZATION_TAB_ID).tabs({active:1});
                 })
             });
            function getMXDeatilsViewConfig(viewConfig,model) {
                var self = this,
                clickedElement = viewConfig.viewConfig.viewConfig.clickedElement,
                linecardCount = model.rawData()[0].linecards.length,
                description = model.rawData()[0].items[1].Description,
                routingEngines = model.rawData()[0].items[4].RoutingEngines,
                hostName = clickedElement.options.name,
                mgmtIP = clickedElement.options.management_ip,
                intfCount = clickedElement.options.more_attributes.ifTable.length;
                var data = {
                     linecardCount:linecardCount,
                     hostName: hostName,
                     description: description,
                     intfCnt: intfCount,
                     managementIP:mgmtIP,
                     routingEngines: routingEngines
                 };
                return {
                    elementId: ctwc.MX_DETAILS_VIEW_TAB_ID,
                    title: ctwl.TITLE_DETAILS,
                    view: "DetailsView",
                    viewConfig: {
                        data: data,
                        templateConfig: getMXDetailsTabTemplateConfig(data),
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                    },
                };
            }
            function getMXDetailsTabTemplateConfig(data) {
                return {
                    advancedViewOptions: false,
                    templateGenerator: 'RowSectionTemplateGenerator',
                    templateGeneratorConfig: {
                        rows: [
                            {
                                templateGenerator: 'ColumnSectionTemplateGenerator',
                                templateGeneratorConfig: {
                                    columns: [
                                        {
                                            class: 'span6',
                                            rows: [
                                                {
                                                    title: contrail.format('{0} ( {1} )',
                                                       ctwl.MX_TAB_DETAILS,
                                                       data.hostName),
                                                    templateGenerator:
                                                        'BlockListTemplateGenerator',
                                                    templateGeneratorConfig: [
                                                        {
                                                            key: 'hostName',
                                                            label: 'Hostname',
                                                            templateGenerator:
                                                                'TextGenerator'
                                                        },{
                                                            key: 'description',
                                                            templateGenerator:
                                                                'TextGenerator'
                                                        },{
                                                            key: 'intfCnt',
                                                            templateGenerator:
                                                                'TextGenerator',
                                                        },
                                                        {
                                                            key: 'routingEngines',
                                                            label: 'Routing Engines',
                                                            templateGenerator:
                                                                'TextGenerator',
                                                        },
                                                        {
                                                            key: 'managementIP',
                                                            label: 'Management IP',
                                                            templateGenerator:
                                                                'TextGenerator',
                                                        },{
                                                            key: 'linecardCount',
                                                            label: 'Line cards',
                                                            templateGenerator:
                                                                'LinkGenerator',
                                                                 valueClass: 'intfCnt',
                                                                 templateGeneratorConfig: {
                                                                     formatter: 'link',
                                                                     id:'interfaceLink',
                                                                     params: {}
                                                                 }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                        ]
                    }
                }
            };
            return MXDetailsView;
        });
