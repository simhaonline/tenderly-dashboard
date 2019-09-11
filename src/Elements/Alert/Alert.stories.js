import React, {useState} from "react";
import {storiesOf} from "@storybook/react";

import {Button} from "..";
import Alert from "./Alert";

const stories = storiesOf('Elements|Alert', module);

stories.add('default', () => {
    return (
        <div>
            <Alert>
                Default Alert
            </Alert>
            <Alert color="danger">
                Danger Alert
            </Alert>
            <Alert color="info">
                Info Alert
            </Alert>
            <Alert color="warning">
                Warning Alert
            </Alert>
        </div>
    );
});

function AnimatedAlert() {
    const [animation, setAnimation] = useState(true);

    return (
        <div>
            <Alert animation={animation} color="info">
                This alert was animated
            </Alert>
            <Button onClick={() => {
                setAnimation(false);

                setTimeout(() => {
                    setAnimation(true);
                });
            }}>Animate</Button>
        </div>
    )
}

stories.add('animated', () => {
    return (
        <div>
            <AnimatedAlert/>
        </div>
    )
});
