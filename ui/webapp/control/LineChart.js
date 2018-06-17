sap.ui.define([
	"sap/ui/core/Control"
], function(Control) {
	"use strict";

	return Control.extend("at.legath.ui5_speedtest.control.LineChart", {

		sParentId: null,
		metadata: {
			properties: {},

			aggregations: {
				"items": {
					type: "at.legath.ui5_speedtest.control.LineChartItem",
					multiple: true,
					singularName: "item"
				}
			},
			defaultAggregation: "items"
		},

		onAfterRendering: function() {},

		createChart: function() {
			var oChartLayout = new sap.m.VBox({
				alignItems: sap.m.FlexAlignItems.Center,
				justifyContent: sap.m.FlexJustifyContent.Center
			});
			var iWidth = $("#__shell0-content").width();
			if (!iWidth) {
				iWidth = 1280;
			}
			var oChartFlexBox = new sap.ui.core.HTML({
				content: "<svg width='" + iWidth + "' height='400'/>"
			});
			this.sParentId = oChartFlexBox.getIdForLabel();

			oChartLayout.addItem(oChartFlexBox);

			return oChartLayout;
		},

		rerender: function() {
			var svg = d3.select("#" + this.sParentId);
			svg.selectAll("*").remove();
			
			var oModel = this.getModel();
			var aItems = oModel.getProperty(this.getBinding("items").sPath);
			if (!aItems) {
				return;
			}
			aItems = JSON.parse(JSON.stringify(aItems));
			var margin = {
					top: 20,
					right: 20,
					bottom: 30,
					left: 50
				},
				width = +svg.attr("width") - margin.left - margin.right,
				height = +svg.attr("height") - margin.top - margin.bottom;

			var svg = svg.attr("width", width + margin.left + margin.right)
				.attr("height", height  + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

			aItems.forEach(function(d) {
				d.datetime = parseTime(d.datetime);
				d.value = +Number(d.value);
			});
			var x = d3.scaleTime().range([0, width]);
			var y = d3.scaleLinear().range([height, 0]);
			var line = d3.line()
				.x(function(d) {
					return x(d.datetime);
				})
				.y(function(d) {
					return y(d.value);
				});
			x.domain(d3.extent(aItems, function(d) {
				return d.datetime;
			}));
			y.domain([0, d3.max(aItems, function(d) {
				return d.value;
			})]);

			svg.append("path")
				.data([aItems])
				.attr("fill", "none")
				.attr("stroke", "steelblue")
				.attr("stroke-linejoin", "round")
				.attr("stroke-linecap", "round")
				.attr("stroke-width", 1.5)
				.attr("class", "line")
				.attr("d", line);

			svg.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));

			svg.append("g")
				.call(d3.axisLeft(y))
				.append("text")
					.attr("fill", "#000")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", "0.71em");
		},

		renderer: function(oRm, oControl) {
			var oLayout = oControl.createChart();

			oRm.write("<div");
			oRm.writeControlData(oLayout);
			oRm.writeClasses();
			oRm.write(">");
			oRm.renderControl(oLayout);
			oRm.write("</div>");
		}

	});
});