import React from 'react';
import {AnalyticsWidgetResolutionTypes, TimeUnitLabelMap} from "../../Common/constants";
import {Select} from "../../Elements";

const resolutionOptions = Object.values(AnalyticsWidgetResolutionTypes).map(resolution=> ({
    value: resolution,
    label: TimeUnitLabelMap[resolution],
}));

const WidgetResolutionSelect = ({value, onChange}) => {
    return (
        <div className='WidgetResolutionSelect'>
            <Select selectLabel='Select chart resolution' options={resolutionOptions} value={value} onChange={onChange}/>
        </div>
    );
};

export default WidgetResolutionSelect;