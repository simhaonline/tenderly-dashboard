import React from "react";
import {storiesOf} from "@storybook/react";

import Dropdown, {DropdownItem, DropdownMenu, DropdownToggle} from './Dropdown';

const stories = storiesOf('Elements|Dropdown', module);

stories.add('default', () => (
    <div>
        <Dropdown>
            <DropdownToggle>
                qwe
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={() => {console.log('clicked')}}>testing</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
));
