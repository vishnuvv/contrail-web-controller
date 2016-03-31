~/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-constants',[
    'underscore'
], function (_) {
    var CTConstants = function () {

        this.URL_ALL_DOMAINS = '/api/tenants/config/domains';
        this.URL_ALL_PROJECTS = '/api/tenants/config/projects';
        this.URL_ALL_PROJECTS_VCENTER_OR_CONFIG = '/api/tenants/projects';

        this.URL_PROJECT_CONNECTED_GRAPH = '/api/tenant/monitoring/project-connected-graph?fqName={0}';
        this.URL_PROJECT_CONFIG_GRAPH = '/api/tenant/monitoring/project-config-graph?fqName={0}';
        this.URL_PROJECT_INSTANCES_IN_CHUNKS = '/api/tenant/networking/virtual-machines/details?fqnUUID={0}&count={1}&nextCount={2}&type={3}&startAt={4}';
        this.URL_PROJECT_NETWORKS_IN_CHUNKS = '/api/tenant/networking/virtual-networks/details?count={0}&nextCount={1}&fqn={2}&startAt={3}';
        this.URL_PROJECT_ALL_NETWORKS = '/api/tenants/networks/{0}';

        this.URL_NETWORK_CONNECTED_GRAPH = '/api/tenant/monitoring/network-connected-graph?fqName={0}';
        this.URL_NETWORK_CONFIG_GRAPH = '/api/tenant/monitoring/network-config-graph?fqName={0}';
        this.URL_NETWORK_SUMMARY = 'api/tenant/networking/virtual-network/summary?fqNameRegExp={0}';
        this.URL_ALL_NETWORKS_DETAILS = '/api/tenant/networking/virtual-networks/details';

        this.URL_NETWORKS_DETAILS_IN_CHUNKS = '/api/tenant/networking/virtual-networks/details?count={0}&nextCount={1}&startAt={2}';
        this.URL_NETWORK_SUMMARY = '/api/tenant/networking/virtual-network/summary?fqNameRegExp={0}';

        this.URL_NETWORK_TRAFFIC_STATS = '/api/tenant/networking/flow-series/vn?minsSince={0}&fqName={1}&sampleCnt={2}&useServerTime=true';
        this.URL_NETWORK_PORT_DISTRIBUTION = '/api/tenant/networking/network/stats/top?minsSince=10&fqName={0}&useServerTime=true&type=port';
        this.URL_CONNECTED_NETWORK_TRAFFIC_STATS = '/api/tenant/networking/flow-series/vn?minsSince={0}&srcVN={1}&destVN={2}&sampleCnt={3}&useServerTime=true';

        this.URL_INSTANCE_CONNECTED_GRAPH = '/api/tenant/monitoring/instance-connected-graph?fqName={0}&instanceUUID={1}';
        this.URL_INSTANCE_CONFIG_GRAPH = '/api/tenant/monitoring/instance-config-graph?fqName={0}';
        this.URL_INSTANCE_DETAIL = '/api/tenant/networking/virtual-machine?fqNameRegExp={0}?flat';
        this.URL_INSTANCES_SUMMARY = '/api/tenant/networking/virtual-machines/summary';
        this.URL_INSTANCE_DETAILS_IN_CHUNKS = '/api/tenant/networking/virtual-machines/details?count={0}&nextCount={1}&startAt={2}';
        this.URL_INSTANCE_TRAFFIC_STATS = '/api/tenant/networking/flow-series/vm?minsSince={0}&fqName={1}&sampleCnt={2}&ip={3}&vmName={4}&vmVnName={5}&useServerTime=true';
        this.URL_INSTANCE_PORT_DISTRIBUTION = '/api/tenant/networking/network/stats/top?minsSince=10&fqName={0}&useServerTime=true&type=port&ip={1}';

        this.URL_VM_VN_STATS = '/api/tenant/networking/stats';
        this.URL_VM_INTERFACES = '/api/tenant/networking/virtual-machine-interfaces/summary';

        this.URL_QUERY = '/api/admin/reports/query';
        this.URL_GET_GLOBAL_VROUTER_CONFIG = '/api/tenants/config/global-vrouter-config';

        this.URL_GET_PROJECT_QUOTA_USED = '/api/tenants/config/project-quotas-info?id={0}';
        this.URL_GET_GLOBAL_VROUTER_CONFIG = '/api/tenants/config/global-vrouter-config';
        this.URL_GET_GLOBAL_ASN = '/api/tenants/admin/config/global-asn';
        this.URL_GET_SECURITY_GROUP_DETAILS = '/api/tenants/config/securitygroup-details?projUUID={0}'
        this.URL_GET_SEC_GRP_LIST = '/api/tenants/config/securitygroup';
        this.URL_GET_LIST_SERVICE_INSTS_CONFIG = '/api/tenants/config/list-service-instances/{0}';
        this.URL_GET_SERVICE_INSTS_STATUS = '/api/tenants/config/service-instances-status/{0}';
        this.URL_GET_SERVICE_INST_TMPLTS = '/api/tenants/config/service-instance-templates/{0}';

        this.FILTERS_COLUMN_VN = ['UveVirtualNetworkAgent:interface_list', 'UveVirtualNetworkAgent:in_bandwidth_usage', 'UveVirtualNetworkAgent:out_bandwidth_usage',
            'UveVirtualNetworkConfig:connected_networks', 'UveVirtualNetworkAgent:virtualmachine_list', 'UveVirtualNetworkAgent:acl', 'UveVirtualNetworkAgent:total_acl_rules',
            'UveVirtualNetworkAgent:ingress_flow_count', 'UveVirtualNetworkAgent:egress_flow_count',
            'UveVirtualNetworkAgent:in_tpkts', 'UveVirtualNetworkAgent:out_tpkts',
            //'UveVirtualNetworkAgent:vrf_stats_list', 'UveVirtualNetworkAgent:vn_stats',
            'UveVirtualNetworkAgent:in_bytes', 'UveVirtualNetworkAgent:out_bytes'
         ];


        this.FILTERS_INSTANCE_LIST_INTERFACES= [
            'UveVMInterfaceAgent:virtual_network', 'UveVMInterfaceAgent:ip6_address', 'UveVMInterfaceAgent:ip_address',
            'UveVMInterfaceAgent:gateway', 'UveVMInterfaceAgent:ip6_active', 'UveVMInterfaceAgent:vm_name', 'UveVMInterfaceAgent:if_stats',
            'UveVMInterfaceAgent:in_bw_usage', 'UveVMInterfaceAgent:out_bw_usage', "UveVMInterfaceAgent:mac_address",
            'UveVMInterfaceAgent:uuid', 'UveVMInterfaceAgent:vm_uuid'
        ];

        this.FILTERS_COLUMN_VM = ['UveVirtualMachineAgent:interface_list', 'UveVirtualMachineAgent:vrouter', 'UveVirtualMachineAgent:fip_stats_list',
            'UveVirtualMachineAgent:cpu_info', 'UveVirtualMachineAgent:if_bmap_list', 'UveVirtualMachineAgent:cpu_info', 'UveVirtualMachineAgent:vm_name', 'UveVirtualMachineAgent:uuid'
            //'VirtualMachineStats:if_stats'
        ];

        this.URL_NETWORK = '/#p=mon_networking_networks&q[type]=network&q[view]=details&q[focusedElement][fqName]={{key}}&q[focusedElement][type]=virtual-network';
        this.URL_INSTANCE = '/#p=mon_networking_instances&q[type]=instance&q[view]=details&q[focusedElement][fqName]={{params.vn}}&q[focusedElement][uuid]={{key}}&q[focusedElement][type]=virtual-network';
        this.URL_VROUTER = '/#p=mon_infra_vrouter&q[node]={{key}}';

        this.URL_LOGICAL_ROUTER_IN_CHUNKS = '/api/admin/config/get-data?type=logical-router&count={0}&fqnUUID={1}';
        this.URL_All_NETWORK_IN_PROJECT = '/api/tenants/config/all-virtual-networks?uuid={0}';
        this.URL_All_EXTERNAL_NETWORK = '/api/tenants/config/external-virtual-networks';
        this.URL_LOGICAL_ROUTER_POST = '/api/tenants/config/logicalrouter';
        this.URL_LOGICAL_ROUTER_PUT = '/api/tenants/config/logicalrouter/{0}';
        this.URL_LOGICAL_ROUTER_VIEW_PATH_PREFIX = 'config/networking/logicalrouter/ui/js/views/';

        this.URL_POLICIES_VIEW_PATH_PREFIX = 'config/networking/policy/ui/js/views/';
        this.URL_POLICIES_IN_CHUNKS = '/api/admin/config/get-data?type=network-policy&count={0}&fqnUUID={1}';

        this.URL_ROUTING_POLICY_PATH_PREFIX = 'config/networking/routingpolicy/ui/js/views/';
        this.URL_ROUTING_POLICY_IN_CHUNKS = '/api/tenants/config/routingpolicy/{0}';

        this.URL_PORT_POST = '/api/tenants/config/ports';
        this.URL_PORT_PUT = '/api/tenants/config/ports/{0}';
        this.URL_PORT_VIEW_PATH_PREFIX = 'config/networking/port/ui/js/views/';
        this.URL_GET_PORT_UUID = '/api/tenants/config/get-config-uuid-list?type=virtual-machine-interface&parentUUID={0}';
        this.URL_GET_PORT = '/api/tenants/config/get-virtual-machine-details-paged';
        this.get = function () {
            var args = arguments;
            return cowc.getValueFromTemplate(args);
        };

        this.TYPE_DOMAIN = "domain";
        this.TYPE_PROJECT = "project";
        this.TYPE_NETWORK = "network";
        this.TYPE_INSTANCE = "instance";
        this.TYPE_VN = 'vn';
        this.TYPE_VIRTUAL_NETWORK = "virtual-network";
        this.TYPE_VIRTUAL_MACHINE = "virtual-machine";

        this.ALL_PROJECT_DROPDOWN_OPTION = [{name: 'all projects', value: 'all', fq_name: 'all'}];
        this.ALL_NETWORK_DROPDOWN_OPTION = [{name: 'all networks', value: 'all', fq_name: 'all'}];

        this.TMPL_VN_PORT_HEAT_CHART = "network-port-heat-chart-template";
        this.TMPL_TRAFFIC_STATS_TAB = "traffic-stats-tab-template";
        this.TMPL_GRAPH_CONTROL_PANEL_SEARCH = "graph-control-panel-search-template";
        this.TMPL_QUERY_SELECT = "query-select-popup-template";
        this.TMPL_QUERY_PAGE = "query-page-template";
        this.TMPL_QUERY_QUEUE_PAGE = "query-queue-page-template";
        this.TMPL_QUERY_TEXT = "query-text-template";
        this.TMPL_FORM_RESULT = 'form-result-page-template';
        this.TMPL_SESSION_ANALYZER = "session-analyzer-view-template";

        this.DEFAULT_DOMAIN = "default-domain";
        this.UCID_PREFIX_MN = "monitor-networking";
        this.UCID_PREFIX_BREADCRUMB = "breadcrumb";
        this.UCID_PREFIX_GRAPHS = "graphs";
        this.UCID_PREFIX_CHARTS = "charts";
        this.UCID_PREFIX_UVES = "uves";
        this.UCID_PREFIX_LISTS = "lists";
        this.UCID_PREFIX_MN_LISTS = this.UCID_PREFIX_MN + ":" + this.UCID_PREFIX_LISTS + ":";
        this.UCID_PREFIX_MN_GRAPHS = this.UCID_PREFIX_MN + ":" + this.UCID_PREFIX_GRAPHS + ":";
        this.UCID_PREFIX_MN_UVES = this.UCID_PREFIX_MN + ":" + this.UCID_PREFIX_UVES + ":";

        this.UCID_ALL_VN_LIST = this.UCID_PREFIX_MN_LISTS + "all-virtual-networks";
        this.UCID_ALL_VM_LIST = this.UCID_PREFIX_MN_LISTS + "all-virtual-machines";
        this.UCID_DEFAULT_DOMAIN_VN_LIST = this.UCID_PREFIX_MN_LISTS + this.DEFAULT_DOMAIN + ":virtual-networks";
        this.UCID_DEFAULT_DOMAIN_PROJECT_LIST = this.UCID_PREFIX_MN_LISTS + this.DEFAULT_DOMAIN + ":projects";

        this.UCID_BC_ALL_DOMAINS = this.UCID_PREFIX_BREADCRUMB + ':all-domains';
        this.UCID_BC_ALL_SA_SETS = this.UCID_PREFIX_BREADCRUMB + ':all-sa-sets';
        this.UCID_BC_ALL_GLOBAL_SYS_CONFIGS = this.UCID_PREFIX_BREADCRUMB + ':all-global-sys-configs';
        this.UCID_BC_DOMAIN_ALL_PROJECTS = this.UCID_PREFIX_BREADCRUMB + ':{0}:all-projects';
        this.UCID_BC_DOMAIN_ALL_DNS = this.UCID_PREFIX_BREADCRUMB + ':{0}:all-dns';
        this.UCID_BC_PROJECT_ALL_NETWORKS = this.UCID_PREFIX_BREADCRUMB + ':{0}:all-networks';
        this.UCID_BC_NETWORK_ALL_INSTANCES = this.UCID_PREFIX_BREADCRUMB + ':{0}:all-instances';

        this.UCID_PROJECT_VN_PORT_STATS_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:port-stats";
        this.UCID_PROJECT_VM_PORT_STATS_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:{1}:port-stats";
        this.UCID_NETWORK_TRAFFIC_STATS_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:traffic-stats";
        this.UCID_INSTANCE_TRAFFIC_STATS_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:{1}:{2}:traffic-stats";
        this.UCID_CONNECTED_NETWORK_TRAFFIC_STATS_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:{1}:traffic-stats";
        this.UCID_INSTANCE_INTERFACE_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:{1}:interfaces";
        this.UCID_PROJECT_INTERFACE_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:interfaces";
        this.UCID_NETWORK_INTERFACE_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:interfaces";
        this.UCID_ALL_INTERFACE_LIST = this.UCID_PREFIX_MN_LISTS + "all-interfaces";
        this.UCID_INSTANCE_CPU_MEMORY_LIST = this.UCID_PREFIX_MN_LISTS + "{0}:{1}:cpu-memory";

        this.UCID_NODE_CPU_MEMORY_LIST = 'node_details' + "{0}:cpu-memory";

        this.GRAPH_DIR_LR = "LR";
        this.GRAPH_DIR_TB = "TB";

        this.DEFAULT_GRAPH_DIR = this.GRAPH_DIR_LR;

        this.ZOOMED_VN_MARGIN = {top: 5, bottom: 5, left: 15, right: 15};
        this.ZOOMED_VN_OFFSET_X = 10;
        this.VM_GRAPH_SIZE = {width: 30, height: 30};
        this.VM_GRAPH_MARGIN = {top: 10, bottom: 10, left: 0, right: 0};
        this.VM_CENTER_LINK_THICKNESS = 1;
        this.MAX_VM_TO_PLOT = 200;

        this.get = function () {
            var args = arguments;
            return cowu.getValueFromTemplate(args);
        };

        this.UMID_INSTANCE_UVE = "uve:{0}";
        this.SERVICE_VN_EXCLUDE_LIST = ['svc-vn-left','svc-vn-right','svc-vn-mgmt'];
        this.PROTOCOL_MAP = [{'id': 6, 'text': 'TCP'}, {'id': 17, 'text': 'UDP'}, {'id': 1, 'text': 'ICMP'}];

        this.GRAPH_ELEMENT_PROJECT = 'project';
        this.GRAPH_ELEMENT_NETWORK = 'virtual-network';
        this.GRAPH_ELEMENT_INSTANCE = 'virtual-machine';
        this.GRAPH_ELEMENT_CONNECTED_NETWORK = 'connected-network';
        this.GRAPH_ELEMENT_NETWORK_POLICY = 'network-policy';

        this.TOP_IN_LAST_MINS = 10;
        this.NUM_DATA_POINTS_FOR_FLOW_SERIES = 120;
        this.LINK_CONNECTOR_STRING = " --- ";


        // Config DB constants
        this.TMPL_CDB_ITEM_DELETE = "cdb-delete-item-template";
        this.DELETE_KEY_TYPE = "delete-key";
        this.DELETE_KEY_VALUE_TYPE = "delete-key-value";
        this.URL_OBJECT_UUID_TABLE = "/api/query/cassandra/keys/obj_uuid_table";
        this.URL_OBJECT_SHARED_TABLE = "/api/query/cassandra/keys/obj_shared_table";
        this.OBJECT_SHARED_TABLE = "obj_shared_table";
        this.OBJECT_UUID_TABLE = "obj_uuid_table";

        // Underlay constants
        this.UNDERLAY_TOPOLOGY_CACHE = "underlayTopology";
        this.UNDERLAY_TABS_VIEW_ID = 'underlayTabsView';
        this.UNDERLAY_TAB_ID = 'underlayTabs';
        this.TRACEFLOW_RADIOBUTTON_ID = 'traceFlowRadioBtns';
        this.TRACEFLOW_DROPDOWN_ID = 'traceFlowDropdown';
        this.TRACEFLOW_RESULTS_GRID_ID = 'traceFlowResultsGrid';
        this.DEFAULT_INTROSPECTPORT = '8085';
        this.UNDERLAY_PROUTER_INTERFACE_TAB_ID = 'pRouterInterfaces';
        this.UNDERLAY_TRACEFLOW_TAB_ID = 'traceFlow';
        this.UNDERLAY_DETAILS_TAB_ID = 'details';
        this.TIMERANGE_DROPDOWN_VALUES = [
            {'id': 600, 'text': 'Last 10 Mins'},
            {'id': 1800, 'text': 'Last 30 Mins'},
            {'id': 3600, 'text': 'Last 1 Hr'},
            {'id': 21600, 'text': 'Last 6 Hrs'},
            {'id': 43200, 'text': 'Last 12 Hrs'},
            {'id': -1, 'text': 'Custom'}
        ];
        this.UNDERLAY_SEARCHFLOW_TAB_ID = 'searchFlow';
        this.UNDERLAY_TRAFFICSTATS_TAB_ID = 'trafficStats';
        this.PROUTER = 'physical-router';
        this.VROUTER = 'virtual-router';
        this.VIRTUALMACHINE = 'virtual-machine';
        this.UNDERLAY_LINK = 'link';
        this.TRACEFLOW_MAXATTEMPTS = 3;
        this.TRACEFLOW_INTERVAL = 5;
        this.UNDERLAY_FLOW_INFO_TEMPLATE = "flow-info-template";

        this.getProjectsURL = function (domainObj, dropdownOptions) {
            /* Default: get projects from keystone or API Server as specified in
             * config.global.js, getDomainProjectsFromApiServer is true, then
             * from API Server else from keystone
             */
            var getProjectsFromIdentity = null;
            var config = null;
            if (null != dropdownOptions) {
                getProjectsFromIdentity = dropdownOptions.getProjectsFromIdentity;
                config = dropdownOptions.config;
            }

            var url = '/api/tenants/config/projects/' + domainObj.name,
                role = globalObj['webServerInfo']['role'],
                activeOrchModel = globalObj['webServerInfo']['loggedInOrchestrationMode'];

            if ((((null == getProjectsFromIdentity) || (false == getProjectsFromIdentity)) && ((null == config) || (false == config)))) {
                url = '/api/tenants/projects/' + domainObj.name;
            }
            if(activeOrchModel == 'vcenter') {
                url = '/api/tenants/config/projects/' + domainObj.name;
            }

            return url;
        };

        this.constructReqURL = function (urlConfig) {
            var url = "", length = 0,
                context;

            if (urlConfig['fqName'] != null)
                length = urlConfig['fqName'].split(':').length;
            else
                urlConfig['fqName'] = "*";

            context = urlConfig['context'];

            //Decide context based on fqName length
            if ((context == null) && (length > 0)) {
                var contextMap = ['domain', 'project'];
                context = contextMap[length - 1];
            }

            //Pickup the correct URL in this if loop
            if (context == 'domain') {
                url = "/api/tenant/networking/domain/stats/top"
                if (urlConfig['type'] == 'summary')
                    url = "/api/tenant/networking/domain/summary"
            } else if (context == 'project') {
                url = "/api/tenant/networking/network/stats/top"
                if (urlConfig['type'] == 'summary')
                    url = "/api/tenant/networking/project/summary"
                else if (urlConfig['type'] == 'portRangeDetail')
                    url = "/api/admin/reports/query";
            } else if (context == 'network') {
                url = "/api/tenant/networking/network/stats/top"
                if (urlConfig['type'] == 'portRangeDetail')
                    url = "/api/admin/reports/query";
                var urlMap = {
                    summary: '/api/tenant/networking/vn/summary',
                    flowseries: '/api/tenant/networking/flow-series/vn',
                    details: '/api/tenant/networking/network/details'
                }
                if (ifNull(urlConfig['widget'], urlConfig['type']) in urlMap)
                    url = urlMap[ifNull(urlConfig['widget'], urlConfig['type'])];
            } else if (context == 'connected-nw') {
                url = "/api/tenant/networking/network/connected/stats/top"
                var urlMap = {
                    flowseries: '/api/tenant/networking/flow-series/vn',
                    summary: '/api/tenant/networking/network/connected/stats/summary'
                }
                if (ifNull(urlConfig['widget'], urlConfig['type']) in urlMap)
                    url = urlMap[ifNull(urlConfig['widget'], urlConfig['type'])];
            } else if (context == 'instance') { //Instance
                url = "/api/tenant/networking/vm/stats/top"
                var urlMap = {
                    flowseries: '/api/tenant/networking/flow-series/vm',
                    summary: '/api/tenant/networking/vm/stats/summary'
                }
                if (ifNull(urlConfig['widget'], urlConfig['type']) in urlMap)
                    url = urlMap[ifNull(urlConfig['widget'], urlConfig['type'])];
            }
            //End - pick the correct URL
            if ((urlConfig['type'] == 'instance') && (urlConfig['context'] != 'instance')) {
                url = "/api/tenant/networking/virtual-machines"
            }
            //If need statistics from the beginning
            if (urlConfig['source'] == 'uve') {
                if ($.inArray(urlConfig['type'], ['project', 'network']) > -1)
                    url = '/api/tenant/networking/virtual-network/summary'
            }
            var reqParams = {};
            //No time range required as summary stats are from the beginning
            if (urlConfig['type'] != 'summary') {
                //Retrieve only top 5 if it's not the entire list
                //Exclude list where limit is not applicable
                if ($.inArray(urlConfig['view'], ['list', 'flowseries']) == -1) {
                    if (urlConfig['widget'] != 'flowseries')
                        urlConfig['limit'] = ifNull(urlConfig['limit'], 5);
                }
                //Time-related queries
                if (urlConfig['fromUTC'] != null) {
                } else if (urlConfig['time'] == null) {
                    urlConfig['time'] = '10m';
                }
                if (urlConfig['time'] != null) {
                    var startEndUTC = getFromToUTC(urlConfig['time']);
                    delete urlConfig['time'];
                    urlConfig['fromUTC'] = startEndUTC[0];
                    urlConfig['toUTC'] = startEndUTC[1];
                }
                $.extend(reqParams, {minsSince: ctwc.TOP_IN_LAST_MINS});
            }
            if (urlConfig['limit'] != null)
                $.extend(reqParams, {limit: urlConfig['limit']});
            else
                $.extend(reqParams, {limit: 100});    //Hack
            //Rename fqName variable as per NodeJS API requirement
            if (urlConfig['fqName'] != null) {
                //For flow-series,need to pass fqName as srcVN
                if (context == 'connected-nw') {
                    $.extend(reqParams, {'srcVN': urlConfig['srcVN'], 'destVN': urlConfig['fqName']});
                } else if (urlConfig['widget'] == 'flowseries') {
                    if (context == 'instance') {
                        $.extend(reqParams, {
                            'fqName': ifNull(urlConfig['vnName'], urlConfig['fqName']),
                            'ip': urlConfig['ip']
                        });
                    } else
                        $.extend(reqParams, {'fqName': urlConfig['fqName']});        //change queryParameter to fqName
                } else if (urlConfig['type'] == 'details') {
                    if (context == 'network')
                        $.extend(reqParams, {'uuid': urlConfig['uuid']});
                } else if (context == 'instance') {
                    $.extend(reqParams, {'fqName': urlConfig['vnName'], 'ip': urlConfig['ip']});
                } else
                    $.extend(reqParams, {'fqName': urlConfig['fqName']});
            }

            //If port argument is present,just copy it..arguments that need to be copied to reqParams as it is
            $.each(['port', 'protocol', 'vmName', 'vmVnName', 'useServerTime'], function (idx, field) {
                if (urlConfig[field] != null) {
                    //$.extend(reqParams,{port:obj[field]});
                    reqParams[field] = urlConfig[field];
                }
            });
            if (urlConfig['type'] == 'portRangeDetail') {
                var fqName = urlConfig['fqName'], protocolCode;
                reqParams['timeRange'] = 600;
                reqParams['table'] = 'FlowSeriesTable';
                if (urlConfig['startTime'] != null) {
                    reqParams['fromTimeUTC'] = urlConfig['startTime'];
                    reqParams['toTimeUTC'] = urlConfig['endTime'];
                } else {
                    reqParams['fromTimeUTC'] = new XDate().addMinutes(-10).getTime();
                    reqParams['toTimeUTC'] = new XDate().getTime();
                }
                var protocolMap = {tcp: 6, icmp: 1, udp: 17},
                protocolCode = [];

                $.each(urlConfig['protocol'], function (idx, value) {
                    protocolCode.push(protocolMap[value]);
                });
                if (fqName.split(':').length == 2) {
                    fqName += ':*';//modified the fqName as per the flow series queries
                }
                var portType = urlConfig['portType'] == 'src' ? 'sport' : 'dport',
                    whereArr = [];

                $.each(protocolCode, function (idx, currProtocol) {
                    if(contrail.checkIfExist(urlConfig['ip'])) {
                        whereArr.push(contrail.format("({3}={0} AND sourcevn={1} AND protocol={2} AND sourceip={4})", urlConfig['port'], fqName, currProtocol, portType, urlConfig['ip']));
                    } else {
                        whereArr.push(contrail.format("({3}={0} AND sourcevn={1} AND protocol={2})", urlConfig['port'], fqName, currProtocol, portType));
                    }
                });

                reqParams['select'] = "sourcevn, destvn, sourceip, destip, protocol, sport, dport, sum(bytes), sum(packets),flow_count";
                reqParams['where'] = whereArr.join(' OR ');
                delete reqParams['fqName'];
                delete reqParams['protocol'];
            }
            //Strip-off type if not required
            if (urlConfig['type'] != null && ($.inArray(urlConfig['type'], ['summary', 'flowdetail', 'portRangeDetail']) == -1) &&
                ($.inArray(urlConfig['widget'], ['flowseries']) == -1))
                $.extend(reqParams, {type: urlConfig['type']});

            //Add extra parameters for flowseries
            if (urlConfig['widget'] == 'flowseries') {
                $.extend(reqParams, {'sampleCnt': ctwc.NUM_DATA_POINTS_FOR_FLOW_SERIES});
                //If useServerTime flag is true then the webserver timeStamps will be send in startTime and endTime to query engine
                $.extend(reqParams, {'minsSince': 60, 'useServerTime': true, 'fip': urlConfig['fip']});
            }
            //Don't append startTime/endTime if minsSince is provided as need to use realtive times
            /*Always send the startTime and endTime instead of minsSince
             if(reqParams['minsSince'] != null) {
             reqParams['endTime'] = new Date().getTime();
             reqParams['startTime'] = new Date(new XDate().addMinutes(-reqParams['minsSince'])).getTime();
             //delete reqParams['minsSince'];
             }*/

            //Strip-off limit & minsSince if not required
            if (((urlConfig['type'] == 'instance') && (urlConfig['context'] != 'instance')) || (urlConfig['source'] == 'uve') || urlConfig['type'] == 'portRangeDetail') {
                delete reqParams['limit'];
                delete reqParams['minsSince'];
                delete reqParams['endTime'];
                delete reqParams['startTime'];
            }
            if (urlConfig['source'] == 'uve') {
                if (urlConfig['type'] != 'instance') {
                    delete reqParams['fqName'];
                    if (urlConfig['fqName'] == '' || urlConfig['fqName'] == '*')
                        reqParams['fqNameRegExp'] = '*';
                    else
                        reqParams['fqNameRegExp'] = '*' + urlConfig['fqName'] + ':*';
                } else {
                    reqParams['fqName'] = '';
                }
            }

            if ((urlConfig['portType'] != null) && (urlConfig['port'].toString().indexOf('-') > -1)) {
                //As NodeJS API expects same URL for project & network and only fqName will be different
                if (url.indexOf('/top') > -1) {
                    url = '/api/tenant/networking/network/stats/top';
                    reqParams['portRange'] = urlConfig['port'];
                    if (urlConfig['startTime'] != null)
                        reqParams['startTime'] = urlConfig['startTime'];
                    if (urlConfig['endTime'] != null)
                        reqParams['endTime'] = urlConfig['endTime'];
                    delete reqParams['port'];
                }
            }
            //reqParams['limit'] = 100;
            delete reqParams['limit'];

            return url + '?' + $.param(reqParams);
        };

        this.STATS_SELECT_FIELDS = {
            'virtual-network': {
                'inBytes': 'SUM(vn_stats.in_bytes)',
                'outBytes': 'SUM(vn_stats.out_bytes)',
                'inPkts': 'SUM(vn_stats.in_pkts)',
                'outPkts': 'SUM(vn_stats.out_pkts)'
            },
            'virtual-machine': {
                'inBytes': 'SUM(if_stats.in_bytes)',
                'outBytes': 'SUM(if_stats.out_bytes)',
                'inPkts': 'SUM(if_stats.in_pkts)',
                'outPkts': 'SUM(if_stats.out_pkts)'
            },
            'fip': {
                'inBytes': 'SUM(fip_stats.in_bytes)',
                'outBytes': 'SUM(fip_stats.out_bytes)',
                'inPkts': 'SUM(fip_stats.in_pkts)',
                'outPkts': 'SUM(fip_stats.out_pkts)'
            },
        };

        this.CONFIGURE_NETWORK_LINK_CONFIG = {
            text: 'Go to configure network page',
            href: '/#p=config_net_vn'
        };


        //BGP
        this.URL_GET_BGP = '/api/tenants/config/bgp/get-bgp-routers';
        this.URL_GET_ASN = '/api/tenants/admin/config/global-asn';
        this.BGP_ADDRESS_FAMILY_DATA = [
                                           {
                                               text : 'inet-vpn',
                                               value : 'inet-vpn',
                                               locked : true
                                           },
                                           {
                                                text : 'route-target',
                                                value : 'route-target'
                                           },
                                           {
                                               text : 'inet6-vpn',
                                               value : 'inet6-vpn'
                                           },
                                           {
                                                text : 'e-vpn',
                                                value : 'e-vpn'
                                           }
                                       ];
        this.CN_ADDRESS_FAMILY_DATA = [
                                          {
                                              text : 'route-target',
                                              value : 'route-target',
                                          },
                                          {
                                              text : 'inet-vpn',
                                              value : 'inet-vpn',
                                          },
                                          {
                                               text : 'inet6-vpn',
                                               value : 'inet6-vpn',
                                          },
                                          {
                                               text : 'e-vpn',
                                               value : 'e-vpn',
                                          },
                                          {
                                               text : 'erm-vpn',
                                               value : 'erm-vpn',
                                          }
                                      ];
        this.FAMILY_ATTR_ADDRESS_FAMILY_DATA = [
                                          {
                                              text: "inet-vpn",
                                              value: "inet-vpn"
                                          },
                                          {
                                              text: "e-vpn",
                                              value: "e-vpn"
                                          },
                                          {
                                              text: "erm-vpn",
                                              value: "erm-vpn"
                                          },
                                          {
                                              text: "route-target",
                                              value: "route-target"
                                          },
                                          {
                                              text: "inet6-vpn",
                                              value: "inet6-vpn"
                                          }
                                      ];
         this.AUTHENTICATION_DATA = [
                                        {
                                            text : 'None',
                                            value : 'none'
                                        },
                                        {
                                            text : 'md5',
                                            value : 'md5'
                                        }
                                    ];
         this.BGP_AAS_ROUTERS = ["bgpaas-server", "bgpaas-client"];

        //Physical Routers constants
        this.URL_PHYSICAL_ROUTERS_DETAILS_IN_CHUNKS =
            '/api/tenants/config/physical-routers-with-intf-count';
        this.URL_VIRTUAL_ROUTER_DETAILS =
            '/api/tenants/config/virtual-routers-detail';
        this.URL_PHYSICAL_ROUTER_CREATE =
            '/api/tenants/config/physical-routers';
        this.URL_BGP_ROUTER_DETAILS = '/api/admin/nodes/bgp';
        this.URL_VIRTUAL_NETWORK_DETAILS = '/api/tenants/config/virtual-networks';
        this.SNMP_VERSION_DATA = [
            {'value' : '2', "label" : '2c'},
            {'value' : '3', "label" : '3'}
        ];
        this.SNMP_SECURITY_LEVEL = [
            {'value' : 'none', "text" : 'None'},
            {'value' : 'auth', "text" : 'Auth'},
            {'value' : 'authpriv', "text" : 'AuthPriv'}
        ];
        this.VIRTUAL_ROUTER_TYPE = [
            {'value' : 'none', "text" : 'None'},
            {'value' : 'embedded', "text" : 'Embedded'},
            {'value' : 'torAgent', "text" : 'TOR Agent'}
        ];

        // VRouter Config Constants
        this.URL_CFG_VROUTER_DETAILS =
            '/api/tenants/config/virtual-routers-detail';

        // IPAM Config Constants
        this.URL_CFG_IPAM_DETAILS =
            '/api/tenants/config/ipam-details';

        // FIP Config Constants
        this.URL_CFG_FIP_DETAILS =
            '/api/tenants/config/floating-ips';

        // Service Template Config Constants
        this.URL_CFG_SVC_TEMPLATE_DETAILS =
            '/api/tenants/config/service-templates';

        //Interfaces
        this.URL_PHYSICAL_ROUTER_LIST =
            '/api/tenants/config/physical-routers-list';
        this.URL_GET_INTERFACES =
            '/api/tenants/config/get-interfaces';
        this.INTERFACE_TYPE_DATA = [
            {'value' : 'physical', "text" : 'Physical'},
            {'value' : 'logical', "text" : 'Logical'}
        ];
        this.URL_GET_INTERFACE_DELIMITERS =
            '/api/admin/webconfig/physicaldevices/interface_delimiters';
        this.URL_GET_VN_INF = '/api/tenants/config/vn-list-details';
        this.URL_GET_VN_INTERNALS_INF =
            '/api/tenants/config/get-virtual-machine-details/?vn_uuid={0}';
        this.LOGICAL_INF_TYPE_DATA = [
            {'value' : 'l2', "text" : 'Server'},
            {'value' : 'l3', "text" : 'L3'}
        ];
        this.INF_PARENT_TYPE_DATA = [
            {'value' : 'physical-router', "text" : 'Physical Router'},
            {'value' : 'physical-interface', "text" : 'Physical Interface'}
        ];

        /* BGP as a Service */
        this.CONFIG_BGP_AS_A_SERVICE_LIST_ID = "config-bgp-as-a-service-list";
        this.BGP_AS_A_SERVICE_GRID_ID = "bgp-as-a-service-grid";
        this.URL_GET_BGP_AS_A_SERVICE_DATA = "/api/tenants/config/get-bgp-as-a-services/";
        this.CONFIG_BGP_AS_A_SERVICE_SECTION_ID = "config-bgp-as-a-service-section";
        this.CONFIG_BGP_AS_A_SERVICE_ID = "config-bgp-as-a-service";
        this.CONFIG_BGP_AS_A_SERVICE_LIST_VIEW_ID = "config-bgp-as-a-service-list-view";
        this.BGP_AS_A_SERVICE_PREFIX_ID = "bgp_as_a_service";
        this.URL_CREATE_BGP_AS_A_SERVICE = "/api/tenants/config/create-bgp-as-a-service";
        this.URL_UPDATE_BGP_AS_A_SERVICE = "/api/tenants/config/update-bgp-as-a-service/";
        this.BGP_AS_A_SERVICE_ADDRESS_FAMILIES = [
            {
                text: "inet",
                value: "inet",
            },
            {
                text: "inet6",
                value: "inet6",
            }
        ];

        // Virtual Network Config Constants
        this.URL_CFG_VN_DETAILS = '/api/tenants/config/virtual-network-details';
        //Dns constants
        this.ACTIVE_DNS_DATA = "/api/tenants/config/sandesh/virtual-DNS/";

        /* Route Aggregate Constants */
        this.CONFIG_ROUTE_AGGREGATE_LIST_ID = "config-route-aggregate-list";
        this.ROUTE_AGGREGATE_GRID_ID = "route-aggregate-grid";
        this.CONFIG_ROUTE_AGGREGATE_SECTION_ID = "config-route-aggregate-section";
        this.CONFIG_ROUTE_AGGREGATE_ID = "config-route-aggregate";
        this.CONFIG_ROUTE_AGGREGATE_LIST_VIEW_ID = "config-route-aggregate-list-view";
        this.ROUTE_AGGREGATE_PREFIX_ID = "route_aggregate";
        this.URL_CREATE_ROUTE_AGGREGATE = "/route-aggregates";
        this.URL_UPDATE_ROUTE_AGGREGATE = "/route-aggregate/";

        this.DEFAULT_COMMUNITIES = [
            {text:"no-export",id:"no-export"},
            {text:"accept-own",id:"accept-own"},
            {text:"no-advertise",id:"no-advertise"},
            {text:"no-export-subconfed",id:"no-export-subconfed"},
            {text:"no-reoriginate",id:"no-reoriginate"}
        ];

        /* Packet Capture Constants */
        this.PACKET_CAPTURE_LIST_ID = "packet-capture-list";
        this.PACKET_CAPTURE_GRID_ID = "packet-capture-grid";
        this.URL_GET_PACKET_CAPTURE_DATA = "/api/tenants/config/service-instances/";
        this.PACKET_CAPTURE_SECTION_ID = "packet-capture-section";
        this.PACKET_CAPTURE_ID = "packet-capture-list";
        this.PACKET_CAPTURE_LIST_VIEW_ID = "packet-capture-list-view";
        this.PACKET_CAPTURE_PREFIX_ID = "packet_capture";
        this.URL_GET_SERVICE_TEMPLATE_IMAGES = "/api/tenants/config/service-template-images";

        /* common config url constants */
        this.URL_GET_CONFIG_DETAILS = "/api/tenants/config/get-config-details";
        this.URL_CREATE_CONFIG_OBJECT = "/api/tenants/config/create-config-object";
        this.URL_UPDATE_CONFIG_OBJECT = "/api/tenants/config/update-config-object";
    };

    //str will be [0-9]+(m|h|s|d)
    //Returns an array of current time and end time such that the difference beween them will be given str
    function getFromToUTC(str) {
        var startDt = new XDate(true),
            endDt = new XDate(true),
            fnMap = {d: 'addDays', m: 'addMinutes', s: 'addSeconds', h: 'addHours'},
            unit = str.charAt(str.length - 1), value = parseInt(str);

        //If unit is not specified,take it as secs
        if ($.inArray(unit, ['d', 'm', 's', 'h']) == -1)
            unit = 's';

        endDt[fnMap[unit]](value);
        return [startDt.getTime(), endDt.getTime()];
    };

    return CTConstants;
});

/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */
define('controller-labels',[
    'underscore'
], function (_) {
    var CTLabels = function () {
        this.get = function (key) {
            var keyArray, newKey;
            if (_.has(labelMap, key)) {
                return labelMap[key];
            } else {
                keyArray = key.split('.');
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(labelMap,
                        newKey)) {
                    return labelMap[newKey];
                } else {
                    return newKey.charAt(0).toUpperCase() +
                        newKey.slice(1);
                }
            }
        };

        this.isExistKey = function (key) {
            var keyArray, newKey;
            if (_.has(labelMap, key)) {
                return true;
            } else {
                keyArray = key.split('.');
                newKey = keyArray[keyArray.length - 1];
                if (keyArray.length > 1 && _.has(labelMap,
                        newKey)) {
                    return true;
                }
            }

            return false;
        };

        this.getInLowerCase = function (key) {
            var label = this.get(key);
            return label.toLowerCase();
        };

        this.getInUpperCase = function (key) {
            var label = this.get(key);
            return label.toUpperCase();
        };

        this.getFirstCharUpperCase = function (key) {
            var label = this.get(key);

            label = label.toLowerCase().replace(/\b[a-z]/g,
                function (letter) {
                    return letter.toUpperCase();
                });
            return label;
        };

        var labelMap = {

            /* Network Details */
            name: 'Name',
            connected_networks: 'Connected Networks',
            instCnt: "Instances",
            ingress_flow_count: 'Ingress Flow Count',
            egress_flow_count: 'Egress Flow Count',
            acl: 'ACL',
            total_acl_rules: 'Total ACL Rules',
            interface_list: 'Interfaces',
            in_bytes: 'Total In Bytes',
            out_bytes: 'Total Out bytes',
            virtualmachine_list: 'Instances',
            encaps: 'Encaps',
            l2_encaps: 'L2 Encaps',
            out_tpkts: "Total Out packets",
            in_tpkts: "Total In packets",
            ingressFlowCount: "Ingress Flow Count",
            egressFlowCount: "Egress Flow Count",

            /* Monitor Infra */
            vrouter_routes_radio: 'Show Routes',

            /* Instance Details */
            cpu_one_min_avg: 'CPU Utilization (%)',
            rss: 'Used Memory',
            vm_memory_quota: 'Total Memory',
            vrouter: 'Virtual Router',
            vRouter: 'Virtual Router',
            vm_name: "Virtual Machine Name",
            vn: "Virtual Networks",
            virtual_network: "Virtual Network",

            /*Interface Details */
            uuid: 'UUID',
            mac_address: 'MAC Address',
            ip: 'IP Address',
            ip_address: 'IP Address',
            ip6_address: 'IPV6 Address',
            gateway: 'Gateway',
            label: 'Label',
            active: 'Active',
            l2_active: 'L2 Active',
            floatingIP: 'Floating IPs',

            /*Connected Network Details */
            src: 'Source Network',
            dst: 'Destination Network',
            service_inst: 'Service Instances',
            pkts: "Packets",

            /*Project Details*/
            intfCnt: "Interfaces",
            vnCnt: "Virtual Networks",
            inBytes: "Total In Bytes",
            outBytes: "Total Out Bytes",
            outTpkts: "Total Out Packets",
            inTpkts: "Total In Packets",
            throughput: "Total Throughput",

            /* PortDistribution */
            sport: 'Source Port',
            dport: 'Destination Port',

            /* Link Local Services */
            linklocal_service_name: 'Service Name',
            linklocal_service_ip: 'Service IP Address',
            linklocal_service_port: 'Service Port',
            ip_fabric_service_ip: 'Fabric IP',
            ip_fabric_service_port: 'Fabric Port',
            lls_fab_address_ip: 'Address Type',
            ip_fabric_DNS_service_name: 'Fabric DNS',
            /*DNS Server*/
            //dnsserver_name: 'Name',
            dnsserver_domain_name: 'Domain Name',
            dnsserver_forwarder: 'DNS Forwarder',
            dnsserver_record_resolution_order: 'Record Resolution Order',
            dnsserver_floating_ip_record: 'Floating IP Record',
            dns_time_to_live: 'Time To Live',
            dns_associate_ipams: 'Associate IPAMs',

            /*DNS Records*/
            dnsrecords_domain_name: 'Domain Name',
            dnsrecords_forwarder: 'DNS Forwarder',
            dnsrecords_record_resolution_order: 'Record Resolution Order',
            dnsrecords_floating_ip_record: 'Floating IP Record',
            dns_time_to_live: 'Time To Live',
            dns_associate_ipams: 'Associate IPAMs',

            /*Virtual Router Config*/
            virtual_router_type: "Type",
            physical_router_back_refs: "Physical Routers",
            virtual_router_ip_address: "IP Address",

            /* Underlay Labels */
            traceflow_radiobtn_name: '',
            traceFlowDropdown: '',

            /* Query */
            table_name: 'Table',
            time_range: 'Time Range',
            from_time_utc: 'From Time',
            to_time_utc: 'To Time',
            opsQueryId: 'Analytics QueryId',
            queryId: 'QueryId',
            startTime: 'Time Issued',
            timeTaken: 'Time Taken',
            filters: 'Filter'
        };

        this.TOP_CONTENT_CONTAINER = "top-content-container";
        this.BOTTOM_CONTENT_CONTAINER = "bottom-content-container";

        this.MONITOR_PROJECT_LIST_ID = "monitor-project-list";
        this.MONITOR_PROJECT_ID = "monitor-project";
        this.MONITOR_PROJECT_VIEW_ID = "monitor-project-view";
        this.MONITOR_PROJECT_PAGE_ID = "monitor-project-page";
        this.MONITOR_PROJECT_LIST_PAGE_ID = "monitor-project-list-page";
        this.MONITOR_PROJECT_LIST_VIEW_ID = "monitor-project-list-view";
        this.MONITOR_NETWORK_PAGE_ID = "monitor-network-page";
        this.MONITOR_NETWORK_LIST_PAGE_ID = "monitor-network-list-page";
        this.MONITOR_NETWORK_LIST_ID = "monitor-network-list";
        this.MONITOR_NETWORK_LIST_VIEW_ID = "monitor-network-list-view";
        this.MONITOR_NETWORK_ID = "monitor-network";
        this.MONITOR_NETWORK_VIEW_ID = "monitor-network-view";
        this.MONITOR_INSTANCE_LIST_ID = "monitor-instance-list";
        this.MONITOR_INSTANCE_PAGE_ID = "monitor-instance-page";
        this.MONITOR_INSTANCE_LIST_PAGE_ID = "monitor-instances-list-page";
        this.MONITOR_INSTANCE_LIST_VIEW_ID = "monitor-instance-list-view";
        this.MONITOR_INTERFACE_LIST_VIEW_ID = "monitor-interface-list-view";
        this.MONITOR_INSTANCE_ID = "monitor-instance";
        this.MONITOR_INSTANCE_VIEW_ID = "monitor-instance-view";
        this.MONITOR_FLOW_LIST_ID = "monitor-flow-list";
        this.MONITOR_FLOW_LIST_VIEW_ID = "monitor-flow-list-view";
        this.MONITOR_FLOWS_PAGE_ID = "monitor-flows-page";

        this.DOMAINS_BREADCRUMB_DROPDOWN = "domains-breadcrumb-dropdown";
        this.SASET_BREADCRUMB_DROPDOWN = "service-appliance-set-breadcrumb-dropdown";
        this.GLOBALSYS_BREADCRUMB_DROPDOWN = "global-system-config-breadcrumb-dropdown";

        this.PROJECTS_ID = "projects";
        this.PROJECT_GRAPH_ID = "project-graph";
        this.PROJECT_DETAILS_ID = "project-details";
        this.PROJECT_TABS_ID = "project-tabs";
        this.PROJECT_INSTANCE_GRID_ID = "project-instance-grid";
        this.PROJECTS_GRID_ID = "projects-grid";
        this.PROJECT_PORTS_SCATTER_CHART_ID = "project-ports-scatter-chart";
        this.PROJECT_NETWORKS_ID = "project-networks";
        this.PROJECT_NETWORK_GRID_ID = "project-network-grid";
        this.PROJECT_INSTANCES_ID = "project-instances";
        this.PROJECT_INTERFACES_ID = "project-interfaces";
        this.PROJECT_INTERFACE_GRID_ID = "project-interface-grid";
        this.PROJECTS_SCATTER_CHART_ID = "projects-scatter-chart";
        this.PROJECT_FLOW_GRID_ID = "project-flow-grid";
        this.PROJECT_FILTER_PROTOCOL_MULTISELECT_ID = "project-filter-protocol-multiselect-id";
        this.PROJECTS_BREADCRUMB_DROPDOWN = "projects-breadcrumb-dropdown";

        this.NETWORK_GRAPH_ID = "network-graph";
        this.NETWORKS_PORTS_SCATTER_CHART_ID = "networks-ports-scatter-chart";
        this.NETWORK_TABS_ID = "network-tabs";
        this.NETWORK_DETAILS_ID = "network-details";
        this.NETWORK_PORT_DIST_ID = "network-port-distribution";
        this.NETWORK_INSTANCES_ID = "network-instances";
        this.NETWORK_INTERFACES_ID = "network-interfaces";
        this.NETWORK_TRAFFIC_STATS_ID = "network-traffic-stats";
        this.NETWORK_PORT_HEAT_CHART_ID = "network-port-heat-chart";
        this.NETWORKS_BREADCRUMB_DROPDOWN = "networks-breadcrumb-dropdown";
        this.NETWORK_INTERFACE_GRID_ID = "network-interface-grid";

        this.INSTANCE_GRAPH_ID = "instance-graph";
        this.INSTANCES_CPU_MEM_CHART_ID = "instances-cpu-mem-chart";
        this.INSTANCE_TABS_ID = "instance-tabs";
        this.INSTANCE_DETAILS_ID = "instance-details";
        this.INSTANCE_TRAFFIC_STATS_ID = "instance-traffic-stats";
        this.INSTANCE_PORT_DIST_ID = "instance-port-dist";
        this.INSTANCE_CPU_MEM_STATS_ID = "instance-cpu-mem-stats";
        this.INSTANCE_TRAFFIC_STATS_DROPDOWN_ID = "instance-traffic-stats-dropdown";
        this.INSTANCE_PORT_DIST_DROPDOWN_ID = "instance-port-dist-dropdown";
        this.INSTANCE_TRAFFIC_STATS_CHART_ID = "instance-traffic-stats-chart";
        this.INSTANCE_PORT_DIST_CHART_ID = "instance-port-dist-chart";
        this.INSTANCE_PORT_HEAT_CHART_ID = "instance-port-heat-chart";
        this.INSTANCE_INTERFACE_GRID_ID = "instance-interface-grid";
        this.INSTANCE_INTERFACE_ID = "instance-interface";
        this.INSTANCE_BREADCRUMB_TEXT = "instance-breadcrumb-text";

        this.NETWORKING_GRAPH_ID = "networking-graph";
        this.GRAPH_CONNECTED_ELEMENTS_ID = "graph-connected-elements";
        this.GRAPH_CONFIG_ELEMENTS_ID = "graph-config-elements";
        this.GRAPH_LOADING_ID = "graph-loading";
        this.GRAPH_CONTROL_PANEL_ID = "graph-control-panel";

        this.MONITOR_CONNECTED_NETWORK_ID = "monitor-connected-network";
        this.MONITOR_CONNECTED_NETWORK_VIEW_ID = "monitor-connected-network-view";
        this.CONNECTED_NETWORK_TABS_ID = "connected-networks-tabs";
        this.CONNECTED_NETWORK_DETAILS_ID = "connected-network-details";
        this.CONNECTED_NETWORK_TRAFFIC_STATS_ID = "connected-network-traffic-stats";
        this.CONNECTED_NETWORK_TRAFFIC_STATS_DROPDOWN_ID = "connected-network-traffic-stats-dropdown";
        this.CONNECTED_NETWORK_TRAFFIC_STATS_CHART_ID = "connected-network-traffic-stats-chart";

        this.FLOWS_SCATTER_CHART_ID = "flows-scatter-chart";
        this.FLOWS_GRID_ID = "flows-grid";

        this.TITLE_PROJECTS = "Projects";
        this.TITLE_PROJECTS_SUMMARY = "Projects Summary";
        this.TITLE_PROJECT_DETAILS = "Project Details";


        this.TITLE_NETWORKS = "Networks";
        this.TITLE_NETWORKS_SUMMARY = "Networks Summary";
        this.TITLE_NETWORK_DETAILS = "Network Details";

        this.TITLE_INSTANCES = "Instances";
        this.TITLE_INSTANCES_SUMMARY = "Instances Summary";
        this.TITLE_INSTANCE_DETAILS = "Instance Details";

        this.TITLE_INTERFACES = "Interfaces";
        this.TITLE_INTERFACE_DETAILS = "Interface Details";
        this.TITLE_INTERFACES_SUMMARY = "Interfaces Summary";

        this.TITLE_CONNECTED_NETWORK_DETAILS = "Connected Network Details";

        this.TITLE_FLOW_SERIES = "Flow Series";
        this.TITLE_FLOWS_SUMMARY = "Flows Summary";
        this.TITLE_FILTER_PROTOCOL = "Filter Protocol";
        this.TITLE_FILTER_BY_PROTOCOL = "Filter by Protocol";

        this.TITLE_DETAILS = "Details";
        this.TITLE_VRF_STATS = "VRF Stats";
        this.TITLE_CPU_MEMORY_INFO = "CPU/Memory Information";
        this.TITLE_CPU_MEMORY = "CPU/Memory";
        this.TITLE_TRAFFIC_DETAILS = "Traffic Details";
        this.TITLE_FLOATING_IPS = "Floating IPs";
        this.TITLE_TRAFFIC_STATISTICS = "Traffic Statistics";
        this.TITLE_TRAFFIC_STATISTICS_IN = "Traffic Statistics In";
        this.TITLE_TRAFFIC_STATISTICS_OUT = "Traffic Statistics Out";
        this.TITLE_PORT_DISTRIBUTION = "Port Distribution";
        this.TITLE_PORT_MAP = "Port Map";

        this.TITLE_CPU = "CPU Share (%)";
        this.TITLE_CPU_LOAD = "CPU Load";
        this.TITLE_MEMORY = "Memory";

        /** Titles used in node details chart widget **/
        this.TITLE_CONTROLNODE_CPU_MEM_UTILIZATION = 'Control Node CPU/Memory Utilization';
        this.TITLE_VROUTER_AGENT_CPU_MEM_UTILIZATION = 'Virtual Router Agent CPU/Memory Utilization';
        this.TITLE_VROUTER_SYSTEM_CPU_MEM_UTILIZATION = 'System CPU/Memory Utilization';
        this.TITLE_VROUTER_BANDWIDTH_UTILIZATION = 'Physical Bandwidth Utilization';
        this.TITLE_ANALYTICS_COLLECTOR_CPU_MEM_UTILIZATION = 'Collector CPU/Memory Utilization';
        this.TITLE_ANALYTICS_QE_CPU_MEM_UTILIZATION = 'Query Engine CPU/Memory Utilization';
        this.TITLE_ANALYTICS_ANALYTICS_CPU_MEM_UTILIZATION = 'OpServer CPU/Memory Utilization';
        this.TITLE_CONFIGNODE_APISERVER_CPU_MEM_UTILIZATION = 'API Server CPU/Memory Utilization';
        this.TITLE_CONFIGNODE_SERVICE_MONITOR_CPU_MEM_UTILIZATION = 'Service Monitor CPU/Memory Utilization';
        this.TITLE_CONFIGNODE_SCHEMA_CPU_MEM_UTILIZATION = 'Schema CPU/Memory Utilization';
        this.TITLE_DATABASENODE_DISK_USAGE = 'Database Node Disk Space Usage';
        /**ENDS Titles used in node details chart widget **/

        this.X_AXIS_TITLE_PORT = "Port";
        this.Y_AXIS_TITLE_BW = "Bandwidth (Last 10 mins)";

        this.SOURCE_PORT = "Source Port";
        this.DESTINATION_PORT = "Destination Port";

        this.TITLE_GRAPH_ELEMENT_NETWORK_POLICY = 'network policy';
        this.TITLE_GRAPH_ELEMENT_SECURITY_GROUP = 'security group';
        this.TITLE_GRAPH_ELEMENT_NETWORK_IPAM = 'network ipam';
        this.TITLE_GRAPH_ELEMENT_SERVICE_INSTANCE = 'service instance';
        this.TITLE_GRAPH_ELEMENT_VIRTUAL_NETWORK = 'virtual network';
        this.TITLE_GRAPH_ELEMENT_VIRTUAL_MACHINE = 'virtual machine';
        this.TITLE_GRAPH_ELEMENT_CONNECTED_NETWORK = 'link';

        //Underlay labels
        this.UNDERLAY_TOPOLOGY_ID = 'underlay-topology';
        this.UNDERLAY_GRAPH_ID = "underlay-graph";
        this.URL_UNDERLAY_TOPOLOGY = '/api/tenant/networking/underlay-topology';
        this.URL_UNDERLAY_TOPOLOGY_REFRESH = this.URL_UNDERLAY_TOPOLOGY + '?forceRefresh';
        this.TMPL_UNDERLAY_GRAPH_VIEW = 'underlay-graph-template';
        this.UNDERLAY_CONTROLPANEL = 'underlay-controlpanel';
        this.TITLE_GRAPH_ELEMENT_PHYSICAL_ROUTER = 'Physical Router';
        this.TITLE_GRAPH_ELEMENT_VIRTUAL_ROUTER = 'Virtual Router';
        this.UNDERLAY_VIEWPATH_PREFIX = 'monitor/infrastructure/underlay/ui/js/views/';
        this.UNDERLAY_TRACEFLOW_TITLE = 'Trace Flows';
        this.UNDERLAY_PROUTER_INTERFACES_TITLE = 'Interfaces';
        this.UNDERLAY_PROUTER_DETAILS = 'Physical Router Details';
        this.UNDERLAY_SEARCHFLOW_TITLE = 'Map Flows';
        this.UNDERLAY_TRAFFIC_STATISTICS = 'Traffic Statistics';
        this.UNDERLAY_SEARCHFLOW_WIDGET_TITLE = 'Query Flow Records';


        //Monitor Infra common
        this.MONITOR_INFRA_VIEW_PATH = 'monitor/infrastructure/common/ui/js/views/';

        this.VROUTER_DASHBOARD_CHART_ID = 'vrouter-dashboard-chart';
        this.VROUTER_DASHBOARD_SPARKLINE_ID = 'vrouter-dashboard-sparkline';
        this.VROUTER_DASHBOARD_SECTION_ID = 'vrouter-dashboard-section';

        //Config node labels
        this.CONFIGNODE_VIEWPATH_PREFIX = 'monitor/infrastructure/confignode/ui/js/views/';
        this.CONFIGNODE_SUMMARY_PAGE_ID = 'monitor-config-nodes';
        this.CONFIGNODE_SUMMARY_URL = '/api/admin/monitor/infrastructure/confignodes/summary';
        this.CONFIGNODE_SUMMARY_TITLE = 'Config Nodes';
        this.CONFIGNODE_SUMMARY_GRID_ID = 'config-nodes-grid';
        this.CONFIGNODE_SUMMARY_SCATTERCHART_ID = 'config-nodes-scatterchart';
        this.CONFIGNODE_SUMMARY_GRID_SECTION_ID = "config-nodes-grid-section";
        this.CONFIGNODE_SUMMARY_CHART_ID = 'config-nodes-chart';
        this.CONFIGNODE_SUMMARY_LIST_SECTION_ID = 'config-nodes-list-section';
        this.CONFIGNODE_SUMMARY_SCATTERCHART_SECTION_ID = 'config-nodes-scatterchart-section';
        this.CONFIGNODE_DETAILS_PAGE_ID = 'config_nodes_details_pages';
        this.CONFIGNODE_TAB_SECTION_ID = 'config_node_tab_section';
        this.CONFIGNODE_TAB_VIEW_ID = 'config_node_tab';
        this.CONFIGNODE_DETAILS_SECTION_ID = 'config_node_details_section';
        this.CONFIGNODE_TABS_ID = 'config_node_tab'
        this.CACHE_CONFIGNODE = 'cache-config-nodes';
        this.CONFIGNODE_DETAILS_APISERVER_CHART_SECTION_ID = 'config_node_details_apiserver_agent_chart_section';
        this.CONFIGNODE_DETAILS_APISERVER_LINE_CHART_ID = 'config_node_details_apiserver_line_chart';
        this.CONFIGNODE_DETAILS_SERVICE_MONITOR_CHART_SECTION_ID = 'config_node_details_service_monitor_chart_section';
        this.CONFIGNODE_DETAILS_SERVICE_MONITOR_LINE_CHART_ID = 'config_node_details_service_monitor_line_chart';
        this.CONFIGNODE_DETAILS_SCHEMA_CHART_SECTION_ID = 'config_node_details_schema_chart_section';
        this.CONFIGNODE_DETAILS_SCHEMA_LINE_CHART_ID = 'config_node_details_schema_line_chart';
        this.CONFIGNODE_DETAILS_APISERVER_CHART_WIDGET = 'config_node_details_apiserver_chart_widget';
        this.CONFIGNODE_DETAILS_SERVICE_MONITOR_CHART_WIDGET = 'config_node_details_service_monitor_chart_widget';
        this.CONFIGNODE_DETAILS_SCHEMA_CHART_WIDGET = 'config_node_details_schema_chart_widget';
        this.CONFIGNODE_CONSOLE_LOGS_VIEW_ID =
            'config_node_console_logs_view';
        this.CONFIGNODE_ALARMS_GRID_VIEW_ID = "config_node_alarms_grid_view_id";
        this.CONFIG_NODE_ALARMS_GRID_SECTION_ID = "config_node_alarm_grid_section_id";

        //Control node labels
        this.CONTROLNODE_VIEWPATH_PREFIX =
            'monitor/infrastructure/controlnode/ui/js/views/';
        this.CONTROLNODE_SUMMARY_PAGE_ID = 'monitor-control-nodes';
        this.CONTROLNODE_SUMMARY_URL =
            '/api/admin/monitor/infrastructure/controlnodes/summary';
        this.CONTROLNODE_SUMMARY_TITLE = 'Control Nodes';
        this.CONTROLNODE_SUMMARY_GRID_ID = 'control-nodes-grid';
        this.CONTROLNODE_SUMMARY_SCATTERCHART_ID =
            'control-nodes-scatterchart';
        this.CONTROLNODE_SUMMARY_GRID_SECTION_ID =
            "control-nodes-grid-section";
        this.CONTROLNODE_SUMMARY_CHART_ID = 'control-nodes-chart';
        this.CONTROLNODE_SUMMARY_LIST_SECTION_ID =
            'control-nodes-list-section';
        this.CONTROLNODE_SUMMARY_SCATTERCHART_SECTION_ID =
            'control-nodes-scatterchart-section';
        this.CACHE_CONTROLNODE = 'cache-control-nodes';

        this.CONTROLNODE_DETAILS_PAGE_ID = 'control_nodes_details';
        this.CONTROLNODE_DETAIL_PAGE_ID =
            'control_nodes_detail_page'
        this.CONTROLNODE_DETAILS_CHART_SECTION_ID =
            'control_nodes_details_chart_section';
        this.CONTROLNODE_TAB_SECTION_ID =
            'control_nodes_tab_section';
        this.CONTROLNODE_TAB_VIEW_ID = 'control_nodes_tab_view';
        this.CONTROLNODE_DETAILS_TABS_ID =
            'control_nodes_details-tab';
        this.CONTROLNODE_DETAILS_LINE_CHART_ID =
            'control_node_details_chart';
        this.CONTROLNODE_DETAILS_CHART_WIDGET =
            'controlnode-details-chart-widget';

        this.CONTROLNODE_PEERS_GRID_SECTION_ID =
            'control_node_peers_grid_section_id';
        this.CONTROLNODE_PEERS_GRID_VIEW_ID =
            'control_node_peers_id';
        this.CONTROLNODE_PEERS_GRID_ID =
            "control_node_peers_grid_id";
        this.CONTROLNODE_PEERS_TITLE = "Peers";
        this.CONTROLNODE_ROUTES_GRID_VIEW_ID =
            'control_node_routes_grid_view';
        this.CONTROLNODE_CONSOLE_LOGS_VIEW_ID =
            'control_node_console_logs_view';
        this.CONTROLNODE_ROUTES_ID = 'control_node_routes';
        this.CONTROLNODE_ROUTES_GRID_ID = 'control_node_route_grid';
        this.CONTROLNODE_ROUTES_RESULT_VIEW =
            'control_node_route_results_view';
        this.CONTROLNODE_ROUTES_RESULTS = 'controlroutes-results';
        this.CONTROLNODE_ALARMS_GRID_VIEW_ID =
            "control_node_alarms_grid_view_id";
        this.CONTROL_NODE_ALARMS_GRID_SECTION_ID =
            "control_node_alarms_grid_section_id";

        //vRouter summary page labels
        this.VROUTER_VIEWPATH_PREFIX =
            'monitor/infrastructure/vrouter/ui/js/views/';
        this.VROUTER_SUMMARY_PAGE_ID = 'monitor-vrouter-nodes';
        this.VROUTER_SUMMARY_URL =
            '/api/admin/monitor/infrastructure/vrouters/summary';
//            'vRouters_1000_latest.json';
        this.VROUTER_SUMMARY_TITLE = 'Virtual Routers';
        this.VROUTER_SUMMARY_GRID_ID = 'vrouter-nodes-grid';
        this.VROUTER_SUMMARY_CROSSFILTER_ID =
            'vrouter-nodes-corssfilter';
        this.VROUTER_SUMMARY_SCATTERCHART_ID =
            'vrouter-nodes-scatterchart';
        this.VROUTER_SUMMARY_GRID_SECTION_ID =
            "vrouter-nodes-grid-section";
        this.VROUTER_SUMMARY_CHART_ID = 'vrouter-nodes-chart';
        this.VROUTER_SUMMARY_LIST_SECTION_ID =
            'vrouter-nodes-list-section';
        this.VROUTER_SUMMARY_SCATTERCHART_SECTION_ID =
            'vrouter-nodes-scatterchart-section';
        this.CACHE_VROUTER = 'cache-vrouter-nodes';
        this.VROUTER_TAB_SEARCH_PREFIX = 'Search';
        this.VROUTER_TAB_SECTION_ID = 'vrouter_tab_section';
        this.VROUTER_TAB_VIEW_ID = 'vrouter_tab_view';
        this.VROUTER_DETAILS_PAGE_ID = 'vrouter_details';
        this.VROUTER_DETAILS_SECTION_ID = 'vrouter_details_section';
        this.VROUTER_DETAILS_TABS_ID = 'vrouter_details_tab';
        this.VROUTER_DETAIL_ID = 'vrouter_detail_id;'
        this.VROUTER_DETAILS_AGENT_CHART_SECTION_ID =
            'vrouter_details_vrouter_agent_chart_section';
        this.VROUTER_DETAILS_AGENT_LINE_CHART_ID =
            'vrouter_details_agent_line_chart';
        this.VROUTER_DETAILS_SYSTEM_CHART_SECTION_ID =
            'vrouter_details_system_chart_section';
        this.VROUTER_DETAILS_SYSTEM_LINE_CHART_ID =
            'vrouter_details_system_line_chart';
        this.VROUTER_DETAILS_BANDWIDTH_CHART_SECTION_ID =
            'vrouter_details_bandwidth_chart_section';
        this.VROUTER_DETAILS_BANDWIDTH_LINE_CHART_ID =
            'vrouter_details_bandwidth_line_chart';
        this.VROUTER_DETAILS_AGENT_CHART_WIDGET =
            'vrouter_details_agent_chart_widget';
        this.VROUTER_DETAILS_SYSTEM_CHART_WIDGET =
            'vrouter_details_system_chart_widget';
        this.VROUTER_DETAILS_BANDWIDTH_CHART_WIDGET =
            'vrouter_details_bandwidth_chart_widget';

        // this.VROUTER_NETWORKS_GRID_SECTION_ID = 'vrouter_networks_grid_section_id';
        this.VROUTER_NETWORKS_GRID_VIEW_ID = 'vrouter_networks_id';
        this.VROUTER_NETWORKS_TITLE = "Networks";
        this.VROUTER_NETWORKS_RESULTS_VIEW = 'vrouter_networks_results_view';
        this.VROUTER_NETWORKS_RESULTS = 'vrouter_networks-results';
        this.VROUTER_NETWORKS_PREFIX = 'vrouter_networks';
        this.VROUTER_NETWORKS_GRID_ID = this.VROUTER_NETWORKS_PREFIX + '-results';
        this.VROUTER_NETWORKS_TAB_IDX = 2;

        // this.VROUTER_INTERFACES_GRID_SECTION_ID = 'vrouter_interfaces_grid_section_id';
        this.VROUTER_INTERFACES_GRID_VIEW_ID = 'vrouter_interfaces_id';
        this.VROUTER_INTERFACES_TITLE = "Interfaces";
        this.VROUTER_INTERFACES_RESULTS_VIEW = 'vrouter_interfaces_results_view';
        this.VROUTER_INTERFACES_RESULTS = 'vrouter_interfaces-results';
        this.VROUTER_INTERFACES_PREFIX = 'vrouter_interfaces';
        this.VROUTER_INTERFACES_GRID_ID = this.VROUTER_INTERFACES_PREFIX + '-results';
        this.VROUTER_INTERFACES_TAB_IDX = 1;

        this.VROUTER_ROUTES_PREFIX = 'vrouter_routes';

        // this.VROUTER_ROUTES_GRID_SECTION_ID = 'vrouter_routes_grid_section_id';
        this.VROUTER_ROUTES_TITLE = "Routes";
        this.VROUTER_ROUTES_RESULTS_VIEW = 'vrouter_routes_results_view';
        this.VROUTER_ROUTES_RESULTS = 'vrouter_routes-results';
        this.VROUTER_ROUTES_PREFIX = 'vrouter_routes';
        this.VROUTER_ROUTES_GRID_ID = this.VROUTER_ROUTES_PREFIX + '-results';
        this.VROUTER_ROUTES_TAB_IDX = 5;

        // this.VROUTER_ACL_GRID_SECTION_ID = 'vrouter_acl_grid_section_id';
        this.VROUTER_ACL_GRID_VIEW_ID = 'vrouter_acl_id';
        this.VROUTER_ACL_TITLE = "ACL";
        this.VROUTER_ACL_RESULTS_VIEW = 'vrouter_acl_results_view';
        this.VROUTER_ACL_RESULTS = 'vrouter_acl-results';
        this.VROUTER_ACL_PREFIX = 'vrouter_acl';
        this.VROUTER_ACL_GRID_ID = this.VROUTER_ACL_PREFIX + '-results';
        this.VROUTER_ACL_TAB_IDX = 3;

        // this.VROUTER_FLOWS_GRID_SECTION_ID = 'vrouter_flows_grid_section_id';
        this.VROUTER_FLOWS_GRID_VIEW_ID = 'vrouter_flows_id';
        this.VROUTER_FLOWS_TITLE = "Flows";
        this.VROUTER_FLOWS_RESULTS_VIEW = 'vrouter_flows_results_view';
        this.VROUTER_FLOWS_RESULTS = 'vrouter_flows-results';
        this.VROUTER_FLOWS_PREFIX = 'vrouter_flows';
        this.VROUTER_FLOWS_GRID_ID = this.VROUTER_FLOWS_PREFIX + '-results';
        this.VROUTER_FLOWS_TAB_IDX = 4;

        this.VROUTER_ALARMS_GRID_VIEW_ID = "vrouter_alarms_grid_view_id";
        this.VROUTER_ALARMS_GRID_SECTION_ID = "vrouter_alarms_grid_section_id";

        this.VROUTER_INSTANCE_GRID_ID = 'vrouter_instances_grid';

        this.VROUTER_CONSOLE_LOGS_VIEW_ID =
            'vrouter_console_logs_view';

        //Database node labels
        this.DATABASENODE_VIEWPATH_PREFIX =
            'monitor/infrastructure/databasenode/ui/js/views/';

        //Database node summary page labels
        this.DATABASENODE_SUMMARY_PAGE_ID =
            'monitor-database-nodes';
        this.DATABASENODE_SUMMARY_URL =
            '/api/admin/monitor/infrastructure/dbnodes/summary';
        this.DATABASENODE_SUMMARY_TITLE = 'Database Nodes';
        this.DATABASENODE_SUMMARY_GRID_ID = 'database-nodes-grid';
        this.DATABASENODE_SUMMARY_SCATTERCHART_ID =
            'database-nodes-scatterchart';
        this.DATABASENODE_SUMMARY_GRID_SECTION_ID =
            "database-nodes-grid-section";
        this.DATABASENODE_SUMMARY_CHART_ID = 'database-nodes-chart';
        this.DATABASENODE_SUMMARY_LIST_SECTION_ID =
            'database-nodes-list-section';
        this.DATABASENODE_SUMMARY_SCATTERCHART_SECTION_ID =
            'database-nodes-scatterchart-section';
        this.DATABASENODE_DETAILS_PAGE_ID =
            'database_nodes_details_pages';
        this.DATABASENODE_TAB_SECTION_ID =
            'database_node_tab_section';
        this.DATABASENODE_TAB_VIEW_ID = 'database_node_tab';
        this.DATABASENODE_DETAILS_SECTION_ID =
            'database_node_details_section';
        this.DATABASENODE_DETAILS_CHART_SECTION_ID =
            'database_details_chart_section';
        this.DATABASENODE_DETAILS_LINE_CHART_ID =
            'database_details_line_chart';
        this.DATABASENODE_DETAILS_CHART_WIDGET =
            'database_details_chart_widget';
        this.DATABASENODE_TABS_ID = 'database_node_tabs';
        this.DATABASENODE_ALARMS_GRID_VIEW_ID = "database_node_alarms_grid_view_id";
        this.DATABASE_NODE_ALARMS_GRID_SECTION_ID = "database_node_alarm_grid_section_id";

        this.CACHE_DATABASENODE = 'cache-database-nodes';

        //Analytics node labels
        this.ANALYTICSNODE_VIEWPATH_PREFIX =
            'monitor/infrastructure/analyticsnode/ui/js/views/';
        this.ANALYTICSNODE_SUMMARY_PAGE_ID =
            'monitor-analytics-nodes';
        this.ANALYTICSNODE_SUMMARY_URL =
            '/api/admin/monitor/infrastructure/analyticsnodes/summary';
        this.ANALYTICSNODE_SUMMARY_TITLE = 'Analytics Nodes';
        this.ANALYTICSNODE_SUMMARY_GRID_ID = 'analytics-nodes-grid';
        this.ANALYTICSNODE_SUMMARY_SCATTERCHART_ID =
            'analytics-nodes-scatterchart';
        this.ANALYTICSNODE_SUMMARY_GRID_SECTION_ID =
            "analytics-nodes-grid-section";
        this.ANALYTICSNODE_SUMMARY_CHART_ID =
            'analytics-nodes-chart';
        this.ANALYTICSNODE_SUMMARY_LIST_SECTION_ID =
            'analytics-nodes-list-section';
        this.ANALYTICSNODE_SUMMARY_SCATTERCHART_SECTION_ID =
            'analytics-nodes-scatterchart-section';
        this.CACHE_ANALYTICSNODE = 'cache-analytics-nodes';
        this.ANALYTICSNODE_DETAILS_PAGE_ID =
            'analytics_nodes_details';
        this.ANALYTICSNODE_TAB_SECTION_ID =
            'analytics_nodes_tab_section';
        this.ANALYTICSNODE_TAB_VIEW_ID = 'analytics_nodes_tab_view';
        this.ANALYTICSNODE_TABS_ID = 'analytics_nodes_tab';
        this.ANALYTICSNODE_DETAILS_SECTION_ID =
            'analytics_nodes_detail_section';
        this.ANALYTICSNODE_DETAIL_PAGE_ID =
            'analytics_node_detail_page';
        this.ANALYTICSNODE_DETAILS_COLLECTOR_CHART_SECTION_ID =
            'analytics_node_details_vrouter_collector_chart_section'
        this.ANALYTICSNODE_DETAILS_COLLECTOR_LINE_CHART_ID =
            'analytics_node_details_collector_line_chart';
        this.ANALYTICSNODE_DETAILS_QE_CHART_SECTION_ID =
            'analytics_node_details_qe_chart_section';
        this.ANALYTICSNODE_DETAILS_QE_LINE_CHART_ID =
            'analytics_node_details_qe_line_chart';
        this.ANALYTICS_DETAILS_COLLECTOR_CHART_WIDGET =
            'analytics_node_details_collector_chart_widget';
        this.ANALYTICS_DETAILS_QE_CHART_WIDGET =
            'analytics_node_details_qe_chart_widget';
        this.ANALYTICS_DETAILS_ANALYTICS_CHART_WIDGET =
            'analytics_node_details_analytics_chart_widget';

        this.ANALYTICSNODE_GENERATORS_GRID_SECTION_ID = 'analytics_node_generators_grid_section';
        this.ANALYTICSNODE_GENERATORS_GRID_ID = 'analytics_node_generators_grid';
        this.ANALYTICSNODE_GENERATORS_TITLE = 'Generators';
        this.ANALYTICSNODE_QEQUERIES_GRID_ID = 'analytics_node_qequeries_grid';
        this.ANALYTICSNODE_QEQUERIES_TITLE = 'QE Queries';
        this.ANALYTICSNODE_CONSOLE_LOGS_VIEW_ID =
            'analytics_node_console_logs_view';
        this.ANALYTICSNODE_ALARMS_GRID_VIEW_ID = "analytics_node_alarms_grid_view_id";
        this.ANALYTICS_NODE_ALARMS_GRID_SECTION_ID = "analytics_node_alarms_grid_section_view_id";

        this.TMPL_CORE_GENERIC_EDIT = 'core-generic-edit-form-template';
        this.TMPL_CORE_GENERIC_DEL = 'core-generic-delete-form-template';

        this.CONFIG_LINK_LOCAL_SERVICES_PAGE_ID = 'config-link-local-services-page';
        this.CONFIG_LINK_LOCAL_SERVICES_LIST_VIEW_ID = 'config-link-local-services-list';
        this.CONFIG_LINK_LOCAL_SERVICES_SECTION_ID = 'lls';
        this.CONFIG_LINK_LOCAL_SERVICES_ID = 'config-link-local-services';
        this.TITLE_LINK_LOCAL_SERVICES = 'Link Local Services';
        this.LINK_LOCAL_SERVICES_GRID_ID = 'link-local-services-grid';
        this.LINK_LOCAL_SERVICES_PREFIX_ID = 'link_local_services';
        this.TITLE_CREATE_LLS = 'Create Link Local Service';
        this.TITLE_DEL_LLS = 'Delete Link Local Service';
        this.TITLE_EDIT_LLS = 'Edit Link Local Service';
        this.LINK_LOCAL_SERVICE_DETAILS = 'Link Local Service Details';

        //Physical Routers labels
        this.CONFIG_PHYSICAL_ROUTERS_PAGE_ID = "config-physical-routers-page";
        this.CONFIG_PHYSICAL_ROUTERS_LIST_ID = "config-physical-routers-list";
        this.CONFIG_PHYSICAL_ROUTERS_SECTION_ID = "config-physical-routers-section";
        this.CONFIG_PHYSICAL_ROUTERS_ID = "config-physical-routers";
        this.TITLE_PHYSICAL_ROUTERS = "Physical Routers";
        this.CONFIG_PHYSICAL_ROUTERS_LIST_VIEW_ID = "config-physical-routers-list-view";
        this.PHYSICAL_ROUTERS_GRID_ID = "physical-routers-grid";
        this.TITLE_ADD_PHYSICAL_ROUTER = "Add Physical Router";
        this.CREATE_OVSDB_MANAGED_TOR = "OVSDB Managed ToR";
        this.TITLE_OVSDB_MANAGED_TOR = "Add OVSDB Managed ToR";
        this.CREATE_NETCONF_MANAGED_PHYSICAL_ROUTER = "Netconf Managed Physical Router";
        this.TITLE_NETCONF_MANAGED_TOR = "Add Netconf Managed Physical Router";
        this.CREATE_CPE_ROUTER = "vCPE Router";
        this.CREATE_PHYSICAL_ROUTER = "Physical Router";
        this.PHYSICAL_ROUTER_ADD = "Add";
        this.PHYSICAL_ROUTER_PREFIX_ID = 'physical_router';
        this.SELECT_ENTER_TOR_AGENT_NAME = "Select or Enter TOR Agent Name";
        this.SELECT_ENTER_TSN_NAME = "Select or Enter TSN Name";
        this.SNMP_AUTH = "auth";
        this.SNMP_AUTHPRIV = "authpriv";
        this.TITLE_PHYSICAL_ROUTER_PROPERTIES = "Physical Router Properties";
        this.TITLE_NETCONF_SETTINGS = "Netconf Settings";
        this.TITLE_SNMP_SETTINGS = "SNMP Settings";
        this.OVSDB_ACCORDION = "ovsdb_accordion";
        this.OVSDB_SNMP_SECTION = "OVSDB_snmp_section";
        this.OVSDB_SNMP_SECTION_TITLE = "SNMP Settings";
        this.OVSDB_V2_VERSION_ID = "v2_version_content";
        this.OVSDB_V3_VERSION_ID = "v3_version_content";
        this.TITLE_EDIT_OVSDB_MANAGED_TOR = "Edit OVSDB Managed ToR";
        this.TITLE_DELETE_CONFIG = "Delete";
        this.OVSDB_TYPE = "ovsdb";
        this.NET_CONF_TYPE = 'netconf';
        this.CPE_ROUTER_TYPE = 'cpe';
        this.PHYSICAL_ROUTER_TYPE = 'prouter';
        this.TITLE_EDIT_NETCONF_MANAGED_PR = 'Edit Netconf Managed Physical Router';
        this.TITLE_CPE_ROUTER = "Add vCPE Router";
        this.TITLE_EDIT_VCPE_ROUTER = "Edit VCPE";
        this.CREATE_ACTION = "create";
        this.EDIT_ACTION = "edit";
        this.ASSOCIATED_VR_ACCORDION = "associated_vr_accordion";
        this.ASSOCIATED_VR_SECTION = "associated_vr_section";
        this.ASSOCIATED_VR_TITLE = "Associated Virtual Routers";
        this.TOR_AGENT_SECTION = "tor_agent_section";
        this.NETCONF_SETTINGS_SECTION = 'netconf_settings_section';
        this.NETCONF_SETTINGS_TITLE = 'Netconf Settings';
        this.TOR_AGENT = "TOR Agent";
        this.TITLE_EDIT_PHYSICAL_ROUTER = "Edit Physical Router";
        this.TITLE_PHYSICAL_ROUTER_DELETE = 'Delete Physical Router';
        this.TITLE_PHYSICAL_ROUTER_MULTI_DELETE = 'Delete Physical Router(s)';

        // VRouter Config labels
        this.CFG_VROUTER_PAGE_ID = 'config-vrouter-page';
        this.CFG_VROUTER_LIST_ID = 'config-vrouter-list';
        this.CFG_VROUTER_LIST_VIEW_ID = 'config-vrouter-list-view';
        this.CFG_VROUTER_GRID_ID = 'config-vrouter-grid';
        this.CFG_VROUTER_PREFIX_ID = 'config_vrouter';
        this.CFG_VROUTER_TITLE = 'Virtual Routers';
        this.CFG_VROUTER_TITLE_SUMMARY = 'Virtual Routers Summary';
        this.CFG_VROUTER_TITLE_DETAILS = 'Virtual Router Details';
        this.CFG_VROUTER_TITLE_EDIT = 'Edit Virtual Router';
        this.CFG_VROUTER_TITLE_CREATE = 'Create Virtual Router';
        this.CFG_VROUTER_TITLE_DELETE = 'Delete Virtual Router';
        this.CFG_VROUTER_TITLE_MULTI_DELETE = 'Delete Virtual Router(s)';

        // IPAM Config labels
        this.CFG_IPAM_PAGE_ID = 'config-ipam-page';
        this.CFG_IPAM_LIST_ID = 'config-ipam-list';
        this.CFG_IPAM_LIST_VIEW_ID = 'config-ipam-list-view';
        this.CFG_IPAM_GRID_ID = 'config-ipam-grid';
        this.CFG_IPAM_PREFIX_ID = 'IPAM';
        this.CFG_IPAM_TITLE = 'IP Address Management';
        this.CFG_IPAM_TITLE_SUMMARY = 'IPAM Summary';
        this.CFG_IPAM_TITLE_DETAILS = 'Details';
        this.CFG_IPAM_TITLE_EDIT = 'IP Address Mgmt';
        this.CFG_IPAM_TITLE_CREATE = 'Create IPAM';
        this.CFG_IPAM_TITLE_DELETE = 'Delete IPAM';
        this.CFG_IPAM_TITLE_MULTI_DELETE = 'Delete IPAM(s)';

        // FIP Config labels
        this.CFG_FIP_PAGE_ID = 'config-fip-page';
        this.CFG_FIP_LIST_ID = 'config-fip-list';
        this.CFG_FIP_LIST_VIEW_ID = 'config-fip-list-view';
        this.CFG_FIP_GRID_ID = 'config-fip-grid';
        this.CFG_FIP_PREFIX_ID = 'fip';
        this.CFG_FIP_TITLE = 'Floating IPs';
        this.CFG_FIP_TITLE_SUMMARY = 'Floating IP Summary';
        this.CFG_FIP_TITLE_DETAILS = 'Details';
        this.CFG_FIP_TITLE_ALLOCATE = 'Allocate Floating IP';
        this.CFG_FIP_TITLE_RELEASE = 'Release Floating IP(s)';
        this.CFG_FIP_TITLE_ASSOCIATE = 'Associate Floating IP to Port';
        this.CFG_FIP_TITLE_DISASSOCIATE = 'Disassociate Floating IP';

        // SVC TEMPLATE Config labels
        this.CFG_SVC_TEMPLATE_PAGE_ID = 'config-svc-template-page';
        this.CFG_SVC_TEMPLATE_LIST_ID = 'config-svc-template-list';
        this.CFG_SVC_TEMPLATE_LIST_VIEW_ID = 'config-svc-template-list-view';
        this.CFG_SVC_TEMPLATE_GRID_ID = 'config-svc-template-grid';
        this.CFG_SVC_TEMPLATE_PREFIX_ID = 'service_template';
        this.CFG_SVC_TEMPLATE_TITLE = 'Service Templates';
        this.CFG_SVC_TEMPLATE_TITLE_SUMMARY = 'Service Templates Summary';
        this.CFG_SVC_TEMPLATE_TITLE_DETAILS = 'Details';
        this.CFG_SVC_TEMPLATE_TITLE_CREATE = 'Create Service Template';
        this.CFG_SVC_TEMPLATE_TITLE_DELETE = 'Delete Service Template';
        this.CFG_SVC_TEMPLATE_TITLE_MULTI_DELETE = 'Delete Service Template(s)';

        /* Quotas */
        this.TITLE_QUOTAS = 'Project Quotas';
        this.CONFIG_QUOTAS_PAGE_ID = 'config-quotas-page';
        this.CONFIG_QUOTAS_SECTION_ID = 'config-quotas-section';
        this.CONFIG_QUOTAS_ID = 'config-quotas';
        this.QUOTAS_GRID_ID = 'quotas-grid';
        this.QUOTAS_PREFIX_ID = 'quotas';
        this.TITLE_EDIT_QUOTAS = 'Edit Project Quotas';

        /* Global Config */
        this.CONFIG_GLOBAL_CONFIG_PAGE_ID = 'config-global-config-page';
        this.CONFIG_GLOBAL_CONFIG_SECTION_ID = 'config-global-config-section';
        this.CONFIG_GLOBAL_CONFIG_ID = 'config-global-config';
        this.GLOBAL_CONFIG_GRID_ID = 'global-config-grid';
        this.GLOBAL_CONFIG_PREFIX_ID = 'global_config';
        this.TITLE_EDIT_GLOBAL_CONFIG = 'Edit Global Config';
        this.TITLE_GLOBAL_CONFIG = 'Global Config';

        /* Security Group */
        this.CONFIG_SEC_GRP_PAGE_ID = 'config-sec—grppage';
        this.CONFIG_SEC_GRP_LIST_VIEW_ID = 'config-sec—grplist';
        this.CONFIG_SEC_GRP_SECTION_ID = 'secGrp';
        this.CONFIG_SEC_GRP_ID = 'config-sec-grp';
        this.TITLE_SEC_GRP = 'Security Groups';
        this.SEC_GRP_GRID_ID = 'sec—grp-grid';
        this.SEC_GRP_PREFIX_ID = 'security_group';
        this.TITLE_CREATE_SEC_GRP = 'Create Security Group';
        this.TITLE_DEL_SEC_GRP = 'Delete Security Group';
        this.TITLE_EDIT_SEC_GRP = 'Edit Security Group';
        this.SEC_GRP_DETAILS = 'Security Group Details';

        /* Service Instance */
        this.CONFIG_SERVICE_INSTANCES_PAGE_ID = 'config-service-instances-page';
        this.CONFIG_SERVICE_INSTANCES_LIST_VIEW_ID = 'config-service-instances-list';
        this.CONFIG_SERVICE_INSTANCES_SECTION_ID = 'svcInst';
        this.CONFIG_SERVICE_INSTANCES_ID = 'config-service-instances';
        this.TITLE_SERVICE_INSTANCES = 'Service Instances';
        this.SERVICE_INSTANCES_GRID_ID = 'service-instances-grid';
        this.SERVICE_INSTANCES_PREFIX_ID = 'service_instance';
        this.TITLE_CREATE_SERVICE_INSTANCE = 'Create Service Instance';
        this.TITLE_ADD_SERVICE_INSTANCE = 'Add Service Instance';
        this.TITLE_DEL_SERVICE_INSTANCES = 'Delete Service Instance';
        this.TITLE_EDIT_SERVICE_INSTANCE = 'Edit Service Instance';
        this.SVC_INST_DETAILS = 'Service Instance Details';

        //Interfaces
        this.CONFIG_INTERFACES_LIST_ID = "config-interfaces-list";
        this.PROUTER_BREADCRUMB_DROPDOWN = "prouter-breadcrumb-dropdown";
        this.PROUTER_KEY = "prouter";
        this.NO_PROUTER_FOUND = "No Physical Router found";
        this.CONFIG_INTERFACES_SECTION_ID = "config-interfaces-section";
        this.CONFIG_INTERFACES_ID = "config-interfaces";
        this.TITLE_INTERFACES = "Interfaces";
        this.INF_VIEW_PATH_PREFIX = "config/physicaldevices/interfaces/ui/js/views/";
        this.CONFIG_INTERFACES_LIST_VIEW_ID = "config-interfaces-list";
        this.INTERFACES_GRID_ID = "interfaces-grid";
        this.TITLE_ADD_INTERFACE = "Add Interface";
        this.INTERFACE_PREFIX_ID = "interface"
        this.LOGICAL_INF_ACCORDION = "logical_inf_accordion";
        this.LOGICAL_INF_SECTION = "logical_inf_section";
        this.LOGICAL_INF_SECTION_TITLE = "Logical Interface Properties";
        this.ENTER_SERVER = "Enter or Choose mac";
        this.TITLE_EDIT_INF = "Edit Interface";
        this.PHYSICAL_INF = "physical";
        this.LOGICAL_INF = "logical";
        this.LOGICAL_INF_L2_TYPE = 'l2';
        this.LOGICAL_INF_L3_TYPE = 'l3';
        this.VLAN = 'logical_interface_vlan_tag';
        this.LOGICAL_INF_TYPE = 'logical_interface_type';
        this.TITLE_DELETE_ALL_CONFIG = "Delete All";
        this.BM_CLEAR_VMI = "bm_clear_vmi";
        this.INF_PROPERTIES = 'Interface Properties';
        this.INF_ED_TMPL = 'BlockListTemplateGenerator';
        this.INF_TG = 'TextGenerator';
        this.IP_PH = 'Auto Allocate or Enter an IP';
        this.PARENT_TYPE_PROUTER = 'physical-router';
        this.PARENT_TYPE_PINF = 'physical-interface';
        this.TITLE_INTERFACE_DELETE = 'Delete Interface';
        this.TITLE_INTERFACE_MULTI_DELETE = 'Delete Interface(s)';

        //BGP Router labels
        this.CONFIG_BGP_LIST_ID = "config-bgp-list";
        this.BGP_GRID_ID = "bgp-grid";
        this.CONFIG_BGP_SECTION_ID = "config-bgp-section";
        this.CONFIG_BGP_LIST_VIEW_ID = "config-bgp-list-view";
        this.TITLE_BGP = "BGP Routers";
        this.BGP_PREFIX_ID = 'bgp_router';
        this.TITLE_BGP_DETAILS = 'Details';
        this.TITLE_BGP_PROPERTIES = 'BGP Properties';
        this.TITLE_ADD_BGP = 'Create BGP Router';
        this.TITLE_EDIT_BGP = 'Edit BGP Router';
        this.CONTROL_NODE_TYPE = 'control-node';
        this.EXTERNAL_CONTROL_NODE_TYPE = 'external-control-node';
        this.BGP_ROUTER_TYPE = 'router';
        this.TITLE_BGP_DELETE = 'Delete BGP Router';
        this.TITLE_BGP_MULTI_DELETE = 'Delete BGP Router(s)';

        //Logical Router Labels
        this.CONFIG_LOGICAL_ROUTER_PAGE_ID = "config-logical-router-page";
        this.CONFIG_LOGICAL_ROUTER_TITLE = "Routers";
        this.TITLE_ADD_LOGICAL_ROUTER = "Create Routers";
        this.CONFIG_LOGICAL_ROUTER_LIST_VIEW_ID = "config-logical-router-list-view";
        this.CONFIG_LOGICAL_ROUTER_FORMAT_ID = "config-logical-router-format-id";
        this.CONFIG_LOGICAL_ROUTER_LIST = "config-logical-router-list";
        this.LOGICAL_ROUTER_GRID_ID = "config-logical-router-grid-id";
        this.TITLE_LOGICAL_ROUTER_DETAILS = "Logical Router Detail";
        this.TITLE_LOGICAL_ROUTER_EDIT = "Edit";
        this.TITLE_LOGICAL_ROUTER_DELETE = "Delete";
        this.TITLE_DEL_CONFiRM = "Confirm";
        this.LOGICAL_ROUTER_PREFIX_ID = "logical_router";
        this.TITLE_EDIT_LOGICAL_ROUTER = "Edit Logical Router";
        this.ENTER_NAME = "Enter Name";
        this.SELECT_EXT_GATEWAY = "Select External Gateway";
        this.SELECT_CONN_NET = "Select Connected Network(s)";
        this.TITLE_LOGICAL_ROUTER = 'Logical Router';

        //Port Labels
        this.CONFIG_PORT_PAGE_ID = "config-port-page";
        this.CONFIG_PORT_TITLE = "Ports";
        this.TITLE_ADD_PORT = "Create Port";
        this.TITLE_ADD_SUBINTERFACE = "Add SubInterface";
        this.CONFIG_PORT_LIST_VIEW_ID = "config-port-list-view";
        this.CONFIG_PORT_GRID_ID = "config-port-grid-id";
        this.CONFIG_PORT_FORMAT_ID = "config-port-format-id";
        this.CONFIG_PORT_LIST = "config-port-list";
        this.PORT_GRID_ID = "port-grid-id";
        this.TITLE_PORT_DETAILS = "Port Detail";
        this.TITLE_PORT_EDIT = "Edit";
        this.TITLE_PORT_DETETE = "Delete";
        this.TITLE_PORT_DETETE_ALL = "Delete All";
        this.PORT_PREFIX_ID = "Ports";
        this.TITLE_EDIT_PORT = "Edit Port";
        this.TITLE_PORT = 'Port';
        this.TEXT_PORT = 'port';

        //Policy Labels
        this.CONFIG_POLICIES_PAGE_ID = "config-policies-page";
        this.CONFIG_POLICIES_TITLE = "Policies";
        this.TITLE_POLICY_RULE = "Policy Rules";
        this.TITLE_ADD_POLICY = "Create Policy";
        this.CONFIG_POLICIES_LIST_VIEW_ID = "config-policies-list-view";
        this.CONFIG_POLICY_FORMAT_ID = "config-policies-format-id";
        this.CONFIG_POLICY_LIST = "config-policies-list";
        this.POLICIES_GRID_ID = "config-policies-grid-id";
        this.TITLE_POLICY_DETAILS = "Policy Detail";
        this.TITLE_POLICY_EDIT = "Edit Policy ";
        this.TITLE_POLICY_DETETE = "Delete";
        this.TITLE_REMOVE = "Remove";
        this.POLICY_PREFIX_ID = "policy";
        this.TITLE_EDIT_POLICY = "Edit Policy";
        this.TITLE_POLICY = 'Policy';
        this.TXT_POLICY = 'policy';
        this.POLICY_NAME = 'Policy Name';

        /* Routing Policy */
        this.CONFIG_ROUTING_POLICY_PAGE_ID = 'config-routing—policypage';
        this.CONFIG_ROUTING_POLICY_LIST_VIEW_ID = 'config-sec—grplist';
        this.ROUTING_POLICY_GRID_ID = 'routing—policy-grid';
        this.CONFIG_ROUTING_POLICY_TITLE = "Routing Policies";
        this.CONFIG_ROUTING_POLICY_FORMAT_ID = "config-routing-policies-format-id";
        this.TITLE_ROUTING_POLICY_EDIT = "Edit Routing Policy ";
        this.TITLE_ROUTING_POLICY_DETAILS = "Routing Policy Detail";
        this.TITLE_ROUTING_ADD_POLICY = "Create Routing Policy";
        this.ROUTING_POLICY_PREFIX_ID = "routingPolicy";
        this.TXT_ROUTING_POLICY = 'routing policy';
        this.TITLE_REMOVE_GRID = "Remove Routing Policy";

        this.CONFIG_DNS_SERVER_PAGE_ID = 'config-dns-server-page';
        this.CONFIG_DNS_SERVER_LIST_VIEW_ID = 'config-dns-server-list';
        this.CONFIG_DNS_SERVER_SECTION_ID = 'dnsServer';
        this.CONFIG_DNS_SERVER_ID = 'config-dns-server';
        this.TITLE_DNS_SERVER = 'DNS Servers';
        this.DNS_SERVER_GRID_ID = 'dns-server-grid';
        this.DNS_SERVER_PREFIX_ID = 'DNS_server';
        this.TITLE_CREATE_DNS_SERVER = 'Create DNS Server';
        this.TITLE_DEL_DNS_SERVER = 'Delete DNS Server';
        this.TITLE_EDIT_DNS_SERVER = 'Edit DNS Server';
        this.DNS_SERVER_DETAILS = 'DNS Server Details';


        this.CONFIG_DNS_RECORDS_PAGE_ID = 'config-dns-records-page';
        this.CONFIG_DNS_RECORDS_LIST_VIEW_ID = 'config-dns-records-list';
        this.CONFIG_DNS_RECORDS_SECTION_ID = 'dnsRecords';
        this.CONFIG_DNS_RECORDS_ID = 'config-dns-records';
        this.TITLE_DNS_RECORDS = 'DNS Records';
        this.DNS_RECORDS_GRID_ID = 'dns-records-grid';
        this.DNS_RECORDS_PREFIX_ID = 'DNS_records';
        this.TITLE_CREATE_DNS_RECORD = 'Create DNS Record';
        this.TITLE_DEL_DNS_RECORD = 'Delete DNS Record';
        this.TITLE_EDIT_DNS_RECORD = 'Edit DNS Record';
        this.DNS_RECORD_DETAILS = 'DNS Record Details';
        this.DNS_BREADCRUMB_DROPDOWN = "dns-breadcrumb-dropdown";


        //Config DB Labels - Start
        this.CDB_FQ_TABLE_NAMES_GRID_ID = "cdb-fq-table-names-grid";
        this.CDB_TITLE_FQ_TABLE_NAMES = "FQ Names Table Keys";

        this.CDB_FQ_KEY_TABLE_NAMES_SECTION_ID = "cdb-fq-key-table-names-section";
        this.CDB_FQ_TABLE_NAMES_SECTION_ID = "cdb-fq-table-names-section";
        this.CDB_UUID_TABLE_NAMES_SECTION_ID = "cdb-uuid-table-names-section";
        this.CDB_UUID_KEY_TABLE_NAMES_SECTION_ID = "cdb-uuid-key-table-names-section";
        this.CDB_SHARED_TABLE_NAMES_SECTION_ID = "cdb-shared-table-names-section";
        this.CDB_SHARED_KEY_TABLE_NAMES_SECTION_ID = "cdb-shared-key-table-names-section";

        this.CDB_FQ_KEY_TABLE_NAMES_GRID_ID = "cdb-fq-key-table-names-grid";
        this.CDB_TITLE_FQ_KEY_TABLE_NAMES = "Key Values";

        this.CDB_UUID_TABLE_GRID_ID = "cdb-uuid-table-grid";
        this.CDB_TITLE_UUID_KEY_TABLE = "UUID Table Keys";
        this.CDB_UUID_KEY_TABLE_GRID_ID = "cdb-uuid-key-table-grid";
        this.CDB_TITLE_UUID_KEY_TABLE_NAMES = "UUID Key Values";

        this.CDB_SHARED_TABLE_GRID_ID = "cdb-shared-table-grid";
        this.CDB_TITLE_SHARED_KEY_TABLE = "Shared Table Keys";
        this.CDB_SHARED_KEY_TABLE_GRID_ID = "cdb-shared-key-table-grid";
        this.CDB_TITLE_SHARED_KEY_TABLE_NAMES = "Shared Key Values";

        this.CDB_TITLE_FQ_TABLE = "FQ Name Table";
        this.CDB_TITLE_UUID_TABLE = "UUID Name Table";
        this.CDB_TITLE_SHARED_TABLE = "Shared Name Table";
        this.CDB_TITLE_DELETE_RECORD = "Delete Record";
        this.CDB_TMPL_DELETE_RECORD = "cdb-delete-template";
        this.CDB_DELETE_MODAL_ID_ = "delete-cdb";

        this.CDB_LABEL_KEY_VALUES = "keyvalues";
        this.CDB_LABEL_KEY = "key";
        //Config DB Labels - End

        /* Service Appliance */
        this.TITLE_SVC_APPLIANCE = 'Service Appliance';
        this.CONFIG_SVC_APPLIANCE_PAGE_ID = 'config-svc-appliance-page';
        this.CONFIG_SVC_APPLIANCE_SECTION_ID = 'config-svc-appliance-section';
        this.CONFIG_SVC_APPLIANCE_ID = 'config-svc-appliance';
        this.SVC_APPLIANCE_GRID_ID = 'svc-appliance-grid';
        this.SVC_APPLIANCE_PREFIX_ID = 'svcAppliance';
        this.TITLE_EDIT_SVC_APPLIANCE = 'Edit Service Appliance';
        this.TITLE_DEL_SVC_APPLIANCE = 'Delete Service Appliance';
        this.TITLE_CREATE_SVC_APPLIANCE = 'Create Service Appliance';
        this.SVC_APPLIANCE_DETAILS = 'Service Appliance Details';

        /* Service Appliance Set */
        this.TITLE_SVC_APPLIANCE_SET = 'Service Appliance Set';
        this.CONFIG_SVC_APPLIANCE_SET_PAGE_ID = 'config-svc-appliance-set-page';
        this.CONFIG_SVC_APPLIANCE_SET_SECTION_ID = 'config-svc-appliance-set-section';
        this.CONFIG_SVC_APPLIANCE_SET_ID = 'config-svc-appliance-set';
        this.SVC_APPLIANCE_SET_GRID_ID = 'svc-appliance-set-grid';
        this.SVC_APPLIANCE_SET_PREFIX_ID = 'svcApplianceSet';
        this.TITLE_EDIT_SVC_APPLIANCE_SET = 'Edit Service Appliance Set';
        this.TITLE_DEL_SVC_APPLIANCE_SET = 'Delete Service Appliance Set';
        this.TITLE_CREATE_SVC_APPLIANCE_SET = 'Create Service Appliance Set';
        this.SVC_APPLIANCE_SET_DETAILS = 'Service Appliance Set Details';

        /* Route Table */
        this.RT_TABLE_TAB_ID = 'rt-table-tab';
        this.CONFIG_RT_TABLE_PAGE_ID = 'config-rttable—page';
        this.CONFIG_RT_TABLE_LIST_VIEW_ID = 'config-rttable-list';
        this.CONFIG_RT_TABLE_SECTION_ID = 'rtTable';
        this.CONFIG_RT_TABLE_ID = 'config-rt-table';
        this.NETWORK_ROUTE_TABLE_ID = 'network-rt-table';
        this.INTERFACE_ROUTE_TABLE_ID = 'interface-rt-table';
        this.TITLE_RT_TABLE = 'Route Tables';
        this.RT_TABLE_GRID_ID = 'rt-table-grid';
        this.RT_TABLE_PREFIX_ID = 'route_table';
        this.TITLE_CREATE_RT_TABLE = 'Create Route Table';
        this.TITLE_DEL_RT_TABLE = 'Delete Route Table';
        this.TITLE_EDIT_RT_TABLE = 'Edit Route Table';
        this.RT_TABLE_DETAILS = 'Route Table Details';
 
        /* BGP as a Service */
        this.TITLE_BGP_AS_A_SERVICE = 'BGP as a Service';
        this.TITLE_EDIT_BGP_AS_A_SERVICE = 'Edit BGP as a Service';
        this.TITLE_BGP_AS_A_SERVICE_DELETE = 'Delete BGP as a Service';
        this.TITLE_BGP_AS_A_SERVICE_MULTI_DELETE = 'Delete BGP as a Service(s)';
        this.TITLE_ADD_BGP_AS_A_SERVICE = 'Create BGP as a Service';

        // VN Config labels
        this.CFG_VN_PAGE_ID = 'config-vn-page';
        this.CFG_VN_LIST_ID = 'config-vn-list';
        this.CFG_VN_LIST_VIEW_ID = 'config-vn-list-view';
        this.CFG_VN_GRID_ID = 'config-vn-grid';
        this.CFG_VN_PREFIX_ID = 'network';
        this.CFG_VN_TITLE = 'Networks';
        this.CFG_VN_TITLE_SUMMARY = 'Network Summary';
        this.CFG_VN_TITLE_DETAILS = 'Details';
        this.CFG_VN_TITLE_EDIT = 'Edit Network';
        this.CFG_VN_TITLE_CREATE = 'Create Network';
        this.CFG_VN_TITLE_DELETE = 'Delete Network';
        this.CFG_VN_TITLE_MULTI_DELETE = 'Delete Network(s)';
        // End VN Config labels

        /* Route Aggregate Labels */
        this.TITLE_ROUTE_AGGREGATE = 'Route Aggregates';
        this.TITLE_EDIT_ROUTE_AGGREGATE = 'Edit Route Aggregate';
        this.TITLE_ROUTE_AGGREGATE_DELETE = 'Delete Route Aggregate';
        this.TITLE_ROUTE_AGGREGATE_MULTI_DELETE = 'Delete Route Aggregate(s)';
        this.TITLE_ADD_ROUTE_AGGREGATE = 'Create Route Aggregate';

        // Health Check Config labels
        this.CFG_SVC_HEALTH_CHK_PAGE_ID = 'config-svc-health-chk-page';
        this.CFG_SVC_HEALTH_CHK_LIST_ID = 'config-svc-health-chk-list';
        this.CFG_SVC_HEALTH_CHK_LIST_VIEW_ID = 'config-svc-health-chk-list-view';
        this.CFG_SVC_HEALTH_CHK_GRID_ID = 'config-svc-health-chk-grid';
        this.CFG_SVC_HEALTH_CHK_PREFIX_ID = 'HealthCheckServices';
        this.CFG_SVC_HEALTH_CHK_TITLE = 'Health Check Services';
        this.CFG_SVC_HEALTH_CHK_TITLE_SUMMARY = 'Health Check Summary';
        this.CFG_SVC_HEALTH_CHK_TITLE_DETAILS = 'Details';
        this.CFG_SVC_HEALTH_CHK_TITLE_EDIT = 'Edit Health Check Service';
        this.CFG_SVC_HEALTH_CHK_TITLE_CREATE = 'Create Health Check Service';
        this.CFG_SVC_HEALTH_CHK_TITLE_DELETE = 'Delete Health Check Service';
        this.CFG_SVC_HEALTH_CHK_TITLE_MULTI_DELETE = 'Delete Health Check Service(s)';

        /* Packet Capture Labels */
        this.TITLE_PACKET_CAPTURE = 'Analyzers';
        this.TITLE_EDIT_PACKET_CAPTURE = 'Edit Analyzer';
        this.TITLE_PACKET_CAPTURE_DELETE = 'Delete Analyzer';
        this.TITLE_PACKET_CAPTURE_MULTI_DELETE = 'Delete Analyzer(s)';
        this.TITLE_ADD_PACKET_CAPTURE = 'Create Analyzer';
    };
    return CTLabels;
});

/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-utils',[
    'underscore',
    'contrail-list-model'
], function (_, ContrailListModel) {

    var CTUtils = function () {
        var self = this;
        var utilVariable = [];
        self.getInstanceDetailsTemplateConfig = function () {
            return {

                templateGenerator: 'RowSectionTemplateGenerator',
                templateGeneratorConfig: {
                    rows: [
                        {
                            templateGenerator: 'ColumnSectionTemplateGenerator',
                            templateGeneratorConfig: {
                                columns: [
                                    {
                                        class: 'span6',
                                        rows: [
                                            {
                                                title: ctwl.TITLE_INSTANCE_DETAILS,
                                                templateGenerator: 'BlockListTemplateGenerator',
                                                templateGeneratorConfig: [
                                                    {
                                                        key: 'vm_name',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'value.UveVirtualMachineAgent.uuid',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'value.UveVirtualMachineAgent.vrouter',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'value.UveVirtualMachineAgent.interface_list',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'length'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        class: 'span6',
                                        rows: [
                                            {
                                                title: ctwl.TITLE_CPU_MEMORY_INFO,
                                                templateGenerator: 'BlockListTemplateGenerator',
                                                templateGeneratorConfig: [
                                                    {
                                                        key: 'value.UveVirtualMachineAgent.cpu_info.cpu_one_min_avg',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'value.UveVirtualMachineAgent.cpu_info.rss',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'kilo-byte'
                                                        }
                                                    },
                                                    {
                                                        key: 'value.UveVirtualMachineAgent.cpu_info.vm_memory_quota',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'kilo-byte'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    ]
                }

            }
        }

        //If there is discrepancy in data sent from multiple sources
        self.getDataBasedOnSource = function (data) {
            if ((data != null) && (data[0] instanceof Array)) {
                var idx = 0;
                //Loop through and pick the index for vrouteragent
                for (var i = 0; i < data.length; i++) {
                    if (data[i][1] != null) {
                        if (data[i][1].match('Compute:contrail-vrouter-agent')) {
                            idx = i;
                            break;
                        }
                    }
                }
                data = data[idx][0];
            }
            return data;
        };

        // This function formats the VN name by discarding the domain name and appending the project name in the braces
        // input: either array of networks or single network like [default-domain:demo:ipv6test2], default-domain:demo:ipv6test2
        // output:[ipv6test2 (demo)],ipv6test2 (demo).

        self.formatVNName = function (vnName) {
            var formattedValue;
            if (!$.isArray(vnName))
                vnName = [vnName];
            formattedValue = $.map(vnName, function (value, idx) {
                var fqNameArr = value.split(':');
                if (fqNameArr.length == 3)
                    return fqNameArr[2] + ' (' + fqNameArr[1] + ')';
                else
                    return value;
            });
            return formattedValue;
        };

        this.isServiceVN = function (vnFQN) {
            var fqnArray = vnFQN.split(":");

            if(ctwc.SERVICE_VN_EXCLUDE_LIST.indexOf(fqnArray[2]) != -1) {
                return true;
            }

            return false;
        };

        this.getDomainListModelConfig = function() {
            return {
                remote: {
                    ajaxConfig: {
                        url: ctwc.URL_ALL_DOMAINS
                    },
                    dataParser: function(response) {
                        return  $.map(response.domains, function (n, i) {
                            return {
                                fq_name: n.fq_name.join(':'),
                                name: n.fq_name[0],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
                cacheConfig : {
                    ucid: ctwc.UCID_BC_ALL_DOMAINS,
                    loadOnTimeout: false,
                    cacheTimeout: cowc.DOMAIN_CACHE_UPDATE_INTERVAL
                }
            }
        };

        this.getGlobalSysConfigListModelConfig = function() {
            return {
                remote: {
                    ajaxConfig: {
                        url: '/api/tenants/config/list-global-system-config'
                    },
                    dataParser: function(response) {
                        return  $.map(response['global-system-configs'], function (n, i) {
                            return {
                                fq_name: n.fq_name.join(':'),
                                name: n.fq_name[0],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate =
                            contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig =
                                $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE,
                                         {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
                cacheConfig : {
                    ucid: ctwc.UCID_BC_ALL_GLOBAL_SYS_CONFIGS,
                    loadOnTimeout: false,
                    cacheTimeout: cowc.DOMAIN_CACHE_UPDATE_INTERVAL
                }
            }
        };

        this.getSASetListModelConfig = function() {
            return {
                remote: {
                    ajaxConfig: {
                        url: '/api/tenants/config/service-appliance-sets'
                    },
                    dataParser: function(response) {
                        return  $.map(response, function (n, i) {
                            return {
                                fq_name: n.fq_name.join(':'),
                                name: n.fq_name[1],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate =
                            contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig =
                                $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE,
                                         {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                }/*,
                cacheConfig : {
                    ucid: ctwc.UCID_BC_ALL_SA_SETS,
                    loadOnTimeout: false,
                    cacheTimeout: cowc.DOMAIN_CACHE_UPDATE_INTERVAL
                }
                */
            }
        };

        this.getAllDomains = function() {
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: ctwc.URL_ALL_DOMAINS
                    },
                    dataParser: function(response) {
                        return  $.map(response.domains, function (n, i) {
                            return {
                                fq_name: n.fq_name.join(':'),
                                name: n.fq_name[0],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
                cacheConfig : {
                    ucid: ctwc.UCID_BC_ALL_DOMAINS,
                    loadOnTimeout: false,
                    cacheTimeout: cowc.DOMAIN_CACHE_UPDATE_INTERVAL
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);

            return contrailListModel;
        };

        this.getProjectListModelConfig = function(domainObj, dropdownOptions) {
            var modelConfig = {
                remote: {
                    ajaxConfig: {
                        url: ctwc.getProjectsURL(domainObj,
                                                 dropdownOptions)
                    },
                    dataParser: function(response) {
                        return  $.map(response.projects, function (n, i) {
                            return {
                                fq_name: n.fq_name.join(':'),
                                name: n.fq_name[1],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
            };
            if ((null == dropdownOptions) ||
                (null == dropdownOptions['config']) ||
                (false == dropdownOptions['config'])) {
                modelConfig.cacheConfig = {
                    ucid: ctwc.get(ctwc.UCID_BC_DOMAIN_ALL_PROJECTS,
                                   domainObj.name),
                    loadOnTimeout: false,
                    cacheTimeout: cowc.PROJECT_CACHE_UPDATE_INTERVAL
                };
            }
            return modelConfig;
        };

        this.getDNSListModelConfig = function(dns) {
            return {
                remote: {
                    ajaxConfig: {
                        url: '/api/tenants/config/list-virtual-DNSs/' + dns
                    },
                    dataParser: function(response) {
                        return  $.map(response, function (n, i) {
                            return {
                                fq_name: n.to.join(':'),
                                name: n.to[1],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                }/*,
                cacheConfig : {
                    ucid: ctwc.get(ctwc.UCID_BC_DOMAIN_ALL_DNS, dns),
                    loadOnTimeout: false,
                    cacheTimeout: cowc.PROJECT_CACHE_UPDATE_INTERVAL
                }*/
            };
        };
        this.getProjects4Domain = function(domain) {
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: ctwc.getProjectsURL({name: domain})
                    },
                    dataParser: function(response) {
                        return  $.map(response.projects, function (n, i) {
                            return {
                                fq_name: n.fq_name.join(':'),
                                name: n.fq_name[1],
                                value: n.uuid
                            };
                        });
                    },
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
                cacheConfig : {
                    ucid: ctwc.get(ctwc.UCID_BC_DOMAIN_ALL_PROJECTS, domain),
                    loadOnTimeout: false,
                    cacheTimeout: cowc.PROJECT_CACHE_UPDATE_INTERVAL
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);

            return contrailListModel;
        };

        this.getNetworkListModelConfig = function (projectFQN) {
            return {
                remote: {
                    ajaxConfig: {
                        url: ctwc.get(ctwc.URL_PROJECT_ALL_NETWORKS, projectFQN)
                    },
                    dataParser: ctwp.parseNetwork4Breadcrumb,
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
                cacheConfig : {
                    ucid: ctwc.get(ctwc.UCID_BC_PROJECT_ALL_NETWORKS, projectFQN),
                    loadOnTimeout: false,
                    cacheTimeout: cowc.NETWORK_CACHE_UPDATE_INTERVAL
                }
            };
        };

        this.getNetworks4Project = function(projectFQN) {
            var listModelConfig = {
                remote: {
                    ajaxConfig: {
                        url: ctwc.get(ctwc.URL_PROJECT_ALL_NETWORKS, projectFQN)
                    },
                    dataParser: ctwp.parseNetwork4Breadcrumb,
                    failureCallback: function(xhr, ContrailListModel) {
                        var dataErrorTemplate = contrail.getTemplate4Id(cowc.TMPL_NOT_FOUND_MESSAGE),
                            dataErrorConfig = $.extend(true, {}, cowc.DEFAULT_CONFIG_ERROR_PAGE, {errorMessage: xhr.responseText});

                        $(contentContainer).html(dataErrorTemplate(dataErrorConfig));
                    }
                },
                cacheConfig : {
                    ucid: ctwc.get(ctwc.UCID_BC_PROJECT_ALL_NETWORKS, projectFQN),
                    loadOnTimeout: false,
                    cacheTimeout: cowc.NETWORK_CACHE_UPDATE_INTERVAL
                }
            };

            var contrailListModel = new ContrailListModel(listModelConfig);

            return contrailListModel;
        };


        this.deleteCGridData = function(data) {
            if ('cgrid' in data) {
                delete data['cgrid'];
            }
            if ('errors' in data) {
                delete data['errors'];
            }
            if ('locks' in data) {
                delete data['locks'];
            }
            if ('elementConfigMap' in data) {
                delete data['elementConfigMap'];
            }
            return data;
        };

        this.renderView = function (renderConfig, renderCallback) {
            var parentElement = renderConfig['parentElement'],
                viewName = renderConfig['viewName'],
                viewPathPrefix, viewPath,
                model = renderConfig['model'],
                viewAttributes = renderConfig['viewAttributes'],
                modelMap = renderConfig['modelMap'],
                rootView = renderConfig['rootView'],
                onAllViewsRenderCompleteCB = renderConfig['onAllViewsRenderCompleteCB'],
                onAllRenderCompleteCB = renderConfig['onAllRenderCompleteCB'],
                lazyRenderingComplete  = renderConfig['lazyRenderingComplete'],
                elementView;

            /**
             * if views are dynamically loaded using viewPathPrefix in a viewConfig, the path should prefix
             * with 'core-basedir' as depending on the env, the root dir from which the files are served changes.
             */
            if (contrail.checkIfExist(renderConfig['viewPathPrefix'])) {
                viewPathPrefix =  renderConfig['viewPathPrefix'];
                // If viewPathPrefix doesn't start with core-basedir or controller-basedir add controller-basedir
                if (!(viewPathPrefix.slice(0, 'core-basedir'.length) === 'core-basedir') &&
                    !(viewPathPrefix.slice(0, 'controller-basedir'.length) === 'controller-basedir')) {
                    viewPathPrefix =  'controller-basedir/' + viewPathPrefix;
                }
            } else {
                viewPathPrefix = './';
            }
            viewPath = viewPathPrefix + viewName;
            var checkRequirePath = viewPath.replace(/^core-basedir\//,'').replace(/^controller-basedir\//,'');
            var pathMapping = _.invert(require.s.contexts._.config);
            pathMapping = {
                 'monitor/infrastructure/common/ui/js/views/VRouterScatterChartView' : 'vrouter-scatterchart-view'
            }
            viewPath = ifNull(pathMapping[checkRequirePath],viewPath);
            require([viewPath], function(ElementView) {
                elementView = new ElementView({el: parentElement, model: model, attributes: viewAttributes, rootView: rootView, onAllViewsRenderCompleteCB: onAllViewsRenderCompleteCB, onAllRenderCompleteCB: onAllRenderCompleteCB});
                elementView.viewName = viewName;
                elementView.modelMap = modelMap;
                elementView.beginMyViewRendering();
                elementView.render();
                if(contrail.checkIfFunction(renderCallback)) {
                    renderCallback(elementView);
                }

                if(lazyRenderingComplete == null || !lazyRenderingComplete) {
                    elementView.endMyViewRendering();
                }
            });
        };

        this.getDetailTemplateConfigToDisplayRawJSON = function (){
            return {
                template:
                    cowu.generateDetailTemplateHTML(this.getDetailsTemplateWithRawJSON(),
                                                    cowc.APP_CONTRAIL_CONTROLLER)
            }
        };

        this.getDetailsTemplateWithRawJSON = function () {
            return{
                templateGenerator: 'ColumnSectionTemplateGenerator',
                advancedViewOptions :false,
                 templateGeneratorConfig: {
                     columns: [
                         {
                             rows: [
                                 {
                                     templateGenerator: 'BlockAdvancedOnlyTemplateGenerator',
                                     templateGeneratorData : 'raw_json'
                                 }
                             ]
                         }
                     ]
                 }
            }
        };
        this.setGlobalVariable = function(key, value) {
            utilVariable[key] = value;
        };
        this.getGlobalVariable = function(key) {
            return utilVariable[key];
        };
        this.getAllGlobalVariable = function() {
            return utilVariable;
        };
        // Accept fqname as array and
        // currentDomainProject as string format domain:project
        // if currentDomainProject is empty it will try taking utilVariable
        // Output will be in the format "element(domain:project)"
        this.formatCurrentFQName = function(fqname, currentDomainProject){
            var domain = "", project = "";
            if(currentDomainProject != null && currentDomainProject != ""){
                var domainProjectArr = currentDomainProject.split(":");
                if(domainProjectArr == 2) {
                    domain = domainProjectArr[0];
                    project = domainProjectArr[1];
                }
            } else if(utilVariable["domain"] != null &&
                      utilVariable["project"] != null){
                domain = utilVariable["domain"];
                project = utilVariable["project"];
            } else {
                return false;
            }
            if(fqname.length >= 3) {
                if(fqname[0] == domain.name && fqname[1] == project.name) {
                    return fqname[fqname.length-1];
                } else {
                    var element = fqname[fqname.length-1];
                    var parent = fqname.splice(0,fqname.length-1);
                    return element + " (" + parent.join(":") + ")";
                }
            }
        };

        this.onClickNetworkMonitorGrid = function (e, selRowDataItem) {
            if (!$(e.target).hasClass('cell-no-link')) {
                var name = $(e.target).attr('name'),
                    fqName, uuid, vmName;

                if ($.inArray(name, ['project']) > -1) {
                    fqName = selRowDataItem['name'];
                    ctwu.setProjectURLHashParams(null, fqName, true)

                } else if ($.inArray(name, ['network']) > -1) {
                    fqName = selRowDataItem['name'];
                    ctwu.setNetworkURLHashParams(null, fqName, true)
                } else if ($.inArray(name, ['vn']) > -1) {
                    fqName = selRowDataItem['vnFQN'];
                    ctwu.setNetworkURLHashParams(null, fqName, true)
                } else if ($.inArray(name, ['instance']) > -1) {
                    fqName = selRowDataItem['vnFQN'];
                    uuid = selRowDataItem['name'];
                    vmName = selRowDataItem['vmName'];
                    if (contrail.checkIfExist(fqName) && !ctwu.isServiceVN(fqName)) {
                        ctwu.setInstanceURLHashParams(null, fqName, uuid, vmName, true);
                    }
                } else if ($.inArray(name, ['vRouter']) > -1) {
                    var urlObj = layoutHandler.getURLHashObj();
                    if (urlObj['p'] == 'mon_infra_vrouter' &&
                        urlObj['q']['view'] == 'details') {
                        $("#" + ctwl.VROUTER_DETAILS_TABS_ID).tabs({active: 0});
                    } else {
                        var hashObj = {
                            type: 'vrouter',
                            view: 'details',
                            focusedElement: {
                                node: selRowDataItem['vRouter'],
                                tab: 'details'
                            }
                        };
                        layoutHandler.setURLHashParams(hashObj,
                            {
                                p: "mon_infra_vrouter",
                                merge: false,
                                triggerHashChange: true
                            }
                        );
                    }
                }
            }
        };

        this.setProjectURLHashParams = function(hashParams, projectFQN, triggerHashChange) {
            var hashObj = {
                type: "project",
                view: "details",
                focusedElement: {
                    fqName: projectFQN,
                    type: ctwc.GRAPH_ELEMENT_PROJECT
                }
            };

            if(contrail.checkIfKeyExistInObject(true, hashParams, 'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {p: "mon_networking_projects", merge: false, triggerHashChange: triggerHashChange});

        };

        this.setProject4NetworkListURLHashParams = function(projectFQN) {
            var hashObj = {
                type: "network",
                view: "list"
            };

            if (projectFQN != null) {
                hashObj.project = projectFQN;
            }

            layoutHandler.setURLHashParams(hashObj, {p: "mon_networking_networks", merge: false, triggerHashChange: false});
        };

        this.setNetworkURLHashParams = function(hashParams, networkFQN, triggerHashChange) {
            var hashObj = {
                type: "network",
                view: "details",
                focusedElement: {
                    fqName: networkFQN,
                    type: ctwc.GRAPH_ELEMENT_NETWORK
                }
            };

            if(contrail.checkIfKeyExistInObject(true, hashParams, 'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {p: "mon_networking_networks", merge: false, triggerHashChange: triggerHashChange});

        };

        this.setNetwork4InstanceListURLHashParams = function(extendedHashObj) {
            var hashObj = $.extend(true, {
                    type: "instance",
                    view: "list"
                }, extendedHashObj);;

            layoutHandler.setURLHashParams(hashObj, {p: "mon_networking_instances", merge: false, triggerHashChange: false});
        };

        this.setInstanceURLHashParams = function(hashParams, networkFQN, instanceUUID, vmName, triggerHashChange) {
            var hashObj = {
                type: "instance",
                view: "details",
                focusedElement: {
                    fqName: networkFQN,
                    type: ctwc.GRAPH_ELEMENT_INSTANCE,
                    uuid: instanceUUID,
                    vmName: vmName
                }
            };

            if(contrail.checkIfKeyExistInObject(true, hashParams, 'clickedElement')) {
                hashObj.clickedElement = hashParams.clickedElement;
            }

            layoutHandler.setURLHashParams(hashObj, {p: "mon_networking_instances", merge: false, triggerHashChange: triggerHashChange});
        };


        this.formatValues4TableColumn = function (valueArray) {
            var formattedStr = '',
            entriesToShow = 2;

            if (valueArray == null) {
                return formattedStr;
            }

            $.each(valueArray, function (idx, value) {
                if (idx == 0) {
                    formattedStr += value;
                } else if (idx < entriesToShow) {
                    formattedStr += '<br/>' + value;
                } else {
                    return;
                }
            });

            if (valueArray.length > 2) {
                formattedStr += '<br/>' + contrail.format('({0} more)', valueArray.length - entriesToShow);
            }

            return formattedStr;
        };

     // This function accepts array of ips, checks the type(IPv4/IPv6) and
        // returns the label value html content of the first two elements of the array and more tag.
        this.formatIPArray = function(ipArray) {
            var formattedStr = '', entriesToShow = 2;

            if (ipArray == null) {
                return formattedStr;
            }

            $.each(ipArray, function (idx, value) {
                var lbl = 'IPv4', isIpv6 = false;
                isIpv6 = isIPv6(value);
                if (idx == 0) {
                    formattedStr += getLabelValueForIP(value);
                } else if (idx < entriesToShow) {
                    formattedStr += "<br/>" + getLabelValueForIP(value);
                }
                else
                    return;
            });

            if (ipArray.length > 2) {
                formattedStr += '<br/>' + contrail.format('({0} more)', ipArray.length - entriesToShow);
            }

            return contrail.format(formattedStr);
        };

        /** 
         * As "Alerts" link in header can be clicked from any page,it need to know the list 
         * of nodeListModels to loop through to generate alerts. 
         * Return the require Aliases/URLs of all listModels for which alerts need to be processed
         */
        this.getNodeListModelsForAlerts = function(defObj) {
            return ['monitor-infra-analyticsnode-model','monitor-infra-databasenode-model',
                'monitor-infra-confignode-model','monitor-infra-controlnode-model',
                'monitor-infra-vrouter-model'];
        };

        /**
         * If a resource's display_name is not set then use name
         */
        this.getDisplayNameOrName = function (cfgModel) {
            var displayName = getValueByJsonPath(cfgModel, 'display_name', "");
            var name = getValueByJsonPath(cfgModel, 'name', "");

            if (displayName.length) {
                return displayName;
            } else {
                return name;
            }
        };

        /**
         * Set a resource's name from display_name
         */
        this.setNameFromDisplayName = function (cfgModel) {
            var displayName = getValueByJsonPath(cfgModel, 'display_name', "");
            var name = getValueByJsonPath(cfgModel, 'name', "");
            if (name == '') {
                cfgModel['name'] = displayName;
            }
        };
        /**
         * Set a resource's display_name from name
         */
        this.setDisplayNameFromName = function (cfgModel) {
            var displayName = getValueByJsonPath(cfgModel, 'display_name', "");
            var name = getValueByJsonPath(cfgModel, 'name', "");
            if ('' == displayName) {
                cfgModel['display_name'] = name;
            }
        };

    };
    return CTUtils;
});

/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-messages',[
    'underscore'
], function (_) {
    var CTMessages = function () {
        this.getInvalidErrorMessage = function(fieldKey) {
            return "Please enter a valid " + ctwl.getInLowerCase(fieldKey) + '.';
        };
        this.getRequiredMessage = function(fieldKey) {
            return ctwl.getFirstCharUpperCase(fieldKey) + ' is required.';
        };
        this.getResolveErrorsMessage = function(fieldKey) {
            return "Please resolve all " + fieldKey + " errors.";
        };

        this.NO_PROJECT_FOUND = 'No project found.';
        this.SHOULD_BE_VALID = '{0} should have valid ';

        this.NO_TRAFFIC_STATS_FOUND = 'No traffic stats found.';

        this.NO_DATA_FOUND = 'No data found.';
        this.NO_NETWORK_FOUND = 'No virtual network present in this project.';
        this.NO_VM_FOUND = 'No virtual machine present in this network.';
        this.NO_PHYSICALDEVICES = 'No physical device found.';

        this.CASSANDRA_ERROR = 'Error: Cassandra client could not fetch data from server. Please check cassandra config parameters.';
        this.NO_RECORDS_IN_DB = 'No record found in DB.';

        this.get = function () {
            var args = arguments;
            return cowu.getValueFromTemplate(args);
        };
    };
    return CTMessages;
});
/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-grid-config',[
    'underscore'
], function (_) {
    var CTGridConfig = function () {

        this.bgpRouterColumns = [
                {
                    field:"ip",
                    id:"ip",
                    name:"IP Address",
                    sortable: true,
                    sorter : comparatorIP
                },
                {
                    field:"role",
                    id:"role",
                    name:"Type",
                    sortable: true
                },
                {
                    field:"vendor",
                    id:"vendor",
                    name:"Vendor",
                    sortable: true
                },
                {
                    field:"name",
                    id:"name",
                    name:"HostName",
                    sortable: true
                }
        ];

        this.projectInstancesColumns = [
            {
                field: 'uuid',
                name: 'UUID',
                minWidth: 100
            },
            {
                field: 'vmName',
                name: 'Instance Name',
                formatter: function (r, c, v, cd, dc) {
                    if(!contrail.checkIfExist(dc['vmName'])) {
                        return '-';
                    } else if(!contrail.checkIfExist(dc['vnFQN']) || ctwu.isServiceVN(dc['vnFQN'])){
                        return cowf.formatElementName({name: 'instance', value: dc['vmName'], cssClass: 'cell-no-link'});
                    } else {
                        return cowf.formatElementName({name: 'instance', value: dc['vmName'], cssClass: 'cell-hyperlink-blue'});
                    }
                },
                minWidth: 150,
                searchable: true,
                events: {
                    onClick: ctwu.onClickNetworkMonitorGrid
                },
                exportConfig: {
                    allow: true,
                    stdFormatter: false
                }
            },
            {
                field: 'vn',
                name: 'Networks',
                formatter: function (r, c, v, cd, dc) {
                    return cowf.formatElementName({name: 'vn', value: dc['vn'], cssClass: 'cell-hyperlink-blue'});
                },
                minWidth: 150,
                searchable: true,
                events: {
                    onClick: ctwu.onClickNetworkMonitorGrid
                },
            },
            {
                field: 'intfCnt',
                name: 'Interfaces',
                minWidth: 80
            },
            {
                field: 'vRouter',
                name: 'Virtual Router',
                formatter: function (r, c, v, cd, dc) {
                    return cowf.formatElementName({name: 'vRouter', value: dc['vRouter'], cssClass: 'cell-hyperlink-blue'});
                },
                minWidth: 100,
                events: {
                    onClick: ctwu.onClickNetworkMonitorGrid
                },
                exportConfig: {
                    allow: true,
                    stdFormatter: false
                }
            },
            {
                field: 'ip',
                name: 'IP Address',
                formatter: function (r, c, v, cd, dc) {
                    return ctwu.formatIPArray(dc['ip']);
                },
                minWidth: 150,
                exportConfig: {
                    allow: true,
                    stdFormatter: false
                }
            },
            {
                field: '',
                name: 'Aggr. Traffic In/Out (Last 1 Hr)',
                formatter: function (r, c, v, cd, dc) {
                    return cowu.addUnits2Bytes(dc['inBytes60'], true) + ' / ' + cowu.addUnits2Bytes(dc['outBytes60'], true);
                },
                minWidth: 200
            },
            {
                field: '',
                name: '',
                minWidth: 30,
                maxWidth: 30,
                formatter: function (r, c, v, cd, dc) {
                    if(contrail.checkIfExist(dc.raw_json) && !contrail.checkIfKeyExistInObject(false, dc.raw_json.value, 'UveVirtualMachineAgent')) {
                        return '<i class="icon-warning-sign red" title="Instance data is available in config but not available in analytics."></i>';
                    } else {
                        return '';
                    }
                }
            }
        ];
        this.getVMInterfacesLazyRemoteConfig = function () {
            return [
                {
                    getAjaxConfig: function (responseJSON) {
                        var lazyAjaxConfig,
                            interfaceList = getValueByJsonPath(responseJSON, 'value;UveVirtualMachineAgent;interface_list', []);

                        lazyAjaxConfig = {
                            url: ctwc.URL_VM_INTERFACES,
                            type: 'POST',
                            data: JSON.stringify({kfilt: interfaceList.join(','), parentType: ctwc.TYPE_VIRTUAL_MACHINE})
                        };

                        return lazyAjaxConfig;
                    },
                    successCallback: function (response, contrailViewModel) {
                        var interfaceMap = ctwp.instanceInterfaceDataParser(response),
                            interfaceDetailsList = _.values(interfaceMap);

                        contrailViewModel.attributes['value']['UveVirtualMachineAgent']['interface_details'] = interfaceDetailsList;
                        if (interfaceDetailsList.length > 0) {
                            contrailViewModel.attributes.vm_name = interfaceDetailsList[0]['vm_name'];
                        }
                    }
                }
            ]
        };

        this.instanceInterfaceColumns = [
             {
                 field: 'ip',
                 name: 'IP Address',
                 minWidth: 100,
                 searchable: true
             },
             {
                 field: 'vm_name',
                 name: 'Instance Name',
                 minWidth: 250,
                 searchable: true
             },
             {
                 field: 'floatingIP',
                 name: 'Floating IPs In/Out',
                 formatter: function (r, c, v, cd, dc) {
                     if (!contrail.checkIfExist(dc['floatingIP']) || dc['floatingIP'].length == 0) {
                         return '-';
                     } else {
                         return dc['floatingIP'].join(', ');
                     }
                 },
                 minWidth: 200
             },
             {
                 field: '',
                 name: 'Traffic In/Out (Last 1 Hr)',
                 minWidth: 150,
                 formatter: function (r, c, v, cd, dc) {
                     return contrail.format("{0} / {1}", cowu.addUnits2Bytes(dc['inBytes60'], true), cowu.addUnits2Bytes(dc['outBytes60'], true));
                 }
             },
             {
                 field: '',
                 name: 'Throughput In/Out',
                 minWidth: 150,
                 formatter: function (r, c, v, cd, dc) {
                     return contrail.format("{0} / {1}", formatThroughput(dc['in_bw_usage'], true), formatThroughput(dc['out_bw_usage'], true));
                 }
             },
             {
                 name: 'Status',
                 minWidth: 100,
                 searchable: true,
                 formatter: function (r, c, v, cd, dc) {
                     if (dc.active) {
                         return ('<div class="status-badge-rounded status-active"></div>&nbsp;Active');
                     } else {
                         return ('<div class="status-badge-rounded status-inactive"></div>&nbsp;Inactive');
                     }
                 }
             }
        ];

        this.getInterfaceStatsLazyRemoteConfig = function () {
            return [
                {
                    getAjaxConfig: function (responseJSON) {
                        var names, lazyAjaxConfig;

                        names = $.map(responseJSON, function (item) {
                            return item['name'];
                        });

                        lazyAjaxConfig = {
                            url: ctwc.URL_VM_VN_STATS,
                            type: 'POST',
                            data: JSON.stringify({
                                data: {
                                    type: 'virtual-machine-interface',
                                    uuids: names.join(','),
                                    minSince: 60,
                                    useServerTime: true
                                }
                            })
                        }
                        return lazyAjaxConfig;
                    },
                    successCallback: function (response, contrailListModel) {
                        var statDataList = ctwp.parseInstanceInterfaceStats(response[0]),
                            dataItems = contrailListModel.getItems(),
                            statData;

                        for (var j = 0; j < statDataList.length; j++) {
                            statData = statDataList[j];
                            for (var i = 0; i < dataItems.length; i++) {
                                var dataItem = dataItems[i];
                                if (statData['name'] == dataItem['name']) {
                                    dataItem['inBytes60'] = ifNull(statData['inBytes'], 0);
                                    dataItem['outBytes60'] = ifNull(statData['outBytes'], 0);
                                    break;
                                }
                            }
                        }
                        contrailListModel.updateData(dataItems);
                    }
                }
            ];
        };

        this.getAcknowledgeAction = function (onClickFunction, divider) {
            return {
                title: ctwl.TITLE_ACKNOWLEDGE,
                iconClass: 'icon-check-sign',
                width: 80,
                disabled:true,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };
        this.getAlertHistoryAction = function (onClickFunction, divider) {
            return {
                title: ctwl.TITLE_ALARM_HISTORY,
                iconClass: 'icon-th',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };
        this.getEditConfig = function (title, onClickFunction, divider) {
            return {
                title: title,
                iconClass: 'icon-edit',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            }
        };
        this.getDeleteConfig = function (title, onClickFunction, divider) {
            return {
                title: title,
                iconClass: 'icon-trash',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            }
        };
        this.getEditAction = function (onClickFunction, title, divider) {
            return {
                title: title,
                iconClass: 'icon-edit',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            }
        };
        this.getListAction = function (onClickFunction, title, divider) {
            return {
                title: title,
                iconClass: 'icon-list-alt',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            }
        };
        this.getDeleteAction = function (onClickFunction, divider) {
            return {
                title: ctwl.TITLE_DELETE_CONFIG,
                iconClass: 'icon-trash',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            };
        };
        this.getActiveDnsConfig = function (title, onClickFunction, divider) {
            return {
                title: title,
               // iconClass: 'icon-trash',
                width: 80,
                divider: contrail.checkIfExist(divider) ? divider : false,
                onClick: onClickFunction
            }
        };
        this.getVMDetailsLazyRemoteConfig = function (type) {
            return [
                {
                    getAjaxConfig: function (responseJSON) {
                        var uuids, lazyAjaxConfig;

                        uuids = $.map(responseJSON, function (item) {
                            return item['name'];
                        });

                        lazyAjaxConfig = {
                            url: ctwc.URL_VM_VN_STATS,
                            type: 'POST',
                            data: JSON.stringify({
                                data: {
                                    type: type,
                                    uuids: uuids.join(','),
                                    minSince: 60,
                                    useServerTime: true
                                }
                            })
                        }
                        return lazyAjaxConfig;
                    },
                    successCallback: function (response, contrailListModel) {
                        var statDataList = ctwp.parseInstanceStats(response[0], type),
                            dataItems = contrailListModel.getItems(),
                            updatedDataItems = [],
                            statData;

                        for (var j = 0; j < statDataList.length; j++) {
                            statData = statDataList[j];
                            for (var i = 0; i < dataItems.length; i++) {
                                var dataItem = dataItems[i];
                                if (statData['name'] == dataItem['name']) {
                                    dataItem['inBytes60'] = ifNull(statData['inBytes'], 0);
                                    dataItem['outBytes60'] = ifNull(statData['outBytes'], 0);
                                    updatedDataItems.push(dataItem);
                                    break;
                                }
                            }
                        }
                        contrailListModel.updateData(updatedDataItems);
                    }
                },
                {
                    getAjaxConfig: function (responseJSON) {
                        var lazyAjaxConfig,
                            interfaceList = [];

                        for (var i = 0; i < responseJSON.length; i++) {
                            var instance = responseJSON[i],
                                uveVirtualMachineAgent = contrail.handleIfNull(instance['value']['UveVirtualMachineAgent'], {}),
                                instanceInterfaces = contrail.handleIfNull(uveVirtualMachineAgent['interface_list'], []);
                            if(instanceInterfaces.length > 0) {
                                interfaceList.push(instanceInterfaces);
                            }
                        }

                        lazyAjaxConfig = {
                            url: ctwc.URL_VM_INTERFACES,
                            type: 'POST',
                            data: JSON.stringify({
                                parentType: ctwc.TYPE_VIRTUAL_MACHINE,
                                kfilt: interfaceList.join(','),
                                cfilt: ctwc.FILTERS_INSTANCE_LIST_INTERFACES.join(',')
                            })
                        };
                        return lazyAjaxConfig;
                    },
                    successCallback: function (response, contrailListModel) {
                        var interfaceMap = ctwp.instanceInterfaceDataParser(response),
                            dataItems = contrailListModel.getItems(),
                            updatedDataItems = [];

                        for (var i = 0; i < dataItems.length; i++) {
                            var dataItem = dataItems[i],
                                uveVirtualMachineAgent = contrail.handleIfNull(dataItem['value']['UveVirtualMachineAgent'], {}),
                                interfaceList = contrail.handleIfNull(uveVirtualMachineAgent['interface_list'], []),
                                interfaceDetailsList = [],
                                inThroughput = 0, outThroughput = 0, throughput = 0;

                            for (var j = 0; j < interfaceList.length; j++) {
                                var interfaceDetail = interfaceMap[interfaceList[j]],
                                    ifStats;

                                if (contrail.checkIfExist(interfaceDetail)) {
                                    ifStats = ifNull(interfaceDetail['if_stats'], {});
                                    inThroughput += ifNull(interfaceDetail['in_bw_usage'], 0);
                                    outThroughput += ifNull(interfaceDetail['out_bw_usage'], 0);
                                    interfaceDetailsList.push(interfaceDetail);
                                }
                            }

                            if(interfaceDetailsList.length > 0) {
                                throughput = inThroughput + outThroughput;
                                dataItem['throughput'] = throughput;
                                dataItem['size'] = throughput;
                                uveVirtualMachineAgent['interface_details'] = interfaceDetailsList;
                                dataItem['vn'] = ifNull(jsonPath(interfaceDetailsList, '$...virtual_network'), []);

                                if (dataItem['vn'] != false) {
                                    if (dataItem['vn'].length != 0) {
                                        dataItem['vnFQN'] = dataItem['vn'][0];
                                    }
                                    dataItem['vn'] = ctwu.formatVNName(dataItem['vn']);
                                } else {
                                    dataItem['vn'] = '-';
                                }

                                for (var k = 0; k < interfaceDetailsList.length; k++) {
                                    if (interfaceDetailsList[k]['ip6_active'] == true) {
                                        if (interfaceDetailsList[k]['ip_address'] != '0.0.0.0')
                                            dataItem['ip'].push(interfaceDetailsList[k]['ip_address']);
                                        if (interfaceDetailsList[k]['ip6_address'] != null)
                                            dataItem['ip'].push(interfaceDetailsList[k]['ip6_address']);
                                    } else {
                                        if (interfaceDetailsList[k]['ip_address'] != '0.0.0.0')
                                            dataItem['ip'].push(interfaceDetailsList[k]['ip_address']);
                                    }
                                }
                                /*
                                 if (interfaceDetailsList.length > 0) {
                                 dataItem['vmName'] = interfaceDetailsList[0]['vm_name'];
                                 }
                                 */
                                updatedDataItems.push(dataItem);
                            }
                        }
                        contrailListModel.updateData(updatedDataItems);
                    }
                }
            ];
        };
    };

    return CTGridConfig;
});

/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-graph-config',[
    'underscore'
], function (_) {
    var CTGraphConfig = function () {
        this.getTabsViewConfig = function(tabType, elementObj) {

            var config = {};

            switch (tabType) {

                case ctwc.GRAPH_ELEMENT_PROJECT:

                    var options = {
                        projectFQN: elementObj.fqName,
                        projectUUID: elementObj.uuid
                    };

                    config = {
                        elementId: cowu.formatElementId([ctwl.MONITOR_PROJECT_ID]),
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: ctwl.MONITOR_PROJECT_VIEW_ID,
                                            view: "ProjectTabView",
                                            viewPathPrefix: "monitor/networking/ui/js/views/",
                                            app: cowc.APP_CONTRAIL_CONTROLLER,
                                            viewConfig: options
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    break;

                case ctwc.GRAPH_ELEMENT_NETWORK:

                    var options = {
                        networkFQN: elementObj.fqName,
                        networkUUID: elementObj.uuid
                    };

                    config = {
                        elementId: cowu.formatElementId([ctwl.MONITOR_NETWORK_ID]),
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: ctwl.MONITOR_NETWORK_VIEW_ID,
                                            view: "NetworkTabView",
                                            viewPathPrefix: "monitor/networking/ui/js/views/",
                                            app: cowc.APP_CONTRAIL_CONTROLLER,
                                            viewConfig: options
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    break;

                case ctwc.GRAPH_ELEMENT_INSTANCE:

                    var options = {
                        networkFQN: elementObj.fqName,
                        instanceUUID: elementObj.uuid
                    };

                    config = {
                        elementId: cowu.formatElementId([ctwl.MONITOR_INSTANCE_ID]),
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: ctwl.MONITOR_INSTANCE_VIEW_ID,
                                            view: "InstanceTabView",
                                            viewPathPrefix: "monitor/networking/ui/js/views/",
                                            app: cowc.APP_CONTRAIL_CONTROLLER,
                                            viewConfig: options
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    break;

                case ctwc.GRAPH_ELEMENT_CONNECTED_NETWORK:

                    config = {
                        elementId: cowu.formatElementId([ctwl.MONITOR_CONNECTED_NETWORK_ID]),
                        view: "SectionView",
                        viewConfig: {
                            rows: [
                                {
                                    columns: [
                                        {
                                            elementId: ctwl.MONITOR_CONNECTED_NETWORK_VIEW_ID,
                                            view: "ConnectedNetworkTabView",
                                            viewPathPrefix: "monitor/networking/ui/js/views/",
                                            app: cowc.APP_CONTRAIL_CONTROLLER,
                                            viewConfig: elementObj
                                        }
                                    ]
                                }
                            ]
                        }
                    };

                    break;

            }

            return config;
        };

        this.getPortDistributionTooltipConfig = function(onScatterChartClick) {
            return function(data) {
                var type = ctwl.get(data['type']),
                    name = data['name'];

                if(data['name'].toString().indexOf('-') > -1) {
                    type += ' Range';
                }

                return {
                    title: {
                        name: name,
                        type: type
                    },
                    content: {
                        iconClass: false,
                        info: [
                            {label: 'Flows', value: data['flowCnt']},
                            {label: 'Bandwidth', value: cowu.addUnits2Bytes(ifNull(data['origY'], data['y']))}
                        ],
                        actions: [
                            {
                                type: 'link',
                                text: 'View',
                                iconClass: 'icon-external-link',
                                callback: onScatterChartClick
                            }
                        ],
                        overlappedElementConfig: {
                            dropdownTypeField: 'type'
                        }
                    }
                };
            }
        };

    };

    return CTGraphConfig;
});
/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-parsers',[
    'underscore'
], function (_) {
    var CTParsers = function() {
        var self = this;

        this.instanceDataParser = function(response) {
            var retArr = $.map(ifNull(response['data']['value'],response), function (currObject, idx) {
                var currObj = currObject['value'];
                currObject['raw_json'] = $.extend(true,{},currObject);
                currObject['inBytes60'] = '-';
                currObject['outBytes60'] = '-';
                // If we append * wildcard stats info are not there in response,so we changed it to flat
                currObject['url'] = '/api/tenant/networking/virtual-machine/summary?fqNameRegExp=' + currObject['name'] + '?flat';
                currObject['vmName'] = getValueByJsonPath(currObj,'UveVirtualMachineAgent;vm_name');
                currObject['uuid'] = currObject['name'];

                var vRouter = getValueByJsonPath(currObj,'UveVirtualMachineAgent;vrouter');
                currObject['vRouter'] = ifNull(ctwu.getDataBasedOnSource(vRouter), '-');
                currObject['intfCnt'] = ifNull(jsonPath(currObj, '$..interface_list')[0], []).length;
                currObject['vn'] = false;
                currObject['ip'] = [];

                var cpuInfo = getValueByJsonPath(currObj,'UveVirtualMachineAgent;cpu_info');
                if(contrail.checkIfExist(cpuInfo)) {
                    currObject['x'] = cpuInfo['cpu_one_min_avg'];
                    currObject['y'] = cpuInfo['rss'];
                } else {
                    currObject['x'] = 0;
                    currObject['y'] = 0;
                }

                currObject['size'] = 0;

                return currObject;
            });
            return retArr;
        };

        this.instanceInterfaceDataParser = function(response) {
            var rawInterfaces, interface, interfaceMap = {}, uveVMInterfaceAgent;
            if(response != null && response.value != null) {
                rawInterfaces = response.value;
                for(var i = 0; i < rawInterfaces.length; i++) {
                    interface = {};
                    uveVMInterfaceAgent = rawInterfaces[i]['value']['UveVMInterfaceAgent'];
                    interface = $.extend(true, interface, uveVMInterfaceAgent);
                    interface['name'] = rawInterfaces[i]['name'];

                    var ip6Active = interface['ip6_active'];
                    if(ip6Active) {
                        interface['ip'] = interface['ip6_address'];
                    } else {
                        interface['ip'] = interface['ip_address'];
                    }

                    var fipStatsList = getValueByJsonPath(uveVMInterfaceAgent, 'fip_diff_stats'),
                        floatingIPs = (fipStatsList == null) ? [] : fipStatsList;

                    interface['floatingIP'] = [];
                    $.each(floatingIPs, function (idx, fipObj) {
                        interface['floatingIP'].push(contrail.format('{0} ({1} / {2})', fipObj['ip_address'], cowu.addUnits2Bytes(ifNull(fipObj['in_bytes'], '-')), cowu.addUnits2Bytes(ifNull(fipObj['out_bytes'], '-'))));
                    });

                    if(contrail.checkIfExist(interface['if_stats'])) {
                        interface['throughput'] = interface['in_bw_usage'] + interface['out_bw_usage'];
                    }

                    interfaceMap[interface['name']] = interface;
                }
            }
            return interfaceMap;
        };

        this.parseNetworks4PortMap = function (data) {
            var response = data['res'];
            var result = {};
            var value = 0;
            var portMap = [0, 0, 0, 0, 0, 0, 0, 0];

            //If portmap received from multiple vRouters
            if ((response instanceof Array) && (response[0] instanceof Array)) {
                $.each(response, function (idx, obj) {
                    for (var i = 0; i < 8; i++) {
                        portMap[i] |= parseInt(obj[0][i]);
                    }
                });
            } else if (response instanceof Array)
                portMap = response;
            if (portMap != null) {
                var strPortMap = [];
                $.each(portMap, function (idx, value) {
                    var str = get32binary(parseInt(value)),
                        reverseString = str.split("").reverse().join("");

                    strPortMap.push(reverseString);
                });
                //console.info(strPortMap);
            }
            //To plot in 4 rows
            var stringPortMap = [];
            for (var i = 0, j = 0; j < 4; i += 2, j++)
                stringPortMap[j] = strPortMap[i] + strPortMap[i + 1]
            var chartData = [];
            for (var i = 0; i < 64; i++) {
                for (var j = 0; j < 4; j++) {
                    chartData.push({
                        x: i,
                        y: j,
                        value: (response == null) ? 0 : parseInt(stringPortMap[j][i])
                    });
                }
            }
            result['res'] = chartData;
            result['type'] = data['type'];
            result['pType'] = data['pType'];
            return result;
        };

        this.parseTrafficLineChartData = function (responseArray) {
            if (responseArray.length == 0) {
                return [];
            }
            var response = responseArray[0],
                rawdata = response['flow-series'],
                inBytes = {key: "In Traffic", values: [], color: cowc.D3_COLOR_CATEGORY5[0]},
                outBytes = {key: "Out Traffic", values: [], color: cowc.D3_COLOR_CATEGORY5[1]},
                inPackets = {key: "In Packets", values: []}, outPackets = {key: "Out Packets", values: []},
                chartData = [inBytes, outBytes];

            for (var i = 0; i < rawdata.length; i++) {
                var ts = Math.floor(rawdata[i].time / 1000);
                inBytes.values.push({x: ts, y: rawdata[i].inBytes});
                outBytes.values.push({x: ts, y: rawdata[i].outBytes});
                inPackets.values.push({x: ts, y: rawdata[i].inPkts});
                outPackets.values.push({x: ts, y: rawdata[i].outPkts});
            }
            return chartData;
        };

        this.parseCPUMemLineChartData = function(responseArray) {
            var cpuUtilization = {key: "CPU Utilization (%)", values: [], bar: true, color: cowc.D3_COLOR_CATEGORY5[1]},
                memoryUsage = {key: "Memory Usage", values: [], color: cowc.D3_COLOR_CATEGORY5[3]},
                chartData = [cpuUtilization, memoryUsage];

            for (var i = 0; i < responseArray.length; i++) {
                var ts = Math.floor(responseArray[i]['T'] / 1000);
                cpuUtilization.values.push({x: ts, y: responseArray[i]['cpu_stats.cpu_one_min_avg']});
                memoryUsage.values.push({x: ts, y: responseArray[i]['cpu_stats.rss']});
            }
            return chartData;
        };

        this.parseLineChartDataForNodeDetails = function(responseArray,options) {
            var axis1 = {key: (options.axisLabels != null)? options.axisLabels[0]: "CPU Utilization (%)",
                                    values: [],
                                    bar: true,
                                    color: cowc.D3_COLOR_CATEGORY5[1]
                                };
            var axis2 = {key: (options.axisLabels != null)? options.axisLabels[1]: "Memory Usage",
                                    values: [],
                                    color: cowc.D3_COLOR_CATEGORY5[3]
                                };
            var chartData = [axis1, axis2];

            for (var i = 0; i < responseArray.length; i++) {
                var ts = Math.floor(responseArray[i]['T'] / 1000);
                axis1.values.push({x: ts, y: responseArray[i][options.dimensions[0]]});
                axis2.values.push({x: ts, y: responseArray[i][options.dimensions[1]]});
            }
            return chartData;
        };

        this.parseLineChartDataForVRouterBandwidth = function(responseArray,options) {
            var axis1 = {key: (options.axisLabels != null)? options.axisLabels[0]: "CPU Utilization (%)",
                                    values: [],
                                    bar: true,
                                    color: cowc.D3_COLOR_CATEGORY5[1]
                                };
            var axis2 = {key: (options.axisLabels != null)? options.axisLabels[1]: "Memory Usage",
                                    values: [],
                                    color: cowc.D3_COLOR_CATEGORY5[3]
                                };
            var axis3 = {key: (options.axisLabels != null)? options.axisLabels[2]: "Memory Usage",
                                    values: [],
                                    color: cowc.D3_COLOR_CATEGORY5[4]
                                };
            var chartData = [axis1, axis2, axis3];

            for (var i = 0; i < responseArray.length; i++) {
                var ts = Math.floor(responseArray[i]['T'] / 1000);
                axis1.values.push({x: ts, y: responseArray[i][options.dimensions[0]]});
                axis2.values.push({x: ts, y: responseArray[i][options.dimensions[1]]});
                axis3.values.push({x: ts, y: responseArray[i][options.dimensions[2]]});
            }
            return chartData;
        };

        this.parseDataForNodeDetailsSparkline = function (responseArray,options) {
            var retData = [];
            for (var i = 0; i < responseArray.length; i++) {
//                var ts = Math.floor(responseArray[i]['T'] / 1000);
                retData.push(responseArray[i][options.dimensions[0]]);
            }
            return retData;
        }

        this.parseNetwork4Breadcrumb = function(response) {
            return  $.map(response['virtual-networks'], function (n, i) {
                if (!ctwu.isServiceVN(n.fq_name.join(':'))) {
                    return {
                        fq_name: n.fq_name.join(':'),
                        name: n.fq_name[2],
                        value: n.uuid
                    };
                }
            });
        };

        this.vRouterCfgDataParser = function(response) {
           var retArr = [];
           if(response != null &&
              'virtual-routers' in response &&
               response['virtual-routers'] != null &&
               response['virtual-routers'].length > 0) {
               var length = response['virtual-routers'].length
               for (var i = 0; i < length; i++) {
                   retArr.push(response['virtual-routers'][i]['virtual-router']);
               }
           }
           return retArr;
        };

        this.ipamCfgDataParser = function(response) {
           var retArr = [];
           if(response != null &&
              'network-ipams' in response &&
               response['network-ipams'] != null &&
               response['network-ipams'].length > 0) {
               var length = response['network-ipams'].length
               for (var i = 0; i < length; i++) {
                   retArr.push(response['network-ipams'][i]['network-ipam']);
               }
           }
           return retArr;
        };

        this.fipCfgDataParser = function(response) {
           var retArr = [];
           if(response != null &&
              'floating_ip_back_refs' in response &&
               response['floating_ip_back_refs'] != null &&
               response['floating_ip_back_refs'].length > 0) {
               var length = response['floating_ip_back_refs'].length
               for (var i = 0; i < length; i++) {
                   retArr.push(response['floating_ip_back_refs'][i]['floating-ip']);
               }
           }
           return retArr;
        };

        this.svcTemplateCfgDataParser = function(response) {
           var retArr = [];
           if(response != null &&
              'service_templates' in response &&
               response['service_templates'] != null &&
               response['service_templates'].length > 0) {
               var length = response['service_templates'].length
               for (var i = 0; i < length; i++) {
                   var svcApplSetRefs =
                       getValueByJsonPath(response['service_templates'][i],
                                          'service-template;service_appliance_set_refs',
                                          []);
                   if (svcApplSetRefs.length > 0) {
                       response['service_templates'][i]['service-template']
                           ['service_appliance_set'] =
                           svcApplSetRefs[0]['to'].join(':');
                   }
                   retArr.push(response['service_templates'][i]['service-template']);
               }
           }
           return retArr;
        };

        this.vmTrafficStatsParser = function (response) {
            return [response];
        };

        this.interfaceDataParser = function(response) {
            var interfaceMap = self.instanceInterfaceDataParser(response)
            return _.values(interfaceMap);
        };

        this.parseInstanceInterfaceStats = function (response) {
            var retArr = $.map(ifNull(response['value'], response), function (obj, idx) {
                var item = {};
                var props = ctwc.STATS_SELECT_FIELDS['virtual-machine'];
                item['name'] = obj['name'];
                item['inBytes'] = ifNull(obj[props['inBytes']], '-');
                item['outBytes'] = ifNull(obj[props['outBytes']], '-');
                return item;
            });
            return retArr;
        };

        this.parseNetwork4PortDistribution = function(response, networkFQN, interfaceIP) {
            var srcPortdata  = response ? ctwp.parsePortDistribution(ifNull(response['sport'], []), {
                    startTime: response['startTime'],
                    endTime: response['endTime'],
                    bandwidthField: 'outBytes',
                    flowCntField: 'outFlowCount',
                    portField: 'sport',
                    portYype: "src",
                    fqName: networkFQN,
                    ipAddress: interfaceIP
                }) : [],
                dstPortData = response ? ctwp.parsePortDistribution(ifNull(response['dport'], []), {
                    startTime: response['startTime'],
                    endTime: response['endTime'],
                    bandwidthField: 'inBytes',
                    flowCntField: 'inFlowCount',
                    portField: 'dport',
                    portYype: "src",
                    fqName: networkFQN,
                    ipAddress: interfaceIP
                }) : [],
                chartData = [];

            chartData = chartData.concat(srcPortdata);
            chartData = chartData.concat(dstPortData);

            return chartData;
        };


        this.parsePortDistribution = function (responseData, parserConfig) {
            var portCF = crossfilter(responseData),
                portField = ifNull(parserConfig['portField'], 'sport'),
                portType = parserConfig['portType'],
                color, parsedData = [],
                fqName = parserConfig['fqName'];

            if (portType == null) {
                portType = (portField == 'sport') ? 'src' : 'dst';
            }

            var flowCntField = ifNull(parserConfig['flowCntField'], 'outFlowCnt'),
                bandwidthField = ifNull(parserConfig['bandwidthField'], 'outBytes');

            var portDim = portCF.dimension(function (d) {
                    return d[parserConfig['portField']];
                }),
                PORT_LIMIT = 65536, PORT_STEP = 256,
                startPort = ifNull(parserConfig['startPort'], 0),
                endPort = ifNull(parserConfig['endPort'], PORT_LIMIT);

            if (endPort - startPort == 255)
                PORT_STEP = 1;

            if (portType == 'src') {
                color = 'default';
            } else {
                color = 'medium';
            }

            //Have a fixed port bucket range of 256
            for (var i = startPort; i <= endPort; i = i + PORT_STEP) {
                var name, range,
                    totalBytes = 0, flowCnt = 0, x;

                if (PORT_STEP == 1) {
                    portDim.filter(i);
                    name = i;
                    range = i;
                } else {
                    portDim.filter([i, Math.min(i + PORT_STEP - 1, 65536)]);
                    name = i + ' - ' + Math.min(i + PORT_STEP - 1, 65536);
                    range = i + '-' + Math.min(i + PORT_STEP - 1, 65536);
                }

                $.each(portDim.top(Infinity), function (idx, obj) {
                    totalBytes += obj[bandwidthField];
                    flowCnt += obj[flowCntField];
                });

                x = Math.floor(i + Math.min(i + PORT_STEP - 1, 65536)) / 2

                if (portDim.top(Infinity).length > 0)
                    parsedData.push({
                        startTime: parserConfig['startTime'],
                        endTime: parserConfig['endTime'],
                        x: x,
                        y: totalBytes,
                        name: name,
                        type: portType == 'src' ? 'sport' : 'dport',
                        range: range,
                        flowCnt: flowCnt,
                        size: flowCnt,
                        color: color,
                        fqName: fqName,
                        ipAddress: parserConfig['ipAddress']
                        //type:portField
                    });
            }
            return parsedData;
        };

        this.parseInstanceStats = function (response, type) {
            response = contrail.handleIfNull(response, {});
            var retArr = $.map(ifNull(response['value'], []), function (obj, idx) {
                var item = {};
                var props = ctwc.STATS_SELECT_FIELDS[type];
                item['name'] = obj['vm_uuid'];
                item['inBytes'] = ifNull(obj[props['inBytes']], '-');
                item['outBytes'] = ifNull(obj[props['outBytes']], '-');
                return item;
            });
            return retArr;
        };

        this.vnCfgDataParser = function(response, isShared) {
            var retArr = [];
            var domain  = contrail.getCookie(cowc.COOKIE_DOMAIN);
            var project = contrail.getCookie(cowc.COOKIE_PROJECT);

            if(response != null &&
                'virtual-networks' in response &&
                response['virtual-networks'].length > 0) {
                var len = response['virtual-networks'].length
                for (var i = 0; i < len; i++) {
                    if (isShared && isShared == true) {
                        var vn = response['virtual-networks'][i]['virtual-network']
                        if (!(domain == vn['fq_name'][0] && project == vn['fq_name'][1])) {
                            retArr.push(response['virtual-networks'][i]['virtual-network']);
                        }
                    } else {
                        retArr.push(response['virtual-networks'][i]['virtual-network']);
                    }
                }
            }
            return retArr;
        };

        this.parseActiveDNSRecordsData = function(result) {
            var activeDNSRecData = [];
            if(result instanceof Array && result.length === 1){
                var virtualDNSResponse = getValueByJsonPath(result,
                    "0;VirtualDnsRecordsResponse", {});
                var recData = getValueByJsonPath(virtualDNSResponse,
                    "records;list;VirtualDnsRecordTraceData", []);
                if(recData instanceof Array) {
                    activeDNSRecData = recData;
                } else {
                    activeDNSRecData.push(recData);
                }
                var key = getValueByJsonPath(virtualDNSResponse,
                    "getnext_record_set", null);
                prevNextCache.push(key);
            }
            return activeDNSRecData;
        };

        this.svcHealthChkCfgDataParser = function(response) {
           var retArr = [];
           var svcHealthChk = getValueByJsonPath(response,
                            '0;service-health-checks', []);

           var length = svcHealthChk.length
           for (var i = 0; i < length; i++) {
               retArr.push(svcHealthChk[i]['service-health-check']);
           }
           return retArr;
        };


    };

    return CTParsers;
});

/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define('controller-view-config',[
    'underscore',
    'contrail-view-model'
], function (_, ContrailViewModel) {
    var CTViewConfig = function () {
        var self = this;

        self.getInstanceTabViewConfig = function (viewConfig) {
            var instanceUUID = viewConfig['instanceUUID'],
                instanceDetailsUrl = ctwc.get(ctwc.URL_INSTANCE_DETAIL, instanceUUID),
                networkFQN = viewConfig['networkFQN'],
                tabsToDisplay = viewConfig['tabsToDisplay'],
                tabObjs = [];
            var allTabs = self.getInstanceDetailPageTabConfig(viewConfig);
            if (tabsToDisplay == null) {
                tabObjs = allTabs;
            } else if (typeof tabsToDisplay =='string' || $.isArray(tabsToDisplay)) {
                if(typeof tabsToDisplay == 'string') {
                    tabsToDisplay = [tabsToDisplay];
                }
                for(var i = 0; i < tabsToDisplay.length; i++ ) {
                    $.each(allTabs,function(idx,obj) {
                        if(obj['view'] == tabsToDisplay[i])
                            tabObjs.push(obj);
                    });
                }
            }
            return {
                elementId: cowu.formatElementId([ctwl.MONITOR_INSTANCE_VIEW_ID, '-section']),
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: ctwl.INSTANCE_TABS_ID,
                                    view: "TabsView",
                                    viewConfig: {
                                        theme: 'classic',
                                        active: 1,
                                        tabs: tabObjs
                                    }
                                }
                            ]
                        }
                    ]
                }
            }

        };

        self.getInstanceDetailPageTabConfig = function (viewConfig) {
            var instanceUUID = viewConfig['instanceUUID'];
            var networkFQN = viewConfig['networkFQN'];
            var instanceDetailsUrl = ctwc.get(ctwc.URL_INSTANCE_DETAIL, instanceUUID);
            return [
                    {
                        elementId: ctwl.INSTANCE_DETAILS_ID,
                        title: ctwl.TITLE_DETAILS,
                        view: "DetailsView",
                        viewConfig: {
                            ajaxConfig: {
                                url: instanceDetailsUrl,
                                type: 'GET'
                            },
                            modelKey: ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID),
                            templateConfig: ctwu.getInstanceDetailsTemplateConfig(),
                            app: cowc.APP_CONTRAIL_CONTROLLER,
                            dataParser: function (response) {
                                return {
                                    name: instanceUUID,
                                    value: response
                                };
                            }
                        }
                    },
                    {
                        elementId: ctwl.INSTANCE_INTERFACE_ID,
                        title: ctwl.TITLE_INTERFACES,
                        view: "InterfaceGridView",
                        viewPathPrefix: "monitor/networking/ui/js/views/",
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        tabConfig: {
                            activate: function(event, ui) {
                                if ($('#' + ctwl.INSTANCE_INTERFACE_GRID_ID).data('contrailGrid')) {
                                    $('#' + ctwl.INSTANCE_INTERFACE_GRID_ID).data('contrailGrid').refreshView();
                                }
                            }
                        },
                        viewConfig: {
                            parentType: ctwc.TYPE_VIRTUAL_MACHINE,
                            modelKey: ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID),
                            instanceUUID: instanceUUID,
                            networkFQN: networkFQN,
                            elementId: ctwl.INSTANCE_INTERFACE_GRID_ID
                        }
                    },
                    {
                        elementId: ctwl.INSTANCE_TRAFFIC_STATS_ID,
                        title: ctwl.TITLE_TRAFFIC_STATISTICS,
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        view: "InstanceTrafficStatsView",
                        viewPathPrefix: "monitor/networking/ui/js/views/",
                        tabConfig: {
                            activate: function(event, ui) {
                                $('#' + ctwl.INSTANCE_TRAFFIC_STATS_ID).find('svg').trigger('refresh');
                            }
                        },
                        viewConfig: {
                            modelKey: ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID),
                            instanceUUID: instanceUUID,
                            parseFn: ctwp.parseTrafficLineChartData
                        }
                    },
                    {
                        elementId: ctwl.INSTANCE_PORT_DIST_ID,
                        title: ctwl.TITLE_PORT_DISTRIBUTION,
                        app: cowc.APP_CONTRAIL_CONTROLLER,
                        view: "InstancePortDistributionView",
                        viewPathPrefix: "monitor/networking/ui/js/views/",
                        tabConfig: {
                            activate: function(event, ui) {
                                $('#' + ctwl.INSTANCE_PORT_DIST_CHART_ID).trigger('refresh');
                            }
                        },
                        viewConfig: {
                            modelKey: ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID),
                            instanceUUID: instanceUUID
                        }
                    },
                    {
                        elementId: ctwl.INSTANCE_PORT_HEAT_CHART_ID,
                        title: ctwl.TITLE_PORT_MAP,
                        view: "HeatChartView",
                        viewConfig: {
                            ajaxConfig: {
                                url: ctwc.get(ctwc.URL_INSTANCE_DETAIL, instanceUUID),
                                type: 'GET'
                            },
                            chartOptions: {getClickFn: function(){}}
                        }
                    },
                    {
                        elementId: ctwl.INSTANCE_CPU_MEM_STATS_ID,
                        title: ctwl.TITLE_CPU_MEMORY,
                        view: "LineBarWithFocusChartView",
                        tabConfig: {
                            activate: function(event, ui) {
                                $('#' + ctwl.INSTANCE_CPU_MEM_STATS_ID).find('svg').trigger('refresh');
                            }
                        },
                        viewConfig: {
                            modelConfig: getInstanceCPUMemModelConfig(networkFQN, instanceUUID),
                            parseFn: ctwp.parseCPUMemLineChartData,
                            chartOptions: {
                                forceY1: [0, 0.5]
                            }
                        }
                    }
            ];
        };

        self.getInstanceTabViewModelConfig = function (instanceUUID) {
            var modelKey = ctwc.get(ctwc.UMID_INSTANCE_UVE, instanceUUID);
            var viewModelConfig = {
                modelKey: modelKey,
                remote: {
                    ajaxConfig: {
                        url: ctwc.get(ctwc.URL_INSTANCE_DETAIL, instanceUUID),
                        type: 'GET'
                    },
                    dataParser: function(response) {
                        return {name: instanceUUID, value: response};
                    }
                },
                cacheConfig: {
                    ucid: ctwc.UCID_PREFIX_MN_UVES + instanceUUID
                },
                vlRemoteConfig: {
                    vlRemoteList: ctwgc.getVMInterfacesLazyRemoteConfig()
                }
            };

            return new ContrailViewModel(viewModelConfig);
        };

        self.getHeatChartClickFn = function(selector, response) {
            return function(clickData) {
                var currHashObj = layoutHandler.getURLHashObj(),
                    startRange = ((64 * clickData.y) + clickData.x) * 256,
                    endRange = startRange + 255,
                    hashParams = {}, protocolMap = {'icmp': 1, 'tcp': 6, 'udp': 17};

                hashParams['fqName'] = currHashObj['q']['fqName'];
                hashParams['port'] = startRange + "-" + endRange;
                hashParams['startTime'] = new XDate().addMinutes(-10).getTime();
                hashParams['endTime'] = new XDate().getTime();
                hashParams['portType'] = response['type'];
                hashParams['protocol'] = protocolMap[response['pType']];
                hashParams['type'] = "flow";
                hashParams['view'] = "list";

                layoutHandler.setURLHashParams(hashParams, {p: 'mon_networking_networks'});
            }
        };

        self.getDomainBreadcrumbDropdownViewConfig = function (hashParams, customDomainDropdownOptions) {
            var urlValue = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null),
                defaultDropdownoptions = {
                    urlValue: (urlValue !== null) ? urlValue.split(':').splice(0,1).join(':') : null,
                    cookieKey: cowc.COOKIE_DOMAIN
                },
                dropdownOptions = $.extend(true, {}, defaultDropdownoptions, customDomainDropdownOptions);

            return {
                elementId: ctwl.DOMAINS_BREADCRUMB_DROPDOWN,
                view: "BreadcrumbDropdownView",
                viewConfig: {
                    modelConfig: ctwu.getDomainListModelConfig(),
                    dropdownOptions: dropdownOptions
                }
            };
        };
        self.getGlobalSysConfigBCDropdownViewConfig =
            function (hashParams, customDropdownOptions) {
            var urlValue =
                (contrail.checkIfKeyExistInObject(true,
                                                  hashParams,
                                                  'focusedElement.fqName') ?
                 hashParams.focusedElement.fqName : null),
                defaultDropdownoptions = {
                    urlValue: (urlValue !== null) ? urlValue.split(':').splice(0,1).join(':') : null,
                    cookieKey: 'globalSystemConfig'
                },
                dropdownOptions =
                    $.extend(true, {}, defaultDropdownoptions,
                             customDropdownOptions);

            return {
                elementId: ctwl.GLOBALSYS_BREADCRUMB_DROPDOWN,
                view: "BreadcrumbDropdownView",
                viewConfig: {
                    modelConfig: ctwu.getGlobalSysConfigListModelConfig(),
                    dropdownOptions: dropdownOptions
                }
            };
        };

        self.getSASetBCDropdownViewConfig = function (hashParams,
                                                      customDropDownOptions) {
            var urlValue =
                (contrail.checkIfKeyExistInObject(true, hashParams,
                                                  'focusedElement.fqName') ?
                 hashParams.focusedElement.fqName : null),
                defaultDropdownoptions = {
                    urlValue: (urlValue !== null) ?
                                  urlValue.split(':').splice(0,1).join(':') :
                                  null,
                    cookieKey: 'serviceApplSet'
                },
                dropdownOptions =
                    $.extend(true, {}, defaultDropdownoptions,
                             customDropDownOptions);
            return {
                elementId: ctwl.SASET_BREADCRUMB_DROPDOWN,
                view: "BreadcrumbDropdownView",
                viewConfig: {
                    modelConfig: ctwu.getSASetListModelConfig(),
                    dropdownOptions: dropdownOptions
                }
            }
        }

        self.getProjectBreadcrumbDropdownViewConfig = function(hashParams, customProjectDropdownOptions) {
            var urlValue = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null);

            return function(domainSelectedValueData) {

                var defaultDropdownOptions = {
                        urlValue: (urlValue !== null) ? urlValue.split(':').splice(1, 1).join(':') : null,
                        cookieKey: cowc.COOKIE_PROJECT,
                        parentSelectedValueData: domainSelectedValueData,
                        preSelectCB : function(selectedValueData) {
                            if(getValueByJsonPath(selectedValueData,'value') != null) {
                                return $.ajax({
                                            type:"GET",
                                            url:'/api/tenants/get-project-role?id=' +
                                                selectedValueData['value']
                                        });
                            } else {
                                var defObj = $.Deferred();
                                defObj.resolve();
                                return defObj;
                            }
                        }
                    },
                    dropdownOptions = $.extend(true, {}, defaultDropdownOptions, customProjectDropdownOptions);

                return {
                    elementId: ctwl.PROJECTS_BREADCRUMB_DROPDOWN,
                    view: "BreadcrumbDropdownView",
                    viewConfig: {
                        modelConfig:
                            ctwu.getProjectListModelConfig(domainSelectedValueData,
                                                           dropdownOptions),
                        dropdownOptions: dropdownOptions
                    }
                }
            };
        };
        self.getDNSBreadcrumbDropdownViewConfig = function(hashParams, customDNSDropdownOptions) {
            var urlValue = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null);

            return function(domainSelectedValueData) {
                var domain = domainSelectedValueData.value,
                    defaultDropdownOptions = {
                        urlValue: (urlValue !== null) ? urlValue.split(':').splice(1, 1).join(':') : null,
                        cookieKey: 'dnsServer',
                        parentSelectedValueData: domainSelectedValueData
                    },
                    dropdownOptions = $.extend(true, {}, defaultDropdownOptions, customDNSDropdownOptions);

                return {
                    elementId: ctwl.DNS_BREADCRUMB_DROPDOWN,
                    view: "BreadcrumbDropdownView",
                    viewConfig: {
                        modelConfig: ctwu.getDNSListModelConfig(domain),
                        dropdownOptions: dropdownOptions
                    }
                }
            };
        };

        self.getNetworkBreadcrumbDropdownViewConfig = function(hashParams, customNetworkDropdownOptions) {
            var urlValue = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.fqName') ? hashParams.focusedElement.fqName : null);

            return function(projectSelectedValueData) {
                var domain = contrail.getCookie(cowc.COOKIE_DOMAIN),
                    projectFQN = domain + ':' + projectSelectedValueData.name,
                    defaultDropdownOptions = {
                        urlValue: (urlValue !== null) ? urlValue.split(':').splice(2, 1).join(':') : null,
                        cookieKey: cowc.COOKIE_VIRTUAL_NETWORK,
                        parentSelectedValueData: projectSelectedValueData
                    },
                    dropdownOptions = $.extend(true, {}, defaultDropdownOptions, customNetworkDropdownOptions),
                    modelConfig = (projectSelectedValueData.value === 'all') ? null : ctwu.getNetworkListModelConfig(projectFQN);

                return {
                    elementId: ctwl.NETWORKS_BREADCRUMB_DROPDOWN,
                    view: "BreadcrumbDropdownView",
                    viewConfig: {
                        modelConfig: modelConfig,
                        dropdownOptions: dropdownOptions
                    }
                };
            }
        };

        self.getInstanceBreadcrumbTextViewConfig = function(hashParams, customInstanceTextOptions) {
            var instanceUUID = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.uuid')) ? hashParams.focusedElement.uuid : null,
                vmName = (contrail.checkIfKeyExistInObject(true, hashParams, 'focusedElement.vmName')) ? hashParams.focusedElement.vmName : null,
                urlValue = (contrail.checkIfExist(vmName) && vmName != "") ? vmName : instanceUUID;


            return function(networkSelectedValueData) {
                var defaultTextOptions = {
                        urlValue: (urlValue !== null) ? urlValue : null,
                        parentSelectedValueData: networkSelectedValueData
                    },
                    textOptions = $.extend(true, {}, defaultTextOptions, customInstanceTextOptions);

                return {
                    elementId: ctwl.INSTANCE_BREADCRUMB_TEXT,
                    view: "BreadcrumbTextView",
                    viewConfig: {
                        textOptions: textOptions
                    }
                };
            }
        };

        self.getUnderlayDefaultTabConfig = function (viewConfig) {
            return [
                {
                    elementId: ctwc.UNDERLAY_SEARCHFLOW_TAB_ID,
                    title: ctwl.UNDERLAY_SEARCHFLOW_TITLE,
                    view: "SearchFlowFormView",
                    viewPathPrefix: ctwl.UNDERLAY_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: {
                        widgetConfig: {
                            elementId: ctwc.UNDERLAY_SEARCHFLOW_TAB_ID + '-widget',
                            view: "WidgetView",
                            viewConfig: {
                                header: {
                                    title: ctwl.UNDERLAY_SEARCHFLOW_WIDGET_TITLE,
                                },
                                controls: {
                                    top: {
                                        default: {
                                            collapseable: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },{
                    elementId: ctwc.UNDERLAY_TRACEFLOW_TAB_ID,
                    title: ctwl.UNDERLAY_TRACEFLOW_TITLE,
                    view: "TraceFlowTabView",
                    viewPathPrefix:
                        ctwl.UNDERLAY_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: {
                        widgetConfig: {
                            elementId: ctwc.UNDERLAY_TRACEFLOW_TAB_ID + '-widget',
                            view: "WidgetView",
                            viewConfig: {
                                header: {
                                    title: ctwl.UNDERLAY_TRACEFLOW_TITLE,
                                },
                                controls: {
                                    top: {
                                        default: {
                                            collapseable: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    tabConfig: {
                        activate: function (event, ui){
                            if($("#"+ ctwc.TRACEFLOW_RESULTS_GRID_ID).data('contrailGrid') != null) {
                                $("#"+ ctwc.TRACEFLOW_RESULTS_GRID_ID).data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                }
            ];
        };

        self.getUnderlayPRouterTabConfig = function (viewConfig) {
          return [
              {
                  elementId: ctwc.UNDERLAY_DETAILS_TAB_ID,
                  title: ctwl.TITLE_DETAILS,
                  view: "UnderlayDetailsView",
                  viewPathPrefix:
                      ctwl.UNDERLAY_VIEWPATH_PREFIX,
                  app: cowc.APP_CONTRAIL_CONTROLLER,
                  viewConfig: {},
                  tabConfig: {
                      activate: function (event, ui) {
                          if ($('#' + ctwc.UNDERLAY_DETAILS_TAB_ID)) {
                              $('#' + ctwc.UNDERLAY_DETAILS_TAB_ID).trigger('refresh');
                          }
                      },
                      renderOnActivate: false
                  }
              }, {
                  elementId: ctwc.UNDERLAY_PROUTER_INTERFACE_TAB_ID,
                  title: ctwl.UNDERLAY_PROUTER_INTERFACES_TITLE,
                  view: "PRouterInterfaceView",
                  viewPathPrefix:
                      ctwl.UNDERLAY_VIEWPATH_PREFIX,
                  app: cowc.APP_CONTRAIL_CONTROLLER,
                  viewConfig: {},
                  tabConfig: {
                      activate: function (event, ui){
                          if($("#"+ ctwc.UNDERLAY_PROUTER_INTERFACE_TAB_ID).
                               data('contrailGrid') != null) {
                              $("#"+ ctwc.UNDERLAY_PROUTER_INTERFACE_TAB_ID).
                                  data('contrailGrid').refreshView();
                          }
                      },
                      renderOnActivate: false
                  }
              }
          ];
        };

        self.getUnderlayPRouterLinkTabConfig = function () {
            return [
                {
                    elementId: ctwc.UNDERLAY_TRAFFICSTATS_TAB_ID,
                    title: ctwl.UNDERLAY_TRAFFIC_STATISTICS,
                    view: "TrafficStatisticsView",
                    viewPathPrefix:
                        ctwl.UNDERLAY_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: {

                    }
                }
            ];
        };

        self.getPortDistChartOptions = function() {
            return {
                xLabel: ctwl.X_AXIS_TITLE_PORT,
                yLabel: ctwl.Y_AXIS_TITLE_BW,
                forceX: [0, 1000],
                forceY: [0, 1000],
                tooltipConfigCB: ctwgrc.getPortDistributionTooltipConfig(onScatterChartClick),
                controlPanelConfig: {
                    filter: {
                        enable: true,
                        viewConfig: getControlPanelFilterConfig()
                    },
                    legend: {
                        enable: true,
                        viewConfig: getControlPanelLegendConfig()
                    }
                },
                clickCB: onScatterChartClick,
                sizeFieldName: 'flowCnt',
                xLabelFormat: d3.format(','),
                yLabelFormat: function (yValue) {
                    var formattedValue = formatBytes(yValue, false, null, 1);
                    return formattedValue;
                },
                margin: {left: 70},
                noDataMessage: cowm.DATA_SUCCESS_EMPTY
            }
        };

        self.getVRouterDetailsPageTabs = function (viewConfig) {
            var tabViewConfig = [
                {
                    elementId: 'vrouter_detail_tab_id',
                    title: 'Details',
                    view: "VRouterDetailPageView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: viewConfig,
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_DETAIL_PAGE_ID)) {
                                $('#' + ctwl.VROUTER_DETAIL_PAGE_ID).trigger('refresh');
                            }
                        }
                    }
                },{
                    elementId: 'vrouter_interfaces_tab_id',
                    title: 'Interfaces',
                    view: "VRouterInterfacesFormView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: $.extend({},viewConfig,{
                        widgetConfig: {
                            elementId: ctwl.VROUTER_INTERFACES_GRID_ID + '-widget',
                            view: "WidgetView",
                            viewConfig: {
                                header: {
                                    title: ctwl.VROUTER_TAB_SEARCH_PREFIX +
                                        ' ' + ctwl.VROUTER_INTERFACES_TITLE,
                                    // iconClass: "icon-search"
                                },
                                controls: {
                                    top: {
                                        default: {
                                            collapseable: true,
                                            collapsedOnLoad:true
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_INTERFACES_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.VROUTER_INTERFACES_GRID_ID).data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                },{
                    elementId: 'vrouter_networks_tab_id',
                    title: 'Networks',
                    view: "VRouterNetworksFormView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: $.extend({},viewConfig,{
                        widgetConfig: {
                            elementId: ctwl.VROUTER_NETWORKS_GRID_ID + '-widget',
                            view: "WidgetView",
                            viewConfig: {
                                header: {
                                    title: ctwl.VROUTER_TAB_SEARCH_PREFIX + ' ' + ctwl.VROUTER_NETWORKS_TITLE,
                                    // iconClass: "icon-search"
                                },
                                controls: {
                                    top: {
                                        default: {
                                            collapseable: true,
                                            collapsedOnLoad:true
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_NETWORKS_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.VROUTER_NETWORKS_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                },{
                    elementId: 'vrouter_acl_tab_id',
                    title: 'ACL',
                    view: "VRouterACLFormView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: $.extend({},viewConfig,{
                        widgetConfig: {
                            elementId: ctwl.VROUTER_ACL_GRID_ID + '-widget',
                            view: "WidgetView",
                            viewConfig: {
                                header: {
                                    title: ctwl.VROUTER_TAB_SEARCH_PREFIX +
                                        ' ' + ctwl.VROUTER_ACL_TITLE,
                                    // iconClass: "icon-search"
                                },
                                controls: {
                                    top: {
                                        default: {
                                            collapseable: true,
                                            collapsedOnLoad:true
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_ACL_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.VROUTER_ACL_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                },{
                    elementId: 'vrouter_flows_tab_id',
                    title: 'Flows',
                    view: "VRouterFlowsFormView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: viewConfig,
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_FLOWS_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.VROUTER_FLOWS_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                },{
                    elementId: 'vrouter_routes_tab_id',
                    title: 'Routes',
                    view: "VRouterRoutesFormView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: viewConfig,
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_ROUTES_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.VROUTER_ROUTES_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                },{
                    elementId: ctwl.VROUTER_CONSOLE_LOGS_VIEW_ID,
                    title: 'Console',
                    view: "NodeConsoleLogsView",
                    viewConfig: $.extend(viewConfig,
                            {nodeType:monitorInfraConstants.COMPUTE_NODE}),
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + cowl.QE_SYSTEM_LOGS_GRID_ID).data('contrailGrid')) {
                                $('#' + cowl.QE_SYSTEM_LOGS_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                },{
                    elementId:
                        ctwl.VROUTER_ALARMS_GRID_VIEW_ID,
                    title: 'Alarms',
                    view: "VRouterAlarmGridView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: viewConfig,
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.ALARMS_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.ALARMS_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                }
            ];
            var vRouterType = viewConfig['vRouterType'];
            if (vRouterType != null && vRouterType.indexOf('hypervisor') > -1 ) {
                var instanceTabViewConfig = {
                    elementId: 'vrouter_virtualmachines',
                    title: 'Instances',
                    view: "VRouterVirtualMachinesGridView",
                    viewPathPrefix:
                        ctwl.VROUTER_VIEWPATH_PREFIX,
                    app: cowc.APP_CONTRAIL_CONTROLLER,
                    viewConfig: viewConfig,
                    tabConfig: {
                        activate: function(event, ui) {
                            if ($('#' + ctwl.VROUTER_INSTANCE_GRID_ID).data('contrailGrid')) {
                                $('#' + ctwl.VROUTER_INSTANCE_GRID_ID).
                                    data('contrailGrid').refreshView();
                            }
                        },
                        renderOnActivate: true
                    }
                };
                tabViewConfig.splice(6,0,instanceTabViewConfig);
            }
            return tabViewConfig;
        };
        self.getDetailRowInstanceTemplateConfig = function () {
            return {
                templateGenerator: 'RowSectionTemplateGenerator',
                templateGeneratorConfig: {
                    rows: [
                        {
                            templateGenerator: 'ColumnSectionTemplateGenerator',
                            templateGeneratorConfig: {
                                columns: [
                                    {
                                        class: 'span6',
                                        rows: [{
                                            title: ctwl.TITLE_INSTANCE_DETAILS,
                                            templateGenerator:
                                                'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'uuid',
                                                    templateGenerator:
                                                        'TextGenerator'
                                                },{
                                                    key: 'vRouter',
                                                    templateGenerator:
                                                        'LinkGenerator',
                                                    templateGeneratorConfig: {
                                                        template:
                                                            ctwc.URL_VROUTER,
                                                        params: {}
                                                    }
                                                },{
                                                    key: 'vn',
                                                    templateGenerator:
                                                        'TextGenerator'
                                                },{
                                                    key: 'ip',
                                                    templateGenerator:
                                                        'TextGenerator'
                                                },{
                                                    key: 'intfCnt',
                                                    templateGenerator:
                                                        'TextGenerator'
                                             }]
                                       }]
                                    },
                                    {
                                        class: 'span6',
                                        rows: [{
                                            title: ctwl.TITLE_CPU_MEMORY_INFO,
                                            templateGenerator: 'BlockListTemplateGenerator',
                                            templateGeneratorConfig: [
                                                {
                                                    key: 'value.UveVirtualMachineAgent.cpu_info.cpu_one_min_avg',
                                                    templateGenerator: 'TextGenerator'
                                                },{
                                                    key: 'value.UveVirtualMachineAgent.cpu_info.rss',
                                                    templateGenerator: 'TextGenerator',
                                                    templateGeneratorConfig: {
                                                        formatter: 'kilo-byte'
                                                    }
                                                },{
                                                    key: 'value.UveVirtualMachineAgent.cpu_info.vm_memory_quota',
                                                    templateGenerator: 'TextGenerator',
                                                    templateGeneratorConfig: {
                                                        formatter: 'kilo-byte'
                                                    }
                                                }
                                             ]
                                        }]
                                    }
                                ]
                            }
                        }
                    ]
                }
            };
        };
    };

    function getInstanceCPUMemModelConfig(networkFQN, instanceUUID) {
        var postData = {
            async: false,
            fromTimeUTC: "now-120m",
            toTimeUTC: "now",
            select: "Source, T, cpu_stats.cpu_one_min_avg, cpu_stats.rss, name",
            table: "StatTable.VirtualMachineStats.cpu_stats",
            where: "(name = " + instanceUUID + ")"
        };

        var modelConfig = {
            remote: {
                ajaxConfig: {
                    url: ctwc.URL_QUERY,
                    type: 'POST',
                    data: JSON.stringify(postData)
                },
                dataParser: function (response) {
                    return response['data']
                }
            },
            cacheConfig: {
                ucid: ctwc.get(ctwc.UCID_INSTANCE_CPU_MEMORY_LIST, networkFQN, instanceUUID)
            }
        };

        return modelConfig;
    };

    function onScatterChartClick(chartConfig) {
        var hashParams= {
            fqName:chartConfig['fqName'],
            port:chartConfig['range'],
            type: 'flow',
            view: 'list'
        };

        if(chartConfig['startTime'] != null && chartConfig['endTime'] != null) {
            hashParams['startTime'] = chartConfig['startTime'];
            hashParams['endTime'] = chartConfig['endTime'];
        }

        if(chartConfig['type'] == 'sport') {
            hashParams['portType'] = 'src';
        } else if(chartConfig['type'] == 'dport') {
            hashParams['portType'] = 'dst';
        }

        if(contrail.checkIfExist(chartConfig['ipAddress'])) {
            hashParams['ip'] = chartConfig['ipAddress'];
        }

        layoutHandler.setURLHashParams(hashParams, {p:"mon_networking_networks", merge:false});
    };

    function getControlPanelFilterConfig() {
        return {
            groups: [
                {
                    id: 'by-node-color',
                    title: false,
                    type: 'checkbox-circle',
                    items: [
                        {
                            text: 'Source Port',
                            labelCssClass: 'default',
                            filterFn: function(d) { return d.type === 'sport'; }
                        },
                        {
                            text: 'Destination Port',
                            labelCssClass: 'medium',
                            filterFn: function(d) { return d.type === 'dport'; }
                        }
                    ]
                }
            ]
        };
    };

    function getControlPanelLegendConfig() {
        return {
            groups: [
                {
                    id: 'by-node-color',
                    title: 'Port Type',
                    items: [
                        {
                            text: 'Source Port',
                            labelCssClass: 'icon-circle default',
                            events: {
                                click: function (event) {}
                            }
                        },
                        {
                            text: 'Destination Port',
                            labelCssClass: 'icon-circle medium',
                            events: {
                                click: function (event) {}
                            }
                        }
                    ]
                },
                {
                    id: 'by-node-size',
                    title: 'Port Size',
                    items: [
                        {
                            text: 'Flow Count',
                            labelCssClass: 'icon-circle',
                            events: {
                                click: function (event) {}
                            }
                        }
                    ]
                }
            ]
        };
    };

    return CTViewConfig;
});

define('js/controller-libs',[
    'controller-constants',
    'controller-labels',
    'controller-utils',
    'controller-messages',
    'controller-grid-config',
    'controller-graph-config',
    'controller-parsers',
    'controller-view-config',
        ], function() {
            
            });





