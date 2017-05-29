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
                        trafficLinkInfoTmpl = contrail.getTemplate4Id('traffic-link-info-template'),
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
                    function showLinkInfo(d,el,e,chartScope){
						var data = {
								'src': d.link[0].data.id,
								'dest':d.link[1].data.id,
								'linkData':[]
							};
						_.each(d.link, function(link) {
							var appObj = {
							  app_name: link.data.id,
							  trafficIn: _.sumBy(link.data.dataChildren,
                                  function(bytes) {
                                     return bytes['SUM(eps.traffic.in_bytes)'];
                                  }),
                              trafficOut: _.sumBy(link.data.dataChildren,
                                  function(bytes) {
                                     return bytes['SUM(eps.traffic.out_bytes)'];
                                 })
                            };
                            data.linkData.push(appObj);
                        });
						_.each(chartScope.ribbons, function (ribbon) {
					       ribbon.selected = false;
					       ribbon.active = false;
					    });
					    d.selected = true;
					    d.active = true;
					    chartScope._render();
						$('#traffic-groups-radial-chart')
							.addClass('showLinkInfo');
						$('#traffic-groups-link-info')
							.html(trafficLinkInfoTmpl(data));
						$('#traffic-groups-radial-chart')
						 .on('click',{ thisChart:chartScope,thisRibbon:d },
						  function(ev){
							if(ev.data.thisChart && $(ev.target)
							  .parents('#'+ev.data.thisChart.id).length == 0){
								_.each(ev.data.thisChart.ribbons,
								 function (ribbon) {
							       ribbon.selected = false;
							       ribbon.active = false;
							    });
							    ev.data.thisChart._render();
							    $('#traffic-groups-radial-chart')
								.removeClass('showLinkInfo');
								$('#traffic-groups-link-info').html('');
							}
						});
                    }

                    /**
                     * @levels  #Indicates no of levels to be drawn
                     */
                    this.updateChart = function(cfg) {
                        /*var selTags = ['HR', 'Finance']
                        var levels = [];
                        selTags.forEach(function(val,idx) {
                            levels.push({level:idx,label:val});
                        });*/
                        var extendConfig = {}
                        if(_.isEmpty(cfg)) {
                            cfg = {};
                        }
                        if(cfg['levels']) {
                            extendConfig['drillDownLevel'] = cfg['levels'];
                        }
                        var config = {
			                id: 'chartBox',
			                //levels : levels,
			                components: [{
			                    id: 'dendrogram-chart-id',
			                    type: 'RadialDendrogram',
			                    config: $.extend({},{
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
                                    showLinkInfo:showLinkInfo,
                                    updateChart: this.updateChart,
			                        // levels: levels,
									hierarchyConfig: {
                                        parse: function (d) {
                                            var srcHierarchy = [d['app'], d['tier']],
                                                dstHierarchy = [d['eps.traffic.remote_app_id'], d['eps.traffic.remote_tier_id']],
                                                currentProject = contrail.getCookie(cowc.COOKIE_PROJECT),
                                                externalProject = '';
                                                // console.info(srcHierarchy,dstHierarchy);
                                            if(cfg['levels'] == 1) {
                                                srcHierarchy = [d['app']];
                                                dstHierarchy = [d['eps.traffic.remote_app_id']];
                                            } else if(cfg['levels'] == 2) {
                                                srcHierarchy = [d['app'], d['tier']],
                                                dstHierarchy = [d['eps.traffic.remote_app_id'], d['eps.traffic.remote_tier_id']];
                                            }
                                            if(dstHierarchy.length > 0 && dstHierarchy[0].indexOf(':') > 0){
                                                var remoteProject = dstHierarchy[0].split(':')[1];
                                                if(currentProject != remoteProject) {
	                                                externalProject = 'external';
                                                }
                                            }
                                            var src = {
                                                names: srcHierarchy,
                                                // labelAppend: 'Production',   //d['deployment'],
                                                id: srcHierarchy.join('-'),
                                                value: d['SUM(eps.traffic.in_bytes)'],
                                                inBytes: d['SUM(eps.traffic.in_bytes)'],
                                                outBytes: d['SUM(eps.traffic.out_bytes)']
                                            };
                                            var dst = {
                                                names: dstHierarchy,
                                                // labelAppend: 'Deployment',   //d['eps.traffic.remote_deployment_id'],
                                                id: dstHierarchy.join('-'),
                                                type: externalProject,
                                                value: d['SUM(eps.traffic.out_bytes)'],
                                                inBytes: d['SUM(eps.traffic.in_bytes)'],
                                                outBytes: d['SUM(eps.traffic.out_bytes)']
                                            };
                                            return [src, dst];
                                        }
                                    }
			                    },extendConfig)
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
                            // "where": "(name = default-domain:admin:*)"
                            "where": "(name Starts with " + contrail.getCookie(cowc.COOKIE_DOMAIN) + ':' + contrail.getCookie(cowc.COOKIE_PROJECT) + ")",
                            "where_json": []
                        }
                    }
                    var listModelConfig = {
                        remote : {
                            ajaxConfig : {
                                url: monitorInfraConstants.monitorInfraUrls['QUERY'],
                                // url: 'fakeData/sessionStats.json',
                                // url: 'fakeData/First5Sessions.json',
                                // url: 'fakeData/sessionStats1.json',
                                type: 'POST',
                                type: 'GET',
                                data: JSON.stringify(postData)
                            },
                            dataParser : function (response) {
                                if(false || response['data'].length == 0) {
                                    return [{
                                            "app": "__UNKOWN__",
                                            "deployment": "",
                                            "eps.traffic.remote_app_id": "__UNKOWN__",
                                            "eps.traffic.remote_deployment_id": "",
                                            "eps.traffic.remote_prefix": "",
                                            "eps.traffic.remote_site_id": "",
                                            "eps.traffic.remote_tier_id": "",
                                            "eps.traffic.remote_vn": "",
                                            "name": "",
                                            "site": "",
                                            "tier": "",
                                            "vn": "",
                                            "SUM(eps.traffic.hits)": 2,
                                            "SUM(eps.traffic.in_bytes)": 2842,
                                            "SUM(eps.traffic.in_pkts)": 29,
                                            "SUM(eps.traffic.out_bytes)": 0,
                                            "SUM(eps.traffic.out_pkts)": 0
                                        }];
                                } else {
                                    return response['data'];
                                }
                            }
                        },
                        vlRemoteConfig: {
                            vlRemoteList: [{
                                getAjaxConfig: function() {
                                    return {
                                        url: 'api/tenants/config/get-config-details',
                                        // url: 'fakeData/tagMap.json',
                                        url: 'fakeData/tags1.json',
                                        type:'POST',
                                        type:'GET',
                                        data:JSON.stringify({data:[{type: 'tags'}]})
                                    }
                                },
                                successCallback: function(response, contrailListModel) {
                                    TrafficGroupsView.tagMap = _.groupBy(_.map(_.result(response, '0.tags', []), 'tag'), 'tag_id');
                                    var tagMap = {}; 
                                    var tagRecords = _.result(response,'0.tags',[]);
                                    tagRecords.forEach(function(val,idx) {
                                        var currTag = val['tag'];
                                        tagMap[currTag.tag_id] = currTag.name;
                                    });
                                    var data = contrailListModel.getItems();
                                    var chartData = [];
                                    $.each(data, function (idx, value) {
                                        
                                        $.each(['eps.traffic.remote_app_id', 'eps.traffic.remote_deployment_id',
                                            'eps.traffic.remote_prefix', 'eps.traffic.remote_site_id',
                                            'eps.traffic.remote_tier_id'], function (jdx, val) {
                                                // value[val] == '0' ?  value[val] = '' : value[val] = _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.tag_type', '')
                                                //  +'-'+ _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.tag_value', '');
                                                if(value[val] == '0') 
                                                    value[val] = ''; 
                                                if(!_.isEmpty(tagMap[parseInt(value[val])])) {
                                                    value[val] = tagMap[parseInt(value[val])]; 
                                                }
                                        });
                                        //If app is empty, put vn name in app
                                        if(value['app'] == '' || value['app'] == '0' || value['app'] == null) {
                                            value['app'] = value['vn'];
                                        }
                                        if(value['eps.traffic.remote_app_id'] == '' || value['eps.traffic_remote_app_id'] == '0') {
                                            // if(value['eps.traffic.remote_vn'] != '') {
                                                value['eps.traffic.remote_app_id'] = value['eps.traffic.remote_vn'];
                                            // } else {
                                            //     value['eps.traffic.remote_app_id'] = value['vn'];
                                            // }
                                        }
                                    });
                                    // cowu.populateTrafficGroupsData(data);
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
                    this.updateChart({
                        levels:1
                    });
                }
            });
            return TrafficGroupsView;
        });
