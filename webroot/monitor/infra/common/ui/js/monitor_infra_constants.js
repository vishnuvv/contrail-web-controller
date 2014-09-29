/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var infraNodesTree;
var noDataStr = '-';
var controlNodetabs = ['details', 'peers', 'routes', 'console','servicechaining'];
var computeNodeTabs = ['details', 'interfaces', 'networks', 'acl', 'flows','routes', 'console'];
var analyticsNodeTabs = ['details', 'generators', 'qequeries', 'console'];
var configNodeTabs = ['details', 'console', 'generators', 'qequeries'];

var excludeProcessList = ['contrail-config-nodemgr','contrail-analytics-nodemgr','contrail-control-nodemgr',
    'contrail-vrouter-nodemgr','openstack-nova-compute','contrail-svc-monitor','contrail-schema','contrail-discovery','contrail-zookeeper','redis-sentinel'];
var vRouterDashboardChartInitialized = false;
var controlNodesDashboardChartInitialized = false;
var analyticsNodesDashboardChartInitialized = false;
var configNodesDashboardChartInitialized = false;
var computeNodeTabStrip = "compute_tabstrip";
var configNodeTabStrip = "config_tabstrip";
var aNodeTabStrip = "analytics_tabstrip";
var ctrlNodeTabStrip = "control_tabstrip";

//Bucketization Options
var defaultBucketize = true;
//Maximum upto which the chart data should be bucketized
var defaultMaxBucketizeLevel = 3; 
//Determines what param will be used to depict the size of the bubble in infra charts
var defaultBucketSizeParam = "size"; 
//Determines how many buckets need to created per axis. If 7 creates 7 x 7 = 49 buckets and groups the nodes
var defaultBucketsPerAxis = 7;
//Cookie name to be used to store the settings for bucketization
var DO_BUCKETIZE_COOKIE = 'doBucketize';
//Cookie name to be used to store the settings for MaxBucketizeLevel
var BUCKETIZE_LEVEL_COOKIE = 'bucketizeLevel';
//Cookie name to be used to store the settings for BucketsPerAxis
var BUCKETS_PER_AXIS_COOKIE = 'bucketsPerAxis';

var CONSOLE_LOGS_REFRESH_INTERVAL = 90000;//Auto refresh interval in console tab (ms)


var monitorInfraUrls = {
        VROUTER_BASE                : '/api/admin/monitor/infrastructure/vrouter/',
        VROUTER_SUMMARY             : '/api/admin/monitor/infrastructure/vrouters/summary',
        VROUTER_CACHED_SUMMARY      : '/api/admin/monitor/infrastructure/vrouters/cached-summary',
        VROUTER_DETAILS             : '/api/admin/monitor/infrastructure/vrouter/details?hostname={0}',
        VROUTER_INTERFACES          : '/api/admin/monitor/infrastructure/vrouter/interface?ip={0}',
        VROUTER_NETWORKS            : '/api/admin/monitor/infrastructure/vrouter/vn?ip={0}',
        VROUTER_ACL                 : '/api/admin/monitor/infrastructure/vrouter/acl?ip={0}',
        VROUTER_FLOWS               : '/api/admin/monitor/infrastructure/vrouter/flows',
        VROUTER_VRF_LIST            : '/api/admin/monitor/infrastructure/vrouter/vrf-list?ip={0}',
        VROUTER_UNICAST_ROUTES      : '/api/admin/monitor/infrastructure/vrouter/ucast-routes?ip={0}&vrfindex={1}',
        VROUTER_MCAST_ROUTES        : '/api/admin/monitor/infrastructure/vrouter/mcast-routes?ip={0}&vrfindex={1}',
        VROUTER_L2_ROUTES           : '/api/admin/monitor/infrastructure/vrouter/l2-routes?ip={0}&vrfindex={1}',
        
        CONTROLNODE_SUMMARY         : '/api/admin/monitor/infrastructure/controlnodes/summary',
        CONTROLNODE_DETAILS         : '/api/admin/monitor/infrastructure/controlnode/details?hostname={0}',
        CONTROLNODE_PEERS           : '/api/admin/monitor/infrastructure/controlnode/paged-bgppeer?hostname={0}&count={1}',
        CONTROLNODE_ROUTE_INST_LIST : '/api/admin/monitor/infrastructure/controlnode/routes/rout-inst-list?ip={0}',
        CONTROLNODE_PEER_LIST       : '/api/admin/monitor/infrastructure/controlnode/peer-list?hostname={0}',
        CONTROLNODE_ROUTES          : '/api/admin/monitor/infrastructure/controlnode/routes',
        
        ANALYTICS_SUMMARY           : '/api/admin/monitor/infrastructure/analyticsnodes/summary',
        ANALYTICS_DETAILS           : '/api/admin/monitor/infrastructure/analyticsnode/details?hostname={0}',
        ANALYTICS_GENERATORS        : '/api/admin/monitor/infrastructure/analyticsnode/generators?hostname={0}&count={1}',
        
        CONFIG_SUMMARY              : '/api/admin/monitor/infrastructure/confignodes/summary',
        CONFIG_DETAILS              : '/api/admin/monitor/infrastructure/confignode/details?hostname={0}',
        
        FLOWSERIES_CPU              : '/api/tenant/networking/flow-series/cpu?moduleId={0}&minsSince={1}&sampleCnt={2}&source={3}&endTime={4}',
        QUERY                       : '/api/admin/reports/query',
        MSGTABLE_CATEGORY           : '/api/admin/table/values/MessageTable/Category', 
        MSGTABLE_LEVEL              : '/api/admin/table/values/MessageTable/Level'
}

var UVEModuleIds = {
        VROUTER_AGENT       : 'VRouterAgent',
        CONTROLNODE         : 'ControlNode',
        COLLECTOR           : 'Collector',
        OPSERVER            : 'OpServer',
        QUERYENGINE         : 'QueryEngine',
        APISERVER           : 'ApiServer',
        DISCOVERY_SERVICE   : 'DiscoveryService',
        SERVICE_MONITOR     : 'ServiceMonitor',
        SCHEMA              : 'Schema',
        ANALYTICS_NODEMGR   : 'Contrail-Analytics-Nodemgr',
        CONFIG_NODE         : 'ConfigNode'
}

var controlProcsForLastTimeStamp = [UVEModuleIds['CONTROLNODE']];
var computeProcsForLastTimeStamp = [UVEModuleIds['VROUTER_AGENT']];
var analyticsProcsForLastTimeStamp = [UVEModuleIds['COLLECTOR'],UVEModuleIds['OPSERVER']];
var configProcsForLastTimeStamp = [UVEModuleIds['APISERVER'],UVEModuleIds['DISCOVERY_SERVICE'],UVEModuleIds['SERVICE_MONITOR'],UVEModuleIds['SCHEMA']];
