import React, {useState} from 'react';
import {storiesOf} from "@storybook/react";

import Contract from "../../Core/Contract/Contract.model";

import {exampleContract1Payload, exampleContract2Payload} from "../../examples";

import {Panel, PanelContent} from "../../Elements";

import AlertRuleExpressionsBuilder from "./AlertRuleExpressionsBuilder";

const stories = storiesOf('Components|AlertRuleExpressionsBuilder', module);

function ControlledAlertBuilder() {
    const [value, setValue] = useState();

    return (
        <Panel>
            <PanelContent>
                <AlertRuleExpressionsBuilder value={value} onChange={setValue} contracts={[
                    Contract.buildFromResponse(exampleContract1Payload),
                    Contract.buildFromResponse(exampleContract2Payload),
                ]}/>
            </PanelContent>
        </Panel>
    )
}

stories.add('controlled', () => <ControlledAlertBuilder/>);
