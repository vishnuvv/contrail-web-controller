/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var SecurityDashboardView = ContrailView.extend({
        el: $(contentContainer),
        render: function (viewConfig) {
            this.renderView4Config(this.$el, null,
                    getBreadCrumbViewConfig(viewConfig));
        }
    });
    
    function getBreadCrumbViewConfig(viewConfig) {
        var hashParams = viewConfig.hashParams,
            customProjectDropdownOptions = {
                getProjectsFromIdentity: true,
                includeDefaultProject: true,
                childView: {
                    init: function () {
                    	return function (project) {
                    		return getSecurityDashboardViewConfig();
                    	}
                    }()
                }
            },
            customDomainDropdownOptions = {
                childView: {
                    init: ctwvc.getProjectBreadcrumbDropdownViewConfig(hashParams, customProjectDropdownOptions)
                }
            };

        return ctwvc.getDomainBreadcrumbDropdownViewConfig(hashParams, customDomainDropdownOptions);
    };
    function getSecurityDashboardViewConfig() {
        var viewConfig =  {
                rows : [{
                            columns : [{
                                elementId: 'security-dashboard-carousel-view',
                                view: "CarouselView",
                                viewConfig: {
                                    pages : [{
                                             page: {
                                                 elementId : 'security-dashboard-stackview-0',
                                                 view : "GridStackView",
                                                 viewConfig : {
                                                    elementId : 'security-dashboard-stackview-0',
                                                    gridAttr : {
                                                        defaultWidth : cowc.GRID_STACK_DEFAULT_WIDTH,
                                                        defaultHeight : 8
                                                    },
                                                    widgetCfgList: [
                                                        {id: 'top-10-allowed-rules'},
                                                        {id: 'vmi-implicit-allow-deny-scatterchart'},
                                                        {id: 'top-10-deny-rules'},
                                                        {id: 'top-5-services'}
                                                    ]
                                                 }
                                             },
                                         }]
                                }
                            }]
                }]
        };
        return {
            elementId : cowu.formatElementId([ctwl.ANALYTICSNODE_SUMMARY_LIST_SECTION_ID ]),
            view : "SectionView",
            viewConfig : viewConfig
        }
    };
    return SecurityDashboardView;
});