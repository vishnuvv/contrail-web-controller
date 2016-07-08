/*
 * Copyright (c) 2016 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'knockback'
], function (_, ContrailView, Knockback) {
    var gridElId = '#userDefinedCountersGridId',
        prefixId = ctwc.GLOBAL_COUNTERS_PREFIX_ID,
        modalId = 'configure-' + prefixId,
        formId = '#' + modalId + '-form';

    var userDefinedCountersEditView = ContrailView.extend({
        renderEditUserDefinedCounter: function(options) {
            var editTemplate =
                contrail.getTemplate4Id(ctwl.TMPL_CORE_GENERIC_EDIT),
                editLayout = editTemplate({prefixId: prefixId, modalId: modalId}),
                disabled = options.disabled,
                self = this;
            cowu.createModal({'modalId': modalId, 'className': 'modal-700',
                             'title': options['title'], 'body': editLayout,
                             'onSave': function () {
                self.model.editUserDefinedCounter({
                    init: function () {
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        //error.responseText="Please enter valid Name and Pattern"
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId +
                                                     cowc.FORM_SUFFIX_ID,
                                                     error.responseText);
                        });
                    }
                });
                // TODO: Release binding on successful configure
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});

            self.renderView4Config($("#" + modalId).find(formId),
                                   this.model,
                                   userDefinedCountersViewConfig(disabled),
                                   "userDefinedCounterValidation",
                                   null, null, function() {
                self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
                Knockback.applyBindings(self.model,
                                        document.getElementById(modalId));
                kbValidation.bind(self);
            });
        },
        
       
        renderDeleteCounters: function(options) {
            var delTemplate =
                contrail.getTemplate4Id('core-generic-delete-form-template');
            var self = this;

            var delLayout = delTemplate({prefixId: prefixId});
            cowu.createModal({'modalId': modalId, 'className': 'modal-480',
                             'title': options['title'], 'btnName': 'Confirm',
                             'body': delLayout,
               'onSave': function () {
                self.model.deleteUserDefinedCounters({
                    init: function () {
                        cowu.enableModalLoading(modalId);
                    },
                    success: function () {
                        options['callback']();
                        $("#" + modalId).modal('hide');
                    },
                    error: function (error) {
                        cowu.disableModalLoading(modalId, function () {
                            self.model.showErrorAttr(prefixId +
                                                     cowc.FORM_SUFFIX_ID,
                                                     error.responseText);
                        });
                    }
                }, options);
            }, 'onCancel': function () {
                Knockback.release(self.model, document.getElementById(modalId));
                kbValidation.unbind(self);
                $("#" + modalId).modal('hide');
            }});
            self.model.showErrorAttr(prefixId + cowc.FORM_SUFFIX_ID, false);
            Knockback.applyBindings(self.model,
                    document.getElementById(modalId));
            kbValidation.bind(self);
        }
    });


    var userDefinedCountersViewConfig = function (disabled) {

        return {
            elementId: ctwc.GLOBAL_USER_DEFINED_COUNTRER_PREFIX_ID,
            view: 'SectionView',
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: 'name',
                                name: 'Name',
                                view: 'FormInputView',
                                viewConfig: {
                                disabled:disabled,
                                    path: 'name',
                                    dataBindValue: 'name',
                                    placeholder: ''
                                }
                            },
                            {
                                elementId: 'pattern',
                                name: 'Pattern',
                                view: 'FormInputView',
                                viewConfig: {
                                    path: 'pattern',
                                    dataBindValue: 'pattern',
                                    placeholder: ''
                                }
                            }
                        ]
                    }
                ]
            }
        }
    }

    return userDefinedCountersEditView;
});

