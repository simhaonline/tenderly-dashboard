import React, {Component} from 'react';

import {Checkbox, Panel} from "../../Elements";
import {AnalyticsWidgetChart} from "../index";

import './AnalyticsDataView.scss';

class AnalyticsDataView extends Component {
    state = {
        disabledDataPoints: {},
    };

    toggleDisableDataPoint = (dataPoint) => {
        const {disabledDataPoints} = this.state;

        this.setState({
            disabledDataPoints: {
                ...disabledDataPoints,
                [dataPoint.key]: !disabledDataPoints[dataPoint.key],
            }
        })
    };

    render() {
        const {widget} = this.props;
        const {disabledDataPoints} = this.state;

        console.log(disabledDataPoints);

        return (
            <Panel className="AnalyticsDataView">
                <div className="AnalyticsDataView__Content">
                    <div style={{height: 400}} className="AnalyticsDataView__Graph">
                        <AnalyticsWidgetChart dataPoints={widget.dataPoints.filter(dp => !disabledDataPoints[dp.key])} widget={widget} data={widget.data} type={widget.type}/>
                    </div>
                    <div className="AnalyticsDataView__Items">
                        {widget.dataPoints.map(dataPoint => <div key={dataPoint.key} className="AnalyticsDataView__Item">
                            <Checkbox onChange={() => this.toggleDisableDataPoint(dataPoint)} value={!disabledDataPoints[dataPoint.key]} field={dataPoint.key}/>
                            <span>{dataPoint.name}</span>
                        </div>)}
                    </div>
                </div>
            </Panel>
        );
    }
}

export default AnalyticsDataView;
