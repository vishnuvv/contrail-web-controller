/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'lodashv4', 'contrail-view',
         'contrail-charts-view', 'contrail-list-model'],
        function(_, ContrailView, ContrailChartsView, ContrailListModel) {
            var TrafficGroupsView = ContrailView.extend({
                render : function() {
                    var trafficGroupsTmpl = contrail.getTemplate4Id('traffic-groups-template'),
                        collapsableWidgetTmpl = contrail.getTemplate4Id('collapsable-widget-template'),
                        self = this;

                    self.$el.html(trafficGroupsTmpl());
                    self.$el.addClass('traffic-groups-view');

                    self.$el.find('[name="search-form"]').wrapCollapsibleWidget({
                        title: 'Traffic Groups'
                    });
                    self.$el.find('.widget-box').addClass('collapsed');
                    TrafficGroupsView.colorMap = {};
                    TrafficGroupsView.tagMap = {};
                    function updateChart() {
                        var selTags = ['HR', 'Finance']
                        var levels = [];
                        selTags.forEach(function(val,idx) {
                            levels.push({level:idx,label:val});
                        });
                        var config = {
                            levels : [{level: 0,label: 'Application'},{level: 1,label: 'Tier'}],
                            parentSeparation: 1.0,
                            parentSeparationShrinkFactor: 0.05,
                            parentSeparationDepthThreshold: 4,
                            drawLinks: false,
                            drawRibbons: true,
                            arcWidth: 15,
                            arcLabelLetterWidth: 5,
                            showArcLabels: true,
                            //labelFlow: 'along-arc',
                            labelFlow: 'perpendicular',
                            //arcLabelXOffset: 2,
                            arcLabelXOffset: 0,
                            //arcLabelYOffset: 25,
                            arcLabelYOffset: 20,
                            colorScale: function (item) {
                                var unassignedColors = _.difference(cowc.TRAFFIC_GROUP_COLOR, _.values(TrafficGroupsView.colorMap[item.level]));
                                if ( TrafficGroupsView.colorMap[item.level] == null) {
                                    TrafficGroupsView.colorMap[item.level] = {};
                                    TrafficGroupsView.colorMap[item.level][item.name] = unassignedColors.pop();
                                } else if (TrafficGroupsView.colorMap[item.level] != null &&
                                     TrafficGroupsView.colorMap[item.level][item.name] == null) {
                                    TrafficGroupsView.colorMap[item.level][item.name] = unassignedColors.pop();
                                } 
                                return TrafficGroupsView.colorMap[item.level][item.name];
                            },
                            hierarchyConfig: {
                                parse: function (d) {
                                    var srcHierarchy = [d['app'], d['tier']],
                                        dstHierarchy = [d['eps.traffic.remote_app_id'], d['eps.traffic.remote_tier_id']];
                                    var src = {
                                        names: srcHierarchy,
                                        id: srcHierarchy.join('-'),
                                        value: d['SUM(eps.traffic.in_pkts)']
                                    };
                                    var dst = {
                                        names: dstHierarchy,
                                        id: dstHierarchy.join('-'),
                                        value: d['SUM(eps.traffic.out_pkts)']
                                    };
                                    return [src, dst];
                                }
                            }
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
                                type: 'POST',
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
                                        type:'POST',
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
                                                value[val] == '0' ?  value[val] = '' : value[val] = _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.tag_type', '')
                                                 +'-'+ _.result(TrafficGroupsView.tagMap, parseInt(value[val])+'.0.tag_value', '');
                                        }); 
                                    });
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
