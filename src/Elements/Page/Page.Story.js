import React from 'react';

import {storiesOf} from '@storybook/react';

import Page from './Page';

storiesOf('Elements/Page', module)
    .add('with some emoji', () => {
        return (
            <Page>
                Testipage
            </Page>
        );
    });
