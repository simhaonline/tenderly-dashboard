import React from 'react';

import {Button} from "../../Elements";

import './ContractActions.css';

const ContractActions = ({contract, routeNetwork}) => {
    return (
        <div className="ContractActions">
            <Button className="EventListItem" outline to={`/contract/${routeNetwork}/${contract.id}/source`}>
                <span>Contract Source</span>
            </Button>
        </div>
    )
};

export default ContractActions;
