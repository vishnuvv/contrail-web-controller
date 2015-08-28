var controlNodesLoader = new ControlNodesLoader();

function ControlNodesLoader() {
    this.load = function (paramObject) {
        var self = this, currMenuObj = globalObj.currMenuObj,
            hashParams = paramObject['hashParams'],
            rootDir = currMenuObj['resources']['resource'][0]['rootDir'],
            pathControlNodeView = rootDir + '/js/views/ControlNodeView.js',
            renderFn = paramObject['renderFn'];

            if (self.monitorInfraView == null) {
                requirejs([pathControlNodeView], function (ControlNodeListView){
                    self.monitorInfraView = new ControlNodeListView();
                    self.renderView(renderFn, hashParams);
                });
            } else {
                self.renderView(renderFn, hashParams);
            }
    }
    this.renderView = function (renderFn, hashParams) {
        $(contentContainer).html("");
        this.monitorInfraView[renderFn]({hashParams: hashParams});
    };

    this.updateViewByHash = function (hashObj, lastHashObj) {
        this.load({hashParams: hashObj});
    };

    this.destroy = function () {
    };
}
