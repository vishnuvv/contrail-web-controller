/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'backbone',
    'monitor/infrastructure/common/ui/js/views/NodeDetailsInfoboxesView',
    'monitor/infrastructure/vrouter/ui/js/views/VRouterDetailsAgentLineChartView',
    'monitor/infrastructure/vrouter/ui/js/models/VRouterDetailsAgentChartListModel',
    'monitor/infrastructure/vrouter/ui/js/views/VRouterDetailsSystemLineChartView',
    'monitor/infrastructure/vrouter/ui/js/models/VRouterDetailsSystemChartListModel'
], function(_,ContrailView,Backbone,NodeDetailsInfoboxesView,
        VRouterDetailsAgentLineChartView,VRouterDetailsAgentChartListModel,
        VRouterDetailsSystemLineChartView,VRouterDetailsSystemChartListModel) {

    //Ensure VRouterDetailsChartsView is instantiated only once and re-used always
    //Such that tabs can be added dynamically like from other feature packages
    var VRouterDetailsChartsView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
            var self = this;
            var viewConfig = this.attributes.viewConfig;
            var hostname = viewConfig['hostname'];
            var detailsChartsTmpl = contrail.getTemplate4Id(cowc.NODE_DETAILS_CHARTS);
            self.$el.append(detailsChartsTmpl);
            this.infoBoxView = new NodeDetailsInfoboxesView({el:$(contentContainer).
                find('#infoboxes-container')});
            var infoBoxList = getInfoboxesConfig({node:hostname});
            for(var i=0;i<infoBoxList.length;i++) {
                this.infoBoxView.add(infoBoxList[i]);
            }
        }
    });

    function getInfoboxesConfig(config) {
        var vRouterDetailsAgentChartListModel = new VRouterDetailsAgentChartListModel(config);
        var vRouterDetailsSystemChartListModel = new VRouterDetailsSystemChartListModel(config);
        return [{
            title: 'vRouter Agent',
            prefix:'vrouterAgent',
            sparklineTitle1:'CPU Share (%)',
            sparklineTitle2:'Memory',
            view: VRouterDetailsAgentLineChartView,
            model: vRouterDetailsAgentChartListModel
        },
        {
            title: 'System',
            prefix:'vrouterSystem',
            sparklineTitle1:'CPU Share (%)',
            sparklineTitle2:'Memory',
            view: VRouterDetailsSystemLineChartView,
            model: vRouterDetailsSystemChartListModel
        }];
    };

    return VRouterDetailsChartsView;
});
