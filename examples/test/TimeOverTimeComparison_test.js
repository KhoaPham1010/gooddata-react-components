// (C) 2007-2020 GoodData Corporation
import { Selector } from "testcafe";
import { loginUserAndNavigate, waitForPivotTableStopLoading, checkCellValue } from "./utils/helpers";
import config from "./utils/config";

const CELL_0_1 = ".s-cell-0-1";
const CELL_0_2 = ".s-cell-0-2";
const CELL_3_1 = ".s-cell-3-1";
const CELL_3_2 = ".s-cell-3-2";

const dataLabels = ".highcharts-data-label tspan";
const markers = ".highcharts-markers *";
const tooltipCssSelector = ".gd-viz-tooltip-item .gd-viz-tooltip-value";

fixture("Time Over Time Comparison").beforeEach(
    loginUserAndNavigate(`${config.url}/time-over-time-comparison`),
);

test("should compare the data with a comparing to the SPPY Column Chart", async t => {
    const chartValues = Selector(".s-compare-to-the-same-period-previous-year-example-1 " + dataLabels);

    await t
        .expect(chartValues.exists)
        .ok()
        .expect(chartValues.nth(0).textContent)
        .eql("$23,737,061")
        .expect(chartValues.nth(1).textContent)
        .eql("$23,754,681")
        .expect(chartValues.nth(2).textContent)
        .eql("$23,170,443")
        .expect(chartValues.nth(3).textContent)
        .eql("$21,894,393")
        .expect(chartValues.nth(4).textContent)
        .eql("$23,737,061")
        .expect(chartValues.nth(5).textContent)
        .eql("$23,754,681")
        .expect(chartValues.nth(6).textContent)
        .eql("$23,170,443")
        .expect(chartValues.nth(7).textContent)
        .eql("$21,894,393");
});

test("should compare the data with a comparing to the SPPY Pivot Table", async t => {
    const pivotTableSelector = Selector(".s-compare-to-the-same-period-previous-year-example-2");

    await waitForPivotTableStopLoading(t, pivotTableSelector);

    await checkCellValue(t, pivotTableSelector, "$23,737,061", CELL_0_1);
    await checkCellValue(t, pivotTableSelector, "$23,737,061", CELL_0_2);
    await checkCellValue(t, pivotTableSelector, "$21,894,393", CELL_3_1);
    await checkCellValue(t, pivotTableSelector, "$21,894,393", CELL_3_2);
});

test("should compare the data with a comparing to the SPPY Bar Chart", async t => {
    const chartValues = Selector(".s-compare-to-the-same-period-previous-year-example-3 " + dataLabels);

    await t
        .expect(chartValues.exists)
        .ok()
        .expect(chartValues.nth(0).textContent)
        .eql("$23,737,061")
        .expect(chartValues.nth(1).textContent)
        .eql("$23,754,681")
        .expect(chartValues.nth(2).textContent)
        .eql("$23,170,443")
        .expect(chartValues.nth(3).textContent)
        .eql("$21,894,393")
        .expect(chartValues.nth(4).textContent)
        .eql("$23,737,061")
        .expect(chartValues.nth(5).textContent)
        .eql("$23,754,681")
        .expect(chartValues.nth(6).textContent)
        .eql("$23,170,443")
        .expect(chartValues.nth(7).textContent)
        .eql("$21,894,393");
});

test("should compare the data with a comparing to the SPPY Line Chart", async t => {
    const chartMarkers = Selector(".s-compare-to-the-same-period-previous-year-example-4 " + markers);

    await t
        .expect(chartMarkers.exists)
        .ok()
        .expect(chartMarkers.count)
        .eql(8);
});

test("should compare the data with a comparing to the SPPY Combo Chart", async t => {
    const chartMarkers = Selector(".s-compare-to-the-same-period-previous-year-example-5 " + markers);
    const chartValues = Selector(".s-compare-to-the-same-period-previous-year-example-5 " + dataLabels);
    const tooltip = Selector(tooltipCssSelector);

    await t
        .expect(chartMarkers.exists)
        .ok()
        .expect(chartMarkers.count)
        .eql(4)
        .expect(chartValues.nth(0).textContent)
        .eql("$23,737,061")
        .expect(chartValues.nth(1).textContent)
        .eql("$23,754,681")
        .expect(chartValues.nth(2).textContent)
        .eql("$23,170,443")
        .expect(chartValues.nth(3).textContent)
        .eql("$21,894,393")
        .expect(chartValues.nth(4).textContent)
        .eql("$23,737,061")
        .expect(chartValues.nth(5).textContent)
        .eql("$23,754,681")
        .expect(chartValues.nth(6).textContent)
        .eql("$23,170,443")
        .expect(chartValues.nth(7).textContent)
        .eql("$21,894,393")
        .click(chartMarkers.nth(0));
});

test("should compare the data with a comparing to the SPPY Head Line", async t => {
    const primaryItem = Selector(
        ".s-compare-to-the-same-period-previous-year-example-6 .s-headline-primary-item",
    );
    const secondaryItem = Selector(
        ".s-compare-to-the-same-period-previous-year-example-6 .s-headline-secondary-item",
    );

    await t
        .expect(primaryItem.textContent)
        .eql("$92,556,577")
        .expect(secondaryItem.textContent)
        .eql("$92,556,577$ Total Sales - SP year ago");
});

test("should compare the data with a comparing to the SPPY Bullet Chart", async t => {
    const charts = Selector(".s-compare-to-the-same-period-previous-year-example-7");
    const tooltip = Selector(tooltipCssSelector);
    const legend = ".viz-legend .series-item";

    await t
        .expect(charts.exists)
        .ok()
        .hover(charts.find(".highcharts-series-0 rect").nth(0))
        .expect(tooltip.nth(1).textContent)
        .eql("$8,856,994")
        .hover(charts.find(".highcharts-series-1 .highcharts-bullet-target").nth(0))
        .expect(tooltip.nth(1).textContent)
        .eql("$8,856,994")
        .click(charts.find(legend).nth(0))
        .hover(charts.find(".highcharts-series-2 rect").nth(0))
        .expect(tooltip.nth(1).textContent)
        .eql("223,841");
});
