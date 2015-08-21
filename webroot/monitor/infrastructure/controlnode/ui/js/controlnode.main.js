var controlNodesLoader = new ControlNodesLoader();

function ControlNodesLoader() {
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathControlNodeView = rootDir + '/js/views/ControlNodeView.js',
            renderFn = paramObject['function'];

//            if (self.controlNodeView == null) {
//                requirejs([pathControlNodeView], function (ControlNodeListView){
//                    self.controlNodeView = new ControlNodeView();
//                    self.renderView(renderFn, hashParams);
//                });
//            } else {
//                self.renderView(renderFn, hashParams);
//            }
            require([pathControlNodeView], function (ControlNodeView) {
                self.controlNodeView = new ControlNodeView();
                self.renderView(renderFn, hashParams);
            });
    }
    this.renderView = function (renderFn, hashParams, view) {
        $(contentContainer).html("");
        if(hashParams.view == "details") {
            this.controlNodeView.renderControlNodeDetails({hashParams: hashParams});
        } else {
            this.controlNodeView.renderControlNode({hashParams: hashParams});
        }
    };

    this.updateViewByHash = function (hashObj, lastHashObj) {
        var renderFn;
        this.load({hashParams: hashObj, 'function': renderFn});
    };

    this.destroy = function () {
    };
}
