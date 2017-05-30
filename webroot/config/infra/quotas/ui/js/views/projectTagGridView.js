/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'config/firewall/common/tag/ui/js/models/tagModel',
    'config/firewall/common/tag/ui/js/views/tagEditView'
], function (_, ContrailView, TagModel, TagEditView) {
    var tagEditView = new TagEditView(),
        gridElId = "#" + ctwc.SECURITY_POLICY_TAG_GRID_ID;

    var tagGridView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'];
            self.renderView4Config(self.$el, self.model,
                                   getTagGridViewConfig(viewConfig));
        }
    });

    var getTagGridViewConfig = function (viewConfig) {
        return {
            elementId: cowu.formatElementId([ctwc.SECURITY_POLICY_TAG_LIST_VIEW_ID+"1"]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwc.SECURITY_POLICY_TAG_GRID_ID+"1",
                                title: ctwl.TITLE_SEC_GRP_TAG,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getConfiguration(viewConfig)
                                }
                            }
                        ]
                    }
                ]
            }
        };
    };
    var getConfiguration = function (viewConfig) {
        var gridElementConfig = {
            header: {
                title: {
                    text: ctwl.TITLE_SEC_GRP_TAG
                },
                advanceControls: getHeaderActionConfig(viewConfig),
            },
            body: {
                options: {
                    checkboxSelectable : false,
                    detail: false,
                },
                dataSource: {},
                statusMessages: {
                    loading: {
                        text: 'Loading Tags..'
                    },
                    empty: {
                        text: 'No Tags Found.'
                    }
                }
            },
            columnHeader: {
                columns: [
                        /*{
                             field: 'name',
                             name: 'Name',
                             id: 'name'
                        },*/
                        {
                            field: 'type',
                            name: 'Type',
                            id: 'tag_type'
                        },
                        {
                            field: 'value',
                            name: 'Value',
                            id: 'tag_value'
                        }
                ]
            },
        };
        return gridElementConfig;
    };
    function getHeaderActionConfig(viewConfig) {
        var headerActionConfig = [
            {
                "type": "link",
                "title": ctwl.TITLE_EDIT_FORWARDING_OPTIONS,
                "iconClass": 'fa fa-pencil-square-o',
                "onClick": function() {
                    var ajaxConfig = {
                            url: "/api/tenants/config/get-config-details",
                            type: "POST",
                            data: JSON.stringify(
                                {data: [{type: 'tags'}]})
                    };
                    contrail.ajaxHandler(ajaxConfig, null, function(response) {
                        var tagsData = getValueByJsonPath(response,
                            "0;tags", {});
                        tagsModel = new TagModel(tagsData);
                        tagEditView.model = tagsModel;
                        tagEditView.renderEditForwardingOptions({
                                      "title": ctwl.TITLE_EDIT_FORWARDING_OPTIONS,
                                      callback: function() {
                            var dataView =
                                $(gridElId).data("contrailGrid")._dataView;
                            dataView.refreshData();
                        }});
                    },function(error){
                    });
                }
            }
        ];
        return headerActionConfig;
    }

    this.tagIdFormatter = function(value, dc) {
        var getId = getValueByJsonPath(dc, 'tag_id', 0);
        var hexId = getId.toString(16);
        return hexId;
    };
    this.detailsVirtualNetworkFormatter = function(value, dc) {
        return virtualNetworkFormatter(null, null, null, value, dc, true);
    };
    this.detailsPortsFormatter = function(value, dc) {
        return portsFormatter(null, null, null, value, dc, true);
    };
    this.detailsOthersFormatter = function(value, dc) {
        return othersFormatter(null, null, null, value, dc, true);
    }
    function virtualNetworkFormatter(r, c, v, cd, dc, showAll){
        var returnString = '',refList = [];
        var vn = getValueByJsonPath(dc, 'virtual_network_back_refs', []);
        for(var j = 0; j < vn.length; j++){
            var to = vn[j].to;
            var name = to[to.length-1];
            var refText = '<span>'+ name +'</span>';
            refList.push(refText);
        }
        
        if(refList.length > 0){
            if ((null != showAll) && (true == showAll)) {
                for (var q = 0; q < refList.length; q++) {
                    if (typeof refList[q] !== "undefined") {
                        returnString += refList[q] + "<br>";
                    }
                }
                return returnString;
            }
            for(var l = 0; l< refList.length,l < 2; l++){
                if(refList[l]) {
                    returnString += refList[l] + "<br>";
                }
            }
            if (refList.length > 2) {
                returnString += '<span class="moredataText">(' +
                    (refList.length-2) + ' more)</span> \
                    <span class="moredata" style="display:none;" ></span>';
            }
        }else{
            returnString = '-';
        }
        return  returnString;
    };
    function portsFormatter(r, c, v, cd, dc, showAll){
        var returnString = '',refList = [];
        var vmi = getValueByJsonPath(dc, 'virtual_machine_interface_back_refs', []);
        for(var j = 0; j < vmi.length; j++){
            var to = vmi[j].to;
            var name = to[to.length-1];
            var refText = '<span>'+ name +'</span>';
            refList.push(refText);
        }
        
        if(refList.length > 0){
            if ((null != showAll) && (true == showAll)) {
                for (var q = 0; q < refList.length; q++) {
                    if (typeof refList[q] !== "undefined") {
                        returnString += refList[q] + "<br>";
                    }
                }
                return returnString;
            }
            for(var l = 0; l< refList.length,l < 2; l++){
                if(refList[l]) {
                    returnString += refList[l] + "<br>";
                }
            }
            if (refList.length > 2) {
                returnString += '<span class="moredataText">(' +
                    (refList.length-2) + ' more)</span> \
                    <span class="moredata" style="display:none;" ></span>';
            }
        }else{
            returnString = '-';
        }
        return  returnString;
    };
    function othersFormatter(r, c, v, cd, dc, showAll){
        var returnString = '',refList = [];
        var rowObj = dc;
        for(var j in rowObj){
            if(j !== 'virtual_machine_interface_back_refs' && j !== 'virtual_network_back_refs'){
                if(j.substring(j.length-5,j.length) === '_refs'){
                   var nameList = [];
                   for(var k = 0; k < rowObj[j].length; k++){
                       var to = rowObj[j][k].to;
                       var name = to[to.length-1];
                       nameList.push(name);
                   }
                   refText = '<span>'+ nameList.join(',') +'</span>';
                   refList.push(refText);
                }
            }
        }
        if(refList.length > 0){
            if ((null != showAll) && (true == showAll)) {
                for (var q = 0; q < refList.length; q++) {
                    if (typeof refList[q] !== "undefined") {
                        returnString += refList[q] + "<br>";
                    }
                }
                return returnString;
            }
            for(var l = 0; l< refList.length,l < 2; l++){
                if(refList[l]) {
                    returnString += refList[l] + "<br>";
                }
            }
            if (refList.length > 2) {
                returnString += '<span class="moredataText">(' +
                    (refList.length-2) + ' more)</span> \
                    <span class="moredata" style="display:none;" ></span>';
            }
        }else{
            returnString = '-';
        }
        return  returnString;
    };
   return tagGridView;
});

