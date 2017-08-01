/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var TrafficGroupsSettingsModel = ContrailModel.extend({
        defaultConfig: {
            "groupByTagType": null,
            "subGroupByTagType": null,
            "filterByTagName": null,
            "tagTypeList": [],
            "time_range": 3600,
            "from_time": null,
            "to_time": null
        },
        formatModelConfig : function(modelConfig) {
            return modelConfig;
        },
        filterByTagRule: function (callbackObj) {
            var validations = [
                {
                    key : null,
                    type : cowc.OBJECT_TYPE_MODEL,
                    getValidation : 'filterByTagRuleValidation'
                }
            ];
            if(this.isDeepValid(validations)) {
                if (contrail.checkIfFunction(callbackObj.success)) {
                    callbackObj.success(this.model());
                }
            } else {
               if (contrail.checkIfFunction(callbackObj.error)) {
                    callbackObj.error(this.getFormErrorText(ctwl.TRAFFIC_GROUPS_SETTINGS));
                }
            }
        },
        onGroupByTagTypeChanged: function(newVal) {
            this.model().set('tagTypeList',
                _.filter(cowc.TRAFFIC_GROUP_TAG_TYPES,
                    function(tag) {
                        return newVal.indexOf(tag.value) < 0;
                })
            )
        },
        isTimeRangeCustom: function() {
            var self = this;
            return self.time_range() == -1;
        },
        validations: {
            filterByTagRuleValidation: {
                'groupByTagType': {
                    required: true,
                    msg: 'Select atleast one tag type'
                },
                'filterByTagName': function(value, attr, finalObj) {
                    var isValid = true;
                    if(value) {
                        _.each(cowc.TRAFFIC_GROUP_TAG_TYPES, function(tag) {
                            if((value.match(
                                new RegExp(cowc.DROPDOWN_VALUE_SEPARATOR +
                                tag.value, "g")) || []).length > 1) {
                                isValid = false;
                            }
                        });
                    }
                    if(!isValid) {
                        return "Please select only one tag from each Tag type";
                    }
                },
                'from_time': function(value) {
                    if(this.get('time_range') == -1 && !value) {
                        return "Select From Time";
                    } else if(new Date(value) > new Date()) {
                        return "From Time can't be future time";
                    }
                },
                'to_time': function(value) {
                    if(this.get('time_range') == -1 && !value) {
                        return "Select To Time";
                    } else if(new Date(value) > new Date()) {
                        return "To Time can't be future time";
                    } else if(this.get('from_time') &&
                        new Date(value) < new Date(this.get('from_time'))) {
                        return "To Time should be greater than From Time";
                    }
                }
            }
        }
    });
    return TrafficGroupsSettingsModel;
});
