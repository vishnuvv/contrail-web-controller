/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'config/firewall/common/fwpolicy/ui/js/fwPolicyFormatter'
], function(_, ContrailView, FWPolicyFormatter) {
    var self, gridElId = '#' + ctwc.FW_POLICY_GRID_ID, gridObj,
      fwPolicyFormatter = new FWPolicyFormatter();
    var fwPolicyGridView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            self = this;
            var viewConfig = self.attributes.viewConfig,
                pagerOptions = viewConfig['pagerOptions'];
            self.renderView4Config(self.$el, self.model,
                getFWPolicyGridViewConfig(viewConfig));
        }
    });


    function getFWPolicyGridViewConfig (viewConfig) {
        return {
            elementId:
                cowu.formatElementId(
                [ctwc.CONFIG_FW_POLICY_LIST_VIEW_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: ctwc.FW_POLICY_GRID_ID,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig:
                                        getConfiguration(viewConfig)
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function getConfiguration (viewConfig) {
        var gridElementConfig = {
            header: {
                title: {
                    text: ctwl.TITLE_FW_POLICY
                },
               advanceControls: []//getHeaderActionConfig(viewConfig)
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
                    actionCell: [],//getRowActionConfig(viewConfig),
                    detail: {
                        template:
                            cowu.generateDetailTemplateHTML(
                                    getFWPolicyExpDetailsTemplateConfig(),
                            cowc.APP_CONTRAIL_CONTROLLER)
                    }
                },
                dataSource: {
                },
                statusMessages: {
                    loading: {
                        text: 'Loading Firewall Policies..'
                    },
                    empty: {
                        text: 'No Firewall Policy Found.'
                    }
                }
            },
            columnHeader: { columns: fwPolicyColumns}
        };
        return gridElementConfig;
    };

    var fwPolicyColumns = [{
                              id: 'name',
                              field: 'name',
                              name: 'Policy Name',
                              cssClass :'cell-hyperlink-blue',
                              events : {
                                  onClick : function(e, dc) {
                                      var hashParams = null,
                                          hashObj = {
                                              view: "config_firewall_rules",
                                              focusedElement: {
                                                  policy: dc.name,
                                                  uuid: dc.uuid,
                                                  tab: 'config_firewall_rules'
                                              }
                                          };
                                      if (contrail.checkIfKeyExistInObject(true,
                                              hashParams,
                                              'clickedElement')) {
                                          hashObj.clickedElement =
                                              hashParams.clickedElement;
                                      }

                                      layoutHandler.setURLHashParams(hashObj, {
                                          p: "config_firewall_policies",
                                          merge: false,
                                          triggerHashChange: true
                                      });
                                  }
                              }
                           }, {
                               id: 'id_perms.description',
                               field: 'id_perms.description',
                               name: 'Description',
                               formatter: fwPolicyFormatter.policyDescriptionFormatter
                            }, {
                                id: 'application_policy_set_back_refs',
                                field: 'application_policy_set_back_refs',
                                name: 'Member Of',
                                formatter: fwPolicyFormatter.policySetFormatter
                             }, {
                               id: 'firewall_rule_refs',
                               field: 'firewall_rule_refs',
                               name: 'Number of Rules',
                               formatter:
                                   fwPolicyFormatter.fwRuleFormatter
                           }, {
                               id: 'id_perms.last_modified',
                               field: 'id_perms.last_modified',
                               name: 'Last Updated',
                               formatter: fwPolicyFormatter.lastUpdateFormatter
                           }];

    function getFWPolicyExpDetailsTemplateConfig() {
        return {
            templateGenerator: 'RowSectionTemplateGenerator',
            templateGeneratorConfig: {
                rows: [{
                    templateGenerator: 'ColumnSectionTemplateGenerator',
                    templateGeneratorConfig: {
                        columns: [{
                            class: 'col-xs-12',
                            rows: [{
                                keyClass:'col-xs-3',
                                valueClass:'col-xs-9',
                                title: 'Details',
                                templateGenerator: 'BlockListTemplateGenerator',
                                templateGeneratorConfig: [{
                                    key: 'name',
                                    templateGenerator: 'TextGenerator',
                                    label: 'Policy Name'
                                },{
                                    keyClass:'col-xs-3',
                                    valueClass:'col-xs-9',
                                    key: 'display_name',
                                    templateGenerator: 'TextGenerator',
                                    label: 'Policy Display Name'
                                },{
                                    keyClass:'col-xs-3',
                                    valueClass:'col-xs-9',
                                    key: "uuid",
                                    templateGenerator: "TextGenerator",
                                    label: "UUID"
                                },{
                                    keyClass:'col-xs-3',
                                    valueClass:'col-xs-9',
                                    key: "id_perms.description",
                                    templateGenerator: "TextGenerator",
                                    label: "Description",
                                    templateGeneratorConfig: {
                                        formatter: "policyDescriptionFormatter"
                                    }
                                },{
                                    keyClass:'col-xs-3',
                                    valueClass:'col-xs-9',
                                    key: "application_policy_set_back_refs",
                                    templateGenerator: "TextGenerator",
                                    label: "Meber Of",
                                    templateGeneratorConfig: {
                                        formatter: "policySetFormatter"
                                    }
                                },{
                                    keyClass:'col-xs-3',
                                    valueClass:'col-xs-9',
                                    key: "uuid",
                                    templateGenerator: "TextGenerator",
                                    label: "Number of Rules",
                                    templateGeneratorConfig: {
                                        formatter: "fwRuleFormatter"
                                    }
                                },{
                                    key: "id_perms.last_modified",
                                    templateGenerator: "TextGenerator",
                                    label: "Last Updated",
                                    templateGeneratorConfig: {
                                        formatter: "lastUpdateFormatter"
                                    }
                                }]
                           }]
                      }]
                    }
                }]
            }
        };
    };

    this.fwRuleFormatter = function(v, dc) {
        return fwPolicyFormatter.fwRuleFormatter("", "", v, "", dc);
    };

    this.policySetFormatter = function(v, dc) {
        return fwPolicyFormatter.policySetFormatter("", "", v, "", dc);
    };

    this.policyDescriptionFormatter = function(v, dc) {
        return fwPolicyFormatter.policyDescriptionFormatter("", "", v, "", dc);
    };

    this.lastUpdateFormatter = function(v, dc) {
        return fwPolicyFormatter.lastUpdateFormatter("", "", v, "", dc);
    };

    return fwPolicyGridView;
});

