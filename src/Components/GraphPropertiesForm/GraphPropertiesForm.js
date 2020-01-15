import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelContent, Select} from "../../Elements";
import {
    AnalyticsDataAggregationTypes,
    AnalyticsDataSourceTypes,
    AnalyticsTransactionDataTypes,
    AnalyticsTransactionLogDataTypes,
    AnalyticsWidgetResolutionTypes, AnalyticsWidgetTypes, TimeUnitLabelMap,
    TimeUnitTypes
} from "../../Common/constants";
import {Widget} from "../../Core/models";

const dataSourceOptions = [{
   label: 'Transaction',
   options: Object.values(AnalyticsTransactionDataTypes).map(dataType=> ({
       value: dataType + AnalyticsDataSourceTypes.TRANSACTIONS,
       label: dataType,
       type: dataType,
       dataSource: AnalyticsDataSourceTypes.TRANSACTIONS
   }))
},
    {
        label: 'Event',
        options: Object.values(AnalyticsTransactionLogDataTypes).map(dataType=> ({
            value: dataType + AnalyticsDataSourceTypes.TRANSACTION_LOGS,
            label: dataType,
            type: dataType,
            dataSource: AnalyticsDataSourceTypes.TRANSACTION_LOGS
        }))
    }
];

const dataAggregationOptions = Object.values(AnalyticsDataAggregationTypes).map(aggregation => ({
    value: aggregation,
    label: aggregation,
}));

const resolutionOptions = Object.values(AnalyticsWidgetResolutionTypes).map(resolution=> ({
    value: resolution,
    label: TimeUnitLabelMap[resolution],
}));

const timeWindowOptions = [
    {
        label: 'Last hour',
        value: 'last_hour',
    },
    {
        label: 'Last 12 hours',
        value: 'last_12_hours',
    },
    {
        label: 'Last 24 hours',
        value: 'last_24_hours',
    },
    {
        label: 'Last 7 days',
        value: 'last_7_days'
    },
    {
        label: 'Last 14 days',
        value: 'last_14_days'
    },
    {
        label: 'Last 30 days',
        value: 'last_30_days'
    },
];

class GraphPropertiesForm extends PureComponent {
    state = {
        dataType: null,
        time: null,
        resolution: null,
        sourceType: null,
        aggregation: null
    };

    handleDataTypeChange = (value) => {
        const {time, resolution, aggregation} = this.state;

        const newTime = time || timeWindowOptions.find(option => option.value === 'last_7_days');

        const newResolution = resolution || resolutionOptions.find(option=> option.value===AnalyticsWidgetResolutionTypes.DAY);
        const newAggregation = aggregation || dataAggregationOptions.find(option => option.value === AnalyticsDataAggregationTypes.COUNT);

        this.setState({
            dataType: value,
            time: newTime,
            resolution: newResolution,
            aggregation: newAggregation,
        },this.propagateGraphChanges)



    };

    handleResolutionChange = (value) => {
        this.setState({
            resolution: value
        },this.propagateGraphChanges)
    };
    handleAggregationChange = (value) => {
        this.setState({
            aggregation: value
        },this.propagateGraphChanges)
    };
    handleTimeWindowChange = (value) => {
        this.setState({
            time: value
        },this.propagateGraphChanges)
    };

    propagateGraphChanges = () => {
        const {dataType, time, resolution, aggregation} = this.state;
        const {onUpdate} = this.props;
        const widgetData = {};
        switch (time.value) {
            case 'last_hour':
                widgetData.time = {
                    window: {
                        unit: TimeUnitTypes.HOUR,
                        value: 1,
                    },
                };
                break;
            case 'last_12_hours':
                widgetData.time = {
                    window: {
                        unit: TimeUnitTypes.HOUR,
                        value: 12,
                    },
                };
                break;
            case 'last_24_hours':
                widgetData.time = {
                    window: {
                        unit: TimeUnitTypes.HOUR,
                        value: 24,
                    },
                };
                break;
            case 'last_7_days':
                widgetData.time = {
                    window: {
                        unit: TimeUnitTypes.DAY,
                        value: 7,
                    },
                };
                break;
            case 'last_14_days':
                widgetData.time = {
                    window: {
                        unit: TimeUnitTypes.DAY,
                        value: 14,
                    },
                };
                break;
            case 'last_30_days':
                widgetData.time = {
                    window: {
                        unit: TimeUnitTypes.DAY,
                        value: 30,
                    },
                };
                break;
        }
        widgetData.resolution = resolution.value;
        widgetData.type = AnalyticsWidgetTypes.LINE_CHART;
        widgetData.dataSource = dataType.dataSource;
        widgetData.show = [{
            aggregation: aggregation.value,
            property: dataType.type,
        }];
        const widget = new Widget(widgetData);
        onUpdate(widget);
    };

    render() {
        const {dataType, time, resolution,aggregation} = this.state;
        return (
            <Panel className="MarginRight4 MaxWidth480">
                <PanelContent>
                    <h4>Property</h4>
                    <div>
                        <Select options={dataSourceOptions} value={dataType} onChange={this.handleDataTypeChange}/>
                        {!!dataType && <Select options={dataAggregationOptions} value={aggregation} onChange={this.handleAggregationChange}/>}

                    </div>
                    <h4>Breakdown</h4>
                    <h4>Aggregation</h4>
                    <h4>Time Range</h4>
                    <div>
                        <Select options={timeWindowOptions} value={time} onChange={this.handleTimeWindowChange}/>
                        <h3>Resolution</h3>
                        <Select options={resolutionOptions} value={resolution} onChange={this.handleResolutionChange}/>
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

GraphPropertiesForm.propTypes = {};

export default GraphPropertiesForm;