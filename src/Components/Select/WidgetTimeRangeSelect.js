import React from 'react';
import {Select} from "../../Elements";
import {
    AnalyticsWidgetDataRangeLabelMap,
    AnalyticsWidgetDataRangeTypes,
    AnalyticsWidgetDataRangeValueMap,
} from "../../Common/constants";

const timeWindowOptions = Object.values(AnalyticsWidgetDataRangeTypes).map(dateRange => ({
    label: AnalyticsWidgetDataRangeLabelMap[dateRange],
    value: dateRange,
    time: AnalyticsWidgetDataRangeValueMap[dateRange],
}));

const WidgetTimeRangeSelect = ({value, onChange}) => {
    return (
        <div className='WidgetTimeRangeSelect'>
            <Select selectLabel='Select time range' options={timeWindowOptions} value={value} onChange={onChange}/>
        </div>
    );
};

export default WidgetTimeRangeSelect;



