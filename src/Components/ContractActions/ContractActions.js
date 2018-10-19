import React from 'react';

import {Button} from "../../Elements";

import './ContractActions.css';

const ContractActions = ({contract, routeNetwork}) => {
    return (
        <div className="ContractActions">
            <Button className="EventListItem" to={`/contract/${routeNetwork}/${contract.id}/source`}>Contract Source</Button>
        </div>
    )
};

export default ContractActions;
