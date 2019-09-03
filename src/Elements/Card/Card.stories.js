import React from 'react';
import {storiesOf} from "@storybook/react";
import { action } from '@storybook/addon-actions';

import Card from "./Card";
import CardsWrapper from "./CardsWrapper";

const stories = storiesOf('Elements|Card', module);

stories.add('default', () => {
    return <div>
        <Card>This is a the first card</Card>
        <Card>This is a the second card</Card>
    </div>
});

stories.add('colors', () => {
    return <div>
        <Card>Default Card</Card>
        <Card color="light">Light Card</Card>
    </div>
});

stories.add('clickable', () => {
    return <div>
        <Card clickable onClick={action('Card:onClick')}>This is a car</Card>
    </div>
});

stories.add('selectable', () => {
    return <div>
        <CardsWrapper horizontal>
            <Card selectable onClick={action('Card:onClick')}>First Option</Card>
            <Card selectable onClick={action('Card:onClick')}>Second Option</Card>
        </CardsWrapper>
    </div>
});

stories.add('selectable highlight colors', () => {
    return <div>
        <CardsWrapper horizontal>
            <Card selectable onClick={action('Card:onClick')}>Primary Highlight</Card>
            <Card highlightColor="secondary" selectable onClick={action('Card:onClick')}>Secondary Highlight</Card>
        </CardsWrapper>
    </div>
});
