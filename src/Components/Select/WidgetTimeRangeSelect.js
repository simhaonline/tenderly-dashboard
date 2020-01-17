import React from 'react';
import {Select} from "../../Elements";
import {TimeUnitTypes} from "../../Common/constants";

const timeWindowOptions = [
    {
        label: 'Last hour',
        value: 'last_hour',
        time: {
            window: {
                unit: TimeUnitTypes.HOUR,
                value: 1,
            },
        }
    },
    {
        label: 'Last 12 hours',
        value: 'last_12_hours',
        time: {
            window: {
                unit: TimeUnitTypes.HOUR,
                value: 12,
            },
        }
    },
    {
        label: 'Last 24 hours',
        value: 'last_24_hours',
        time: {
            window: {
                unit: TimeUnitTypes.HOUR,
                value: 24,
            },
        }
    },
    {
        label: 'Last 7 days',
        value: 'last_7_days',
        time: {
            window: {
                unit: TimeUnitTypes.DAY,
                value: 7,
            },
        }
    },
    {
        label: 'Last 14 days',
        value: 'last_14_days',
        time: {
            window: {
                unit: TimeUnitTypes.DAY,
                value: 14,
            },
        }
    },
    {
        label: 'Last 30 days',
        value: 'last_30_days',
        time: {
            window: {
                unit: TimeUnitTypes.DAY ,
                value: 30,
            },
        }
    },
];


const WidgetTimeRangeSelect = ({value, onChange}) => {
    return (
        <div className='WidgetTimeRangeSelect'>
            <Select options={timeWindowOptions} value={value} onChange={onChange}/>
        </div>
    );
};

export default WidgetTimeRangeSelect;



