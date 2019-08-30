import React, {useState} from "react";
import {storiesOf} from "@storybook/react";
import { action } from '@storybook/addon-actions';

import Select from "./Select";

const stories = storiesOf('Elements|Select', module);

const firstOptions = [
    {
        label: "One",
        value: 'one',
    },
    {
        label: "Two",
        value: 'two',
    },
    {
        label: "Three",
        value: 'three',
    },
];

function DefaultSelect() {
    const [selectValue, setValue] = useState(firstOptions[1]);

    return (
        <div>
            <Select options={firstOptions} value={selectValue} field="firstField" onChange={value => {
                action('Select:onChange')(value);
                setValue(value);
            }}/>
            <Select options={firstOptions} value={selectValue} field="firstField" isClearable onChange={value => {
                action('Select:onChange')(value);
                setValue(value);
            }}/>
        </div>
    )
}

function MultipleSelect() {
    const [selectValue, setValue] = useState([]);

    return (
        <div>
            <Select multiple options={firstOptions} value={selectValue} field="firstField" onChange={value => {
                action('Select:onChange')(value);
                setValue(value);
            }}/>
        </div>
    )
}

stories.add('default', () => <DefaultSelect/>);

stories.add('multiple select', () => <MultipleSelect/>);
