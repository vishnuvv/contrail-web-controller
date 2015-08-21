/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var ctwu, ctwc, cowch, ctwgc, ctwgrc, ctwl, ctwm, ctwp, ctwvc, nmwu, nmwgc, nmwgrc, nmwp, nmwvc, llswgc, llswp;

require
        .config({
            baseUrl : ctBaseDir,
            paths : {
                'controller-basedir' : ctBaseDir,
                'controller-constants' : ctBaseDir
                        + '/common/ui/js/controller.constants',

                'controller-grid-config' : ctBaseDir
                        + '/common/ui/js/controller.grid.config',
                'nm-grid-config' : ctBaseDir
                        + '/monitor/networking/ui/js/nm.grid.config',

                'controller-graph-config' : ctBaseDir
                        + '/common/ui/js/controller.graph.config',
                'nm-graph-config' : ctBaseDir
                        + '/monitor/networking/ui/js/nm.graph.config',

                'controller-labels' : ctBaseDir
                        + '/common/ui/js/controller.labels',

                'controller-utils' : ctBaseDir
                        + '/common/ui/js/controller.utils',
                'nm-utils' : ctBaseDir + '/monitor/networking/ui/js/nm.utils',

                'controller-messages' : ctBaseDir
                        + '/common/ui/js/controller.messages',

                'controller-parsers' : ctBaseDir
                        + '/common/ui/js/controller.parsers',
                'nm-parsers' : ctBaseDir
                        + '/monitor/networking/ui/js/nm.parsers',

                'controller-view-config' : ctBaseDir
                        + '/common/ui/js/controller.view.config',
                'nm-view-config' : ctBaseDir
                        + '/monitor/networking/ui/js/nm.view.config',

                'controller-init' : ctBaseDir + '/common/ui/js/controller.init',
                'lls-grid-config' : ctBaseDir
                        + '/config/linklocalservices/ui/js/linkLocalServices.grid.config',
                'lls-parsers' : ctBaseDir
                        + '/config/linklocalservices/ui/js/linkLocalServices.parsers',
                'controller-render' : ctBaseDir
                        + '/common/ui/js/controller.render',
                'controller-view-config' : 'common/ui/js/controller.view.config',
                'nm-view-config' : 'monitor/networking/ui/js/nm.view.config',

                'monitor-infra-confignode-model' :
                    'monitor/infrastructure/common/ui/js/models/'+
                    'ConfigNodeListModel',
                'monitor-infra-analyticsnode-model' :
                    'monitor/infrastructure/common/ui/js/models/' +
                    'AnalyticsNodeListModel',
                'monitor-infra-databasenode-model' :
                    'monitor/infrastructure/common/ui/js/models/' +
                    'DatabaseNodeListModel',
                'monitor-infra-controlnode-model' :
                    'monitor/infrastructure/common/ui/js/models/' +
                    'ControlNodeListModel',
                'monitor-infra-utils' :
                    'monitor/infrastructure/common/ui/js/utils/' +
                    'monitor.infra.utils',
                'monitor-infra-parsers' :
                    'monitor/infrastructure/common/ui/js/utils/' +
                    'monitor.infra.parsers',  
                'monitor-infra-constants' :
                    'monitor/infrastructure/common/ui/js/utils/' +
                    'monitor.infra.constants',

                'controller-init' : ctBaseDir + '/common/ui/js/controller.init'
            },
            waitSeconds : 0
        });

require([ 'controller-init' ], function() {
});
