sap.ui.define([
	"at/legath/ui5_speedtest/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("at.legath.ui5_speedtest.controller.Install", {
		
		onNavButtonPress : function() {
			this.navToHome();
		},
		
		onDownloadUI5SpeedtestPress : function() {
			window.location = "../../ui5_speedtest.zip";
		}
	});
});