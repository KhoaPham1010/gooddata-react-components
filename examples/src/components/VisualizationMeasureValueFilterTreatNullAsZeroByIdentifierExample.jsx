// (C) 2007-2020 GoodData Corporation
import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";
import { Visualization } from "@gooddata/react-components";

import {
    projectId,
    tableVisualizationMeasureValueFilterTreatNullAsZeroIdentifier
} from "../utils/fixtures";

const filters = [
    {
        measureValueFilter: {
            measure: {
                localIdentifier: 'fact.csv_4dates.number'
            },
            condition: {
                comparison: {
                    operator: 'LESS_THAN',
                    value: 10,
                    "treatNullValuesAs" : 0
                }
            }
        }
    }
];

export class VisualizationMeasureValueFilterTreatNullAsZeroByIdentifierExample extends Component {
    render() {
        return (
            <div style={{ height: 300 }} className="s-visualization-chart">
                <Visualization
                    projectId={projectId}
                    identifier={tableVisualizationMeasureValueFilterTreatNullAsZeroIdentifier}
                    experimentalVisExecution
                    filters={filters}
                />
            </div>
        );
    }
}

export default VisualizationMeasureValueFilterTreatNullAsZeroByIdentifierExample;
