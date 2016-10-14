/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var CfgProjectTopo = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                graphTabsTemplate = contrail.getTemplate4Id(cowc.TMPL_2ROW_CONTENT_VIEW),
                viewConfig = this.attributes.viewConfig,
                projectSelectedValueData = viewConfig['projectSelectedValueData'],
                domain = contrail.getCookie(cowc.COOKIE_DOMAIN),
                projectFQN = domain + ':' + projectSelectedValueData.name,
                projectUUID = projectSelectedValueData.value;

            this.$el.html(graphTabsTemplate);

            self.renderProjectGraph(projectFQN, projectUUID);
            self.renderProjectTabs(viewConfig);
        },

        renderProjectGraph: function(projectFQN, projectUUID) {
            var topContainerElement = $('#' + ctwl.TOP_CONTENT_CONTAINER),
                connectedGraph = nmwvc.getMNConnnectedGraphConfig(ctwc.get(ctwc.URL_PROJECT_CONNECTED_GRAPH, projectFQN), {fqName: projectFQN}, ':connected', ctwc.GRAPH_ELEMENT_PROJECT),
                configGraph = nmwu.getMNConfigGraphConfig(ctwc.get(ctwc.URL_PROJECT_CONFIG_GRAPH, projectFQN), {fqName: projectFQN}, ':config', ctwc.GRAPH_ELEMENT_PROJECT);

            this.renderView4Config(topContainerElement, null, getProjectGraphViewConfig(connectedGraph, configGraph, projectFQN, projectUUID), null, null, null);
        },

        renderProjectTabs: function(viewConfig) {
            var bottomContainerElement = $('#' + ctwl.BOTTOM_CONTENT_CONTAINER),
                currentHashParams = layoutHandler.getURLHashParams(),
                tabConfig = {
                    elementId: ctwl.MONITOR_PROJECT_VIEW_ID,
                    view: "CfgTopoTabsView",
                    viewPathPrefix: "config/networking/topology/ui/js/views/",
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: viewConfig
                };
                

            this.renderView4Config(bottomContainerElement, null, tabConfig, null, null, null);
        }
    });

    function getProjectGraphViewConfig(connectedGraph, configGraph, projectFQN, projectUUID) {
        return {
            elementId: ctwl.PROJECT_GRAPH_ID,
            view: "CfgNetworkingGraphView",
            viewPathPrefix: "config/networking/topology/ui/js/views/",
            app: cowc.APP_CONTRAIL_CONTROLLER,
            viewConfig: {connectedGraph: connectedGraph, configGraph: configGraph}
        };
    };

    return CfgProjectTopo;
});