import React from "react";
import {storiesOf} from "@storybook/react";

import {ProgressBar, Panel, PanelContent} from "../";

const stories = storiesOf('Elements|ProgressBar', module);

stories.add('default', () => {
    return <div>
        <div className="MarginBottom4">
            <ProgressBar value={10}/>
            <ProgressBar value={24} displayPercentage/>
            <ProgressBar value={24.123791293} displayPercentage/>
            <ProgressBar value={120}/>
            <ProgressBar value={-5}/>
        </div>
        <Panel>
            <PanelContent>
                <ProgressBar value={40} displayPercentage/>
                <ProgressBar value={50} color="secondary" displayPercentage/>
                <ProgressBar value={60} color="success" displayPercentage/>
                <ProgressBar value={70} color="danger" displayPercentage/>
            </PanelContent>
        </Panel>
    </div>
});
