/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/*
 * vRouter Details tab
 */
monitorInfraComputeDetailsClass = (function() {
    this.populateDetailsTab = function (obj) {
        var nodeIp; 
        if(obj.detailView === undefined) {
            layoutHandler.setURLHashParams({tab:'',node: obj['name']},{triggerHashChange:false});
        }    
        //showProgressMask('#computenode-dashboard', true);
        startWidgetLoading('vrouter-sparklines' + '_' + obj.name);
        toggleWidgetsVisibility(['vrouter-chart' + '_' + obj.name + '-box'], ['system-chart' + '_' + obj.name + '-box']);

        var dashboardTemplate = contrail.getTemplate4Id('dashboard-template');
        computenodeDashboard =  $('#computenode-dashboard' + '_' + obj['name']);
        computenodeDashboard.html(dashboardTemplate({title:'vRouter',colCount:2,showSettings:true, widgetBoxId:'dashboard' + '_' + obj.name, name:obj.name}));
        startWidgetLoading('dashboard'+ '_' + obj.name);   

        $.ajax({
            url: contrail.format(monitorInfraUrls['VROUTER_DETAILS'], obj['name'])
        }).done(function (result) {
                    computeNodeData = result;
                    var parsedData = infraMonitorUtils.parsevRoutersDashboardData([{name:obj['name'],value:result,detailView:true}])[0];
                    var noDataStr = '--',
                    cpu = "N/A",
                    memory = "N/A",
                    computeNodeDashboardInfo, oneMinCPU, fiveMinCPU, fifteenMinCPU,
                    usedMemory, totalMemory;
                // var chartWidths3 = $('#vrouter-detail-charts').width();
                //var cwd1 = (parseInt(chartWidths3));
                //var cwd = cwd1/3;
                var parentWidth = parseInt(computenodeDashboard.width());
                var chartWdth = parentWidth/2;
                var endTime, startTime;
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
                    $('#vrouter-sparklines' + '_' + obj.name).initMemCPUSparkLines(result, 'parseMemCPUData4SparkLines', {'VrouterStatsAgent':[{name: 'cpu_share', color: 'blue-sparkline'}, {name: 'virt_mem', color: 'green-sparkline'}]}, slConfig);
                    $('#system-sparklines' + '_' + obj.name).initMemCPUSparkLines(result, 'parseMemCPUData4SparkLines', {'VrouterStatsAgent':[{name: 'one_min_avg_cpuload', color: 'blue-sparkline'}, {name: 'used_sys_mem', color: 'green-sparkline'}]}, slConfig);
                    endWidgetLoading('vrouter-sparklines' + '_' + obj.name);
                    $('#vrouter-chart' + '_' + obj.name).initMemCPULineChart($.extend({url:function() {
                        return contrail.format(monitorInfraUrls['FLOWSERIES_CPU'], 'vRouterAgent', '30', '10', obj['name'], endTime);
                    }, parser: "parseProcessMemCPUData", plotOnLoad: true, showWidgetIds: ['vrouter-chart' + '_' + obj.name + '-box'], hideWidgetIds: ['system-chart' + '_' + obj.name + '-box'], titles: {memTitle:'Memory',cpuTitle:'% CPU Utilization'}}), 110);
                    $('#system-chart' + '_' + obj.name).initMemCPULineChart($.extend({url:function() {
                        return  contrail.format(monitorInfraUrls['FLOWSERIES_CPU'], 'vRouterAgent', '30', '10', obj['name'], endTime);
                    }, parser: "parseSystemMemCPUData", plotOnLoad: false, showWidgetIds: ['system-chart' + '_' + obj.name + '-box'], hideWidgetIds: ['vrouter-chart' + '_' + obj.name + '-box'], titles: {memTitle:'Memory',cpuTitle:'Avg CPU Load'}}),110);
                });
                var procStateList, overallStatus = noDataStr;
                var vRouterProcessStatusList = [];
                var statusTemplate = contrail.getTemplate4Id("statusTemplate");
                computeNodeDashboardInfo = getvRouterDetailsLblValuePairs(parsedData);
                var cores=getCores(computeNodeData);
                for(var i=0;i<cores.length;i++)
                    computeNodeDashboardInfo.push(cores[i]);
                //showProgressMask('#computenode-dashboard');
                var dashboardBodyTemplate = Handlebars.compile($("#dashboard-body-template").html());
                $('#computenode-dashboard' + '_' + obj.name + ' .widget-body').html(dashboardBodyTemplate({colCount:2, d:computeNodeDashboardInfo, nodeData:computeNodeData, showSettings:true, ip:nodeIp, name:obj.name}));
                /*Selenium Testing*/
                cmptNodeDetailsData = computeNodeDashboardInfo;
                /*End of Selenium Testing*/
                var ipList = getVrouterIpAddressList(computeNodeData);
                var ipDeferredObj = $.Deferred();
                getReachableIp(ipList,"8085",ipDeferredObj);
                ipDeferredObj.done(function(nodeIp){
                    if(nodeIp != null && nodeIp != noDataStr) {  
                        $('#linkIntrospect' + '_' + obj.name).unbind('click');
                        $('#linkIntrospect' + '_' + obj.name).click(function(){
                            window.open('/proxy?proxyURL=http://'+nodeIp+':8085&indexPage', '_blank');
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
                initWidget4Id('#dashboard' + '_' + obj.name + '-box');
                initWidget4Id('#vrouter-chart' + '_' + obj.name + '-box');
                initWidget4Id('system-chart' + '_' + obj.name + '-box');

                endWidgetLoading('dashboard'+ '_' + obj.name);
            }).fail(displayAjaxError.bind(null, computenodeDashboard));
    };
    return {populateDetailsTab:populateDetailsTab};
})();

function getVrouterIpAddressList(data){
    var controlIp = getValueByJsonPath(data,'VrouterAgent;control_ip',noDataStr);
    var ips = getValueByJsonPath(data,'VrouterAgent;self_ip_list',[]);
    var configip = getValueByJsonPath(data,'ConfigData;virtual-router;virtual_router_ip_address');
    var ipList = [];
    if(controlIp != noDataStr){
        ipList.push(controlIp);
    }
    if(ips.length > 0){
        $.each(ips,function(idx,obj){
            if(obj != null && ipList.indexOf(obj) == -1){
                ipList.push(obj);
            }
        });
    }
    if(configip != null && ipList.indexOf(configip) == -1){
        ipList.push(configip);
    }
    return ipList;
}