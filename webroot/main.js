/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
var defaultBaseDir = (document.location.pathname.indexOf('/vcenter') == 0) ? "./../" : "./";

if(typeof(globalObj) == "undefined") 
    globalObj = {};
/**
 * Set the global env with the data-env attr from the core.app script tag.
 * This env will determine the path requirejs will fetch and build the cache.
 * for 'prod' env, files under built dir will be used; else, original source as is(for eg. dev env).
 */
// globalObj['env'] = document.querySelector('script[data-env]').getAttribute('data-env');
if (globalObj['env'] == 'prod') {
    globalObj['buildBaseDir'] = 'built';
} else {
    defaultBaseDir = defaultBaseDir.slice(0, -1);
    globalObj['buildBaseDir'] = '';
}
var coreBaseDir = defaultBaseDir, coreWebDir = defaultBaseDir, ctBaseDir = defaultBaseDir,
    smBaseDir = defaultBaseDir, strgBaseDir = defaultBaseDir,
    pkgBaseDir = defaultBaseDir;
require.config({
    paths: {
        'core-srcdir'                   : "",
        'core-basedir'                  : "",
        'underscore'                    : "empty:",
        //Set all references to core as ":empty"
        'contrail-list-model'           : "empty:",
        'contrail-view-model'           : "empty:",
        'contrail-view'                 : "empty:",
        'cf-datasource'                 : "empty:",
        'backbone'                      : "empty:",
        'mon-infra-dashboard-view'      : "empty:",
        'controller-constants'          : 'common/ui/js/controller.constants',
        'controller-grid-config'        : 'common/ui/js/controller.grid.config',
        'controller-graph-config'       : 'common/ui/js/controller.graph.config',
        'controller-labels'             : 'common/ui/js/controller.labels',
        'controller-utils'              : 'common/ui/js/controller.utils',
        'controller-messages'           : 'common/ui/js/controller.messages',
        'controller-parsers'            : 'common/ui/js/controller.parsers',
        'controller-view-config'        : 'common/ui/js/controller.view.config',
        'controller-init'               : 'common/ui/js/controller.init',

        //Dashboard
        'monitor-infra-confignode-model'    : 'monitor/infrastructure/common/ui/js/models/ConfigNodeListModel',
        'monitor-infra-analyticsnode-model' : 'monitor/infrastructure/common/ui/js/models/AnalyticsNodeListModel',
        'monitor-infra-databasenode-model'  : 'monitor/infrastructure/common/ui/js/models/DatabaseNodeListModel',
        'monitor-infra-controlnode-model'   : 'monitor/infrastructure/common/ui/js/models/ControlNodeListModel',
        'monitor-infra-vrouter-model'       : 'monitor/infrastructure/common/ui/js/models/VRouterListModel',
        'confignode-scatterchart-view'      : 'monitor/infrastructure/common/ui/js/views/ConfigNodeScatterChartView',
        'controlnode-scatterchart-view'     : 'monitor/infrastructure/common/ui/js/views/ControlNodeScatterChartView',
        'vrouter-scatterchart-view'         : 'monitor/infrastructure/common/ui/js/views/VRouterScatterChartView',
        'dbnode-scatterchart-view'          : 'monitor/infrastructure/common/ui/js/views/DatabaseNodeScatterChartView',
        'analyticsnode-scatterchart-view'   : 'monitor/infrastructure/common/ui/js/views/AnalyticsNodeScatterChartView',
        'vrouter-dashboard-view'            : 'monitor/infrastructure/dashboard/ui/js/views/VRouterDashboardView',
        'monitor-infra-parsers'             : 'monitor/infrastructure/common/ui/js/utils/monitor.infra.parsers',
        'monitor-infra-utils'               : 'monitor/infrastructure/common/ui/js/utils/monitor.infra.utils',
        'monitor-infra-constants'           : 'monitor/infrastructure/common/ui/js/utils/monitor.infra.constants',
        'mon-infra-controller-dashboard'    : 'monitor/infrastructure/dashboard/ui/js/views/ControllerDashboardView'
    }, map: {
    },
    shim: {
    }
});
require.config({
    baseUrl:"/",
    urlArgs: 'built_at=' + built_at,
});

