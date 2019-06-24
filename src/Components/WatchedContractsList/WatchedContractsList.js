import React from 'react';

import {Panel, PanelContent} from "../../Elements";
import {PublicContractThumbnail, EmptyState} from "../index";

const WatchedContractsList = ({contracts, loaded}) => {
    if (!loaded) {
        return (
            <div>loading..</div>
        )
    }

    if (!contracts.length) {
        return <Panel>
            <PanelContent>
                <EmptyState title={"asd"} description={"asd"}/>
            </PanelContent>
        </Panel>
    }

    console.log(contracts);

    return (
        <div>
            {contracts.map(contract => <PublicContractThumbnail key={contract.address} contract={contract}/>)}
        </div>
    )
};

export default WatchedContractsList;
