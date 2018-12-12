import React from 'react';
import moment from "moment";

import {Button, Card} from "../../Elements";

import './ContractDeploymentInformation.css';

const ContractDeploymentInformation = ({contract}) => {
    return (
        <div className="ContractDeploymentInformation">
            <Card className="InfoRow">
                {contract.eventCount > 0 && <div className="InfoColumn">
                    <div className="InfoLabel">No. of Events</div>
                    <div className="InfoValue">{contract.eventCount}</div>
                </div>}
                {contract.eventCount > 0 && <div className="InfoColumn">
                    <div className="InfoLabel">Last Event</div>
                    <div className="InfoValue">{moment(contract.lastEventAt).fromNow()}</div>
                </div>}
                <div className="InfoColumn">
                    <div className="InfoLabel">Deployed</div>
                    <div className="InfoValue">{moment(contract.lastDeploymentAt).format("MMM DD YYYY, HH:mm:ss")}</div>
                </div>
            </Card>
            {contract.eventCount > 0 && <Card className="ActionsRow">
                {contract.eventCount > 0 && <Button size="small" to={`/project/${contract.projectId}/events?contract=${contract.id}`}>
                    View Events
                </Button>}
            </Card>}
        </div>
    )
};

export default ContractDeploymentInformation;
