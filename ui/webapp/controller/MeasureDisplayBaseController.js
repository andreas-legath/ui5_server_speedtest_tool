sap.ui.define([
	"at/legath/ui5_speedtest/controller/BaseController",
	"at/legath/ui5_speedtest/models/ModelController",
	"at/legath/ui5_speedtest/control/LineChart",
	"at/legath/ui5_speedtest/control/LineChartItem"
], function(BaseController, ModelController, LineChart, LineChartItem) {
	"use strict";

	return BaseController.extend("at.legath.ui5_speedtest.controller.MeasureDisplayBaseController", {

		onInit: function() {
			this.getView().setModel(ModelController.getLastMeasurementModel(), "lastmeasurement");
			this.getView().setModel(ModelController.getMeasureDataModel(), "measuredata");
		},

		onRouteMatched: function() {
			ModelController.refreshLastMeasurementModel();
			ModelController.refreshConfigModel();

			this.getView().byId("intervalToAnalyseDateRangeSelection").setDateValue(moment().subtract(1, "months").toDate());
			this.getView().byId("intervalToAnalyseDateRangeSelection").setSecondDateValue(moment().toDate());
			this.onIntervalToAnalyseChange();
		},

		onDownloadMeasurementsPress: function() {
			window.location = ModelController._basePath + "/speedtest/speedtest_" + ModelController.getConfigModel().getProperty(
				"/speedtestserver") + ".csv";
		},

		onNavButtonPress: function() {
			this.navToHome();
		},

		drawChart: function(sItemPath, sXBinding, sYBinding) {
			var oChartFlexBox = this.getView().byId("chartFlexBox");

			var oChartItem = new LineChartItem({
				x: sXBinding,
				y: sYBinding
			});
			var oLineChart = new LineChart({
				items: {
					path: sItemPath,
					template: oChartItem
				}
			});
			oLineChart.setModel(ModelController.getMeasureDataModel());
			oChartFlexBox.removeAllItems();
			oChartFlexBox.addItem(oLineChart);
		},

		measuredatastate: function(fToAvgRel) {
			fToAvgRel = Number(fToAvgRel);
			if (fToAvgRel <= -15) {
				return sap.ui.core.ValueState.Error;
			}
			if (fToAvgRel <= -7) {
				return sap.ui.core.ValueState.Warning;
			}
			if (fToAvgRel > +7) {
				return sap.ui.core.ValueState.Success;
			}
			return sap.ui.core.ValueState.None;
		}

	});
});