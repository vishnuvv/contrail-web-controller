/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'monitor/infrastructure/common/ui/js/utils/monitor.infra.utils',
    'monitor/infrastructure/common/ui/js/utils/monitor.infra.constants',
    'monitor/infrastructure/common/ui/js/utils/monitor.infra.parsers',
    'reports/qe/ui/js/qe.utils',
    'text!monitor/infrastructure/common/ui/templates/monitor.infra.tmpl',
    'reports/qe/ui/js/qe.constants',
], function (_, MonitorInfraUtils, MonitorInfraConstants, MonitorInfraParsers,
        QEUtils, MonitorInfraTmpls, QEConstants) {
    monitorInfraUtils = new MonitorInfraUtils;
    monitorInfraConstants = new MonitorInfraConstants;
    monitorInfraUtils = new MonitorInfraUtils;
    monitorInfraParsers = new MonitorInfraParsers;
    qewu = new QEUtils();
    qewc = new QEConstants();
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
