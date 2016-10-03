/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone',
    'contrail-list-model',
    'knockback',
    'contrail-view',
], function (_, Backbone, ContrailListModel, Knockback, ContrailView) {
    var prefixId = ctwc.ALARM_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        editTemplate = contrail.getTemplate4Id(cowc.TMPL_GENERIC_EDIT_FORM);

    var configAlarmRuleEditView = ContrailView.extend({
        modalElementId: '#' + modalId,
        renderAddEditRule: function (options) {
            var editLayout = editTemplate(
                {modalId: modalId, prefixId: prefixId}),
                self = this;
            var footer = [];
            footer.push({
                id: 'cancelBtn',
                title: 'Cancel',
                onclick: function () {
                    Knockback.release(self.model, document.getElementById(modalId));
                    kbValidation.unbind(self);
                    $("#" + modalId).modal('hide');
                },
                onKeyupEsc: true
            });
            footer.push({
                className: 'btn-primary btnSave',
                title: (options['btnName']) ? options['btnName'] : 'Save',
                onclick: function () {
                    self.model.configRule(options,
                        {
                            init: function () {
                                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID,
                                    false);
                                cowu.enableModalLoading(modalId);
                            },
                            success: function () {
                                options['callback']();
                                $("#" + modalId).modal('hide');
                            },
                            error: function (error) {
                                cowu.disableModalLoading(modalId, function () {
                                    self.model.showErrorAttr(
                                        prefixId + cowc.FORM_SUFFIX_ID,
                                        error.responseText);
                                });
                            }
                        });
                }
            });
            cowu.createModal(
                {
                    'modalId': modalId,
                    className: 'modal-980',
                    'title': options['title'],
                    'body': editLayout,
                    'footer': footer
                });

            self.renderView4Config(
                $("#" + modalId).find("#" + modalId + "-form"), self.model,
                    getConfigureViewConfig(options), 'configAlarmValidations', null, null, function () {
                    self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                    Knockback.applyBindings(self.model, document.getElementById(modalId));
                    var orRuleCollection = self.model.model().attributes.orRules,
                        orRuleModels = orRuleCollection.toJSON();

                    kbValidation.bind(self, {collection: orRuleCollection});
                    for (var i = 0; i < orRuleModels.length; i++) {
                        kbValidation.bind(self, {collection: orRuleModels[i].model().attributes['andRules']});
                    }
                    //permissions
                    ctwu.bindPermissionsValidation(self);

                }, null, true);
            return;
        },
    });

    var getConfigureViewConfig = function(options) {
        var isDisable = options['mode'] == ctwl.EDIT_ACTION ? true : false;
        var isProject = options.isProject;
        return {
            elementId: cowu.formatElementId(
                    [prefixId, ctwl.TITLE_EDIT_ALARM_RULE]),
                view: "SectionView",
                title: "Model & View Config",
                viewConfig: {
                    rows: [{
                        columns: [{
                            elementId: 'table_name',
                            view: "FormDropdownView",
                            viewConfig: {
                                class: "col-xs-6",
                                path: 'table_name',
                                label: "Table",
                                dataBindValue: 'table_name',
                                elementConfig: {
                                    placeholder: "Select STAT Table",
                                    dataTextField: "name",
                                    dataValueField: "name",
                                    dataSource : {
                                        type: 'remote',
                                        url: '/api/qe/table/column/values',
                                        requestType: 'POST',
                                        postData:JSON.stringify({ 
                                            "fromTimeUTC": Date.now() - (2 * 60 * 60 * 1000),
                                            "toTimeUTC": Date.now(),
                                            "table_name": "StatTable.FieldNames.fields",
                                            "select":["name","fields.value"],
                                            "where":[[{"name":"name","value":"STAT","op":7}]]
                                        }),
                                        parse: function(resultJSON) {
                                            var resultArr = [];
                                            $.each(resultJSON.data, function(dataKey, dataValue) {
                                                var nameOption = getValueByJsonPath(dataValue,'name', '').split(':')[1];
                                                resultArr.push(nameOption);
                                            });
                                        }
                                    }
                                }
                            }
                        },{
                            elementId: 'table_columns',
                            view: "FormDropdownView",
                            viewConfig: {
                                class: "col-xs-6",
                                path: 'table_columns',
                                label: "Columns",
                                dataBindValue: 'table_columns',
                                elementConfig: {
                                    placeholder: "Select Columns",
                                    dataTextField : "text",
                                    dataValueField : "value",
                                    dataSource : {
                                        type: 'remote',
                                        url: '/api/qe/table/column/values',
                                        requestType: 'POST',
                                        postData:JSON.stringify({ 
                                            "fromTimeUTC": Date.now() - (2 * 60 * 60 * 1000),
                                            "toTimeUTC": Date.now(),
                                            "table_name": "StatTable.FieldNames.fields",
                                            "select":["name","fields.value"],
                                            "where":[[{"name":"name","value":"STAT","op":7}]]
                                        }),
                                        parse: function(resultJSON) {
                                            var resultArr = [];
                                            $.each(resultJSON.data, function(dataKey, dataValue) {
                                                var nameOption = getValueByJsonPath(dataValue,'name', '').split(':')[1];
                                                resultArr.push(nameOption);
                                            });
                                        }
                                    }
                                }
                            }
                        }]
                    }]
                }
            }
    }
    return configAlarmRuleEditView;
});
