import {configure} from '@storybook/react';

const ElementStories = require.context('../src/Elements', true, /\.Story\.js$/);

function loadStories() {
    require('../src/Stories');
    ElementStories.keys().forEach((filename) => ElementStories(filename))
}

configure(loadStories, module);
