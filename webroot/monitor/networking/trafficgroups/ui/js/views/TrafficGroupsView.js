/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'lodashv4', 'contrail-view',
         'contrail-charts-view', 'contrail-list-model'],
        function(_, ContrailView, ContrailChartsView, ContrailListModel) {
            var TrafficGroupsView = ContrailView.extend({
                render : function() {
                    if(!($('#breadcrumb li:last a').text() == ctwc.TRAFFIC_GROUPS_ALL_APPS)){
						pushBreadcrumb([ctwc.TRAFFIC_GROUPS_ALL_APPS]);
                    }
                    var trafficGroupsTmpl = contrail.getTemplate4Id('traffic-groups-template'),
                        trafficLinkInfoTmpl = contrail.getTemplate4Id('traffic-link-widget-template'),
                        collapsableWidgetTmpl = contrail.getTemplate4Id('collapsable-widget-template');
                    self = this;
                    self.$el.html(trafficGroupsTmpl());
                    self.$el.addClass('traffic-groups-view');

                    self.$el.find('[name="search-form"]').wrapCollapsibleWidget({
                        title: 'Traffic Groups'
                    });
                    self.$el.find('.widget-box').addClass('collapsed');

                    TrafficGroupsView.colorMap = {};
                    TrafficGroupsView.tagMap = {};
                    function showLinkInfo(d,el,e){
						//static data... need to remove
						var srcDest = d.id.match(/[^-]+(\-[^-]+)?/g);
						var data = {
							'src': srcDest[0],
							'dest':srcDest[1],
							'policyRules': [{
								 'rule_name':'Policy1:Rule1',
								 'pol_name':'log, permit',
								 'src': {
									'name' : 'src ip',
									'value' : '10.84.5.0/24'
								  },
								 'dest': {
									'name' : 'dst ip',
									'value' : '10.84.5.0/24'
								 }
								},
								{
								 'rule_name':'Policy1:Rule2',
								 'pol_name':'mirror protocol TCP, permit',
								 'src': {
									'name' : 'src tags',
									'value' : 'application=HR'
								 },
								'dest': {
									'name' : 'dst tags',
									'value' : 'application=Finance'
								 }
								},
								{
								 'rule_name':'Policy1:Rule3',
								 'pol_name':'permit',
								 'src': {
									'name' : 'src ip',
									'value' : '10.0.5.0/24'
								 },
								 'dest': {
									'name' : 'dst ip',
									'value' : 'any'
								 }
								}
							]
						};
						$('#traffic-groups-radial-chart').addClass('showLinkInfo')
						$('#traffic-groups-link-info').html(trafficLinkInfoTmpl(data));
                    }

                    function updateChart() {
                        /*var selTags = ['HR', 'Finance']
                        var levels = [];
                        selTags.forEach(function(val,idx) {
                            levels.push({level:idx,label:val});
                        });*/
                        var config = {
			                id: 'chartBox',
			                //levels : levels,
			                components: [{
			                    id: 'dendrogram-chart-id',
			                    type: 'RadialDendrogram',
			                    config: {
			                        arcWidth: 12,
			                        showArcLabels: true,
			                        parentSeparationShrinkFactor: 0.02,
			                        labelFlow: 'along-arc',
			                        arcLabelXOffset: 0,
			                        arcLabelYOffset: -7,
		                            colorScale: function (item) {
										var levelKey = 'TRAFFIC_GROUP_COLOR_LEVEL'+item.level,
											unassignedColors = _.difference(cowc[levelKey], _.values(TrafficGroupsView.colorMap[item.level]));
		                                if ( TrafficGroupsView.colorMap[item.level] == null) {
		                                    TrafficGroupsView.colorMap[item.level] = {};
		                                    TrafficGroupsView.colorMap[item.level][item.name] = unassignedColors.pop();
		                                } else if (TrafficGroupsView.colorMap[item.level] != null &&
		                                    TrafficGroupsView.colorMap[item.level][item.name] == null) {
		                                    TrafficGroupsView.colorMap[item.level][item.name] = unassignedColors.pop();
		                                }
		                                return TrafficGroupsView.colorMap[item.level][item.name];
		                            },
		                            showLinkTooltip:false,
                                    showLinkInfo:false,
			                        // levels: levels,
									hierarchyConfig: {
                                        parse: function (d) {
                                            var srcHierarchy = [d['app'], d['tier']],
                                                dstHierarchy = [d['eps.traffic.remote_app_id'], d['eps.traffic.remote_tier_id']];
                                                // srcHierarchy = [d['app']];
                                                // dstHierarchy = [d['eps.traffic.remote_app_id']];
                                            var src = {
                                                names: srcHierarchy,
                                                labelAppend: d['deployment'],
                                                id: srcHierarchy.join('-'),
                                                value: d['SUM(eps.traffic.in_bytes)'],
                                                inBytes: d['SUM(eps.traffic.in_bytes)'],
                                                outBytes: d['SUM(eps.traffic.out_bytes)']
                                            };
                                            var dst = {
                                                names: dstHierarchy,
                                                labelAppend: d['eps.traffic.remote_deployment_id'],
                                                id: dstHierarchy.join('-'),
                                                value: d['SUM(eps.traffic.out_bytes)'],
                                                inBytes: d['SUM(eps.traffic.in_bytes)'],
                                                outBytes: d['SUM(eps.traffic.out_bytes)']
                                            };
                                            return [src, dst];
                                        }
                                    }
			                    }
			                }]
			            }
                        viewInst.updateConfig(config);
                        viewInst.render();
                    }
                    var postData = {
                        "async": false,
                        "formModelAttrs": {
                            "time_granularity_unit": "secs",
                            "from_time_utc": "now-20h",
                            "to_time_utc": "now",
                            "time_granularity": 60,
                            "select": "T=, eps.traffic.remote_app_id, eps.traffic.remote_tier_id, eps.traffic.remote_site_id,"+
                                 "eps.traffic.remote_deployment_id, eps.traffic.remote_prefix, eps.traffic.remote_vn, eps.__key,"+
                                 " app, tier, site, deployment, vn, name, SUM(eps.traffic.hits), SUM(eps.traffic.in_bytes),"+
                                 " SUM(eps.traffic.out_bytes), SUM(eps.traffic.in_pkts), SUM(eps.traffic.out_pkts)",
                            "table_type": "STAT",
                            "table_name": "StatTable.EndpointSecurityStats.eps.traffic",
                            //"where": "(eps.__key = default-domain:admin:*)"
                        }
                    }
                    var listModelConfig = {
                        remote : {
                            ajaxConfig : {
                                url: monitorInfraConstants.monitorInfraUrls['QUERY'],
                                url: 'fakeData/sessionStats.json',
                                // url: 'fakeData/First5Sessions.json',
                                type: 'POST',
                                type: 'GET',
                                data: JSON.stringify(postData)
                            },
                            dataParser : function (response) {
                                return response['data'];
                            }
                        },
                        vlRemoteConfig: {
                            vlRemoteList: [{
                                getAjaxConfig: function() {
                                    return {
                                        url: 'api/tenants/config/get-config-details',
                                        url: 'fakeData/tagMap.json',
                                        type:'POST',
                                        type:'GET',
                                        data:JSON.stringify({data:[{type: 'tags'}]})
                                    }
                                },
                                successCallback: function(response, contrailListModel) {
                                    TrafficGroupsView.tagMap = _.groupBy(_.map(_.result(response, '0.tags', []), 'tag'), 'tag_id');
                                    var data = contrailListModel.getItems();
                                    var chartData = [];
                                    $.each(data, function (idx, value) {
                                        $.each(['eps.traffic.remote_app_id', 'eps.traffic.remote_deployment_id',
                                            'eps.traffic.remote_prefix', 'eps.traffic.remote_site_id',
                                            'eps.traffic.remote_tier_id'], function (jdx, val) {
                                                // value[val] == '0' ?  value[val] = '' : value[val] = _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.tag_type', '')
                                                //  +'-'+ _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.tag_value', '');
                                                value[val] == '0' ?  value[val] = '' : value[val] = _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.name', '')
                                        });
                                    });
                                    cowu.populateTrafficGroupsData(data);
                                    return data;
                                }
                            }]
                        },
                        cacheConfig : {

                        }
                    };

                    var viewInst = new ContrailChartsView({
                        el: this.$el.find('#traffic-groups-radial-chart'),
                        model: new ContrailListModel(listModelConfig)
                    });
                    updateChart();
                }
            });
            return TrafficGroupsView;
        });
