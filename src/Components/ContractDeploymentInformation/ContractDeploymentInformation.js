import React from 'react';
import moment from "moment";

import {Button, Card} from "../../Elements";

import './ContractDeploymentInformation.scss';

/**
 * @param {Contract} contract
 * @constructor
 */
const ContractDeploymentInformation = ({contract}) => {
    return (
        <div className="ContractDeploymentInformation">
            <Card className="InfoRow">
                {contract.errorCount > 0 && <div className="InfoColumn">
                    <div className="InfoLabel">No. of Errors</div>
                    <div className="InfoValue">{contract.errorCount}</div>
                </div>}
                {contract.errorCount > 0 && <div className="InfoColumn">
                    <div className="InfoLabel">Last Error</div>
                    <div className="InfoValue">{moment(contract.lastEventAt).fromNow()}</div>
                </div>}
                <div className="InfoColumn">
                    <div className="InfoLabel">Deployed</div>
                    <div className="InfoValue">{moment(contract.lastDeploymentAt).format("MMM DD YYYY, HH:mm:ss")}</div>
                </div>
            </Card>
            {contract.errorCount > 0 && <Card className="ActionsRow">
                {contract.errorCount > 0 && <Button size="small" to={`/project/${contract.projectId}/errors?contract=${contract.id}`}>
                    View Errors
                </Button>}
            </Card>}
        </div>
    )
};

export default ContractDeploymentInformation;
