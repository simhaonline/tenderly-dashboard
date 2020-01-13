import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Panel, PanelContent, Select} from "../../Elements";
import {
    AnalyticsTransactionDataTypes,
    AnalyticsTransactionLogDataTypes,
    AnalyticsWidgetResolutionTypes, TimeUnitLabelMap,
    TimeUnitTypes
} from "../../Common/constants";

const dataSourceOptions = [{
   label: 'Transaction',
   options: Object.values(AnalyticsTransactionDataTypes).map(dataType=> ({
       value: dataType,
       label: dataType,

   }))
},
    {
        label: 'Event',
        options: Object.values(AnalyticsTransactionLogDataTypes).map(dataType=> ({
            value: dataType,
            label: dataType
        }))
    }
];

const resolutionOptions = Object.values(AnalyticsWidgetResolutionTypes).map(resolution=> ({
    value: resolution,
    label: TimeUnitLabelMap[resolution],
}))



class GraphPropertiesForm extends PureComponent {
    state = {
        dataType: null,
        time: null,
        resolution: null,
        sourceType: null
    };

    handleDataTypeChange = (value) => {
        const {time, resolution} = this.state;

        const newTime = time || {
            window: {
                unit: TimeUnitTypes.DAY,
                value: 7,
            },
        };

        const newResolution = resolution || resolutionOptions.find(option=> option.value===AnalyticsWidgetResolutionTypes.DAY)

        this.setState({
            dataType: value,
            time: newTime,
            resolution: newResolution
        })
    };

    handleResolutionChange = (value) => {
        this.setState({
            resolution: value
        })
    }

    render() {
        const {dataType, time, resolution} = this.state;
        console.log(resolution, dataType)
        return (
            <Panel className="MarginRight4 MaxWidth480">
                <PanelContent>
                    <h4>Property</h4>
                    <div>
                        <Select options={dataSourceOptions} value={dataType} onChange={this.handleDataTypeChange}/>
                    </div>
                    <h4>Breakdown</h4>
                    <h4>Aggregation</h4>
                    <h4>Time Range</h4>
                    <div>
                        <Select options={resolutionOptions} value={resolution} onChange={this.handleResolutionChange}/>
                    </div>
                </PanelContent>
            </Panel>
        );
    }
}

GraphPropertiesForm.propTypes = {};

export default GraphPropertiesForm;