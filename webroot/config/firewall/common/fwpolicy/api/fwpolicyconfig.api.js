/*
 * Copyright (c) 2017 Juniper Networks, Inc. All rights reserved.
 */

 /**
 * @fwpolicyconfig.api.js
 *     - Handlers for firewall policy and rules
 *     - Interfaces with config api server
 */
var rest        = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/common/rest.api');
var async       = require('async');
var logutils    = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/utils/log.utils');
var commonUtils = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/utils/common.utils');
var messages    = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/common/messages');
var global      = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/common/global');
var appErrors   = require(process.mainModule.exports["corePath"] +
                          '/src/serverroot/errors/app.errors');
var util        = require('util');
var url         = require('url');
var configApiServer = require(process.mainModule.exports["corePath"] +
                              '/src/serverroot/common/configServer.api');
var _ = require('underscore');


function createFirewallRules (request, response, appData)
{
    var fwPolicyId = commonUtils.getValueByJsonPath(request,
            'body;fwPolicyId', ''),
        rulesReqArray = commonUtils.getValueByJsonPath(request,
                'body;firewall-rules', []),
        dataObjArray = [], rulesSequenceMap = {};
        _.each(rulesReqArray, function(rule) {
            if('firewall-rule' in rule) {
                var ruleDetails = rule['firewall-rule'];
                rulesSequenceMap[ruleDetails.fq_name.join(":")] =
                    ruleDetails.sequence;
                commonUtils.createReqObj(dataObjArray, '/firewall-rules',
                        global.HTTP_REQUEST_POST,
                        commonUtils.cloneObj(rule), null, null, appData);
            }
        });
        if(dataObjArray.length === 0) {
            commonUtils.handleJSONResponse(null, response, null);
            return;
        }
        async.map(dataObjArray,
            commonUtils.getServerResponseByRestApi(configApiServer, false),
            function (error, fwRules) {
            if(error) {
                commonUtils.handleJSONResponse(error, response, null);
                return;
            }
            updateFirewallRuleRefs(fwPolicyId, fwRules, appData,  rulesSequenceMap,
                function(fwError, fwRulesRes) {
                commonUtils.handleJSONResponse(fwError, response, fwRulesRes);
            });
        });
}

function updateFirewallRuleRefs (fwPolicyId, fwRules, appData, rulesSequenceMap, callback)
{
    var dataObjArr = [];
    _.each(fwRules, function(rule, i) {
        var ruleDetails = commonUtils.getValueByJsonPath(rule, 'firewall-rule', {}, false);
        var putData = {
                'type': 'firewall-policy',
                'uuid': fwPolicyId,
                'ref-type': 'firewall-rule',
                'ref-uuid': ruleDetails['uuid'],
                'ref-fq-name': ruleDetails['fq_name'],
                'operation': 'ADD',
                'attr': {'sequence' :
                    rulesSequenceMap[ruleDetails['fq_name'].join(":")].toString()}
            };
            var reqUrl = '/ref-update';
            commonUtils.createReqObj(dataObjArr, reqUrl,
                                     global.HTTP_REQUEST_POST,
                                     commonUtils.cloneObj(putData), null,
                                     null, appData);
    });
    if(dataObjArr.length === 0) {
        callback(null. null);
    }
    async.map(dataObjArr,
            commonUtils.getServerResponseByRestApi(configApiServer, false),
            function (error, fwRulesRes){
            callback(error, fwRulesRes);
    })
}

exports.createFirewallRules = createFirewallRules;