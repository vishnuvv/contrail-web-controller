/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var tagGlobalListView = ContrailView.extend({
        el: $(contentContainer),
        renderTagView: function () {
            var self = this;
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: "/api/tenants/config/get-config-details",
                        type: "POST",
                        data: JSON.stringify(
                            {data: [{type: 'tags'}]})
                    },
                    dataParser: self.parseTagData,
                }
            };
            var contrailListModel = new ContrailListModel(listModelConfig);
            this.renderView4Config(this.$el, contrailListModel, getTagGridViewConfig());
        },
        parseTagData : function(response){
            var dataItems = [],
                tagData = getValueByJsonPath(response, "0;tags", []);
                _.each(tagData, function(val){
                    if(val.tag.parent_uuid === undefined){
                        dataItems.push(val.tag);
                    }
                }); 
            console.log(dataItems);
            return dataItems;
        }
    });

    var getTagGridViewConfig = function () {
        return {
            elementId: cowu.formatElementId([ctwc.SECURITY_POLICY_TAG_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwc.SECURITY_POLICY_TAG_ID,
                                view: "tagGridView",
                                viewPathPrefix: "config/firewall/common/tag/ui/js/views/",
                                app: cowc.APP_CONTRAIL_CONTROLLER,
                                viewConfig: {
                                    pagerOptions: {
                                        options: {
                                            pageSize: 10,
                                            pageSizeSelect: [10, 50, 100]
                                        }
                                    },
                                    isGlobal: true                            
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    return tagGlobalListView;
});

