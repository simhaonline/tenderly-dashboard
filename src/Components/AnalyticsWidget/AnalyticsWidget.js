import React, {Component, Fragment} from 'react';
import classNames from 'classnames';
import {Area, AreaChart, ResponsiveContainer, Tooltip} from "recharts";

import {AnalyticsWidgetDataRangeTypes, AnalyticsWidgetSizeTypes, AnalyticsWidgetTypes} from "../../Common/constants";

import {Panel, Tag, Icon} from "../../Elements";

import './AnalyticsWidget.scss';

const widgetSizeClassMap = {
    [AnalyticsWidgetSizeTypes.ONE]: 'AnalyticsWidget--One',
    [AnalyticsWidgetSizeTypes.TWO]: 'AnalyticsWidget--Two',
    [AnalyticsWidgetSizeTypes.THREE]: 'AnalyticsWidget--Three',
    [AnalyticsWidgetSizeTypes.FOUR]: 'AnalyticsWidget--Four',
};

class AnalyticsWidget extends Component {
    render() {
        const {widget} = this.props;

        console.log(widget);

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
                                    <Tag color="primary-outline" size="small" id={`${widget.id}-alerts`}>
                                        <Icon icon="bell"/>
                                        <span>{widget.alerts.length}</span>
                                    </Tag>
                                    <Tooltip id={`${widget.id}-alerts`}>
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
                                    <Tooltip />
                                    {widget.dataPoints.map(point =>
                                        <Area type="monotone" dataKey={point.key} stackId="1" stroke={point.color} fill={point.color} key={point.key}/>
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
