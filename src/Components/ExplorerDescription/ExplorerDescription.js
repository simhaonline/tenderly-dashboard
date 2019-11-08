import React from 'react';

import './ExplorerDescription.scss';

const ExplorerDescription = () => {
    return (
        <div className="ExplorerDescription">
            <div className="ExplorerDescription__Block">
                <div className="ExplorerDescription__Block__Headline">Debug Transactions</div>
                <div className="ExplorerDescription__Block__Description">Locate the exact line of code where a transaction failed or reverted. And go through the transaction step by step to see which path the transaction took.</div>
            </div>
            <div className="ExplorerDescription__Block">
                <div className="ExplorerDescription__Block__Headline">Optimize Gas Costs</div>
                <div className="ExplorerDescription__Block__Description">Utilize our advanced gas profiler to detect which functions are using the most gas. Easily detect leaks and optimize the cost of your transactions.</div>
            </div>
            <div className="ExplorerDescription__Block">
                <div className="ExplorerDescription__Block__Headline">View Decoded Variables</div>
                <div className="ExplorerDescription__Block__Description">Using the source code from public contracts we can decode state and local variables throughout transactions. And based on primitive types we decode them into readable variables.</div>
            </div>
        </div>
    );
};

export default ExplorerDescription;
