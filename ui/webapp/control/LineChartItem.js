sap.ui.define([
	"sap/ui/core/Control"
], function(Control) {
	"use strict";

	return Control.extend("at.legath.ui5_speedtest.control.LineChartItem", {

		metadata: {
			properties: {
				  "x" : {type : "string", group : "Misc", defaultValue : null},
				  "y" : {type : "string", group : "Misc", defaultValue : null}
			},

			aggregations: {}
		}

	});
});