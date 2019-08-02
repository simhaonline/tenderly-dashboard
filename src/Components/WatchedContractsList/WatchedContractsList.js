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
                <EmptyState image={NoContractsWatchedIcon} title="No watched contracts" description="You can watch all contracts that have their source code public. Add them to your dashboard to keep track of them and have easy access." renderActions={() => (
                    <Button to={'/public-contracts'} color="secondary" size="small">
                        <span>Discover Public Contracts</span>
                    </Button>
                )}/>
            </PanelContent>
        </Panel>
    }

    return (
        <div className="DisplayFlex FlexWrap">
            {contracts.map(contract => <PublicContractThumbnail key={`${contract.network}:${contract.address}`} contract={contract}/>)}
        </div>
    )
};

export default WatchedContractsList;
