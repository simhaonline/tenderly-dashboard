import {configure, addParameters} from '@storybook/react';

import tenderlyTheme from './storybook-theme';

addParameters({
    options: {
        theme: tenderlyTheme,
    }
});

const ElementStories = require.context('../src', true, /\.stories\.js$/);

function loadStories() {
    require('../src/Stories');
    ElementStories.keys().forEach((filename) => ElementStories(filename))
}

configure(loadStories, module);
