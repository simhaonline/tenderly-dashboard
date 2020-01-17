import React, {Component} from 'react';

import {Checkbox, Panel, PanelContent, Toggle} from "../../Elements";
import {AnalyticsWidgetChart, CircularLoader} from "../index";

import './AnalyticsDataView.scss';
import {bindActionCreators} from "redux";
import {analyticsActions} from "../../Core/actions";
import {connect} from "react-redux";
import data from "../../Pages/Project/AnalyticsDashboardData";
import {AnalyticsWidgetListTypeColumnTypes} from "../../Common/constants";
import _ from "lodash";

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

        const metadata = dataResponse.data.dataPoints.reduce((data, dataPoint) => {
            data[dataPoint.key] = {
                max: _.maxBy(dataResponse.data.data, dataPoint.key)[dataPoint.key],
                min: _.minBy(dataResponse.data.data, dataPoint.key)[dataPoint.key],
            };
            return data;
        }, {});

        this.setState({
            metadata,
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
        const {disabledDataPoints, loaded, widgetData, metadata} = this.state;

        if(!loaded){
            return <div className='DisplayFlex AlignItemsCenter JustifyContentCenter'>
                <CircularLoader/>
            </div>
        }

        return (
            <div>
                <Panel>
                    <PanelContent>

                    </PanelContent>
                </Panel>
                <Panel className="AnalyticsDataView">
                    <div style={{height: 300}} className="AnalyticsDataView__Graph">
                        <AnalyticsWidgetChart
                            dataPoints={widgetData.dataPoints.filter(dp => !disabledDataPoints[dp.key])}
                            widget={widget} data={widgetData.data}/>
                    </div>
                    <div className='AnalyticsDataView__Item'>
                        <div className="AnalyticsDataView__Item__Labels">
                            <span>Labels</span>
                        </div>
                        <div className='AnalyticsDataView__Item__Value'>
                            <span>Min</span>
                        </div>
                        <div className='AnalyticsDataView__Item__Value'>
                            <span>Max</span>
                        </div>
                        <div className='AnalyticsDataView__Item__Value'/>

                    </div>
                    <div className="AnalyticsDataView__Items">
                        {_.orderBy(widgetData.dataPoints, dataPoint=> metadata[dataPoint.key].max, 'desc').map(dataPoint => <div key={dataPoint.key}
                                                                     className="AnalyticsDataView__Item" onClick={() => this.toggleDisableDataPoint(dataPoint)}>
                            <div style={{backgroundColor: dataPoint.color}} className="AnalyticsDataView__Item__Dot"/>
                            <div className="AnalyticsDataView__Item__Labels">
                                {!!dataPoint.meta && Object.keys(dataPoint.meta).map(metaKey => <div key={metaKey}>
                                    <span className='SemiBoldText'>{metaKey}: </span>
                                    <span className='MonospaceFont MutedText'>{dataPoint.meta[metaKey]}</span>
                                </div>)}
                                {!dataPoint.meta && <span>{dataPoint.name}</span>}

                            </div>

                            <div className='AnalyticsDataView__Item__Value'>
                                <span className='MonospaceFont LinkText'>{metadata[dataPoint.key].min.toLocaleString()}</span>
                            </div>

                            <div className='AnalyticsDataView__Item__Value'>
                                <span className='MonospaceFont LinkText'>{metadata[dataPoint.key].max.toLocaleString()}</span>
                            </div>
                            <div className='AnalyticsDataView__Item__Value'>
                                <Toggle value={!disabledDataPoints[dataPoint.key]} className='MarginLeftAuto'/>
                            </div>

                        </div>)}
                    </div>
                </Panel>
            </div>
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
