/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */
define([
    'underscore',
    'contrail-view',
    'monitor/infrastructure/mxvisualization/ui/js/models/MXGraphModel'
], function(_, ContrailView, MXGraphModel) {
    var MXGraphView = ContrailView.extend({
        graphModel: null,
        style: {
        defaultSelected: {
            color: "rgb(0,0,0)"
        }
        },
        visOptions: { 
            physics:{
                enabled: false,
                stabilization: false
            },
            interaction:{
                navigationButtons: true,
                zoomView: false,
                dragNodes:false,
                dragView:false,
                hover:false 
            },
            manipulation: {
                enabled: false,
            },
            edges: {
                smooth: false
            },
            layout: {
               randomSeed: undefined,
              }
            },
            getImage: function(newImage) {
                  return ("img/" + newImage + ".svg");
            },
            getEventsConfig: function() {
                  var self = this;
                  return {
                      "click"                         : self.clickHandler,
                      "doubleClick"                   : self.doubleClickHandler,
                      "showPopup"                     : self.showPopupHandler,
                  };
             },
             clickHandler: function(params, contrailVisView) {
                  timeout = setTimeout(function() {
                  var self = contrailVisView.caller;
                  var network = contrailVisView;
                  var _network = network.network;
                  if(params.nodes.length == 1){
                      var clickedNode = _network.canvas.body.nodes[params.nodes];
                      var node = self.graphModel.getNode(params.nodes[0]);
                      self.addDimlightToConnectedElements();
                      if(node && node.length == 1)
                          node = node[0];
                      else
                          return;
                      var nodeLabelStr = String(clickedNode.options.label);
                      var matchesString = nodeLabelStr.match(/\d+/g);
                     if (matchesString != null) {
                         var thefilteredNum = nodeLabelStr.match(/\d+/)[0];
                         var clickedLabel = clickedNode.options.label;
                         if(thefilteredNum % 2 == 0){
                             self.changeImageNode(self.getImage("node_click_right"), clickedNode, node);
                         }
                         else{
                             self.changeImageNode(self.getImage("node_click_left"), clickedNode, node);
                         }
                         self.graphModel.selectedElement().model().set({
                             'nodeDetail':  clickedLabel
                         })
                     }
                  }
                  else if (params.edges.length == 1) {
                       var clickedElement = _network.canvas.body.edges[params.edges[0]];
                       var edge = self.graphModel.getEdge(params.edges[0]);
                       if(edge && edge.length == 1)
                          edge = edge[0];
                       else
                          return;
                       edge.attributes.color(self.style.default.color);
                  }
                  timeout = null;
             }, 300);  
            },
              doubleClickHandler: function(params, contrailVisView) {
                  if (timeout) {
                      clearTimeout(timeout);
                      timeout = null;
                  }
                  var self = contrailVisView.caller;
                  var network = contrailVisView;
                  var _network = network.network;
                  var dblClickedElement = _network.canvas.body.nodes[params.nodes];
                  if(params.nodes.length == 1){
                      self.addDimlightToConnectedElements();
                      self.renderView4Config($(contentContainer), null, {
                          elementId: "linecardid",
                          view: "LinecardVisualizationView",
                          viewPathPrefix: ctwl.URL_MX_VISUALIZATION,
                          app: cowc.APP_CONTRAIL_CONTROLLER,
                          viewConfig: {
                              clickedElement: dblClickedElement
                          }
                  });
                  }
              },
              changeImageNode: function(params, clickedNode, node){
                  node.attributes.image(node.attributes.model().attributes.highlightURL);
                  return;
              },
              addDimlightToConnectedElements: function() {
                  var network = this.network;
                  var _this = this;
                  var nodeIds = network.getNodeIds();
                  var nodes = [];
                  _.each(_this.graphModel.nodesCollection.models, function(node){
                      node.attributes.image(node.attributes.model().attributes.defaultURL);
                  })
                  return;
              },
              showPopupHandler: function(params, contrailVisView) {
                  $(".vis-network-tooltip").css("display","none");
              },
              getContrailVisViewConfig: function(selectorId) {
                  var self = this;
                  return {
                      elementId: selectorId,
                      view: 'ContrailVisView',
                      viewConfig: {
                          elementId: selectorId,
                          caller: self,
                          visOptions: self.visOptions,
                          events: self.getEventsConfig()
                      }
                  };
              },
              getNodeChangeEventsConfig: function() {
                  var self = this;
                  return [
                      "change:image",
                      "change:x",
                      "change:y",
                      "change:hidden"
                  ];
              },
          plot: function(parentModelattributes) {
                var self = this,
                    container = document.getElementById(ctwl.MX_VISUALIZATION_ID),
                    nodes = null,
                    edges = null,
                    network = null,
                    DIR = 'img/',
                    sizeWidth = container.clientWidth,
                    sizeHeight = container.clientHeight,
                    xc = sizeWidth/2,
                    yc = sizeHeight/2,
                    linecardCount = self.graphModel.rawData()[0].linecards.length,
                    x=[],
                    y=[],
                    lineCardCountCheckLeft = Math.round(linecardCount/2),
                    lineCardCountCheckRight = linecardCount - lineCardCountCheckLeft,
                    offsetyPos  = [],
                    offsetyLines =[0],
                    flagAdd_Sub  = [],
                    countLeft = Math.floor(lineCardCountCheckLeft/2),
                    linecardSize = 25,
                    fabricSize = 35;
                    container.style.height='350px';
                     var kl1 = countLeft;
                     do {
                         flagAdd_Sub.push(-1*kl1);
                         flagAdd_Sub.push(-1*kl1);
                         kl1--;
                     }
                     while (kl1 > -1);
                     for(var kl2=1; kl2<=countLeft+1;kl2++){
                           flagAdd_Sub.push(1*kl2);
                           flagAdd_Sub.push(1*kl2);
                     }    
                      for(k1=0; k1<linecardCount;k1++){
                          offsetyLines.push((k1+1)*7);
                          offsetyLines.push((k1+1)*-7);
                          offsetyPos.push(flagAdd_Sub[k1]*90);
                          x.push(xc-(xc/4));
                          x.push(xc+(xc/4));
                          y.push(yc+(flagAdd_Sub[k1]*90));
                      }
      var data = null;
      var url;
      d3.xml("/img/node_left.svg", "image/svg+xml", function(error, leftxml) {
         if(error) throw error; 
       d3.xml("/img/node_right.svg", "image/svg+xml", function(error, rightxml) {
             if(error) throw error; 
             d3.xml("/img/node_click_left.svg", "image/svg+xml", function(error, leftclickxml) {
                 if(error) throw error;
                 d3.xml("/img/node_click_right.svg", "image/svg+xml", function(error, rightclickxml) {
                     if(error) throw error;
                     var nodeModels = [], edgeModels = [];
                     var nodeModel = _.filter(self.graphModel.nodesCollection.models, function(node){
                         return (node.attributes.name() == 'Fabric');
                     });
                     if(nodeModel && nodeModel.length == 1) {
                         nodeModel = nodeModel[0];
                         nodeModel.attributes.model().attributes.shape = "image";
                         nodeModel.attributes.model().attributes.image = 'img/fabric.svg';
                         nodeModel.attributes.model().attributes.physics = false;
                         nodeModel.attributes.model().attributes.fixed = true;
                         nodeModel.attributes.model().attributes.size = fabricSize;
                         nodeModel.attributes.model().attributes.x = xc;
                         nodeModel.attributes.model().attributes.y = yc;
                         nodeModels.push(nodeModel);
                         self.network.addNode(nodeModel);
                     }
                     for (var i = 0; i < linecardCount; i++) {
                         var flag_check_number;
                         flag_check_number = i+1;
                         if(flag_check_number % 2 == 0)
                         {
                             var nodeModel = _.filter(self.graphModel.nodesCollection.models, function(node){
                                 return (node.attributes.name() == 'LC' + (i+1));
                             });
                             if(nodeModel.length == 1) {
                                 var highlightURL = "";
                                 var defaultURL ="";
                                 if(rightclickxml!=null) {
                                     rightclickxml.getElementsByTagName('tspan')[0].textContent=self.graphModel.rawData()[0].linecards[i].model_type;
                                     var svgStringRightClickContent = new XMLSerializer().serializeToString(rightclickxml.documentElement);
                                     var DOMURL = window.URL || window.webkitURL || window;
                                     data = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg4310" viewBox="0 0 145 50" height="50" width="145" enable-background="new 0 0 145 50" xml:space="preserve">'+ svgStringRightClickContent+'</svg>';
                                     var parser = new DOMParser();
                                     var doc = parser.parseFromString(data, "image/svg+xml");
                                     var svgString = new XMLSerializer().serializeToString(doc.documentElement);
                                     highlightURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
                                 }
                                 if(rightxml!=null)
                                     rightxml.getElementsByTagName('tspan')[0].textContent=self.graphModel.rawData()[0].linecards[i].model_type;
                                     var svgStringRightContent = new XMLSerializer().serializeToString(rightxml.documentElement);
                                     var DOMURL = window.URL || window.webkitURL || window;
                                     data = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg4310" viewBox="0 0 145 50" height="50" width="145" enable-background="new 0 0 145 50" xml:space="preserve">'+ svgStringRightContent+'</svg>';
                                     var parser = new DOMParser();
                                     var doc = parser.parseFromString(data, "image/svg+xml");
                                     var svgString = new XMLSerializer().serializeToString(doc.documentElement);
                                     defaultURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
                                     nodeModel = nodeModel[0];
                                     nodeModel.attributes.model().set({"modelType":self.graphModel.rawData()[0].linecards[i].model_type});
                                     nodeModel.attributes.model().set({"slotIdentifier":self.graphModel.rawData()[0].linecards[i].slot_identifier});
                                     nodeModel.attributes.model().set({"pfeCount":self.graphModel.rawData()[0].linecards[i].pfe_count});
                                     nodeModel.attributes.model().set({"inTraffic":self.graphModel.rawData()[0].linecards[i].ifInOctets});
                                     nodeModel.attributes.model().set({"outTraffic":self.graphModel.rawData()[0].linecards[i].ifOutOctets});
                                     nodeModel.attributes.model().set({"parentModelattributes":parentModelattributes});
                                     nodeModel.attributes.model().attributes.shape = "image";
                                     nodeModel.attributes.model().set({"defaultURL": defaultURL});
                                     nodeModel.attributes.model().set({"highlightURL": highlightURL});
                                     nodeModel.attributes.model().attributes.image = defaultURL;
                                     nodeModel.attributes.model().attributes.physics = false;
                                     nodeModel.attributes.model().attributes.fixed = true;
                                     nodeModel.attributes.model().attributes.size = linecardSize;
                                     nodeModel.attributes.model().attributes.x = x[i];
                                     nodeModel.attributes.model().attributes.y = y[i];
                                     nodeModels.push(nodeModel)
                                     self.network.addNode(nodeModel);
                             }
                         }
                         else{
                             var nodeModel = _.filter(self.graphModel.nodesCollection.models, function(node){
                                 return (node.attributes.name() == 'LC' + (i+1));
                             });
                             if(nodeModel.length == 1) {
                                 var highlightURL = "";
                                 if(leftclickxml!=null) {
                                     leftclickxml.getElementsByTagName('tspan')[0].textContent=self.graphModel.rawData()[0].linecards[i].model_type;
                                     var svgStringleftClickContent = new XMLSerializer().serializeToString(leftclickxml.documentElement);
                                     var DOMURL = window.URL || window.webkitURL || window;
                                     data = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg4310" viewBox="0 0 145 50" height="50" width="145">'+ svgStringleftClickContent+'</svg>';
                                     var parser = new DOMParser();
                                     var doc = parser.parseFromString(data, "image/svg+xml");
                                     var svgString = new XMLSerializer().serializeToString(doc.documentElement);
                                     highlightURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
                                 }
                                 if(leftxml!=null)
                                     leftxml.getElementsByTagName('tspan')[0].textContent=self.graphModel.rawData()[0].linecards[i].model_type;
                                     var svgStringleftContent = new XMLSerializer().serializeToString(leftxml.documentElement);
                                     var DOMURL = window.URL || window.webkitURL || window;
                                     data = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>'+'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg4310" viewBox="0 0 145 50" height="50" width="145">'+ svgStringleftContent+'</svg>';
                                     var parser = new DOMParser();
                                     var doc = parser.parseFromString(data, "image/svg+xml");
                                     var svgString = new XMLSerializer().serializeToString(doc.documentElement);
                                     defaultURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
                                     nodeModel = nodeModel[0];
                                     nodeModel.attributes.model().set({"modelType":self.graphModel.rawData()[0].linecards[i].model_type});
                                     nodeModel.attributes.model().set({"slotIdentifier":self.graphModel.rawData()[0].linecards[i].slot_identifier});
                                     nodeModel.attributes.model().set({"pfeCount":self.graphModel.rawData()[0].linecards[i].pfe_count});
                                     nodeModel.attributes.model().set({"inTraffic":self.graphModel.rawData()[0].linecards[i].ifInOctets});
                                     nodeModel.attributes.model().set({"outTraffic":self.graphModel.rawData()[0].linecards[i].ifOutOctets});
                                     nodeModel.attributes.model().set({"parentModelattributes":parentModelattributes});
                                     nodeModel.attributes.model().set({"defaultURL": defaultURL});
                                     nodeModel.attributes.model().set({"highlightURL": highlightURL});
                                     nodeModel.attributes.model().attributes.shape = "image";
                                     nodeModel.attributes.model().attributes.image = defaultURL;
                                     nodeModel.attributes.model().attributes.physics = false;
                                     nodeModel.attributes.model().attributes.fixed = true;
                                     nodeModel.attributes.model().attributes.size = linecardSize;
                                     nodeModel.attributes.model().attributes.x = x[i];
                                     nodeModel.attributes.model().attributes.y = y[i];
                                     nodeModels.push(nodeModel);
                                     self.network.addNode(nodeModel);
                             }
                         }
                         var edgeModels = _.filter(self.graphModel.edgesCollection.models, function(edge){
                             return (edge.attributes.endpoints()[0] == "Fabric" &&
                                  edge.attributes.endpoints()[1] == ('LC' + (i+1)));
                         });
                         if(edgeModels.length == linecardCount) {
                             for(j=0; j<linecardCount; j++){
                                 edgeModel = edgeModels[j];
                                 edgeModel.attributes.model().attributes.physics = false;
                                 edgeModel.attributes.model().attributes.fixed = true;
                                 edgeModel.attributes.model().attributes.color = '#000';
                                 edgeModel.attributes.model().attributes.length = 50;
                                 edgeModel.attributes.model().attributes.offsetyPos = offsetyPos[i];
                                 edgeModel.attributes.model().attributes.offsetyLines = offsetyLines[j];
                                 self.network.addEdge(edgeModel);
                              }
                          }
                     }
                     self.network.setData(null, self.visOptions);
                 });
                 
             });
           }); 
      }); 
  },
        render: function() {
            var self = this;
            var mxVizModel = self.model;
            var parentModelattributes = this.attributes.viewConfig.viewConfig.clickedElement.options.more_attributes;
            if(self.model.isRequestInProgress()){
                self.model.onAllRequestsComplete.subscribe(function(){
                   self.graphModel = new MXGraphModel(mxVizModel.getItems()[0]);
                    self.renderView4Config($(ctwl.MX_VISUALIZATION_ID),
                            self.graphModel, self.getContrailVisViewConfig(ctwl.MX_VISUALIZATION_ID),
                             null, null, null, function (mxgraphview) {
                                    $(".vis-network canvas").css("cursor","default");
                                     mxgraphview.network = mxgraphview.childViewMap[ctwl.MX_VISUALIZATION_ID];
                                         self.plot(parentModelattributes);
                                         window.view = mxgraphview;
                                   });
                    _.each(self.graphModel.nodesCollection.models, function(model){
                        _.each(self.getNodeChangeEventsConfig(), function(eventName) {
                            model.attributes.model().on(eventName, function() {
                                var params = arguments;
                                var nodeModel = self.graphModel.getNode(params[0].attributes.id);
                                if(nodeModel && nodeModel.length == 1) {
                                    nodeModel = nodeModel[0];
                                }
                                self.network.updateNode(nodeModel);
                            });
                        });
                    });
                });
            } else {
                self.graphModel = new MXGraphModel(mxVizModel.getItems()[0]);
                self.renderView4Config($(ctwl.MX_VISUALIZATION_ID),
                        self.graphModel, self.getContrailVisViewConfig(ctwl.MX_VISUALIZATION_ID),
                         null, null, null, function (mxgraphview) {
                            $(".vis-network canvas").css("cursor","default");
                             mxgraphview.network = mxgraphview.childViewMap[ctwl.MX_VISUALIZATION_ID];
                                 self.plot(parentModelattributes);
                                 window.view = mxgraphview;
                         });
                _.each(self.graphModel.nodesCollection.models, function(model){
                    _.each(self.getNodeChangeEventsConfig(), function(eventName) {
                        model.attributes.model().on(eventName, function() {
                            var params = arguments;
                            var nodeModel = self.graphModel.getNode(params[0].attributes.id);
                            if(nodeModel && nodeModel.length == 1) {
                                nodeModel = nodeModel[0];
                            }
                            self.network.updateNode(nodeModel);
                        });
                    });
                });
            }
        }
    });
    return MXGraphView;
});

