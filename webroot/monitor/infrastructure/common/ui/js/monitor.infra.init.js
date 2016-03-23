/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'text!controller-basedir/monitor/infrastructure/common/ui/templates/monitor.infra.tmpl',
    // 'monitor-infra-utils',
    // 'monitor-infra-constants',
    // 'monitor-infra-parsers'
    'controller-dashboard-libs'
], function(_,MonitorInfraTmpls) {
     
// function (_, MonitorInfraTmpls, MonitorInfraUtils, MonitorInfraConstants, MonitorInfraParsers) {
require([
    'monitor-infra-utils',
    'monitor-infra-constants',
    'monitor-infra-parsers'],function(MonitorInfraUtils, MonitorInfraConstants, MonitorInfraParsers) {
        monitorInfraConstants = new MonitorInfraConstants;
        monitorInfraUtils = new MonitorInfraUtils;
        monitorInfraParsers = new MonitorInfraParsers;
        var initJSpath = pkgBaseDir +
            '/monitor/infrastructure/common/ui/js/monitor.infra.init.js',
            initStatus = contentHandler.initFeatureModuleMap[initJSpath],
            deferredObj = initStatus['deferredObj'];

        initStatus['isInProgress'] = false;
        initStatus['isComplete'] = true;

        if(contrail.checkIfExist(deferredObj)) {
            deferredObj.resolve()
        }

        $("body").append(MonitorInfraTmpls);
    });
});
