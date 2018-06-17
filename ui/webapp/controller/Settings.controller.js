sap.ui.define([
	"at/legath/ui5_speedtest/controller/BaseController",
	"at/legath/ui5_speedtest/models/ModelController",
	"sap/m/MessageToast"
], function(BaseController, ModelController, MessageToast) {
	"use strict";

	return BaseController.extend("at.legath.ui5_speedtest.controller.Settings", {

		onInit: function() {
			this.getRouter().getRoute("settings").attachMatched(this.onRouteMatched.bind(this));

			this.getView().setModel(ModelController.getConfigModel(), "config");
			this.getView().setModel(ModelController.getListServersModel(), "listservers");
		},

		onRouteMatched: function(oEvent) {
			ModelController.refreshConfigModel();
			ModelController.refreshListServersModel();
		},

		onNavButtonPress: function() {
			this.navToHome();
		},

		onSavePress: function() {
			if (this.validate()) {
				this.getView().getModel("config").setProperty("/lastmodified", moment().format('MMMM Do YYYY, h:mm:ss a'));
				this.getView().getModel("config").setProperty("/speedtestserver", this.getView().byId("serverlist").getSelectedItem().getBindingContext(
					"listservers").getObject().id);

				ModelController.saveConfig(JSON.stringify(this.getView().getModel("config").getProperty("/")));

				this.navToHome();
			}
		},

		validate: function() {
			var oSelectedItem = this.getView().byId("serverlist").getSelectedItem();
			if (!oSelectedItem) {
				MessageToast.show(this.getI18nText("SelectServer"));
				return false;
			}

			return true;
		}

	});
});