/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define(
        [ 'lodashv4', 'contrail-view',
         'contrail-charts-view', 'contrail-list-model',
         'monitor/networking/trafficgroups/ui/js/views/TrafficGroupsSettingsView',
         'monitor/networking/trafficgroups/ui/js/models/TrafficGroupsSettingsModel'],
        function(_, ContrailView, ContrailChartsView,
                ContrailListModel, settingsView, settingsModel) {
            var TrafficGroupsView = ContrailView.extend({
                tagTypeList: {
                    'app': [],
                    'tier': [],
                    'deployment': [],
                    'site': []
                },
                filterdData: {},
                resetTrafficStats: function(e) {
                    e.preventDefault();
                    this.renderTrafficChart();
                    $(this.el).find('svg g').empty();
                },
                showSessionsInfo: function() {
                    var self = this;
                    require(['monitor/networking/trafficgroups/ui/js/views/TrafficGroupsEPSTabsView'], function(EPSTabsView) {
                        var linkInfo = self.getLinkInfo(self.selectedLinkData),
                            linkData = {
                                endpointNames: [linkInfo.srcTags, linkInfo.dstTags],
                                endpointStats: []
                            }
                            epsTabsView = new EPSTabsView();
                        _.each(linkInfo.links, function(link) {
                            var namePath = link.data.currentNode ? link.data.currentNode.names : '',
                                epsData = _.filter(link.data.dataChildren,
                                    function(session) {
                                        return self.isRecordMatched(namePath, session, link.data);
                                    });
                            linkData.endpointStats.push(epsData);
                        });
                        epsTabsView.render(linkData);
                    });
                },
                showLinkInfo(d,el,e,chartScope) {
                    var self = this,
                        ruleUUIDs = [], ruleKeys = [], level = 1;
                    if (_.result(d, 'innerPoints.length') == 4)
                        level = 2;
                    var srcNodeData = _.filter(d.link, function (val, idx){
                            return _.result(val, 'data.type') == 'src';
                    });
                    var dstNodeData = _.filter(d.link, function (val, idx){
                            return _.result(val, 'data.type') == 'dst';
                    });
                    var srcId = self.removeEmptyTags(_.result(srcNodeData, '0.data.currentNode.displayLabels')),
                        dstId = self.removeEmptyTags(_.result(dstNodeData, '0.data.currentNode.displayLabels'));
                    self.selectedLinkData = d.link;
                    var childData = _.result(d, 'link.0.data.dataChildren', []);
                    var srcSessionObjArr = _.chain(childData)
                            .filter(function (val, idx) {
                                var namePath = _.result(srcNodeData, '0.data.currentNode.names');
                                return self.isRecordMatched(namePath, val, d.link[0].data);
                            })
                            .groupBy("eps.__key")
                            .map(function (objs, key) {
                                var uuid;
                                if (key != null) {
                                    try {
                                        uuid = key.split(':').slice(-1)[0];
                                    } catch(e) {
                                        uuid = '-'
                                    }
                                }
                                return {
                                    'eps.__key': uuid,
                                    'session_responded': _.sumBy(objs, 'SUM(eps.traffic.responder_session_count)'),
                                    'session_initiated': _.sumBy(objs, 'SUM(eps.traffic.initiator_session_count)')
                                }
                            }).value();
                    var dstSessionObjArr, dstSessionObj;
                    //If it is intralink no need to calculate endpoint2 sessions
                    if (srcId != dstId) {
                        dstSessionObjArr = _.chain(childData)
                            .filter(function (val, idx) {
                                var namePath = _.result(dstNodeData, '0.data.currentNode.names');
                                return self.isRecordMatched(namePath, val, d.link[0].data);
                            })
                            .groupBy("eps.__key")
                            .map(function (objs, key) {
                                var uuid;
                                if (key != null) {
                                    try {
                                        uuid = key.split(':').slice(-1)[0];
                                    } catch(e) {
                                        uuid = '-'
                                    }
                                }
                                return {
                                    'eps.__key': uuid,
                                    'session_responded': _.sumBy(objs, 'SUM(eps.traffic.responder_session_count)'),
                                    'session_initiated': _.sumBy(objs, 'SUM(eps.traffic.initiator_session_count)')
                                }
                            }).value();
                        dstSessionObj = _.groupBy(dstSessionObjArr, 'eps.__key');
                    }
                    var srcSessionObj = _.groupBy(srcSessionObjArr, 'eps.__key');
                    _.each(d.link, function(link) {
                        ruleKeys = _.uniq(_.map(link['data']['dataChildren'], 'eps.__key'));
                        $.each(ruleKeys, function (idx, key) {
                            if (key != null) {
                                var uuid = key.split(':').pop();
                                ruleUUIDs.push(uuid);
                            }
                        });
                    });
                    ruleUUIDs = _.uniq(ruleUUIDs);
                    _.each(chartScope.ribbons, function (ribbon) {
                       ribbon.selected = false;
                       ribbon.active = false;
                    });
                    d.selected = true;
                    d.active = true;
                    chartScope._render();
                    if (ruleUUIDs.length > 0) {
                        var listModelConfig = {
                            remote: {
                                ajaxConfig: {
                                    url: "/api/tenants/config/get-config-details",
                                    type: "POST",
                                    data: JSON.stringify(
                                        {data: [{type: 'firewall-rules',obj_uuids: ruleUUIDs, fields: ['firewall_policy_back_refs',
                                         'service', 'service_group_refs']}]})
                                },
                                dataParser: function (data) {
                                    var ruleDetails = _.result(data, '0.firewall-rules', []),
                                        ruleMap = {}, formattedRuleDetails = [];
                                    $.each(ruleDetails, function (idx, detailsObj) {
                                        if (detailsObj['firewall-rule'] != null) {
                                            var ruleDetailsObj = detailsObj['firewall-rule'],
                                                ruleUUID = detailsObj['firewall-rule']['uuid'];
                                            ruleMap[detailsObj['firewall-rule']['uuid']] = ruleDetailsObj;
                                            var src = _.result(ruleDetailsObj, 'endpoint_1.tags', []);
                                                srcType = '';
                                                src = src.join(' && ')
                                            if (src.length == 0) {
                                                src = _.result(ruleDetailsObj, 'endpoint_1.address_group', '-');
                                                srcType = 'address_group';
                                            }
                                            if (!src || src == '-') {
                                                src = _.result(ruleDetailsObj, 'endpoint_1.any', '-');
                                                if (src == true) {
                                                    src = 'any';
                                                }
                                                srcType = ''
                                            }
                                            if (!src || src == '-') {
                                                src = _.result(ruleDetailsObj, 'endpoint_1.virtual_network', '-');
                                                srcType = 'virtual_network';
                                            }
                                            var dst = _.result(ruleDetailsObj, 'endpoint_2.tags', []),
                                                dstType = '';
                                                dst = dst.join(' && ');
                                            if (!dst || dst.length == 0) {
                                                dst = _.result(ruleDetailsObj, 'endpoint_2.address_group', '-');
                                                dstType = 'address_group';
                                            }
                                            if (!dst || dst == '-') {
                                                dst = _.result(ruleDetailsObj, 'endpoint_2.any', '-');
                                                if (dst == true)
                                                    dst = 'any';
                                                dstType = ''
                                            }
                                            if (!dst || dst == '-') {
                                                dst = _.result(ruleDetailsObj, 'endpoint_2.virtual_network', '-');
                                                dstType = 'virtual_network';
                                            }
                                            if(!src || src == '-' || src.length == 0) {
                                                srcType = '';
                                                src = '-';
                                            }
                                            if(!dst || dst == '-' || dst.length == 0) {
                                                dstType = '';
                                                dst = '-';
                                            }
                                            var policy_name_arr = _.result(ruleDetailsObj, 'firewall_policy_back_refs.0.to', []),
                                                service = _.result(ruleDetailsObj, 'service'),
                                                service_group_refs = _.result(ruleDetailsObj, 'service_group_refs'),
                                                serviceStr,
                                                service_dst_port_obj = _.result(ruleDetailsObj, 'service.dst_ports'),
                                                service_dst_port = '-',
                                                service_protocol = _.result(ruleDetailsObj, 'service.protocol'),
                                                policy_name = _.result(policy_name_arr.slice(-1), '0', '-'),
                                                rule_name = _.result(ruleDetailsObj, 'display_name'),
                                                direction = cowu.deSanitize(_.result(ruleDetailsObj, 'direction'));
                                            if (service_dst_port_obj != null && service_dst_port_obj['start_port'] != null &&
                                                service_dst_port_obj['end_port'] != null) {
                                                if (service_dst_port_obj['start_port'] == service_dst_port_obj['end_port']) {
                                                    service_dst_port = service_dst_port_obj['start_port'];
                                                } else {
                                                    service_dst_port = contrail.format('{0}-{1}', service_dst_port_obj['start_port'], service_dst_port_obj['end_port']);
                                                }
                                                serviceStr = contrail.format('{0}: {1}', service_protocol, service_dst_port);
                                            }
                                            if (service_group_refs != null) {
                                                serviceStr = _.result(service_group_refs, '0.to.1');
                                            }
                                            var simple_action = _.result(ruleDetailsObj, 'action_list.simple_action', '-');
                                            if (simple_action == 'pass') {
                                                simple_action = 'permit';
                                            }
                                            formattedRuleDetails.push({
                                                //policy_name: _.result(ruleDetailsObj, 'firewall_policy_back_refs.0.to.3', '-') +':'+
                                                  //          _.result(ruleDetailsObj, 'display_name'),
                                                policy_name: policy_name,
                                                srcId: srcId,
                                                src_session_initiated: _.result(srcSessionObj, ruleUUID+'.0.session_initiated', 0),
                                                src_session_responded: _.result(srcSessionObj, ruleUUID+'.0.session_responded', 0),
                                                dstId: dstId,
                                                dst_session_initiated: _.result(dstSessionObj, ruleUUID+'.0.session_initiated', 0),
                                                dst_session_responded: _.result(dstSessionObj, ruleUUID+'.0.session_responded', 0),
                                                rule_name: rule_name,
                                                implicitRule: '',
                                                simple_action: simple_action,
                                                service: serviceStr,
                                                direction: direction == '>' ? 'uni': 'bi',
                                                srcType: srcType,
                                                dstType: dstType,
                                                src: src,
                                                dst: dst
                                            });
                                        }
                                    });
                                    var defaultRuleUUIDs = _.keys(cowc.DEFAULT_FIREWALL_RULES);
                                    $.each(defaultRuleUUIDs, function (idx, uuid) {
                                        if (ruleUUIDs.indexOf(uuid) > -1) {
                                            var defaultRuleDetails = cowc.DEFAULT_FIREWALL_RULES[uuid];
                                            formattedRuleDetails.push({
                                                policy_name: _.result(defaultRuleDetails, 'name'),
                                                rule_name: uuid,
                                                srcId: srcId,
                                                dstId: dstId,
                                                implicitRule: 'implicitRuleStyle',
                                                src_session_initiated: _.result(srcSessionObj, uuid+'.0.session_initiated', 0),
                                                src_session_responded: _.result(srcSessionObj, uuid+'.0.session_responded', 0),
                                                dst_session_initiated: _.result(dstSessionObj, uuid+'.0.session_initiated', 0),
                                                dst_session_responded: _.result(dstSessionObj, uuid+'.0.session_responded', 0),
                                            });
                                        }
                                    });
                                    TrafficGroupsView.ruleMap = ruleMap;
                                    data.srcId = srcId;
                                    data.dstId = dstId;
                                    data.policyRules = formattedRuleDetails;
                                    if (formattedRuleDetails.length) {
                                        var ruleDetailsTemplate = contrail.getTemplate4Id('traffic-rule-template');
                                        $('#traffic-groups-link-info').html(ruleDetailsTemplate(data));
                                        if($('#traffic-groups-radial-chart').hasClass('showLinkInfo')) {
                                            $('.trafficGroups_sidePanel').
                                                removeClass('animateLinkInfo');
                                        } else {
                                            $('.trafficGroups_sidePanel').
                                                addClass('animateLinkInfo');
                                            $('#traffic-groups-radial-chart')
                                            .addClass('showLinkInfo');
                                        }
                                        $('.allSessionInfo').on('click', self.showSessionsInfo.bind(self));
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
                                                $('#traffic-groups-radial-chart')
                                                .removeClass('showLinkInfo');
                                                $('#traffic-groups-link-info').html('');
                                                ev.data.thisChart._render();
                                            }
                                        });
                                    }
                                    return ruleDetails;
                                }
                            }
                        }
                        var ruleDetailsModel = new ContrailListModel(listModelConfig);
                    }
                },
                getTagHierarchy: function(d) {
                    var srcHierarchy = [],
                        dstHierarchy = [],
                        selectedTagTypes = this.getCategorizationObj(),
                        level = selectedTagTypes.length,
                        self = this;
                    _.each(selectedTagTypes, function(tags, idx) {
                        if(idx < level) {
                            var tagTypes = tags.split('-');
                            srcHierarchy.push(_.compact(_.map(tagTypes, function(tag) {
                                var tagVal = d[tag.trim()];
                                return tagVal ? tagVal : self.getTagLabel(tag, d);
                            })).join('-'));
                            dstHierarchy.push(_.compact(_.map(tagTypes, function(tag) {
                                var tagVal = d['eps.traffic.remote_' + tag.trim() + '_id'];
                                return tagVal ? tagVal : self.getTagLabel(tag,
                                                d, d['eps.traffic.remote_vn']);
                            })).join('-'));
                        }
                    });
                    return {
                        srcHierarchy: srcHierarchy,
                        dstHierarchy: dstHierarchy
                    };
                },
                getTagLabel: function(tagType, d, vn) {
                    var label = '',
                        tagObj = _.find(cowc.TRAFFIC_GROUP_TAG_TYPES,
                            function(tag) {
                                return tag.value == tagType;
                        });
                    if(tagObj) {
                        if(tagObj.showIcononEmpty) {
                            label += tagObj.text.toLowerCase();
                        }
                        if(tagObj.showVNonEmpty) {
                            label += (label ? ' ' : '') +
                                this.formatVN(vn ? vn : d['vn']);
                        }
                    }
                    return label;
                },
                updateChart: function(cfg) {
                    var self = this,
                        extendConfig = {}
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
                                arcWidth: [11,12],
                                showArcLabels: true,
                                parentSeparationShrinkFactor: 0.02,
                                arcLabelLetterWidth: 6,
                                labelDuration:0,
                                labelFlow: 'along-arc',
                                linkCssClasses: ['implicitDeny', 'implicitAllow'],
                                arcLabelXOffset: 0,
                                arcLabelYOffset: [-12,-6],
                                colorScale: function (item) {
                                    var levelKey = 'TRAFFIC_GROUP_COLOR_LEVEL'+item.level,
                                        unassignedColors = _.difference(cowc[levelKey], _.values(TrafficGroupsView.colorMap[item.level])),
                                        itemName = item.displayLabels[item.level-1],
                                        extraColors = TrafficGroupsView.colorArray;
                                    if(unassignedColors.length == 0) {
                                        if(!extraColors[item.level] || extraColors[item.level].length == 0) {
                                            extraColors[item.level] = cowc[levelKey].slice(0);
                                        }
                                        unassignedColors = extraColors[item.level];
                                    }
                                    if ( TrafficGroupsView.colorMap[item.level] == null) {
                                        TrafficGroupsView.colorMap[item.level] = {};
                                        TrafficGroupsView.colorMap[item.level][itemName] = unassignedColors.pop();
                                    } else if (TrafficGroupsView.colorMap[item.level][itemName] == null) {
                                        TrafficGroupsView.colorMap[item.level][itemName] = unassignedColors.pop();
                                    }
                                    return TrafficGroupsView.colorMap[item.level][itemName];
                                },
                                showLinkInfo: self.showLinkInfo,
                                drillDownLevel: self.getCategorizationObj().length,
                                expandLevels: 'disable',
                                hierarchyConfig: {
                                    parse: function (d) {
                                        var hierarchyObj = self.getTagHierarchy(d),
                                            srcHierarchy = hierarchyObj.srcHierarchy
                                            dstHierarchy = hierarchyObj.dstHierarchy,
                                            currentProject = contrail.getCookie(cowc.COOKIE_PROJECT),
                                            externalType = '',
                                            srcDisplayLabel = [],
                                            dstDisplayLabel = [],
                                            remoteVN = d['eps.traffic.remote_vn'],
                                            implicitDenyKey = ifNull(_.find(cowc.DEFAULT_FIREWALL_RULES, function(rule) {
                                                return rule.name == 'Implicit Deny';
                                            }), '').uuid,
                                            implicitAllowKey = ifNull(_.find(cowc.DEFAULT_FIREWALL_RULES, function(rule) {
                                                return rule.name == 'Implicit Allow';
                                            }), '').uuid;
                                        if(typeof d['eps.__key'] == 'string' &&
                                            d['eps.__key'].indexOf(implicitDenyKey) > -1) {
                                            d.linkCssClass = 'implicitDeny';
                                        }
                                        if(typeof d['eps.__key'] == 'string' &&
                                            d['eps.__key'].indexOf(implicitAllowKey) > -1) {
                                            d.linkCssClass = 'implicitAllow';
                                        }
                                        $.each(srcHierarchy, function(idx) {
                                            srcDisplayLabel.push(self.formatLabel(srcHierarchy, idx));
                                        });

                                        if(remoteVN && remoteVN.indexOf(':') > 0) {
                                            var remoteProject = remoteVN.split(':')[1];
                                            if(currentProject != remoteProject) {
                                                externalType = 'externalProject';
                                            }
                                        } else {
                                            externalType = 'external';
                                        }

                                        $.each(dstHierarchy, function(idx) {
                                            dstDisplayLabel.push(self.formatLabel(dstHierarchy, idx));
                                            if(externalType) {
                                                if(externalType == 'external') {
                                                    dstHierarchy[idx] = 'External_external';
                                                    dstDisplayLabel[idx] = 'External';
                                                } else {
                                                    dstHierarchy[idx] += '_' + externalType;
                                                }
                                            }
                                        });
                                        var src = {
                                            names: srcHierarchy,
                                            labelAppend: '',
                                            displayLabels: srcDisplayLabel,
                                            id: _.compact(srcHierarchy).join('-'),
                                            value: d['SUM(eps.traffic.in_bytes)'] + d['SUM(eps.traffic.out_bytes)'],
                                            inBytes: d['SUM(eps.traffic.in_bytes)'],
                                            outBytes: d['SUM(eps.traffic.out_bytes)']
                                        };
                                        //If remote_vn project doesn't match with current project
                                        //set type = external
                                        //append '_external' to names [only for 1st-level app field]
                                        var dst = {
                                            names: dstHierarchy,
                                            labelAppend: '',
                                            displayLabels: dstDisplayLabel,
                                            id: _.compact(dstHierarchy).join('-'),
                                            type: externalType,
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
                                        var arcTitle = data.displayLabels.slice(0);
                                        var content = { title: self.removeEmptyTags(arcTitle), items: [] };
                                        content.title += '<hr/>'

                                        var childrenArr = data['children'];
                                        //data is nested on hovering 1st-level arc while showing 2-level arcs
                                        //For intra-app traffic, there will be 2 children with same linkId
                                        //Remove 2nd-level duplicate intra links
                                        if(childrenArr[0].children != null) {
                                            childrenArr = jsonPath(data,'$.children[*].children[*]');
                                            childrenArr = _.flatten(childrenArr);
                                        }
                                        if(childrenArr[0].linkId != null) {
                                            childrenArr = _.uniqWith(childrenArr,function(a,b) {
                                                return a.linkId == b.linkId;
                                            });
                                        }

                                        var dataChildren = jsonPath(childrenArr,'$.[*].dataChildren');
                                        if(dataChildren == false)
                                            dataChildren = jsonPath(data,'$.children[*].children[*].dataChildren');
                                        dataChildren = _.flatten(dataChildren);

                                        content.items.push({
                                            label: 'Traffic In',
                                            value:  formatBytes(_.sumBy(dataChildren,function(currSession) {
                                                if(self.isRecordMatched(data.namePath, currSession, data))
                                                    return _.result(currSession,'SUM(eps.traffic.in_bytes)',0);
                                                 else
                                                    return 0;
                                            }))
                                        }, {
                                            label: 'Traffic Out',
                                            value: formatBytes(_.sumBy(dataChildren,function(currSession) {
                                                if(self.isRecordMatched(data.namePath, currSession, data))
                                                    return _.result(currSession,'SUM(eps.traffic.out_bytes)',0);
                                                 else
                                                    return 0;
                                            }))
                                        });
                                    } else {
                                        var linkInfo = self.getLinkInfo(data.link),
                                            trafficLinkTooltipTmpl = contrail.getTemplate4Id('traffic-link-tooltip-template'),
                                            links = linkInfo.links,
                                            content = { title : '', items: [] },
                                            linkData = {
                                                src: linkInfo.srcTags,
                                                dst: linkInfo.dstTags
                                            };
                                        linkData.items = [];
                                        _.each(links, function(link) {
                                            var namePath = link.data.currentNode ? link.data.currentNode.names : '',
                                                trafficData = {
                                                trafficIn: formatBytes(_.sumBy(link.data.dataChildren,
                                                    function(bytes) {
                                                        if(self.isRecordMatched(namePath, bytes, link.data))
                                                            return _.result(bytes,'SUM(eps.traffic.in_bytes)',0);
                                                         else
                                                            return 0;

                                                    })),
                                                trafficOut: formatBytes(_.sumBy(link.data.dataChildren,
                                                    function(bytes) {
                                                        if(self.isRecordMatched(namePath, bytes, link.data))
                                                            return _.result(bytes,'SUM(eps.traffic.out_bytes)',0);
                                                        else
                                                            return 0
                                                    }))
                                            };
                                            linkData.items.push({
                                                name: self.removeEmptyTags(_.result(link, 'data.currentNode.displayLabels')),
                                                trafficIn: trafficData.trafficIn,
                                                trafficOut: trafficData.trafficOut
                                            });
                                            var linkTooltipHtml = trafficLinkTooltipTmpl(linkData);
                                            content.title = linkTooltipHtml;
                                        });
                                    }
                                    return content;
                                }
                            }
                        }]
                    }
                    $('#traffic-groups-radial-chart')
                    .removeClass('showLinkInfo');
                    $('#traffic-groups-link-info').html('');
                    self.chartInfo = self.viewInst.getChartViewInfo(config,
                                "dendrogram-chart-id", self.addtionalEvents());
                    if(cfg['freshData']) {
                        self.viewInst.model.onAllRequestsComplete.subscribe(function() {
                           self.chartRender();
                        });
                    } else {
                        self.chartRender();
                    }
                    //self.updateTGFilterSec();
                },
                chartRender: function() {
                    var self = this;
                    var data = self.filterdData ? JSON.parse(JSON.stringify(self.filterdData))
                             : self.viewInst.model.getItems();
                    self.viewInst.render(data, self.chartInfo.chartView);
                    if(data && data.length == 0) {
                        // if no records matching for selected filter tags, display no results found
                        var noResults = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        noResults.textContent = 'No Results Found';
                        document.getElementById('dendrogram-chart-id').append(noResults);
                    }
                },
                addtionalEvents: function() {
                    return [{
                            event: 'click',
                            selector: 'node',
                            handler: this._onClickNode.bind(this),
                            handlerName: '_onClickNode'
                        },
                        {
                            event: 'click',
                            selector: 'link',
                            handler: this._onClickLink.bind(this),
                            handlerName: '_onClickLink'
                        },
                        {
                            event: 'mousemove',
                            selector: 'link',
                            handler: this._onMousemoveLink.bind(this),
                            handlerName: '_onMousemoveLink'
                        },
                        {
                            event: 'mouseout',
                            selector: 'link',
                            handler: this._onMouseoutLink.bind(this),
                            handlerName: '_onMouseoutLink'
                        }
                    ];
                },
                _onClickNode: function(d, el ,e) {
                    var chartScope = this.chartInfo.component;
                    if(chartScope.config.attributes.
                        expandLevels == 'disable') {
                      return;
                    }
                    if(chartScope.clearArcTootltip) {
                      clearTimeout(chartScope.clearArcTootltip);
                    }
                    var levels = 2;
                    //If clicked on 2nd level arc,collapse to 1st level
                    if(d.depth == 2 || d.height == 2)
                        levels = 1;
                        this.updateChart({levels: levels});
                    el.classList.remove(chartScope.selectorClass('active'));
                },
                _onClickLink: function(d, el ,e) {
                    var chartScope = this.chartInfo.component;
                    if(chartScope.config.attributes.showLinkInfo) {
                        this.showLinkInfo(d, el, e, chartScope);
                    }
                },
                _onMousemoveLink: function(d, el ,e) {
                    var chartScope = this.chartInfo.component,
                        [left, top] = chartScope.d3Selection.
                                            mouse(chartScope._container);
                      if(chartScope.clearLinkTooltip) {
                        clearTimeout(chartScope.clearLinkTooltip);
                      }
                      chartScope.clearLinkTooltip = setTimeout(function() {
                        chartScope.actionman.fire('ShowComponent',
                            'tooltip-id', {left, top}, d);
                        if(left > (chartScope._container.offsetWidth / 2)) {
                          $('#tooltip-id').css({'right':0, 'left':'auto'});
                        } else {
                          $('#tooltip-id').css('right','auto');
                        }
                      } , 300);
                },
                _onMouseoutLink: function(d, el ,e) {
                    var chartScope = this.chartInfo.component;
                    if(chartScope.clearLinkTooltip) {
                      clearTimeout(chartScope.clearLinkTooltip);
                    }
                    chartScope.actionman.fire('HideComponent', 'tooltip-id');
                },
                getLinkInfo: function(links) {
                    var srcTags = this.removeEmptyTags(_.result(links, '0.data.currentNode.displayLabels')),
                        dstTags = this.removeEmptyTags(_.result(links, '1.data.currentNode.displayLabels')),
                        dstIndex = _.findIndex(links, function(link) { return link.data.type == 'dst' });
                    if((srcTags == dstTags) || _.includes(links[dstIndex].data.arcType, 'externalProject')
                         || _.includes(links[dstIndex].data.arcType, 'external')) {
                        links = links.slice(0,1);
                    }
                    return {links, srcTags, dstTags};
                },
                formatLabel: function(label, idx) {
                    var displayLabel = '';
                    if(label) {
                        displayLabel = label[idx].replace('application', cowc.APPLICATION_ICON)
                             .replace('tier', cowc.TIER_ICON)
                             .replace('site', cowc.SITE_ICON)
                             .replace('deployment', cowc.DEPLOYMENT_ICON);
                    }
                    return displayLabel;
                },
                removeEmptyTags: function(names) {
                    var displayNames = names.slice(0);
                    displayNames = _.remove(displayNames, function(name, idx) {
                        return !(name == 'External' && idx > 0);
                    });
                    return _.compact(displayNames).join('-');
                },
                isRecordMatched: function(names, record, data) {
                    var arcType = data.arcType ? '_' + data.arcType : '',
                        isMatched = true,
                        self = this,
                        selectedTagTypes = this.getCategorizationObj();
                    for(var i = 0; i < names.length; i++) {
                        var tagTypes = selectedTagTypes[i].split('-'),
                            tagName =  _.compact(_.map(tagTypes, function(tag) {
                                            return record[tag] ? record[tag]
                                            : self.getTagLabel(tag, record)
                                    })).join('-');
                       tagName += arcType;
                       isMatched = isMatched && (tagName == names[i]);
                    }
                    return isMatched;
                },
                prepareTagList: function() {
                    var self = this;
                    _.each(self.tagTypeList, function(tagName, tagType, obj) {
                        obj[tagType] = _.compact(_.uniq(_.flatMap(self.trafficData,
                            function(a) {
                                return [a[tagType],a['eps.traffic.remote_' + tagType + '_id']];
                            })));
                    });
                },
                filterDataByTagName: function() {
                    var self = this;
                    self.filterdData =  _.filter(self.trafficData, function(d) {
                        var isMatched = true;
                        _.each(self.getTGSettings().filterByTagName, function(tag) {
                            var tagObj = tag.split(cowc.DROPDOWN_VALUE_SEPARATOR),
                                tagType = tagObj[1],
                                tagName = tagObj[0];
                            isMatched = isMatched && (d[tagType] == tagName ||
                               d['eps.traffic.remote_' + tagType + '_id'] == tagName);
                        });
                        return isMatched;
                    });
                },
                applySelectedFilter: function(modelObj) {
                    var oldTimeRange = this.getTGSettings().time_range,
                        oldFromTime = this.getTGSettings().from_time,
                        oldToTime = this.getTGSettings().to_time;
                    this.settingsModelObj = modelObj;
                    this.filterDataByTagName();
                    var newTimeRange = this.getTGSettings().time_range,
                        newFromTime = this.getTGSettings().from_time,
                        newToTime = this.getTGSettings().to_time;
                    if(oldTimeRange != newTimeRange || (oldTimeRange == -1 && (
                              oldFromTime != newFromTime ||
                              oldToTime != newToTime))) {
                        this.renderTrafficChart();
                    } else {
                        this.updateChart();
                    }
                },
                removeFilter: function(e) {
                    var curElem = $(e.currentTarget).parent('li').find('div'),
                        tag = curElem.attr('data-tag'),
                        val = curElem.html();
                    if(this.settingsModelObj) {
                        var filterObj = this.settingsModelObj
                            .get('filterByTagName').split(',');
                        filterObj = _.filter(filterObj, function(tagName) {
                            return tagName != (val + ";" +tag);
                        });
                        this.settingsModelObj
                            .set('filterByTagName', filterObj.join(','));
                        this.applySelectedFilter(this.settingsModelObj);
                    }
                },
                updateTGFilterSec: function() {
                    var groupByTags = [],
                        filterByTags = [];
                    if(this.getTGSettings().filterByTagName) {
                        _.each(this.getTGSettings().filterByTagName,
                            function(tag) {
                            var tagObj = tag.split(cowc.DROPDOWN_VALUE_SEPARATOR);
                             filterByTags.push({
                                tag: tagObj[1],
                                value: tagObj[0]
                             });
                        });
                        $('#filterByTagNameSec').removeClass('hidden');
                    } else {
                         $('#filterByTagNameSec').addClass('hidden');
                    }
                    var filterViewTmpl =
                        contrail.getTemplate4Id('traffic-filter-view-template');
                    $('#filterByTagNameSec').html(filterViewTmpl({
                        tags : filterByTags
                    }));
                    $('.tgRemoveFilter').on('click', this.removeFilter.bind(this));
                },
                showFilterOptions: function() {
                    this.settingsView.model = new settingsModel(this.getTGSettings());
                    this.settingsView.editFilterOptions(this.tagTypeList,
                        this.applySelectedFilter.bind(this));
                },
                getTGSettings: function() {
                    var filterByTagName = null,
                        groupByTagType = null,
                        subGroupByTagType = null,
                        time_range = 3600,
                        from_time = null,
                        to_time = null;
                        if(this.settingsModelObj) {
                            groupByTagType = this.settingsModelObj
                                              .get('groupByTagType').split(',');
                            subGroupByTagType = this.settingsModelObj
                                              .get('subGroupByTagType');
                            subGroupByTagType = subGroupByTagType ?
                                    subGroupByTagType.split(',') : null;
                            filterByTagName = this.settingsModelObj
                                              .get('filterByTagName');
                            filterByTagName = filterByTagName ?
                                    filterByTagName.split(',') : null;
                            time_range = this.settingsModelObj.get('time_range');
                            from_time = this.settingsModelObj.get('from_time');
                            to_time = this.settingsModelObj.get('to_time');

                        } else {
                            groupByTagType = ['app','deployment'];
                            subGroupByTagType = ['tier'];
                        }
                    return {
                        groupByTagType: groupByTagType,
                        subGroupByTagType: subGroupByTagType,
                        filterByTagName: filterByTagName,
                        time_range: time_range,
                        from_time: from_time,
                        to_time: to_time
                    };
                },
                getCategorizationObj: function() {
                    var categorization = [this.getTGSettings().groupByTagType
                                            .join('-')];
                    if(this.getTGSettings().subGroupByTagType) {
                        categorization.push(this.getTGSettings()
                                        .subGroupByTagType.join('-'));
                    }
                    return categorization;
                },
                updateStatsTimeSec: function() {
                    var fromTime = this.getTGSettings().time_range;
                    if(fromTime == -1) {
                        fromTime = this.getTGSettings().from_time;
                        var toTime = this.getTGSettings().to_time
                        $(this.el).find('#statsFromOnly').addClass('hidden');
                        $(this.el).find('#statsFromTo').removeClass('hidden')
                        $(this.el).find('#statsFromTo .statsFromTime').text(fromTime);
                        $(this.el).find('#statsFromTo .statsToTime').text(toTime);
                    } else {
                        fromTime = _.find(ctwc.TIMERANGE_DROPDOWN_VALUES,
                            function(timeMap) {
                                return timeMap.id == fromTime;
                        });
                        $(this.el).find('#statsFromOnly').removeClass('hidden')
                            .find('.statsFromTime').text(fromTime.text);
                        $(this.el).find('#statsFromTo').addClass('hidden');
                    }
                },
                formatVN: function(vnName) {
                    return vnName.replace(/([^:]*):([^:]*):([^:]*)/,'$3 ($2)');
                },
                renderTrafficChart: function() {
                    var self = this,
                        fromTime = this.getTGSettings().time_range,
                        toTime = 0;
                        if(fromTime == -1) {
                            fromTime = (new Date().getTime() - new Date(
                                    this.getTGSettings().from_time).getTime()),
                            toTime = (new Date().getTime() - new Date(
                                    this.getTGSettings().to_time).getTime());
                            fromTime = Math.round(fromTime / (1000 * 60));
                            toTime = Math.round(toTime / (1000 * 60));
                        } else {
                            fromTime /= 60;
                        }
                    self.updateStatsTimeSec();
                    var postData = {
                        "async": false,
                        "formModelAttrs": {
                            "from_time_utc": "now-" + (fromTime + 'm'),
                            "to_time_utc": "now-" + (toTime + 'm'),
                            "select": "eps.traffic.remote_app_id, eps.traffic.remote_tier_id, eps.traffic.remote_site_id,"+
                                 "eps.traffic.remote_deployment_id, eps.traffic.remote_prefix, eps.traffic.remote_vn, eps.__key,"+
                                 " app, tier, site, deployment, vn, name, SUM(eps.traffic.in_bytes),"+
                                 " SUM(eps.traffic.out_bytes), SUM(eps.traffic.in_pkts), SUM(eps.traffic.initiator_session_count)," +
                                 " SUM(eps.traffic.responder_session_count), SUM(eps.traffic.out_pkts)",
                            "table_type": "STAT",
                            "table_name": "StatTable.EndpointSecurityStats.eps.traffic",
                            "where": "(name Starts with " + contrail.getCookie(cowc.COOKIE_DOMAIN) + ':' + contrail.getCookie(cowc.COOKIE_PROJECT) + ")",
                            "where_json": []
                        }
                    };
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
                                            "SUM(eps.traffic.in_bytes)": 0,
                                            "SUM(eps.traffic.out_bytes)": 0,
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
                                        type:'POST',
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
                                                'showLinkInfo': false,
                                                'levels': 1
                                            });
                                        }
                                    });
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
                                        //Strip-off the domain and project form FQN
                                        $.each(['app','site','tier','deployment'],function(idx,tagName) {
                                            if(typeof(value[tagName]) == 'string' && value[tagName].split(':').length == 3)
                                                value[tagName] = value[tagName].split(':').pop();
                                        });
                                    });
                                    self.trafficData = JSON.parse(JSON.stringify(data));
                                    self.filterDataByTagName();
                                    self.prepareTagList();
                                    return data;
                                }
                            }]
                        },
                        cacheConfig : {

                        }
                    };
                    this.viewInst = new ContrailChartsView({
                        el: this.$el.find('#traffic-groups-radial-chart'),
                        model: new ContrailListModel(listModelConfig)
                    });
                    this.updateChart({
                        'freshData': true
                    });
                },
                render: function() {
                    if(!($('#breadcrumb li:last a').text() == ctwc.TRAFFIC_GROUPS_ALL_APPS)){
                        pushBreadcrumb([ctwc.TRAFFIC_GROUPS_ALL_APPS]);
                    }
                    var trafficGroupsTmpl = contrail.getTemplate4Id('traffic-groups-template');
                    this.$el.html(trafficGroupsTmpl({widgetTitle:'Traffic Groups'}));
                    this.$el.addClass('traffic-groups-view');
                    $('.refresh-traffic-stats').on('click', this.resetTrafficStats.bind(this));
                    $('.filter-traffic-stats').on('click', this.showFilterOptions.bind(this));
                    TrafficGroupsView.colorMap = {};
                    TrafficGroupsView.colorArray = [];
                    TrafficGroupsView.tagMap = {};
                    TrafficGroupsView.ruleMap = {};
                    /**
                     * @levels  #Indicates no of levels to be drawn
                     */
                    this.settingsView = new settingsView();
                    this.renderTrafficChart();
                }
            });
            return TrafficGroupsView;
        });
