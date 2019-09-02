import React from "react";
import {storiesOf} from "@storybook/react";
import { action } from '@storybook/addon-actions';

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
                <DropdownItem onClick={action('DropdownItem:onClick')}>testing</DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Dropdown>
            <DropdownToggle>
                <Button>
                    Open Dropdown
                </Button>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={action('DropdownItem:onClick')}>testing</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
));
