/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'config/infra/globalconfig/ui/js/models/userDefinedCountersCollectionModel',
    'config/infra/globalconfig/ui/js/views/userDefinedCountersEditView',
    'config/infra/globalconfig/ui/js/globalConfigFormatters'
], function (_, ContrailView, UserDefinedCountersCollectionModel, 
        UserDefindCountersEditView,GlobalConfigFormatters) {
   var userDefinedCountersEditView = new  UserDefindCountersEditView(),
        globalConfigFormatters = new GlobalConfigFormatters(),
        gridElId = "#userdefinedcounters";

    var userDefinedCountersGridView = ContrailView.extend({
        el: $(contentContainer),
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'];
            self.renderView4Config(self.$el, self.model,
                                   getuserDefinedCountersViewConfig(pagerOptions));
        }
    });

    var getuserDefinedCountersViewConfig = function (pagerOptions) {
        return {
            elementId: "user_defined_counters_listview_id",
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: "userdefinedcounters",
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getConfiguration(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        };
    };

    var getConfiguration = function (pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: "Counters"
                },
                advanceControls: getHeaderActionConfig(),
            },
            body: {
                options: {
                    checkboxSelectable: {
                        onNothingChecked: function(e){
                            $('#btnDeleteRBAC').addClass('disabled-link');
                        },
                        onSomethingChecked: function(e){
                            $('#btnDeleteRBAC').
                                removeClass('disabled-link');
                        }
                    },
                    actionCell: getRowActionConfig(),
                    detail: false,
                },
                dataSource: {
                },
                statusMessages: {
                    loading: {
                        text: 'Loading User Defined Counters..'
                    },
                    empty: {
                        text: 'No User Defined Counters Found.'
                    },
                    errorGettingData: {
                        type: 'error',
                        iconClasses: 'icon-warning',
                        text: 'Error in getting Flow Aging.'
                    }
                }
            },
            columnHeader: {
                columns: userDefinedCounterOptionsColumns
            },
            footer: false
        };
        return gridElementConfig;
    };
   
    function getRowActionConfig() {
        var rowActionConfig = [
            ctwgc.getEditAction(function (rowIndex) {
                var gridObj = $(gridElId).data('contrailGrid'),
                    gridData = gridObj._dataView.getItems(),
                    dataItem = gridObj._dataView.getItem(rowIndex),
                    userDefinedCountersCollectionModel = new UserDefinedCountersCollectionModel(dataItem),
                    checkedRow = dataItem,
                    title =
                        "Edit Counter";
                userDefinedCountersEditView.model = userDefinedCountersCollectionModel;
                userDefinedCountersEditView.renderEditUserDefinedCounter(
                    {
                        "title": title, 
                        checkedRow: checkedRow,
                        callback: function () {
                            gridObj._dataView.refreshData();
                        },
                        mode : ctwl.EDIT_ACTION,
                        gridData: gridData,
                        rowIndex: rowIndex,
                        disabled:true
                    }
                );
            }, "Edit"),
            ctwgc.getDeleteAction(function (rowIndex) {
              var gridObj = $(gridElId).data('contrailGrid'),
                  gridData = gridObj._dataView.getItems(),
                  dataItem = gridObj._dataView.getItem(rowIndex),
                  userDefinedCountersCollectionModel = new UserDefinedCountersCollectionModel(),
                  checkedRow = [dataItem];
                  userDefinedCountersEditView.model = userDefinedCountersCollectionModel;
                  userDefinedCountersEditView.renderDeleteCounters(
                  {"title": "Delete Counter",
                      checkedRows: checkedRow,
                      callback: function () {
                          gridObj._dataView.refreshData();
                      },
                      gridData: gridData,
                      //configData: rbacUtils.getConfigData(viewConfig),
                      rowIndexes: [rowIndex],
                  }
              );
        })];
        return rowActionConfig;
    };
    
    var userDefinedCounterOptionsColumns = [
        {
            field: 'name',
            name: 'Name',
            sortable: true
        },
        {
            field: 'pattern',
            name: 'Pattern',
            sortable: true
        },
    ];

    function getHeaderActionConfig() {
        var headerActionConfig = [
            {
                "type": "link",
                "title": "Create Counters",
                "iconClass": 'icon-plus',
                "onClick": function() {
                    var gridObj = $(gridElId).data('contrailGrid'),
                        userDefinedCountersCollectionModel = new UserDefinedCountersCollectionModel();

                    userDefinedCountersEditView.model = userDefinedCountersCollectionModel;
                    userDefinedCountersEditView.renderEditUserDefinedCounter(
                        {
                            "title": 'Add Counter', 
                            callback: function () {
                                gridObj._dataView.refreshData();
                            },
//                            mode : ctwl.EDIT_ACTION,
                            disabled: false
                        }
                    );
                }
            }
        ];
        return headerActionConfig;
    }

   return userDefinedCountersGridView;
});

