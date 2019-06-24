import React from "react";
import {storiesOf} from "@storybook/react";

import Dropdown, {DropdownItem, DropdownMenu, DropdownToggle} from './Dropdown';
import Button from "../Button/Button";

const stories = storiesOf('Elements|Dropdown', module);

stories.add('default', () => (
    <div>
        <Dropdown>
            <DropdownToggle>
                Dropdown span
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => {console.log('clicked')}}>testing</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown>
            <DropdownToggle>
                <Button>
                    Open Dropdown
                </Button>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => {console.log('clicked')}}>testing</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
));
