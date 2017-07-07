/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'lodash',
    'contrail-view',
    'contrail-list-model',
], function (_, ContrailView, ContrailListModel) {
    var TrafficGroupsSessionsView = ContrailView.extend({
        el: $(contentContainer),
        render: function (sessionData) {
            var self = this,
                modalTemplate =contrail.getTemplate4Id('core-modal-template'),
                prefixId = 'traffic-groups-sessions',
                modalId = 'traffic-groups-sessions-modal',
                modalLayout = modalTemplate({prefixId: prefixId, modalId: modalId}),
                modalConfig = {
                   'modalId': modalId,
                   'className': 'modal-840',
                   'body': modalLayout,
                   'title': 'Endpoint Statistics',
                   'onCancel': function() {
                       $("#" + modalId).modal('hide');
                   }
                },
                formId = prefixId + '_modal';
            cowu.createModal(modalConfig);
            var contrailListModel = new ContrailListModel({data : sessionData});
            $('#'+ modalId).on('shown.bs.modal', function () {
               self.renderView4Config($("#" + modalId).find('#' + formId), contrailListModel, self.getSessionsGridViewConfig(),
                    null, null, null, function() {
                        // Add the title once render is complete
                        $("#" + formId).find('.grid-header-text')
                            .html($('.traffic-rules header').html());
                    }
                );
            });
        },
        getSessionsGridViewConfig: function () {
            return {
                elementId: cowu.formatElementId(['traffic-groups-sessions-list']),
                view: "SectionView",
                viewConfig: {
                    rows: [
                        {
                            columns: [
                                {
                                    elementId: 'traffic-groups-sessions-grid',
                                    view: "GridView",
                                    viewConfig: {
                                        elementConfig: this.getSessionsConfiguration()
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        },
        getSessionsConfiguration: function () {
            var sessionColumns = [
                        {
                            field: 'app',
                            name: 'Application'
                        },
                        {
                            field: 'deployment',
                            name: 'Deployment'
                        },
                         {
                            field: 'tier',
                            name: 'Tier',
                            hide: true
                        },
                        {
                            field: 'site',
                            name: 'Site',
                            hide: true
                        },
                        {
                            field: 'eps.traffic.remote_app_id',
                            name: 'Remote Application'
                        },
                        {
                            field: 'eps.traffic.remote_deployment_id',
                            name: 'Remote Deployment'
                        },
                        {
                            field: 'eps.traffic.remote_tier_id',
                            name: 'Remote Tier',
                            hide: true
                        },
                        {
                            field: 'eps.traffic.remote_site_id',
                            name: 'Remote Site',
                            hide: true
                        },
                        {
                            field: 'vn',
                            name: 'VN',
                            hide: true
                        },
                        {
                            field: 'eps.traffic.remote_vn',
                            name: 'Remote VN',
                            hide: true
                        },
                        {
                            field: 'SUM(eps.traffic.in_bytes)',
                            name: 'In Bytes'
                        },
                        {
                            field: 'SUM(eps.traffic.out_bytes)',
                            name: 'Out Bytes'
                        }
                    ],
                gridElementConfig = {
                    header: {
                        title: {
                            text: ''
                        },
                        defaultControls: {
                            collapseable: false,
                            exportable: true,
                            searchable: true,
                            columnPickable:true
                        }
                    },
                    columnHeader: {
                        columns: sessionColumns
                    },
                    body: {
                        options : {
                            autoRefresh: false,
                            checkboxSelectable: false,
                            detail: {
                                template: cowu.generateDetailTemplateHTML(this.getSessionDetailsTemplateConfig(), cowc.APP_CONTRAIL_CONTROLLER)
                            }
                        },
                        dataSource : {data: []},
                        statusMessages: {
                            loading: {
                               text: 'Loading sessions..',
                            },
                            empty: {
                               text: 'No sessions Found.'
                            }
                         }
                    },
                    footer: {
                        pager: {
                            options: {
                                pageSize: 50,
                                pageSizeSelect: [5, 10, 50]
                            }

                        }
                    }
                };
            return gridElementConfig;
        },
        getSessionDetailsTemplateConfig: function() {
            return {
                templateGenerator: 'RowSectionTemplateGenerator',
                templateGeneratorConfig: {
                    rows: [
                        {
                            templateGenerator: 'ColumnSectionTemplateGenerator',
                            templateGeneratorConfig: {
                                columns: [
                                    {
                                        //class: 'trafficEndpointDetails',
                                        rows: [
                                            {
                                                title: 'Details',
                                                templateGenerator: 'BlockListTemplateGenerator',
                                                templateGeneratorConfig: [
                                                    {
                                                        key: 'app',
                                                        label: 'Application',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Remote Application',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteAppFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'deployment',
                                                        label: 'Deployment',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'deployment',
                                                        label: 'Remote Deployment',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteDeplFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'tier',
                                                        label: 'Tier',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'tier',
                                                        label: 'Remote Tier',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteTierFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'site',
                                                        label: 'Site',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'site',
                                                        label: 'Remote Site',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteSiteFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'vn',
                                                        label: 'VN',
                                                        templateGenerator: 'TextGenerator'
                                                    },
                                                    {
                                                        key: 'vn',
                                                        label: 'Remote VN',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'remoteVNFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'In Bytes',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'bytesInFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Out Bytes',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'bytesOutFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Sessions Initiated',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'sessionsInFormatter'
                                                        }
                                                    },
                                                    {
                                                        key: 'app',
                                                        label: 'Sessions Responded',
                                                        templateGenerator: 'TextGenerator',
                                                        templateGeneratorConfig: {
                                                            formatter: 'sessionsOutFormatter'
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
            };
        }
    });
    this.remoteAppFormatter = function(v, dc) {
       return  dc['eps.traffic.remote_app_id'];
    }
    this.remoteDeplFormatter = function(v, dc) {
       return  dc['eps.traffic.remote_deployment_id'];
    }
    this.remoteTierFormatter = function(v, dc) {
       return  dc['eps.traffic.remote_tier_id'];
    }
    this.remoteSiteFormatter = function(v, dc) {
       return  dc['eps.traffic.remote_site_id'];
    }
    this.remoteVNFormatter = function(v, dc) {
       return  dc['eps.traffic.remote_vn'];
    }
    this.bytesInFormatter = function(v, dc) {
       return  dc['SUM(eps.traffic.in_bytes)'];
    }
    this.bytesOutFormatter = function(v, dc) {
       return  dc['SUM(eps.traffic.out_bytes)'];
    }
    this.sessionsInFormatter = function(v, dc) {
       return  dc['SUM(eps.traffic.initiator_session_count)'];
    }
    this.sessionsOutFormatter = function(v, dc) {
       return  dc['SUM(eps.traffic.responder_session_count)'];
    }
    return TrafficGroupsSessionsView;
});
