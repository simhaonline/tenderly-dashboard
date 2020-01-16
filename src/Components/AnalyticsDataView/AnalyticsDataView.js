import React, {Component} from 'react';

import {Checkbox, Panel} from "../../Elements";
import {AnalyticsWidgetChart} from "../index";

import './AnalyticsDataView.scss';
import {bindActionCreators} from "redux";
import {analyticsActions} from "../../Core/actions";
import {connect} from "react-redux";

class AnalyticsDataView extends Component {
    state = {
        disabledDataPoints: {},
        widgetData: null,
        loaded: false,

    };
    async componentDidMount(){
        const {widget,project,analyticsActions} = this.props;

        const dataResponse = await analyticsActions.fetchCustomAnalyticsWidgetDataForProject(project, widget);

        if (!dataResponse.success) {
            // @TODO Set error state
            return ;
        }

        this.setState({
            loaded: true,
            widgetData: dataResponse.data,
        })
    }

    toggleDisableDataPoint = (dataPoint) => {
        const {disabledDataPoints} = this.state;

        this.setState({
            disabledDataPoints: {
                ...disabledDataPoints,
                [dataPoint.key]: !disabledDataPoints[dataPoint.key],
            },
        });
    };

    render() {
        const {widget} = this.props;
        const {disabledDataPoints, loaded, widgetData} = this.state;

        if(!loaded){
            return null
        }

        return (
            <Panel className="AnalyticsDataView">
                <div className="AnalyticsDataView__Content">
                    <div style={{height: 300}} className="AnalyticsDataView__Graph">
                        <AnalyticsWidgetChart dataPoints={widgetData.dataPoints.filter(dp => !disabledDataPoints[dp.key])} widget={widget} data={widgetData.data} />
                    </div>
                    <div className="AnalyticsDataView__Items">
                        {widgetData.dataPoints.map(dataPoint => <div key={dataPoint.key} className="AnalyticsDataView__Item">
                            <Checkbox onChange={() => this.toggleDisableDataPoint(dataPoint)} value={!disabledDataPoints[dataPoint.key]} field={dataPoint.key}/>
                            <span>{dataPoint.name}</span>
                        </div>)}
                    </div>
                </div>
            </Panel>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        analyticsActions: bindActionCreators(analyticsActions, dispatch),
    };
};

export default connect(
  null,
    mapDispatchToProps,

)(AnalyticsDataView);
