import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import moment from "moment";
import {Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip} from "recharts";

import {AnalyticsWidgetDataRangeTypes, AnalyticsWidgetSizeTypes, AnalyticsWidgetTypes} from "../../Common/constants";

import {Panel, Tag, Icon, Tooltip} from "../../Elements";

import './AnalyticsWidget.scss';

const widgetSizeClassMap = {
    [AnalyticsWidgetSizeTypes.ONE]: 'AnalyticsWidget--One',
    [AnalyticsWidgetSizeTypes.TWO]: 'AnalyticsWidget--Two',
    [AnalyticsWidgetSizeTypes.THREE]: 'AnalyticsWidget--Three',
    [AnalyticsWidgetSizeTypes.FOUR]: 'AnalyticsWidget--Four',
};

const AnalyticsWidgetTooltip = ({ active, payload, label, coordinate }) => {
    if (!active) return null;

    return <div className="AnalyticsWidgetTooltip">
        <div className="MarginBottom1">
            <span className="SemiBoldText">{moment(payload[0].payload.date).format('ddd, MMM DD')}</span>
        </div>
        {payload.map(load => <div key={load.dataKey}>
            {load.name}: <span className="SemiBoldText">{load.value}</span>
        </div>)}
    </div>
};

class AnalyticsWidget extends Component {
    render() {
        const {widget} = this.props;

        return (
            <div className={classNames(
                "AnalyticsWidget",
                widgetSizeClassMap[widget.size],
            )}>
                <Panel className="AnalyticsWidget__Panel">
                    <div className="AnalyticsWidget__Header">
                        <div>
                            <div>{widget.name}</div>
                            <div>
                                {widget.dataRange === AnalyticsWidgetDataRangeTypes.LAST_7_DAYS && <span>Last 7 Days</span>}
                                {widget.dataRange === AnalyticsWidgetDataRangeTypes.LAST_WEEK && <span>Last Week</span>}
                            </div>
                        </div>
                        <div>
                            <div>
                                {(widget.alerts && widget.alerts.length > 0) && <Fragment>
                                    <Tag color="primary-outline" size="small" id={`alerts-widget-${widget.id}`}>
                                        <Icon icon="bell"/>
                                        <span>{widget.alerts.length}</span>
                                    </Tag>
                                    <Tooltip id={`alerts-widget-${widget.id}`}>
                                        <span>This metric has {widget.alerts.length} alerts that are based on it.</span>
                                    </Tooltip>
                                </Fragment>}
                            </div>
                        </div>
                    </div>
                    <div className="AnalyticsWidget__Data">
                        {widget.type === AnalyticsWidgetTypes.STACKED_CHART && <Fragment>
                            <ResponsiveContainer>
                                <AreaChart data={widget.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                    <defs>
                                        {widget.dataPoints.map(point =>
                                            <linearGradient key={point.key} id={point.color + point.key} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={point.color} stopOpacity={0.75}/>
                                                <stop offset="100%" stopColor={point.color} stopOpacity={0}/>
                                            </linearGradient>
                                        )}
                                    </defs>
                                    <RechartsTooltip content={<AnalyticsWidgetTooltip/>} coordinate={{x: 0, y: 0,}}/>
                                    {widget.dataPoints.map(point =>
                                        <Area type="monotone" dataKey={point.key} name={point.name || point.key} stroke={point.color} fill={`url(#${point.color + point.key})`} key={point.key}/>
                                    )}
                                </AreaChart>
                            </ResponsiveContainer>
                        </Fragment>}
                    </div>
                </Panel>
            </div>
        );
    }
}

export default AnalyticsWidget;
