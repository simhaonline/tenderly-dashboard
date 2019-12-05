import React, {Component} from 'react';

import {Checkbox, Panel} from "../../Elements";
import {AnalyticsWidgetChart} from "../index";

import './AnalyticsDataView.scss';

class AnalyticsDataView extends Component {
    render() {
        const {widget} = this.props;

        return (
            <Panel className="AnalyticsDataView">
                <div className="AnalyticsDataView__Content">
                    <div style={{height: 400}} className="AnalyticsDataView__Graph">
                        <AnalyticsWidgetChart widget={widget}/>
                    </div>
                    <div className="AnalyticsDataView__Items">
                        {widget.dataPoints.map(dataPoint => <div key={dataPoint.key} className="AnalyticsDataView__Content__Item">
                            <Checkbox onChange={() => {}} value={false} field={dataPoint.key}/>
                            <span>{dataPoint.name}</span>
                        </div>)}
                    </div>
                </div>
            </Panel>
        );
    }
}

export default AnalyticsDataView;
