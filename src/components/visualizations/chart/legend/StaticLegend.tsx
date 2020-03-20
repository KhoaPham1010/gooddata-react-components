// (C) 2007-2020 GoodData Corporation
import * as React from "react";
import { FormattedMessage } from "react-intl";
import * as cx from "classnames";

import LegendList from "./LegendList";
import { BOTTOM, TOP } from "./PositionTypes";
import { calculateStaticLegend, ITEM_HEIGHT } from "./helpers";
import { ChartType } from "../../../../constants/visualizationTypes";
import { IPushpinCategoryLegendItem } from "../../../../interfaces/GeoChart";

interface IStaticLegendProps {
    chartType: ChartType;
    containerHeight: number;
    position: string;
    series: IPushpinCategoryLegendItem[];
    shouldFillAvailableSpace?: boolean;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
}

interface IStaticLegendState {
    page: number;
}

export default class StaticLegend extends React.PureComponent<IStaticLegendProps, IStaticLegendState> {
    constructor(props: any) {
        super(props);
        this.state = {
            page: 1,
        };

        this.showNextPage = this.showNextPage.bind(this);
        this.showPrevPage = this.showPrevPage.bind(this);
    }

    public showNextPage() {
        this.setState({ page: this.state.page + 1 });
    }

    public showPrevPage() {
        this.setState({ page: this.state.page - 1 });
    }

    public renderPagingButton(type: string, handler: () => void, disabled: boolean) {
        const classes = cx("gd-button-link", "gd-button-icon-only", `icon-chevron-${type}`, "paging-button");
        return <button className={classes} onClick={handler} disabled={disabled} />;
    }

    public renderPaging(visibleItemsCount: number) {
        const { page } = this.state;
        const pagesCount = Math.ceil(this.props.series.length / visibleItemsCount);

        return (
            <div className="paging">
                {this.renderPagingButton("up", this.showPrevPage, page === 1)}
                <FormattedMessage
                    id="visualizations.of"
                    tagName="span"
                    values={{
                        page: <strong>{page}</strong>,
                        pagesCount,
                    }}
                />
                {this.renderPagingButton("down", this.showNextPage, page === pagesCount)}
            </div>
        );
    }

    public render() {
        const {
            containerHeight,
            chartType,
            onItemClick,
            position,
            series,
            shouldFillAvailableSpace = true,
        } = this.props;
        const { page } = this.state;

        const classNames = cx("viz-legend", "static", `position-${position}`);

        // Without paging
        if (position === TOP || position === BOTTOM) {
            return (
                <div className={classNames}>
                    <div className="series">
                        <LegendList chartType={chartType} series={series} onItemClick={onItemClick} />
                    </div>
                </div>
            );
        }

        const seriesCount = series.length;
        const { hasPaging, visibleItemsCount } = calculateStaticLegend(seriesCount, containerHeight);

        const start = (page - 1) * visibleItemsCount;
        const end = Math.min(visibleItemsCount * page, series.length);

        const pagedSeries = series.slice(start, end);

        const heightOfAvailableSpace = visibleItemsCount * ITEM_HEIGHT;
        const heightOfVisibleItems = Math.min(visibleItemsCount, seriesCount) * ITEM_HEIGHT;
        const seriesHeight = shouldFillAvailableSpace ? heightOfAvailableSpace : heightOfVisibleItems;

        return (
            <div className={classNames}>
                <div className="series" style={{ height: seriesHeight }}>
                    <LegendList chartType={chartType} series={pagedSeries} onItemClick={onItemClick} />
                </div>
                {hasPaging && this.renderPaging(visibleItemsCount)}
            </div>
        );
    }
}
