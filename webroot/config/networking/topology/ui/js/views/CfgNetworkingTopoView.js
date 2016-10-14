/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'nm-module'
], function (_, ContrailView) {
    var networkingTopologyView = ContrailView.extend({
        el: $(contentContainer),
        renderProjectTopology: function (viewConfig) {
            var self = this;
            self.renderView4Config(self.$el, null,
                                   getProjectTopologyConfig(viewConfig));
        }
    });

    function getProjectTopologyConfig (viewConfig) {
        var hashParams = viewConfig.hashParams,
            customProjectDropdownOptions = {
                config: true,
                childView: {
                    init: getAlarmProjectListViewConfig(viewConfig),
                }
            },
            customDomainDropdownOptions = {
                childView: {
                    init: ctwvc.getProjectBreadcrumbDropdownViewConfig(
                            hashParams, customProjectDropdownOptions)
                }
            };
        return ctwvc.getDomainBreadcrumbDropdownViewConfig(hashParams,
            customDomainDropdownOptions)
    };

    function getAlarmProjectListViewConfig(viewConfig) {
        return function (projectSelectedValueData) {
            var domain = {
                    'name':projectSelectedValueData.parentSelectedValueData.name,
                    'uuid':projectSelectedValueData.parentSelectedValueData.value,
                }
                var project = {
                    'name':projectSelectedValueData.name,
                    'uuid':projectSelectedValueData.value,
                }
                ctwu.setGlobalVariable("domain", domain);
                ctwu.setGlobalVariable("project", project);
            return {
                elementId: cowu.formatElementId(
                        [ctwc.CONFIG_ALARM_LIST_ID]),
                view: "CfgProjectTopoView",
                app: cowc.APP_CONTRAIL_CONTROLLER,
                viewPathPrefix: "config/networking/topology/ui/js/views/",
                viewConfig: $.extend(true, {}, viewConfig,
                                     {projectSelectedValueData:
                                     projectSelectedValueData})
            }
        }
    };
    return networkingTopologyView;
});

