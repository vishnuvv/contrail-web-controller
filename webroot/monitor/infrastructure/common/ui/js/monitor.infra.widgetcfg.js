/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['underscore', 'contrail-view', 'node-color-mapping'],
        function(_, ContrailView, NodeColorMapping){
    var MonitorInfraViewConfig = function () {
        var self = this;
        self.viewConfig = {
                'system-cpu-percentiles': {
                    baseModel:'SYSTEM_CPU_PERCENTILES_MODEL',
                    baseView:'SYSTEM_CPU_PERCENTILES_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                    }
                },
                'system-cpu-share': {
                    baseModel:'SYSTEM_CPU_MODEL', 
                    baseView: 'SYSTEM_CPU_SHARE_VIEW',
                    modelCfg: {
                    },
                    viewCfg:{
                    },
                    itemAttr: {
                        title: ctwl.SYSTEM_CPU_SHARE
                    }
                },
                'system-memory-usage': {
                    baseModel:'SYSTEM_MEMORY_MODEL',
                    baseView:'SYSTEM_MEMORY_USAGE_VIEW',
                    modelCfg: {
                    },
                    viewCfg: {
                    },itemAttr: {
                        title: ctwl.SYSTEM_MEMORY_USED
                    }
                },
                'disk-usage-info': function (config){
                    return {
                        baseModel:'SYSTEM_DISK_USAGE_MODEL', 
                        baseView:'SYSTEM_DISK_USAGE_VIEW',
                        modelCfg: {
                        },
                        viewCfg: {
                        },
                        itemAttr: {
                            title: ctwl.DISK_USAGE
                        }
                    }
                }
        };
        self.getViewConfig = function(id) {
            return self.viewConfig[id];
        };

};
 return (new MonitorInfraViewConfig()).viewConfig;

});
