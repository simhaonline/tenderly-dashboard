import React from 'react';
import {Panel, PanelContent} from "../../Elements";

import NoTransactionsIcon from './no-transactions-icon.svg';

import {EmptyState} from "../index";

const NoTransactionsEmptyState = () => {
    return (
        <Panel>
            <PanelContent>
                <EmptyState icon={NoTransactionsIcon} title="No transactions processed"
                            description="We haven’t processed any transactions yet. As soon as one appears on the chain it will appear here."/>
            </PanelContent>
        </Panel>
    )
};

export default NoTransactionsEmptyState;
