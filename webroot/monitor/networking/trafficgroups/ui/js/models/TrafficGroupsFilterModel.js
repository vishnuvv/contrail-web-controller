/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var trafficDataFilterModel = ContrailModel.extend({
        defaultConfig: {
            "groupByTagType": null,
            "filterByTagName": null
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
                    callbackObj.error(this.getFormErrorText(ctwl.TRAFFIC_GROUPS_FILTER));
                }
            }
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
                }
            }
        },
    });
    return trafficDataFilterModel;
});
