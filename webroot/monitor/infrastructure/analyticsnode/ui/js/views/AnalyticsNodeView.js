/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view'
], function (_, ContrailView) {
    var AnalyticsNodeView = ContrailView.extend({
        el: $(contentContainer),
        renderAnalyticsNode: function (viewConfig) {
            this.renderView4Config(this.$el, null, getAnalyticsNodeListConfig());
        },
        renderAnalyticsNodeDetails : function (viewConfig) {
            this.renderView4Config(this.$el, null, getAnalyticsNodeDetails());
        }
    });

    function getAnalyticsNodeListConfig() {
        return {
            elementId: cowu.formatElementId([
                ctwl.ANALYTICSNODE_SUMMARY_PAGE_ID]),
            view: "AnalyticsNodeListView",
            viewPathPrefix: "monitor/infrastructure/" +
                "analyticsnode/ui/js/views/",
            app: cowc.APP_CONTRAIL_CONTROLLER,
            viewConfig: {}
        };
    };
    
    function getAnalyticsNodeDetails() {
        return {
            elementId: cowu.formatElementId([ctwl.ANALYTICSNODE_DETAILS_PAGE_ID]),
            view: "AnalyticsNodeDetailsView",
            viewPathPrefix: "monitor/infrastructure/analyticsnode/ui/js/views/",
            app: cowc.APP_CONTRAIL_CONTROLLER,
            viewConfig: {}
        };
    };
    return AnalyticsNodeView;
});