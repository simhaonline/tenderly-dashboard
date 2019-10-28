import React from 'react';
import {Panel, PanelContent} from "../../Elements";

import NoTransactionsIcon from './no-transactions-icon.svg';

import {EmptyState} from "../index";

const NoTransactionsEmptyState = () => {
    return (
        <Panel>
            <PanelContent>
                <EmptyState image={NoTransactionsIcon} title="No transactions processed"
                            description={<div>
                                <p>We haven’t processed any transactions for this project yet</p>
                                <p>Transactions for contracts are monitored from the <span className="SemiBoldText">moment they are added</span> to the project so one will appear as soon as a new one appears on the chain</p>
                            </div>}/>
            </PanelContent>
        </Panel>
    )
};

export default NoTransactionsEmptyState;
