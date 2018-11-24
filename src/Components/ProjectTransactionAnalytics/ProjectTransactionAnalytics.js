import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

import {AnalyticsResolutionTypes} from "../../Common/constants";
import {ProjectAnalyticsGraph} from "../index";

import dummyTransactionData from './dummyTransactionData';

import './ProjectTransactionAnalytics.css';

class ProjectTransactionAnalytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resolution: AnalyticsResolutionTypes.DAY,
            data: dummyTransactionData,
        }
    }

    handleResolutionChange = (resolution) => {
        this.setState({
            resolution,
        })
    };

    render() {
        const {resolution, data} = this.state;

        const graphData = data[resolution];

        return (
            <ProjectAnalyticsGraph className="ProjectTransactionAnalytics" title="Transactions" resolution={resolution} onResolutionChange={this.handleResolutionChange}>
                <div className="ChartWrapper">
                    <ResponsiveContainer>
                        <BarChart data={graphData}>
                            <XAxis dataKey="label"/>
                            <YAxis/>
                            <Tooltip/>
                            <Bar dataKey="success" unit=" Transactions" stackId="a" fill="#00cebb" />
                            <Bar dataKey="failed" unit=" Transactions" stackId="a" fill="#df0074" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </ProjectAnalyticsGraph>
        );
    }
}

ProjectTransactionAnalytics.propTypes = {
    projectId: PropTypes.string.isRequired,
};

export default connect(
    null,
    null,
)(ProjectTransactionAnalytics);
