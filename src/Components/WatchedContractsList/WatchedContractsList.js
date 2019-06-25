import React from 'react';

import {Panel, PanelContent, Button} from "../../Elements";
import {PublicContractThumbnail, EmptyState, SimpleLoader} from "../index";

import NoContractsWatchedIcon from './no-contracts-watched.svg';

const WatchedContractsList = ({contracts, loaded}) => {
    if (!loaded) {
        return (
            <SimpleLoader/>
        )
    }

    if (!contracts.length) {
        return <Panel>
            <PanelContent>
                <EmptyState icon={NoContractsWatchedIcon} title="No watched contracts" description={"asd"} renderActions={() => (
                    <Button to={'/public-contracts'} color="secondary" size="small">
                        <span>Discover Public Contracts</span>
                    </Button>
                )}/>
            </PanelContent>
        </Panel>
    }

    return (
        <div className="DisplayFlex">
            {contracts.map(contract => <PublicContractThumbnail key={contract.address} contract={contract}/>)}
        </div>
    )
};

export default WatchedContractsList;
