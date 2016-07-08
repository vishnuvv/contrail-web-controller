/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model',
], function (_, ContrailView, ContrailListModel) {
    var userDefinedCountersListView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig;
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: "/api/tenants/config/get-config-details",
                        type: "POST",
                        data: JSON.stringify(
                            {data: [{type: 'global-system-configs'}]})
                    },
                    dataParser: self.parseUserDefinedCounterData,
                }
            };
            var contrailListModel = new ContrailListModel(listModelConfig);
            this.renderView4Config(this.$el,
                    contrailListModel, userDefinedCountersGridViewConfig());
        },
        parseUserDefinedCounterData : function(result){
            var gridDS = getValueByJsonPath(result,
                    "0;global-system-configs;0;global-system-config;user_defined_counter;counter", []);
            return gridDS;
        }
    });

    var userDefinedCountersGridViewConfig = function () {
        return {
            elementId: "user_defined_counters_section_id",
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "user_defined_counters_id",
                                view: "userDefinedCountersGridView",
                                viewPathPrefix: "config/infra/globalconfig/ui/js/views/",
                                app: cowc.APP_CONTRAIL_CONTROLLER,
                                viewConfig: {
                                    pagerOptions: {
                                        options: {
                                            pageSize: 10,
                                            pageSizeSelect: [10, 50, 100]
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    return userDefinedCountersListView;
});

