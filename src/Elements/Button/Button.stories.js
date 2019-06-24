import React from "react";
import {storiesOf} from "@storybook/react";

import Button, {ButtonGroup} from "./Button";

const stories = storiesOf('Elements|Button', module);

stories.add('default', () => (
    <div>
        <Button>
            <span>Button</span>
        </Button>
    </div>
));

stories.add('grouped', () => (
    <div>
        <div className="MarginBottom4">
            <ButtonGroup>
                <Button>
                    <span>One</span>
                </Button>
                <Button outline disabled>
                    <span>Two</span>
                </Button>

                <Button outline readOnly>
                    <span>Three</span>
                </Button>
            </ButtonGroup>
        </div>
        <div>
            <ButtonGroup>
                <Button size="small">
                    <span>One</span>
                </Button>
                <Button size="small" outline disabled>
                    <span>Two</span>
                </Button>

                <Button size="small" outline readOnly>
                    <span>Three</span>
                </Button>
            </ButtonGroup>
        </div>
    </div>
));
