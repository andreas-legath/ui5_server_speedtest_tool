sap.ui.define([
	"at/legath/ui5_speedtest/controller/BaseController",
	"at/legath/ui5_speedtest/models/ModelController"
], function(BaseController, ModelController) {
	"use strict";

	return BaseController.extend("at.legath.ui5_speedtest.controller.Home", {

		onInit: function() {
			this.getRouter().getRoute("home").attachMatched(this.onRouteMatched.bind(this));

			this.getView().setModel(ModelController.getLastMeasurementModel(), "lastmeasurement");
		},

		onRouteMatched: function() {
			ModelController.refreshLastMeasurementModel();
		},

		onSettingsPress: function() {
			this.navToSettings();
		},

		onPingPress: function() {
			this.navToPing();
		},

		onDownloadPress: function() {
			this.navToDownload();
		},

		onUploadPress: function() {
			this.navToUpload();
		},
		
		onManualSpeedtestPress : function() {
			this.getView().byId("manualSpeedtestBusyDialog").open();
			ModelController.manualSpeedtest(function() {
				ModelController.refreshLastMeasurementModel();
				this.getView().byId("manualSpeedtestBusyDialog").close();
			}.bind(this));
		},

		onDownloadInstallPress: function() {
			this.navToDownloadInstall();
		}
	});
});