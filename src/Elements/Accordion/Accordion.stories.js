import React, {useState} from "react";
import {storiesOf} from "@storybook/react";

import Accordion from "./Accordion";
import Panel from "../Panel/Panel";
import PanelContent from "../Panel/PanelContent";

const stories = storiesOf('Elements|Accordion', module);

stories.add('default', () => {
    return <div>
        <div className="MarginBottom4">
            <Accordion initiallyOpened label="Hello">
                hello opened
            </Accordion>
            <Accordion label="Wolrd">
                world opened
            </Accordion>
        </div>
        <Panel>
            <PanelContent>
                <Accordion initiallyOpened label="Hello">
                    hello opened
                </Accordion>
                <Accordion label="Wolrd">
                    world opened
                </Accordion>
            </PanelContent>
        </Panel>
    </div>
});

const ControlledAccordions = () => {
    const [current, setCurrent] = useState('first');

    return <div>
        <Accordion label="First" description="qweqweqw eqw eqw" open={current === 'first'} onToggle={() => setCurrent('first')}>
            First accordion
        </Accordion>
        <Accordion label="Second" description="qweqweqw eqw eqw" open={current === 'second'} onToggle={() => setCurrent('second')}>
            Second accordion
        </Accordion>
    </div>
};

stories.add('controlled', () => {
    return <ControlledAccordions/>
});
