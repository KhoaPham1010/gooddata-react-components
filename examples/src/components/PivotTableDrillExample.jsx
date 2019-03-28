// (C) 2007-2019 GoodData Corporation
import React, { Component } from 'react';
import { PivotTable, HeaderPredicateFactory, Model } from '@gooddata/react-components';

import '@gooddata/react-components/styles/css/main.css';

import {
    projectId,
    quarterDateIdentifier,
    monthDateIdentifier,
    locationStateDisplayFormIdentifier,
    locationNameDisplayFormIdentifier,
    franchiseFeesIdentifier,
    franchiseFeesAdRoyaltyIdentifier,
    franchiseFeesInitialFranchiseFeeIdentifier,
    franchiseFeesIdentifierOngoingRoyalty,
    menuCategoryAttributeDFIdentifier
} from '../utils/fixtures';

export class PivotTableDrillExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drillEvent: null
        };
    }

    onDrill = (drillEvent) => {
        // eslint-disable-next-line no-console
        console.log('onFiredDrillEvent', drillEvent, JSON.stringify(drillEvent.drillContext.intersection, null, 2));
        this.setState({
            drillEvent
        });
        return true;
    };

    measures = [
        Model.measure(franchiseFeesIdentifier)
            .format('#,##0'),
        Model.measure(franchiseFeesAdRoyaltyIdentifier)
            .format('#,##0'),
        Model.measure(franchiseFeesInitialFranchiseFeeIdentifier)
            .format('#,##0'),
        Model.measure(franchiseFeesIdentifierOngoingRoyalty)
            .format('#,##0')
    ];

    drillableItems = [
        HeaderPredicateFactory.identifierMatch(menuCategoryAttributeDFIdentifier)
    ];

    attributes = [
        Model.attribute(locationStateDisplayFormIdentifier),
        Model.attribute(locationNameDisplayFormIdentifier),
        Model.attribute(menuCategoryAttributeDFIdentifier)
    ];

    columns = [
        Model.attribute(quarterDateIdentifier),
        Model.attribute(monthDateIdentifier)
    ];

    renderDrillValue() {
        const { drillEvent } = this.state;

        if (!drillEvent) {
            return null;
        }

        const drillColumn = drillEvent.drillContext.row[drillEvent.drillContext.columnIndex];
        const drillValue = typeof drillColumn === 'object' ? drillColumn.title : drillColumn;

        return <h3>You have Clicked <span className="s-drill-value">{drillValue}</span> </h3>;
    }

    render() {
        return (
            <div>
                {this.renderDrillValue()}
                <div style={{ height: 300 }} className="s-pivot-table-drill">
                    <PivotTable
                        key={projectId}
                        projectId={projectId}
                        measures={this.measures}
                        rows={this.attributes}
                        columns={this.columns}
                        pageSize={20}
                        drillableItems={this.drillableItems}
                        onFiredDrillEvent={this.onDrill}
                    />
                </div>
            </div>
        );
    }
}

export default PivotTableDrillExample;
