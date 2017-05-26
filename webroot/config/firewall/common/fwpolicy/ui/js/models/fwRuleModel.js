/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var fwRuleModel = ContrailModel.extend({
        defaultConfig: {
        	'name': '',
            'enable': false,
            'order':'',
            'action':'PASS',
            'protocol': 'TCP',
            'port': '',
            'endpoint_1':'',
            'endpoint_2':'',
            'direction':'',
            'match':'',
            'simple_action':''
        },
        formatModelConfig: function(modelConfig) {
        	return modelConfig;
        }
    });
    return fwRuleModel;
});
