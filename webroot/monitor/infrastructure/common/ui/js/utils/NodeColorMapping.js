/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define(
       [ 'underscore' ],
       function(_) {
            var NodeColorMapping = function() {
                var nodeColorMap = {},
                    colors = cowc.FIVE_NODE_COLOR;
                    //unusedColors = cowc.FIVE_NODE_COLOR;

                this.getNodeColorMap = function (hostNames) {
                    var self = this;
                    if (!$.isArray(hostNames)) {
                        hostNames = [hostNames];
                    }
                    //if hostname doesn't exists in nodeColorMap
                    keys = _.unique(hostNames);
                    keys = _.sortBy(keys);
                    $.each(keys, function (idx, obj) {
                        if (nodeColorMap[obj] == null) {
                            nodeColorMap[obj] = getValueByJsonPath(colors, '0', cowu.DEFAULT_COLOR);
                            colors = _.without(colors, colors[0]);
                        }
                    });
                    return nodeColorMap;
                };
            };
            return NodeColorMapping;
       });