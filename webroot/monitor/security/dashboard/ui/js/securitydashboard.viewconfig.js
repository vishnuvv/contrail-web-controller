/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(['lodashv4', 'contrail-view', 'contrail-list-model'],
        function(_, ContrailView, ContrailListModel){
    var SecurityDashboardViewConfig = function () {
        var self = this;
        var topServiceCnt = 10;
        	//projectFQN = domain + ':' + projectSelectedValueData.name,
        //projectUUID = projectSelectedValueData.value;
        self.viewConfig = {
    		'top-10-allowed-rules': function () {
                return topRulesWidgetCfg('accept');
            },
        	'vmi-implicit-allow-deny-scatterchart': function (){
            	return {
                    modelCfg: {
                        modelId:'vmi-implicit-allow-deny-model',
                        source: 'STATTABLE',
                        config: {
                            "table_name": "StatTable.EndpointSecurityStats.eps.client",
                            "select": "eps.__key, name, SUM(eps.client.in_bytes), SUM(eps.client.out_bytes)",
                            "where": "(name Starts with " + ctwu.getCurrentDomainProject() +')',
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
                                xLabel: 'Total Traffic',
                                yLabel: 'Implicit Deny',
                                controlPanel: false,
                                dataParser: function (data) {
                                    var parsedData = [];
                                    _.each(data, function (obj, i) {
                                         if (obj['SUM(eps.client.out_bytes)'] != 0 || obj['SUM(eps.client.in_bytes)'] != 0) {
                                             obj['x'] = obj['y'] = 0;
                                             obj['x'] = obj['SUM(eps.client.out_bytes)'] + obj['SUM(eps.client.in_bytes)'];
                                             if (obj['eps.__key'] == '00000000-0000-0000-0000-000000000002') {
                                                 obj['y'] = obj['SUM(eps.client.out_bytes)'] + obj['SUM(eps.client.in_bytes)']
                                             }
                                             parsedData.push(obj);
                                         }
                                    });
                                    return parsedData;
                                },
                                doBucketize:false,
                                tooltipConfigCB: function(currObj,format) {
                                    var options = {};
                                    var nodes = currObj;
                                    options['tooltipContents'] = [
                                          {label:'VMI Name', value: nodes.name},
                                          {label:'Total Traffic', value:formatBytes(currObj['x'])},
                                          {label:'Implicit Deny', value:formatBytes(currObj['y'])}
                                      ];
                                    options['subtitle'] = 'Total Traffic vs Implicit Deny';
                                    return monitorInfraUtils.getDefaultGeneratorScatterChartTooltipFn(currObj,options);
                                },
                            }
                        }
                    },
                    itemAttr: {
                        width: 2,
                        height: 1.5,
                        title: 'Interfaces',
                        showTitle: true
                    }
                }
            },
            'top-10-deny-rules': function () {
            	return topRulesWidgetCfg('deny');
            },
            'top-5-services': function () {
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
                                        "where": [[{"name":"vn","value":ctwu.getCurrentDomainProject(),"op":7}]],
                                        "select_fields": ["SUM(forward_logged_bytes)", "SUM(reverse_logged_bytes)", "protocol", "server_port"],
                                        "table": "SessionSeriesTable"
                                    })
                                },
                                dataParser : function (response) {
                                    var data =  _.result(response, 'value', []);
                                    return  _.filter(data, function (value) {
                                        return value['server_port'] < 36768 ? true : false;
                                    });
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
                                },
                                margin: {top: 10, right: 30, bottom: 80, left: 100},
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
            	/*return '<tspan x="10">tspan line 1</tspan>'+
                '<tspan x="10" dy="15">tspan line 2</tspan>';*/
            }
            if (d != null && typeof d == 'string') {
            	/*return '<tspan x="10">tspan line 1</tspan>'+
                '<tspan x="10" dy="15">tspan line 2</tspan>';*/
                if (d.length > 38) {
            		d = d.split('<--->')[0]+'...'; 
            	}
            	return d;
            }
        }
        function topRulesWidgetCfg (action) {
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
                                    "where": [[{"name":"vn","value":ctwu.getCurrentDomainProject(),"op":7}]],
                                    "select_fields": ["SUM(forward_logged_bytes)", "SUM(reverse_logged_bytes)", "security_policy_rule", "forward_action"],
                                    "table": "SessionSeriesTable"
                                })
                            },
                            dataParser : function (response) {
                                return _.result(response, 'value', []);
                            }
                        },
                        vlRemoteConfig : {
                            vlRemoteList : [{
                                getAjaxConfig : function(primaryCallresponse) {
                                    var rule = _.map(primaryCallresponse, 'security_policy_rule'),
                                    	ruleUUIDs = [];
                                    _.forEach(rule, function (value) {
                                    	if (value == '00000000-0000-0000-0000-000000000001'
                                    		|| value == '00000000-0000-0000-0000-000000000002') {
                                    		ruleUUIDs.push(value);
                                    	}
                                    	if (value != null && typeof value == 'string' &&
                                    		value.indexOf(':') > -1) {
                                    		ruleUUIDs.push(value.split(':').pop());
                                    	}
                                    })
                                    return {
                                        url: "/api/tenants/config/get-config-details",
                                        type: "POST",
                                        data: JSON.stringify(
                                            {data: [{type: 'firewall-rules',obj_uuids: ruleUUIDs, fields: ['firewall_policy_back_refs',
                                             'service', 'service_group_refs']}]})
                                    };
                                },
                                successCallback : function(response, contrailListModel) {
                                    var firewallRules = _.result(response, '0.firewall-rules', []),
                                    	primaryCallResponse = contrailListModel.getItems(),
                                    	ruleMap = _.keyBy(primaryCallResponse, 'security_policy_rule'),
                                    	ruleDataArr = [];
                                    _.forEach(firewallRules, function(value) {
                                    	var firewallObj = _.result(value, 'firewall-rule');
                                    	var ruleStats = _.filter(ruleMap, function (value, key) {
                                    		return _.includes(key, _.result(firewallObj, 'uuid'));
                                    	})
                                    	ruleDataArr.push($.extend({}, _.result(ruleStats, '0', {}), firewallObj));
                                    })
                                    contrailListModel.setData(ruleDataArr);
                                }
                            }],
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
                        		return _.result(obj, 'forward_action') == action;
                        	});*/
                        	return cowu.parseDataForDiscreteBarChart(data, {
                        		groupBy: function (obj) {
                        			var endpoint1_tags = _.result(obj, 'endpoint_1.tags', []).join('&');
                        			var endpoint2_tags = _.result(obj, 'endpoint_2.tags', []).join('&');
                        			return endpoint1_tags + ' <---> ' + endpoint2_tags;
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
                    title: 'Top Rules',
                    showTitle: true
                }
            
        	}
        }
        self.getViewConfig = function(id) {
            return self.viewConfig[id];
        };
    };
    return (new SecurityDashboardViewConfig()).viewConfig;
});
