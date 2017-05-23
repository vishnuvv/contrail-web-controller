/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-model'
], function (_, ContrailModel) {
    var self;
    var serviceTypeModel = ContrailModel.extend({
        defaultConfig: {
            "protocol": "TCP",
            "dst_start_port": "",
            "dst_end_port": "",
            "src_end_port": "",
            "src_start_port":""
        },
        formatModelConfig: function (modelConfig) {
            self = this;
            var srcRange;
            modelConfig["protocol"] = getValueByJsonPath(modelConfig, "protocol");
            var srcMax = getValueByJsonPath(modelConfig,"src_end_port");
            var srcMin = getValueByJsonPath(modelConfig,"src_start_port");
            if(srcMax !== '' && srcMin !== ''){
                if(srcMin === srcMax){
                    srcRange = srcMin;
                }else{
                    srcRange = srcMin +'-'+ srcMax;
                }
                modelConfig["src_port"] = srcRange;
            }else{
                modelConfig["src_port"] = '';
            }
            var dstMax = getValueByJsonPath(modelConfig,"dst_end_port");
            var dstMin = getValueByJsonPath(modelConfig,"dst_start_port");
            if(dstMax !== '' && dstMin !== ''){
                var dstRange = dstMin +' - '+ dstMax;
                modelConfig["dst_port"] = dstRange;
            }else{
                modelConfig["dst_port"] = '';
            }
            return modelConfig;
        },
        validateAttr: function (attributePath, validation, data) {
            var model = data.model().attributes.model(),
                attr = cowu.getAttributeFromPath(attributePath),
                errors = model.get(cowc.KEY_MODEL_ERRORS),
                attrErrorObj = {}, isValid;
            isValid = model.isValid(attributePath, validation);
            attrErrorObj[attr + cowc.ERROR_SUFFIX_ID] =
                                (isValid == true) ? false : isValid;
            errors.set(attrErrorObj);
        }
    });
    return serviceTypeModel;
});