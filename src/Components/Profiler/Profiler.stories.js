import React from 'react';
import {storiesOf} from "@storybook/react";

import Profiler from "./Profiler";

const stories = storiesOf('Components|Profiler', module);

const gasUsageData = [
    {
        value: 243043,
        label: 'Gas used by transaction',
        nodes: [
            {
                value: 21463,
                label: 'Initial Gas',
            },
            {
                value: 208352,
                label: 'Execution',
                nodes: [
                    {
                        value: 41254,
                        label: 'checkAvailableFunds()',
                        nodes: [
                            {
                                offset: 5300,
                                value: 2300,
                                label: 'sub()',
                                nodes: [],
                            },
                            {
                                offset: 100,
                                value: 2300,
                                label: 'sub()',
                                nodes: [],
                            },
                        ],
                    },
                    {
                        value: 21684,
                        label: 'moveAssets()',
                        nodes: [

                        ],
                    },
                    {
                        value: 105684,
                        label: 'transferFunds()',
                        nodes: [

                        ],
                    },
                ],
            },
        ],
    }
];

stories.add('basic', () => {
    return (
        <div>
            <Profiler data={gasUsageData}/>
        </div>
    )
});
