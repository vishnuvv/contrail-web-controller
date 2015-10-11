define([
    'underscore',
    'backbone',
    'knockout',
    'contrail-model'
], function (_, Backbone, Knockout, ContrailModel) {
    var UnderlayDetailsModel = ContrailModel.extend({
        defaultConfig: {
            
        }
    });
    return UnderlayDetailsModel;
});