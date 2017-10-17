/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['lodashv4', 'contrail-view', 'contrail-list-model'],
        function(_, ContrailView, ContrailListModel){
    var SecurityDashboardViewConfig = function () {
        var self = this;
        self.viewConfig = {
            'vmi-implicit-allow-deny-scatterchart': function (){
                return {
                    modelCfg: {
                        modelId:'vmi-implicit-allow-deny-model',
                        source: 'STATTABLE',
                        config: {
                            "table_name": "StatTable.EndpointSecurityStats.eps.client",
                            "select": "eps.__key, name, SUM(eps.client.in_bytes), SUM(eps.client.out_bytes)",
                            'where': '(eps.__key = 00000000-0000-0000-0000-000000000001) OR (eps.__key = 00000000-0000-0000-0000-000000000002)',
                            "parser": function(response){
                                return _.result(response, 'data', []);
                            }
                        }
                    },
                    viewCfg:{
                        elementId : 'vmi-implicit-allow-deny',
                        view:'ZoomScatterChartView',
                        viewConfig: {
                            chartOptions: {
                                xLabelFormat: function(x) {return formatBytes(x);},
                                yLabelFormat: function(y) {return formatBytes(y);},
                                xLabel: 'Implicit Allow',
                                yLabel: 'Implicit Deny',
                                controlPanel: false,
                                dataParser: function (data) {
                                    var parsedData = [];
                                    _.each(data, function (obj, i) {
                                         if (obj['SUM(eps.client.out_bytes)'] != 0 || obj['SUM(eps.client.in_bytes)'] != 0) {
                                             obj['x'] = obj['y'] = 0;
                                             if (obj['eps.__key'] == '00000000-0000-0000-0000-000000000001') {
                                                 obj['x'] = obj['SUM(eps.client.out_bytes)'] + obj['SUM(eps.client.in_bytes)']
                                             } else if (obj['eps.__key'] == '00000000-0000-0000-0000-000000000002') {
                                                 obj['y'] = obj['SUM(eps.client.out_bytes)'] + obj['SUM(eps.client.in_bytes)']
                                             }
                                             parsedData.push(obj);
                                         }
                                    })
                                    return parsedData;
                                },
                                doBucketize:false,
                                tooltipConfigCB: function(currObj,format) {
                                    var options = {};
                                    var nodes = currObj;
                                    options['tooltipContents'] = [
                                          {label:'VMI Name', value: nodes.name},
                                          {label:'Implicit Allow', value:formatBytes(currObj['x'])},
                                          {label:'Implicit Deny', value:formatBytes(currObj['y'])}
                                      ];
                                    options['subtitle'] = 'Implicit Allow/Deny';
                                    return monitorInfraUtils.getDefaultGeneratorScatterChartTooltipFn(currObj,options);
                                },
                            }
                        }
                    },
                    itemAttr: {
                        width: 1,
                        height: 1.5,
                        title: 'Interfaces',
                        showTitle: true
                    }
                }
            },
            'top-5-services': function () {
                var topServiceCnt = 10;
                return {
                    modelCfg: {
                        modelId:'top-5-services',
                        config: {
                            remote : {
                                ajaxConfig : {
                                    url:monitorInfraConstants.monitorInfraUrls['ANALYTICS_QUERY'],
                                    type:'POST',
                                    data:JSON.stringify({
                                        "session_type": "client",
                                        "start_time": "now-10m",
                                        "end_time": "now",
                                        "select_fields": ["SUM(forward_logged_bytes)", "SUM(reverse_logged_bytes)", "protocol", "server_port"],
                                        "table": "SessionSeriesTable"
                                    })
                                },
                                dataParser : function (response) {
                                    return _.result(response, 'value', []);
                                }
                            }
                        }
                    },
                    viewCfg:{
                        elementId : 'top-5-services',
                        view:'MultiBarChartView',
                        viewConfig: {
                            chartOptions: {
                                yFormatter: function(y) {return formatBytes(y);},
                                xAxisLabel: '',
                                yAxisLabel: 'Traffic',
                                barOrientation: 'horizontal',
                                zerofill: true,
                                xLblFormatter: function (d) {
                                    if (d != null && typeof d == 'string') {
                                       return d;
                                    }
                                }
                            },
                            parseFn: function (data) {
                            	return cowu.parseDataForDiscreteBarChart(data, {
                            		groupBy: function (obj) {
                            			return cowf.format.protocol(obj['protocol']) + ' ('+obj['server_port']+')';
                            		},
                            		axisField: function (obj) {
                            			return (_.result(obj, 'SUM(forward_logged_bytes)', 0) + _.result(obj, 'SUM(reverse_logged_bytes)', 0));
                            		},
                                    label: 'Traffic',
                                    topCnt: topServiceCnt,
                                    zerofill: true,
                            	});
                            }
                        }
                    },
                    itemAttr: {
                        width: 1,
                        height: 1.5,
                        title: 'Top Services',
                        showTitle: true
                    }
                }
            },
            'top-10-allowed-rules': function () {
                var topServiceCnt = 10;
                return {
                    modelCfg: {
                        modelId:'top-10-rule',
                        config: {
                            remote : {
                                ajaxConfig : {
                                    url:monitorInfraConstants.monitorInfraUrls['ANALYTICS_QUERY'],
                                    type:'POST',
                                    data:JSON.stringify({
                                        "session_type": "server",
                                        "start_time": "now-10m",
                                        "end_time": "now",
                                        "select_fields": ["SUM(forward_logged_bytes)", "SUM(reverse_logged_bytes)", "security_policy_rule", "forward_action"],
                                        "table": "SessionSeriesTable"
                                    })
                                },
                                dataParser : function (response) {
                                    return _.result(response, 'value', []);
                                }
                            }
                        }
                    },
                    viewCfg:{
                        elementId : 'top-10-allowed-rules',
                        view:'MultiBarChartView',
                        viewConfig: {
                            chartOptions: {
                                yFormatter: function(y) {return formatBytes(y);},
                                xAxisLabel: '',
                                yAxisLabel: 'Traffic',
                                barOrientation: 'horizontal',
                                zerofill: true,
                                xLblFormatter: ruleUUIdFormatter
                            },
                            parseFn: function (data) {
                            	/*data = _.filter(data, function (obj) {
                            		return _.result(obj, 'forward_action') == 'accept';
                            	});*/
                            	return cowu.parseDataForDiscreteBarChart(data, {
                            		groupBy: 'security_policy_rule',
                            		axisField: function (obj) {
                            			return (_.result(obj, 'SUM(forward_logged_bytes)', 0) + _.result(obj, 'SUM(reverse_logged_bytes)', 0));
                            		},
                                    label: 'Traffic',
                                    topCnt: topServiceCnt,
                                    zerofill: true,
                            	});
                            }
                        }
                    },
                    itemAttr: {
                        width: 1,
                        height: 1.5,
                        title: 'Top Rules (Action: Pass)',
                        showTitle: true
                    }
                }
            },
            'top-10-deny-rules': function () {
                var topServiceCnt = 10;
                return {
                    modelCfg: {
                        modelId:'top-10-rule',
                        config: {
                            remote : {
                                ajaxConfig : {
                                    url:monitorInfraConstants.monitorInfraUrls['ANALYTICS_QUERY'],
                                    type:'POST',
                                    data:JSON.stringify({
                                        "session_type": "server",
                                        "start_time": "now-10m",
                                        "end_time": "now",
                                        "select_fields": ["SUM(forward_logged_bytes)", "SUM(reverse_logged_bytes)", "security_policy_rule", "forward_action"],
                                        "table": "SessionSeriesTable"
                                    })
                                },
                                dataParser : function (response) {
                                    return _.result(response, 'value', []);
                                }
                            }
                        }
                    },
                    viewCfg:{
                        elementId : 'top-10-deny-rules',
                        view:'MultiBarChartView',
                        viewConfig: {
                            chartOptions: {
                                yFormatter: function(y) {return formatBytes(y);},
                                xAxisLabel: '',
                                yAxisLabel: 'Traffic',
                                barOrientation: 'horizontal',
                                zerofill: true,
                                xLblFormatter: ruleUUIdFormatter
                            },
                            parseFn: function (data) {
                            	/*data = _.filter(data, function (obj) {
                            		return _.result(obj, 'forward_action') == 'deny';
                            	});*/
                            	return cowu.parseDataForDiscreteBarChart(data, {
                            		groupBy: 'security_policy_rule',
                            		axisField: function (obj) {
                            			return (_.result(obj, 'SUM(forward_logged_bytes)', 0) + _.result(obj, 'SUM(reverse_logged_bytes)', 0));
                            		},
                                    label: 'Traffic',
                                    topCnt: topServiceCnt,
                                    zerofill: true,
                            	});
                            }
                        }
                    },
                    itemAttr: {
                        width: 1,
                        height: 1.5,
                        title: 'Top Rules (Action: Deny)',
                        showTitle: true
                    }
                }
            }
         };
        function ruleUUIdFormatter (d) {
            if (cowc.DEFAULT_FIREWALL_RULES[d] != null) {
                d = cowc.DEFAULT_FIREWALL_RULES[d]['name'];
            }
            // Hack for now to differentiate between the
            // tooltip header formatter and axis tick formatter
            // because we dont want to call the formatter in
            // tooltip
            if (arguments.length == 2) {
               return d;
            }
            if (d != null && typeof d == 'string') {
               return d.substring(0,8)+'...';
            }
        }
        self.getViewConfig = function(id) {
            return self.viewConfig[id];
        };
    };
    return (new SecurityDashboardViewConfig()).viewConfig;
});
