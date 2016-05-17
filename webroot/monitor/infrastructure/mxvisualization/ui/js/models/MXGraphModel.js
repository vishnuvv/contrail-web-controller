/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define(['backbone', 'contrail-model', 'vis-node-model', 'vis-edge-model'],
    function(Backbone, ContrailModel, VisNodeModel, VisEdgeModel) {
    var MXGraphModel = ContrailModel.extend({
        defaultConfig: {
            selectedElement  : new Backbone.Model({
                nodeType: '',
                nodeDetail: {},
                nodeData: ''
                })
        },
        formatModelConfig: function(modelConfig) {
            var self = this;
            var nodeModels = [],
                edgeModels = [],
                bbCollectionNodes = null,
                bbCollectionEdges = null;
            _.each(modelConfig.nodes, function(node){
                nodeModels.push(new VisNodeModel(node))
            });
            bbCollectionNodes = new Backbone.Collection(nodeModels);
            _.each(modelConfig.links, function(edge){
                edgeModels.push(new VisEdgeModel(edge, bbCollectionNodes))
            });
            bbCollectionEdges = new Backbone.Collection(edgeModels);
            modelConfig.nodesCollection = bbCollectionNodes;
            modelConfig.edgesCollection = bbCollectionEdges;
            self.nodesCollection = bbCollectionNodes;
            self.edgesCollection = bbCollectionEdges;
            return modelConfig;
        },
        getNode: function(id) {
            return _.filter(this.nodesCollection.models, function(node) {
                return (node.attributes.element_id() == id)
                });
        },
        getEdge: function(id) {
            return _.filter(this.edgesCollection.models, function(edge) {
                return (edge.attributes.element_id() == id)
                });
        },
    });
   return MXGraphModel;
});
