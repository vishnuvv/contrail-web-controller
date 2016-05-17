/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'contrail-list-model',
    'monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'
], function (ContrailListModel, MxGraphModel) {
    var MXVisualizationModel = function () {
       var listModelConfig = {
                remote : {
                    ajaxConfig : {
                        url : ctwl.MX_MXTOPOLOGY_URL
                    },
                   successCallback: function(modelData, listModel, origResponse) {
                    },
                    dataParser : function (response) {
                        var line_cards = response[0].linecards.length;
                        var nodes = [{
                            name: "Fabric",
                            node_type: "fabric"
                        }];
                        var links = [];
                        for(var i=0; i<line_cards; i++) {
                                nodes.push({
                                    node_type: "line_card",
                                    name: "LC" + (i+1)
                                });
                            for(var j=0; j<line_cards; j++) {
                                links.push({
                                    endpoints: [
                                       "Fabric",
                                       "LC" + (i+1)
                                    ]
                                });
                            }
                        }
                        return [{
                            id: $.now(),
                            rawData: response,
                            nodes: nodes,
                            links: links
                        }];
                    },
                },
            };
        return ContrailListModel(listModelConfig);
    };
    return MXVisualizationModel;
    }
);
