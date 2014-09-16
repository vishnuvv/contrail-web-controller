/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/*
 * Config Node Details Page
 */
monitorInfraConfigDetailsClass = (function() {
    this.populateDetailsTab = function (obj) {
        var endTime = getCurrentTime4MemCPUCharts(), startTime = endTime - 600000;
        var slConfig = {startTime: startTime, endTime: endTime};
        var nodeIp,iplist;
        //Compute the label/value pairs to be displayed in dashboard pane
        //As details tab is the default tab,don't update the tab state in URL
        if(obj.detailView === undefined) {
            layoutHandler.setURLHashParams({tab:'', node:obj['name']},{triggerHashChange:false});
        }    
        startWidgetLoading('config-sparklines' + '_' + obj.name);
        toggleWidgetsVisibility(['apiServer-chart' + '_' + obj.name + '-box'], ['serviceMonitor-chart' + '_' + obj.name + '-box', 'schema-chart' + '_' + obj.name + '-box']);
        var dashboardTemplate = contrail.getTemplate4Id('dashboard-template');
        $('#confignode-dashboard' + '_' + obj.name).html(dashboardTemplate({title:'Configuration Node',colCount:2, showSettings:true, widgetBoxId:'dashboard' + '_' + obj.name, name:obj.name}));
        startWidgetLoading('dashboard' + '_' + obj.name);
        $.ajax({
            url: contrail.format(monitorInfraUrls['CONFIG_DETAILS'] , obj['name'])
        }).done(function (result) {
                var noDataStr = "--";
                $.ajax({
                    url: '/api/service/networking/web-server-info'
                }).done(function (resultJSON) {
                    endTime = resultJSON['serverUTCTime'];
                }).fail(function() {
                    endTime = getCurrentTime4MemCPUCharts();
                }).always(function() {
                    var slConfig;
                    startTime = endTime - 600000;
                    slConfig = {startTime: startTime, endTime: endTime};
                    $('#apiServer-sparklines' + '_' + obj.name).initMemCPUSparkLines(result.configNode, 'parseMemCPUData4SparkLines', {'ModuleCpuState': [
                        {name: 'api_server_cpu_share', color: 'blue-sparkline'},
                        {name: 'api_server_mem_virt', color: 'green-sparkline'}
                    ]}, slConfig);
                    $('#serviceMonitor-sparklines' + '_' + obj.name).initMemCPUSparkLines(result.configNode, 'parseMemCPUData4SparkLines', {'ModuleCpuState': [
                        {name: 'service_monitor_cpu_share', color: 'blue-sparkline'},
                        {name: 'service_monitor_mem_virt', color: 'green-sparkline'}
                    ]}, slConfig);
                    $('#schema-sparklines' + '_' + obj.name).initMemCPUSparkLines(result.configNode, 'parseMemCPUData4SparkLines', {'ModuleCpuState': [
                        {name: 'schema_xmer_cpu_share', color: 'blue-sparkline'},
                        {name: 'schema_xmer_mem_virt', color: 'green-sparkline'}
                    ]}, slConfig);
                    endWidgetLoading('config-sparklines' + '_' + obj.name);
                    $('#apiServer-chart' + '_' + obj.name).initMemCPULineChart($.extend({url:function() {
                        return contrail.format(monitorInfraUrls['FLOWSERIES_CPU'], 'ApiServer', '30', '10', obj['name'], endTime);
                    }, parser: "parseProcessMemCPUData", parser: "parseProcessMemCPUData", plotOnLoad: true, showWidgetIds: ['apiServer-chart' + '_' + obj.name + '-box'], hideWidgetIds: ['serviceMonitor-chart' + '_' + obj.name + '-box', 'schema-chart' + '_' + obj.name + '-box'], titles: {memTitle:'Memory',cpuTitle:'% CPU Utilization'}}),110);
                    $('#serviceMonitor-chart' + '_' + obj.name).initMemCPULineChart($.extend({url:function() {
                        return contrail.format(monitorInfraUrls['FLOWSERIES_CPU'], 'ServiceMonitor', '30', '10', obj['name'], endTime);
                    }, parser: "parseProcessMemCPUData", plotOnLoad: false, showWidgetIds: ['serviceMonitor-chart' + '_' + obj.name + '-box'], hideWidgetIds: ['apiServer-chart' + '_' + obj.name + '-box', 'schema-chart' + '_' + obj.name + '-box'], titles: {memTitle:'Memory',cpuTitle:'% CPU Utilization'}}),110);
                    $('#schema-chart' + '_' + obj.name).initMemCPULineChart($.extend({url:function() {
                        return contrail.format(monitorInfraUrls['FLOWSERIES_CPU'], 'Schema', '30', '10', obj['name'], endTime);
                    }, parser: "parseProcessMemCPUData", plotOnLoad: false, showWidgetIds: ['schema-chart' + '_' + obj.name + '-box'], hideWidgetIds: ['apiServer-chart' + '_' + obj.name + '-box', 'serviceMonitor-chart' + '_' + obj.name + '-box'], titles: {memTitle:'Memory',cpuTitle:'% CPU Utilization'}}),110);
                });
                confNodeData = result;
                var parsedData = infraMonitorUtils.parseConfigNodesDashboardData([{name:obj['name'],value:confNodeData}])[0];
                var cpu = "N/A",
                    memory = "N/A",
                    confNodeDashboardInfo, oneMinCPU, fiveMinCPU, fifteenMinCPU,
                    usedMemory, totalMemory;
                
                var statusTemplate = contrail.getTemplate4Id("statusTemplate");
                confNodeDashboardInfo = getConfigNodeLblValuePairs(parsedData);
                /*Selenium Testing*/
                confNodeDetailsData = confNodeDashboardInfo;
                /*End of Selenium Testing*/                          
                var cores=getCores(confNodeData);
                for(var i=0;i<cores.length;i++)
                  confNodeDashboardInfo.push(cores[i]);
                //showProgressMask('#confignode-dashboard');
                var dashboardBodyTemplate = Handlebars.compile($("#dashboard-body-template").html());
                $('#confignode-dashboard' + '_' + obj.name + ' .widget-body').html(dashboardBodyTemplate({colCount:2, d:confNodeDashboardInfo, nodeData:confNodeData, showSettings:true, ip:nodeIp, name:obj.name}));
                var ipDeferredObj = $.Deferred();
                getReachableIp(iplist,"8084",ipDeferredObj);
                ipDeferredObj.done(function(nodeIp){
                   if(nodeIp != null && nodeIp != noDataStr) {
                     $('#linkIntrospect' + '_' + obj.name).unbind('click');
                       $('#linkIntrospect' + '_' + obj.name).click(function(){
                           window.open('/proxy?proxyURL=http://'+nodeIp+':8084&indexPage', '_blank');
                       });
                       $('#linkStatus' + '_' + obj.name).unbind('click');
                       $('#linkStatus' + '_' + obj.name).on('click', function(){
                           showStatus({ip : nodeIp, name : obj.name});
                       });
                       $('#linkLogs' + '_' + obj.name).unbind('click');
                       $('#linkLogs' + '_' + obj.name).on('click', function(){
                           showLogs(nodeIp);
                       });
                   }
                });
            
                endWidgetLoading('dashboard' + '_' + obj.name);
                initWidget4Id('#apiServer-chart' + '_' + obj.name + '-box');
                initWidget4Id('#serviceMonitor-chart' + '_' + obj.name + '-box');
                initWidget4Id('#schema-chart' + '_' + obj.name + '-box');
            }).fail(displayAjaxError.bind(null, $('#confignode-dashboard' + '_' + obj.name)));
    }
    return {populateDetailsTab:populateDetailsTab};
})();

function getStatusesForAllConfigProcesses(processStateList){
    var ret = [];
    if(processStateList != null){
       for(var i=0; i < processStateList.length; i++){
          var currProc = processStateList[i];
          if(currProc.process_name == "contrail-discovery:0"){
             ret['contrail-discovery'] = getProcessUpTime(currProc);
          } else if(currProc.process_name == "contrail-discovery"){
             ret['contrail-discovery'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == "contrail-api:0"){
             ret['contrail-api'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == "contrail-api"){
             ret['contrail-api'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == "contrail-config-nodemgr"){
             ret['contrail-config-nodemgr'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == "contrail-svc-monitor"){
             ret['contrail-svc-monitor'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == "ifmap"){
             ret['ifmap'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == "contrail-schema"){
             ret['contrail-schema'] = getProcessUpTime(currProc);
          } else if (currProc.process_name == 'contrail-zookeeper') {
                 ret['contrail-zookeeper'] = getProcessUpTime(currProc);
             }
       }
    }
    return ret;
 }