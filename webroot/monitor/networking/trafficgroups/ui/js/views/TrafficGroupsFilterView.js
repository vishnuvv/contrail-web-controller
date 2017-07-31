/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'lodash',
    'contrail-view',
    'knockback',
    'monitor/networking/trafficgroups/ui/js/models/TrafficGroupsFilterModel'
], function (_, ContrailView, Knockback, filterModel) {
    var TrafficGroupsFilterView = ContrailView.extend({
        el: $(contentContainer),
        editFilterOptions: function (tagTypeList, callback) {
            var filterView = this,
                filterModel = this.model,
                prefixId = ctwl.TRAFFIC_GROUPS_FILTER,
                editTemplate = contrail.getTemplate4Id(cowc.TMPL_EDIT_FORM),
                editLayout = editTemplate({prefixId: prefixId}),
                modalId = 'configure-' + prefixId ;//+ '-modal',
                modalConfig = {
                   'modalId': modalId,
                   'className': 'modal-840',
                   'title': 'Filter Traffic Data',
                   'body': editLayout,
                   'onSave': function () {
                        filterModel.filterByTagRule({
                            init: function () {
                                cowu.enableModalLoading(modalId);
                            },
                            success: function (modelObj) {
                                callback(modelObj);
                                $("#" + modalId).modal('hide');
                            },
                            error: function (error) {
                                cowu.disableModalLoading(modalId, function () {
                                });
                            }
                        });
                    },
                   'onCancel': function() {
                        Knockback.release(filterModel, document.getElementById(modalId));
                        kbValidation.unbind(filterView);
                        $("#" + modalId).modal('hide');
                    }
                };
            cowu.createModal(modalConfig);
            $('#'+ modalId).on('shown.bs.modal', function () {
                 var filterTmpl = contrail.getTemplate4Id('filter-tarffic-data-template');
                 filterView.renderView4Config($("#" + modalId).find("#" + prefixId + "-form"),
                    filterModel, filterView.tagsFilterViewConfig(tagTypeList),'filterByTagRuleValidation', null, null,
                    function () {
                        Knockback.applyBindings(filterModel, document.getElementById(modalId));
                        kbValidation.bind(filterView);
                    }, null, null);
            });
        },
        getTagValuesObj: function(tagTypeList) {
            var tagsObj = [],
                tagsMap = cowc.TRAFFIC_GROUP_TAG_TYPES;
            _.each(tagsMap, function(tagObj) {
                var tagValues = tagTypeList[tagObj.value],
                    tagData = [];
                _.each(tagValues, function(tagValue) {
                    tagData.push({
                        text: tagValue,
                        value: tagValue + cowc.DROPDOWN_VALUE_SEPARATOR + tagObj.value,
                        id: tagValue + cowc.DROPDOWN_VALUE_SEPARATOR + tagObj.value,
                        parent: tagObj.value
                     });
                });
                tagsObj.push({text : tagObj.text, value : tagObj.value, children : tagData});
            });
            return tagsObj;
        },
        tagsFilterViewConfig: function(tagTypeList) {
            var addrFields = [],
                tagsMap = cowc.TRAFFIC_GROUP_TAG_OPTIONS,
                tagValues = this.getTagValuesObj(tagTypeList);
            return {
                elementId: 'Traffic_Data_Filter',
                view: 'SectionView',
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'groupByTagType',
                                    view: 'FormMultiselectView',
                                    viewConfig: {
                                        label: "Categorization:",
                                        path: 'groupByTagType',
                                        dataBindValue: 'groupByTagType',
                                        class: 'col-xs-12',
                                        elementConfig: {
                                            dataTextField: "text",
                                            dataValueField: "value",
                                            placeholder: "Select Endpoint",
                                            maximumSelectionSize: 2,
                                            data: tagsMap
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            columns: [
                                {
                                    elementId: 'filterByTagName',
                                    view:"FormHierarchicalDropdownView",
                                    viewConfig: {
                                        templateId: cowc.TMPL_MULTISELECT_VIEW,
                                        class:'col-xs-12',
                                        label:'Filter:',
                                        path: 'filterByTagName',
                                        dataBindValue: 'filterByTagName',
                                        elementConfig: {
                                            placeholder: 'Select Tags',
                                            minimumResultsForSearch : 1,
                                            dataTextField: "text",
                                            dataValueField: "value",
                                            data: tagValues,
                                            queryMap: [
                                                { name : 'Application',  value : 'app', iconClass:'fa fa-list-alt' },
                                                { name : 'Deployment',  value : 'deployment', iconClass:'fa fa-database' },
                                                { name : 'Site',  value : 'site', iconClass:'fa fa-life-ring' },
                                                { name : 'Tier',  value : 'tier', iconClass:'fa fa-clone' }]
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        }
    });
    return TrafficGroupsFilterView;
});
