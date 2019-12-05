import React, {PureComponent, Fragment} from 'react';
import _ from 'lodash';
import {
    Area,
    AreaChart, Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip as RechartsTooltip,
    YAxis
} from "recharts";
import classNames from "classnames";

import {getFormattedDateForResolution} from "../../Utils/AnalyticsHelpers";

import {AnalyticsWidgetListTypeColumnTypes, AnalyticsWidgetTypes} from "../../Common/constants";

/**
 *
 * @param active
 * @param payload
 * @param label
 * @param coordinate
 * @param {Widget} widget
 * @returns {null|*}
 * @constructor
 */
class AnalyticsWidgetTooltip extends PureComponent {
    render() {
        const {active, payload, widget} = this.props;

        if (!active) return null;

        return <div className="AnalyticsWidgetTooltip">
            <div className="MarginBottom1">
                <span className="SemiBoldText">{getFormattedDateForResolution(payload[0].payload.date, widget.resolution)}</span>
            </div>
            {_.orderBy(payload, 'value', 'desc').map(load => <div key={load.dataKey} className="AnalyticsWidgetTooltip__LegendItem">
                <div style={{backgroundColor: load.color}} className="AnalyticsWidgetTooltip__Dot"/>
                <span className="AnalyticsWidgetTooltip__LegendItem__Label">{load.name}:</span>
                <span className="AnalyticsWidgetTooltip__LegendItem__Value">{load.value}</span>
            </div>)}
        </div>
    }
}

const AnalyticsWidgetChart = ({widget}) => {
    let dataMetadata;

    if ([AnalyticsWidgetTypes.LIST].includes(widget.type)) {
        dataMetadata = widget.dataPoints.reduce((data, dataPoint) => {
            if (dataPoint.type === AnalyticsWidgetListTypeColumnTypes.BAR) {
                data[dataPoint.key] = {
                    max: _.maxBy(widget.data, dataPoint.key)[dataPoint.key],
                    min: _.minBy(widget.data, dataPoint.key)[dataPoint.key],
                }
            }
            return data;
        }, {});
    }

    return (
        <div className="AnalyticsWidgetChart">
            {widget.type === AnalyticsWidgetTypes.STACKED_CHART && <Fragment>
                <ResponsiveContainer debounce={100}>
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
            {widget.type === AnalyticsWidgetTypes.LINE_CHART && <Fragment>
                <ResponsiveContainer debounce={100}>
                    <AreaChart data={widget.data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                        <defs>
                            {widget.dataPoints.map(point =>
                                <linearGradient key={point.key} id={point.color + point.key} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={point.color} stopOpacity={0.3}/>
                                    <stop offset="100%" stopColor={point.color} stopOpacity={0.2}/>
                                </linearGradient>
                            )}
                        </defs>
                        <RechartsTooltip content={<AnalyticsWidgetTooltip widget={widget}/>} cursor={{stroke: '#060e18'}} position={{y: 150,}}/>
                        {widget.dataPoints.map(point =>
                            <Area dot={false} dataKey={point.key} name={point.name || point.key}
                                  stroke={point.color} key={point.key} isAnimationActive={false} fill={`url(#${point.color + point.key})`}/>
                        )}
                    </AreaChart>
                </ResponsiveContainer>
            </Fragment>}
            {widget.type === AnalyticsWidgetTypes.LIST && <Fragment>
                <div className="AnalyticsWidget__Data__ListHeader">
                    {widget.dataPoints.map(point => <div key={point.key} style={{flex: `${point.size} ${point.size} 0px`}} className="AnalyticsWidget__Data__ListColumn">
                        {point.name}
                    </div>)}
                </div>
                <div className="AnalyticsWidget__Data__ListItems">
                    {widget.data.map((datum, index) => <div key={index} className="AnalyticsWidget__Data__ListItem">
                        {widget.dataPoints.map(point => <div key={point.key} style={{flex: `${point.size} ${point.size} 0px`}} className={classNames(
                            "AnalyticsWidget__Data__ListColumn",
                            `AnalyticsWidget__Data__ListColumn--${point.type}`,
                        )}>
                            {point.type === AnalyticsWidgetListTypeColumnTypes.VALUE && <span className="LinkText MonospaceFont">{datum[point.key]}</span>}
                            {point.type === AnalyticsWidgetListTypeColumnTypes.COUNT && <span>{datum[point.key]}</span>}
                            {point.type === AnalyticsWidgetListTypeColumnTypes.PERCENTAGE && <span className="MonospaceFont">{datum[point.key]}%</span>}
                            {point.type === AnalyticsWidgetListTypeColumnTypes.BAR && <div className="AnalyticsWidget__Data__BarValue">
                                <div className="AnalyticsWidget__Data__Bar" style={{
                                    width: `${datum[point.key] / dataMetadata[point.key].max * 100}%`,
                                }}>
                                    {datum[point.key]}%
                                </div>
                            </div>}
                        </div>)}
                    </div>)}
                </div>
            </Fragment>}
            {widget.type === AnalyticsWidgetTypes.BAR_CHART && <Fragment>
                <ResponsiveContainer debounce={100}>
                    <BarChart data={widget.data} margin={{ top: 24, right: 0, bottom: 0, left: 0 }}>
                        <RechartsTooltip cursor={{fill: 'rgba(15, 39, 67, 0.75)'}} content={<AnalyticsWidgetTooltip/>}/>
                        <CartesianGrid vertical={false} strokeDasharray="6" stroke="#040b13"/>
                        <YAxis orientation="right" tick={{fill: 'white'}} mirror/>
                        {widget.dataPoints.map(point =>
                            <Bar type="monotone" dataKey={point.key} name={point.name || point.key} fill={point.color} barSize={20} stroke={point.color} key={point.key}/>
                        )}
                    </BarChart>
                </ResponsiveContainer>
            </Fragment>}
        </div>
    );
};

export default AnalyticsWidgetChart;
