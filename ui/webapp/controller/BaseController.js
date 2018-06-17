sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("at.legath.ui5_speedtest.controller.BaseController", {

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		getI18nText: function(sKey) {
			return this.getView().getModel("i18n").getResourceBundle().getText(sKey);
		},

		navToHome: function() {
			this.getRouter().navTo("home");
		},

		navToSettings: function() {
			this.getRouter().navTo("settings");
		},

		navToPing: function() {
			this.getRouter().navTo("ping");
		},
		
		navToDownload: function() {
			this.getRouter().navTo("download");
		},
		
		navToUpload: function() {
			this.getRouter().navTo("upload");
		},

		navToDownloadInstall: function() {
			this.getRouter().navTo("install");
		}

	});
});