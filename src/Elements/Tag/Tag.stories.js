import React from 'react';
import {storiesOf} from "@storybook/react";

import Tag from "./Tag";

const stories = storiesOf('Elements|Tag', module);

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
