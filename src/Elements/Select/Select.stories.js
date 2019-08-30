import React from "react";
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

stories.add('default', () => {
   return (
       <div>
           <Select options={firstOptions} field="firstField" onChange={action('Select:onChange')}/>
       </div>
   )
});
