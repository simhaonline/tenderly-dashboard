import React from 'react';
import {storiesOf} from "@storybook/react";

const stories = storiesOf('Elements|Tag', module);

import Tag from "./Tag";

stories.add('default', () => (
    <div>
        <Tag>
            <span>Tag</span>
        </Tag>
        <Tag color="primary-outline">
            <span>Tag</span>
        </Tag>
        <Tag color="secondary">
            <span>Tag</span>
        </Tag>
        <Tag color="secondary-outline">
            <span>Tag</span>
        </Tag>
    </div>
));

stories.add('sizes', () => (
    <div>
        <Tag>
            <span>Tag</span>
        </Tag>
        <Tag size="small">
            <span>Tag</span>
        </Tag>
    </div>
));
