/**
 * This file should contain the functions common to the features of controller package 
 * 
 */

//Bucketization Options
var defaultBucketize = true;
//Maximum upto which the chart data should be bucketized
var defaultMaxBucketizeLevel = 3; 
//Determines what param will be used to depict the size of the bubble in infra charts
var defaultBucketSizeParam = "size"; 
//Determines how many buckets need to created per axis. If 7 creates 7 x 7 = 49 buckets and groups the nodes
var defaultBucketsPerAxis = 7;
//Cookie name to be used to store the settings for bucketization
var DO_BUCKETIZE_COOKIE = 'doBucketize';
//Cookie name to be used to store the settings for MaxBucketizeLevel
var BUCKETIZE_LEVEL_COOKIE = 'bucketizeLevel';
//Cookie name to be used to store the settings for BucketsPerAxis
var BUCKETS_PER_AXIS_COOKIE = 'bucketsPerAxis';

/*
 * This function accepts the ip and checks whether it is IPV4 or IPV6 and returns the label value html content 
 * for the IP
 */
function getLabelValueForIP(ip) {
    var lbl = 'IPv4';
    var value = ip;
    if(ip != null && isIPv6(ip)) {
        lbl = 'IPv6';
        value = new v6.Address(ip).correctForm();
    }
    return wrapLabelValue(lbl,value);
}