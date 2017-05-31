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
                    TrafficGroupsView.ruleMap = {};
                    function formatAppLabel(label,type) {
                        if(type) {
                            label = label.replace(new RegExp('_'+ type, 'g'), '');
                        }
                        return label;
                    }
                    function showLinkInfo(d,el,e,chartScope){
                        var data = {
                                'src': d.link[0].data.id,
                                'dest':d.link[1].data.id,
                                'linkData':[]
                            }, ruleUUIDs = [], ruleKeys = [];
                        data.dest = formatAppLabel(data.dest,d.link[1].data.arcType);
                        _.each(d.link, function(link) {
                            var appObj = {
                                app_name: formatAppLabel(link.data.id,link.data.arcType),
                                trafficIn: formatBytes(_.sumBy(_.filter(link.data.dataChildren,
                                    function(val,idx) {
                                        return val.app == link.data.id;
                                    }),
                                function(bytes) {
                                    return bytes['SUM(eps.traffic.in_bytes)'];
                                })),
                                trafficOut: formatBytes(_.sumBy(_.filter(link.data.dataChildren,
                                    function(val,idx) {
                                        return val.app == link.data.id;
                                    }),
                                function(bytes) {
                                    return bytes['SUM(eps.traffic.in_bytes)'];
                                }))
                            };
                            ruleKeys = _.uniq(_.map(link['data']['dataChildren'], 'eps.__key'));
                            $.each(ruleKeys, function (idx, key) {
                                if (key != null && key.split(':')[3] != null) {
                                    ruleUUIDs.push(key.split(':')[3]);
                                } else if (key != null) {
                                    ruleUUIDs.push(key);
                                }
                            });
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
                         .on('click','',{ thisChart:chartScope,thisRibbon:d },
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
                        if (ruleUUIDs.length > 0) {
                            var listModelConfig = {
                                remote: {
                                    ajaxConfig: {
                                        url: "/api/tenants/config/get-config-details",
                                        type: "POST",
                                        data: JSON.stringify(
                                            {data: [{type: 'firewall-rules',obj_uuids: ruleUUIDs, fields: ['firewall_policy_back_refs']}]})
                                    },
                                    dataParser: function (data) {
                                        var ruleDetails = _.result(data, '0.firewall-rules', []),
                                            ruleMap = {}, formattedRuleDetails = [];
                                        $.each(ruleDetails, function (idx, detailsObj) {
                                            if (detailsObj['firewall-rule'] != null) {
                                                var ruleDetailsObj = detailsObj['firewall-rule'];
                                                ruleMap[detailsObj['firewall-rule']['uuid']] = ruleDetailsObj; 
                                                var src = _.result(ruleDetailsObj, 'endpoint_1.tags', []);
                                                    srcType = 'tags';
                                                if (src.length == 0) {
                                                    src = _.result(ruleDetailsObj, 'endpoint_1.address_group', '-');
                                                    srcType = 'address_group';
                                                }
                                                if (src == '-') {
                                                    src = _.result(ruleDetailsObj, 'endpoint_1.any', '-');
                                                }
                                                if (src == '-') {
                                                    src = _.result(ruleDetailsObj, 'endpoint_1.virtual_network', '-');
                                                    srcType = 'virtual_network';
                                                }
                                                var dst = _.result(ruleDetailsObj, 'endpoint_2.tags', []),
                                                    dstType = 'tags';
                                                if (dst.length == 0) {
                                                    dst = _.result(ruleDetailsObj, 'endpoint_2.address_group', '-');
                                                    dstType = 'address_group';
                                                }
                                                if (dst == '-') {
                                                    dst = _.result(ruleDetailsObj, 'endpoint_2.any', '-');
                                                }
                                                if (dst == '-') {
                                                    dst = _.result(ruleDetailsObj, 'endpoint_2.virtual_network', '-');
                                                    dstType = 'virtual_network';
                                                }
                                                var policy_name = _.result(ruleDetailsObj, 'firewall_policy_back_refs.0.to.2', '-'),
                                                    rule_name = _.result(ruleDetailsObj, 'display_name'); 
                                                formattedRuleDetails.push({
                                                    //policy_name: _.result(ruleDetailsObj, 'firewall_policy_back_refs.0.to.3', '-') +':'+
                                                      //          _.result(ruleDetailsObj, 'display_name'),
                                                    policy_name: policy_name,
                                                    rule_name: rule_name,
                                                    simple_action: _.result(ruleDetailsObj, 'action_list.simple_action', '-') == 'pass' ? 'permit': '-',
                                                    srcType: srcType,
                                                    dstType: dstType,
                                                    src: src,
                                                    dst: dst,
                                                    //rule_name: 
                                                    //json_formatted: contrail.formatJSON2HTML(ruleDetailsObj)
                                                });
                                            }
                                        });
                                        TrafficGroupsView.ruleMap = ruleMap;
                                        data.policyRules = formattedRuleDetails;
                                        if (formattedRuleDetails.length) {
                                            var ruleDetailsTemplate = contrail.getTemplate4Id('traffic-rule-template');
                                            $('.traffic-rules').html(ruleDetailsTemplate(data));
                                        }
                                        return ruleDetails;
                                    }
                                }
                            }
                            var ruleDetailsModel = new ContrailListModel(listModelConfig);    
                        }
                    }

                    /**
                     * @levels  #Indicates no of levels to be drawn
                     */
                    this.updateChart = function(cfg) {
                        var extendConfig = {}
                        if(_.isEmpty(cfg)) {
                            cfg = {};
                        }
                        if(cfg['levels']) {
                            extendConfig['drillDownLevel'] = cfg['levels'];
                        } else if(cfg) {
                            extendConfig = cfg;
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
                                    showLinkTooltip:true,
                                    showLinkInfo: showLinkInfo,
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
                                            var remoteVN = d['eps.traffic.remote_vn'];
                                            if(remoteVN && remoteVN.indexOf(':') > 0){
                                                var remoteProject = remoteVN.split(':')[1];
                                                if(currentProject != remoteProject) {
                                                    externalProject = 'externalProject';
                                                }
                                            } else {
                                                externalProject = 'external';
                                            }
                                            if(externalProject) {
                                                $.each(dstHierarchy, function(i) {
                                                    if(externalProject == 'external'){
                                                        dstHierarchy[i] = 'External_external';
                                                    } else {
                                                        dstHierarchy[i] += '_'+externalProject;
                                                    }
                                                });
                                            }
                                            var src = {
                                                names: srcHierarchy,
                                                labelAppend: d['deployment'],
                                                id: srcHierarchy.join('-'),
                                                value: d['SUM(eps.traffic.in_bytes)'] + d['SUM(eps.traffic.out_bytes)'],
                                                inBytes: d['SUM(eps.traffic.in_bytes)'],
                                                outBytes: d['SUM(eps.traffic.out_bytes)']
                                            };
                                            //If remote_vn project doesn't match with current project
                                            //set type = external
                                            //append '_external' to names [only for 1st-level app field]
                                            var dst = {
                                                names: dstHierarchy,
                                                labelAppend: d['eps.traffic.remote_deployment_id'],
                                                id: dstHierarchy.join('-'),
                                                type: externalProject,
                                                value: d['SUM(eps.traffic.out_bytes)'] + d['SUM(eps.traffic.in_bytes)'],
                                                inBytes: d['SUM(eps.traffic.in_bytes)'],
                                                outBytes: d['SUM(eps.traffic.out_bytes)']
                                            };
                                            return [src, dst];
                                        }
                                    }
                                },extendConfig)
                            },{
                                id: 'tooltip-id',
                                type: 'Tooltip',
                                config: {
                                    formatter: function formatter(data) {
                                        if(data.level) {
                                            var arcTitle = data.namePath.slice(0);
                                            $.each(arcTitle, function(i) {
                                                arcTitle[i] = formatAppLabel(data.namePath[i],data.arcType);
                                            });
                                            var content = { title: ((arcTitle.length > 1 && arcTitle[1])
                                                ? arcTitle.join('-') : arcTitle[0]), items: [] };

                                            var children = data.children;
                                            if(_.result(data,'children.0.children') != null) {
                                                children = _.map(data.children,function(val,idx) {
                                                    return val['children'];
                                                });
                                                children = _.flatten(children);
                                            }

                                            var dataChildren = _.result(children,'0.dataChildren',[]);;

                                            content.items.push({
                                                label: 'Traffic In',
                                                value:  formatBytes(_.sumBy(dataChildren,function(currSession) {
                                                    if((data.namePath.length == 1 && currSession.app == data.namePath[0]) ||
                                                        (data.namePath.length == 2 && currSession.app == data.namePath[0] && currSession.tier == data.namePath[1]))
                                                        return _.result(currSession,'SUM(eps.traffic.in_bytes)',0);
                                                    else
                                                        return 0;
                                                }))
                                            }, {
                                                label: 'Traffic Out',
                                                value: formatBytes(_.sumBy(dataChildren,function(currSession) {
                                                    if((data.namePath.length == 1 && currSession.app == data.namePath[0]) ||
                                                        (data.namePath.length == 2 && currSession.app == data.namePath[0] && currSession.tier == data.namePath[1]))
                                                        return _.result(currSession,'SUM(eps.traffic.out_bytes)',0);
                                                    else
                                                        return 0;
                                                }))
                                            });
                                        } else {
                                            var d = data,
                                                links = d.link,
                                                srcApp = d.link[0].data.id,
                                                dstNames = d.link[1].data.currentNode.names.slice(0),
                                                dstApp = ((dstNames.length > 1 && dstNames[1])
                                                         ? dstNames.join('-') : dstNames[0]);
                                            if((srcApp == dstApp) || (d.link[1].data.arcType)) {
                                                links = d.link.slice(0,1);
                                            }
                                            dstApp = formatAppLabel(dstApp,d.link[1].data.arcType);
                                            var content = { title: (
                                                    srcApp
                                                    + '<img src="/img/double_arrow_white.svg"/>'
                                                    + dstApp), items: [] };
                                            _.each(links, function(link) {
                                                var data = {
                                                    trafficIn: formatBytes(_.sumBy(link.data.dataChildren,
                                                        function(bytes) {
                                                            var namePath = link.data.currentNode ? link.data.currentNode.names : '';
                                                            if((namePath.length == 1 && bytes.app ==  namePath[0])
                                                                || namePath.length == 2 && bytes.app ==  namePath[0] && bytes.tier ==  namePath[1])
                                                                return _.result(bytes,'SUM(eps.traffic.in_bytes)',0);
                                                            else
                                                                return 0;

                                                        })),
                                                    trafficOut: formatBytes(_.sumBy(link.data.dataChildren,
                                                        function(bytes) {
                                                            var namePath = link.data.currentNode ? link.data.currentNode.names : '';
                                                            if((namePath.length == 1 && bytes.app ==  namePath[0])
                                                                || namePath.length == 2 && bytes.app ==  namePath[0] && bytes.tier ==  namePath[1])
                                                                return _.result(bytes,'SUM(eps.traffic.out_bytes)',0);
                                                            else
                                                                return 0
                                                        }))
                                                };
                                                content.items.push({
                                                    label: formatAppLabel(link.data.id,link.data.arcType)
                                                },{
                                                    label: 'Traffic In',
                                                    value: data.trafficIn
                                                }, {
                                                    label: 'Traffic Out',
                                                    value: data.trafficOut
                                                });
                                            });
                                        }
                                        return content;
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
                            "from_time_utc": "now-2h",
                            "to_time_utc": "now",
                            "time_granularity": 600*2,
                            "select": "T=, eps.traffic.remote_app_id, eps.traffic.remote_tier_id, eps.traffic.remote_site_id,"+
                                 "eps.traffic.remote_deployment_id, eps.traffic.remote_prefix, eps.traffic.remote_vn, eps.__key,"+
                                 " app, tier, site, deployment, vn, name, SUM(eps.traffic.in_bytes),"+
                                 " SUM(eps.traffic.out_bytes), SUM(eps.traffic.in_pkts), SUM(eps.traffic.out_pkts)",
                            "table_type": "STAT",
                            "table_name": "StatTable.EndpointSecurityStats.eps.traffic",
                            "where": "(name Starts with " + contrail.getCookie(cowc.COOKIE_DOMAIN) + ':' + contrail.getCookie(cowc.COOKIE_PROJECT) + ")",
                            "where_json": []
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
                                if(false || response['data'].length == 0) {
                                    var curDomain = contrail.getCookie(cowc.COOKIE_DOMAIN)
                                        + ':' + contrail.getCookie(cowc.COOKIE_PROJECT);
                                    return [{
                                            "app": curDomain,
                                            "eps.traffic.remote_app_id": "",
                                            "eps.traffic.remote_vn": curDomain,
                                            "SUM(eps.traffic.in_bytes)": 1,
                                            "SUM(eps.traffic.out_bytes)": 1,
                                            'nodata': true
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
                                        //url: 'fakeData/tags1.json',
                                        type:'POST',
                                        //type:'GET',
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
                                    contrailListModel.onAllRequestsComplete.subscribe(function() {
                                        var data = contrailListModel.getItems();
                                        if(data && data.length == 1 && data[0].nodata) {
                                            self.updateChart({
                                                'expandLevels': 'disable',
                                                'showArcInfo': 'disable',
                                                'showLinkInfo': false,
                                                'showLinkTooltip': false
                                            });
                                        }
                                    });
                                    var chartData = [];
                                    $.each(data, function (idx, value) {
                                        
                                        $.each(['eps.traffic.remote_app_id', 'eps.traffic.remote_deployment_id',
                                            'eps.traffic.remote_prefix', 'eps.traffic.remote_site_id',
                                            'eps.traffic.remote_tier_id'], function (idx, val) {
                                                if(value[val] == '0') 
                                                    value[val] = ''; 
                                                if(!_.isEmpty(tagMap[parseInt(value[val])])) {
                                                    value[val] = tagMap[parseInt(value[val])]; 
                                                }
                                        });
                                        function formatVN(vnName) {
                                            return vnName.replace(/([^:]*):([^:]*):([^:]*)/,'$3 ($2)');
                                        }
                                        //If app is empty, put vn name in app
                                        if(_.isEmpty(value['app']) || value['app'] == '0') {
                                            value['app'] = formatVN(value['vn']);
                                        }
                                        //Strip-off the domain and project form FQN
                                        $.each(['app','site','tier','deployment'],function(idx,tagName) {
                                            value[tagName] = value[tagName].split(':').pop();
                                        });
                                        if(value['eps.traffic.remote_app_id'] == '' || value['eps.traffic_remote_app_id'] == '0') {
                                            // if(value['eps.traffic.remote_vn'] != '') {
                                                value['eps.traffic.remote_app_id'] = formatVN(value['eps.traffic.remote_vn']);
                                            // } else {
                                            //     value['eps.traffic.remote_app_id'] = value['vn'];
                                            // }
                                        }
                                        //Strip-off the domain and project form FQN
                                        $.each(['app','site','tier','deployment'],function(idx,tagName) {
                                            value[tagName] = value[tagName].split(':').pop();
                                        });
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
