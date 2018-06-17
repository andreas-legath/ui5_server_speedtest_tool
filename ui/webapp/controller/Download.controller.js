sap.ui.define([
	"at/legath/ui5_speedtest/controller/MeasureDisplayBaseController",
	"at/legath/ui5_speedtest/models/ModelController"
], function(MeasureDisplayBaseController, ModelController) {
	"use strict";

	return MeasureDisplayBaseController.extend("at.legath.ui5_speedtest.controller.Download", {

		onInit: function() {
			MeasureDisplayBaseController.prototype.onInit.apply(this, arguments);

			this.getRouter().getRoute("download").attachMatched(this.onRouteMatched.bind(this));
		},

		onRouteMatched: function() {
			MeasureDisplayBaseController.prototype.onRouteMatched.apply(this, arguments);
		},

		onIntervalToAnalyseChange: function() {
			var sRequestType = "download";
			var iFromTimestamp = Math.round(this.getView().byId("intervalToAnalyseDateRangeSelection").getDateValue().getTime() / 1000);
			var iToTimestamp = Math.round(this.getView().byId("intervalToAnalyseDateRangeSelection").getSecondDateValue().getTime() / 1000);

			ModelController.refreshMeasureDataModel(iFromTimestamp, iToTimestamp, sRequestType);
			this.drawChart("measuredata>/download/data", "{measuredata>datetime}", "{measuredata>value}");
		}
	});
});