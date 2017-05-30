/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'contrail-list-model'
], function (_, ContrailView, ContrailListModel) {
    var projectTagListView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
            var self = this, viewConfig = this.attributes.viewConfig;
            var selectedProject = viewConfig['projectSelectedValueData'];
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: "/api/tenants/config/get-config-details",
                        type: "POST",
                        data: JSON.stringify(
                            {data: [{type: 'projects', obj_uuids:[selectedProject.value]}]})
                    },
                    dataParser: function(response) {;
                        return quotasDataParser(response);
                    }
                }
            };
            var contrailListModel = new ContrailListModel(listModelConfig);
            this.renderView4Config(this.$el, contrailListModel, getProjectTagGridViewConfig());
        }
    });

    var quotaList = [{key : "application", name : "Application"},
        {key : "site", name :"Site"},
        {key : "deployment", name :"Deployment"},
        {key : "tier", name : "Tier"},
        {key : "labels", name :"Labels"}
    ];
    var quotasDataParser = function (response) {
        var results = [];
        var tagRefs = getValueByJsonPath(response, "0;projects;0;project;tag_refs", []);
        var tagMap = {};
        for(var i = 0; i < tagRefs.length; i++) {
            var tagRef = tagRefs[i];
            var tagData = getValueByJsonPath(tagRef,"to",[]);
            var tagInfo = tagData[tagData.length -1 ];
            var tagParts = tagInfo.split('-');
            tagMap[tagParts[0]] = tagParts[1];
        }
        var quotaListCnt = quotaList.length;
        for (var i = 0; i < quotaListCnt; i++) {
            var key = quotaList[i]['key'];
            results[i] = {};
            results[i]['type'] = quotaList[i]['name'];
            results[i]['value'] = getValueByJsonPath(tagMap,key,'-');
        }
        return results;
    }
    var getProjectTagGridViewConfig = function () {
        return {
            elementId: cowu.formatElementId([ctwc.SECURITY_POLICY_TAG_SECTION_ID+"1"]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwc.SECURITY_POLICY_TAG_ID+"1",
                                view: "projectTagGridView",
                                viewPathPrefix: "config/infra/quotas/ui/js/views/",
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

    return projectTagListView;
});

