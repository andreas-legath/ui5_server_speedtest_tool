sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";

	return {

		//_basePath : "https://legath-1.legath.at:8081/ui5_speedtest",
		_basePath : "../../",

		_configModel: null,
		_listserversModel: null,
		_lastmeasurementModel: null,
		_measuredataModel: null,

		getConfigModel: function() {
			if (!this._configModel) {
				this._configModel = new JSONModel();
			}
			return this._configModel;
		},
		refreshConfigModel: function() {
			if (this.getConfigModel()) {
				this.getConfigModel().loadData(this._basePath + "/rest/config.php");
			}
		},

		saveConfig: function(oConfig) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", this._basePath + "/rest/config.php", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(oConfig);
		},

		getListServersModel: function() {
			if (!this._listserversModel) {
				this._listserversModel = new JSONModel();
			}
			return this._listserversModel;
		},
		refreshListServersModel: function() {
			if (this.getListServersModel()) {
				this.getListServersModel().loadData(this._basePath + "/rest/listservers.php");
			}
		},

		getLastMeasurementModel: function() {
			if (!this._lastmeasurementModel) {
				this._lastmeasurementModel = new JSONModel();
			}
			return this._lastmeasurementModel;
		},
		refreshLastMeasurementModel: function() {
			if (this.getLastMeasurementModel()) {
				this.getLastMeasurementModel().loadData(this._basePath + "/rest/lastmeasurement.php");
			}
		},

		getMeasureDataModel: function() {
			if (!this._measuredataModel) {
				this._measuredataModel = new JSONModel();
			}
			return this._measuredataModel;
		},
		refreshMeasureDataModel: function(iFromTimestamp, iToTimestamp, sRequestType) {
			if (this.getMeasureDataModel()) {
				this.getMeasureDataModel().loadData(this._basePath + "/rest/measuredata.php?from=" + iFromTimestamp +
					"&to=" + iToTimestamp + "&request=" + sRequestType);
			}
		},

		manualSpeedtest: function(fnLoaded) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", this._basePath + "/speedtest/exec_speedtest.php", true);
			xhr.setRequestHeader("Content-Type", "application/json");
			if (fnLoaded) {
				xhr.addEventListener("loadend", fnLoaded);
			}
			xhr.send();
		}
	};

});