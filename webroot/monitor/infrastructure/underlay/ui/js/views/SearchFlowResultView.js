/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'query-result-view',
    'knockback'
], function (_, QueryResultView, Knockback) {

    var SearchFlowResultView = QueryResultView.extend({
        render: function () {
            var self = this, viewConfig = self.attributes.viewConfig,
                serverCurrentTime = getCurrentTime4MemCPUCharts();

            $.ajax({
                url: '/api/service/networking/web-server-info'
            }).done(function (resultJSON) {
                serverCurrentTime = resultJSON['serverUTCTime'];
            }).always(function() {
                self.renderView4Config(self.$el, null, self.getViewConfig(serverCurrentTime))
            });
        },

        getViewConfig: function (serverCurrentTime) {
            var self = this, viewConfig = self.attributes.viewConfig,
                queryFormModel = this.model,
                reqObj = {
                    async: false,
                    chunkSize: parseInt(queryFormModel.limit())
                },
                postDataObj =
                    queryFormModel.getQueryRequestPostData(serverCurrentTime, reqObj),
                searchFlowGridColumns =
                    monitorInfraUtils.getSearchFlowGridColumns();

            var searchFlowRemoteConfig = {
                url: "/api/qe/query",
                //url: '/searchFlowResponse.json'
                type: 'POST',
                data: JSON.stringify(postDataObj)
            };

            return {
                elementId: ctwl.QE_FLOW_SERIES_GRID_ID,
                title: ctwl.TITLE_RESULTS,
                view: "GridView",
                viewConfig: {
                    elementConfig:
                        getSearchFlowGridConfig(searchFlowRemoteConfig, searchFlowGridColumns)
                }
           }
        }
    });

    function getSearchFlowGridConfig(searchFlowRemoteConfig, searchFlowGridColumns) {
        var gridElementConfig = {
            header: {
                title: {
                    text: 'Flows',
                },
                defaultControls: {
                    collapseable: true,
                    exportable: true,
                    refreshable: false,
                    searchable: false
                }
            },
            body: {
                options: {
                    autoRefresh: false,
                    checkboxSelectable: false,
                    fixedRowHeight: 30,
                    detail: false,
                    actionCellPosition: 'start',
                    actionCell:[{
                        title: 'Show Underlay Path(s)',
                        iconClass: 'icon-contrail-trace-flow',
                        onClick: function(rowIndex,targetElement){
                            var dataItem = $('#' + options.elementId).data('contrailGrid')._grid.getDataItem(rowIndex);
                            var startTime = $("#"+options.queryPrefix+"-results").data('startTimeUTC');
                            var endTime = $("#"+options.queryPrefix+"-results").data('endTimeUTC');
                            dataItem['startTime'] = startTime;
                            dataItem['endTime'] = endTime;
                            dataItem['startAt'] = new Date().getTime();
                            $("#fr-results div.selected-slick-row").each(function(idx,obj){
                                $(obj).removeClass('selected-slick-row');
                            });
                            $(targetElement).parent().parent().addClass('selected-slick-row');
                            showUnderlayPaths(dataItem);
                        }
                    }]
                },
                dataSource: {
                    remote: {
                        ajaxConfig: searchFlowRemoteConfig,
                        dataParser: function(response) {
                            var graphView = $("#"+ctwl.UNDERLAY_GRAPH_ID).data('graphView');
                            response['vRouters'] = graphView.model.vRouters;
                            return monitorInfraParsers.parseUnderlayFlowRecords(response);
                        }
                    }
                }
            },
            columnHeader: {
                columns: searchFlowGridColumns
            }
           
        };
        return gridElementConfig;
    };

    return SearchFlowResultView;
});