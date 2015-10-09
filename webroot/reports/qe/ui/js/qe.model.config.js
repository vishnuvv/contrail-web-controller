/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore'
], function (_) {
    var QEDefaultConfig = function () {

        this.getQueryModelConfig = function (customModelConfig) {
            var defaultModelConfig = {
                "table_name": null,
                "table_type": null,
                "query_prefix": qewc.DEFAULT_QUERY_PREFIX,
                "time_range": 1800,
                "from_time": Date.now() - (10 * 60 * 1000),
                "to_time": Date.now(),
                "select": "",
                "time_granularity": 60,
                "time_granularity_unit": 'secs',
                "where": null,
                "direction": '1',
                "filter": null,
                "select_data_object": getSelectDataObject(),
                "where_data_object": {}
            };

            var modelConfig = $.extend(true, {}, defaultModelConfig, customModelConfig);

            return modelConfig;
        };
    };

    function getSelectDataObject() {
        var selectDataObject = {};

        selectDataObject.fields = ko.observableArray([]);
        selectDataObject.enable_map = {};

        selectDataObject.select_all_text = ko.observable("Select All");
        selectDataObject.checked_fields = ko.observableArray([]);

        selectDataObject.on_select = function (data, event) {
            var fieldName = $(event.currentTarget).attr('name'),
                dataObject = data.select_data_object(),
                checkedFields = dataObject.checked_fields,
                isEnableMap = dataObject.enable_map,
                key, keyLower, nonAggKey;

            if (fieldName == 'T') {
                if (checkedFields.indexOf('T') != -1) {
                    checkedFields.remove('T=');
                    for (key in isEnableMap) {
                        keyLower = key.toLowerCase();
                        if (keyLower.indexOf('sum(') != -1 || keyLower.indexOf('count(') != -1 || keyLower.indexOf('min(') != -1 || keyLower.indexOf('max(') != -1) {
                            checkedFields.remove(key);
                            isEnableMap[key](false);

                            nonAggKey = key.substring(key.indexOf('(') + 1, key.indexOf(')'));
                            if(contrail.checkIfFunction(isEnableMap[nonAggKey])) {
                                isEnableMap[nonAggKey](true);
                                if(checkedFields.indexOf(nonAggKey) == -1) {
                                    checkedFields.push(nonAggKey);
                                }
                            }
                        }
                    }
                } else {
                    for (key in isEnableMap) {
                        keyLower = key.toLowerCase();
                        if (keyLower.indexOf('sum(') != -1 || keyLower.indexOf('count(') != -1 || keyLower.indexOf('min(') != -1 || keyLower.indexOf('max(') != -1) {
                            isEnableMap[key](true);
                        }
                    }
                }
            } else if (fieldName == 'T=') {
                if (checkedFields.indexOf('T=') != -1) {
                    checkedFields.remove('T');
                    for (key in isEnableMap) {
                        keyLower = key.toLowerCase();
                        if (keyLower.indexOf('sum(') != -1 || keyLower.indexOf('count(') != -1 || keyLower.indexOf('min(') != -1 || keyLower.indexOf('max(') != -1) {
                            isEnableMap[key](true);
                            checkedFields.push(key);

                            nonAggKey = key.substring(key.indexOf('(') + 1, key.indexOf(')'));
                            if(contrail.checkIfFunction(isEnableMap[nonAggKey])) {
                                checkedFields.remove(nonAggKey);
                                isEnableMap[nonAggKey](false);
                            }
                        }
                    }
                } else {
                    for (key in isEnableMap) {
                        keyLower = key.toLowerCase();
                        if (keyLower.indexOf('sum(') != -1 || keyLower.indexOf('count(') != -1 || keyLower.indexOf('min(') != -1 || keyLower.indexOf('max(') != -1) {
                            checkedFields.remove(key);

                            nonAggKey = key.substring(key.indexOf('(') + 1, key.indexOf(')'));
                            if(contrail.checkIfFunction(isEnableMap[nonAggKey])) {
                                isEnableMap[nonAggKey](true);
                            }
                        }
                    }
                }
            }
            return true;
        };

        selectDataObject.on_select_all = function (data, event) {
            var dataObject = data.select_data_object(),
                selectAllText = dataObject.select_all_text(),
                isEnableMap = dataObject.enable_map,
                checkedFields = dataObject.checked_fields,
                key, nonAggKey;

            if (selectAllText == 'Select All') {
                dataObject.select_all_text('Clear All');

                for (key in isEnableMap) {
                    isEnableMap[key](true);
                    checkedFields.remove(key);
                }

                for (key in isEnableMap) {
                    if (key.indexOf('sum(') != -1 || key.indexOf('count(') != -1 || key.indexOf('min(') != -1 || key.indexOf('max(') != -1) {
                        checkedFields.push(key);

                        nonAggKey = key.substring(key.indexOf('(') + 1, key.indexOf(')'));
                        if(contrail.checkIfFunction(isEnableMap[nonAggKey])) {
                            isEnableMap[nonAggKey](false);
                            if(checkedFields.indexOf(nonAggKey) != -1) {
                                checkedFields.remove(nonAggKey);
                            }
                        }
                    } else if (key != "T" && isEnableMap[key]) {
                        checkedFields.push(key);
                    }
                }
            } else {
                dataObject.select_all_text('Select All');
                for (key in isEnableMap) {
                    isEnableMap[key](true);
                    checkedFields.remove(key);
                }
            }
        };

        selectDataObject.reset = function(data, event) {
            var dataObject = data.select_data_object(),
                isEnableMap = dataObject.enable_map,
                checkedFields = dataObject.checked_fields;

            dataObject.select_all_text("Select All");

            for(var key in isEnableMap) {
                checkedFields.remove(key);
                isEnableMap[key](true);
            }
        };

        return selectDataObject;
    }

    return QEDefaultConfig;
});