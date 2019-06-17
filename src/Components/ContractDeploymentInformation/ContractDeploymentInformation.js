import React from 'react';
import moment from "moment";

import {Button, Panel, PanelContent} from "../../Elements";

import './ContractDeploymentInformation.scss';

/**
 * @param {Contract} contract
 * @constructor
 */
const ContractDeploymentInformation = ({contract}) => {
    return (
        <div className="ContractDeploymentInformation">
            <Panel className="InfoRow">
                <PanelContent>
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
                </PanelContent>
            </Panel>
            {contract.errorCount > 0 && <Panel className="ActionsRow">
                <PanelContent>
                    {contract.errorCount > 0 && <Button size="small" to={`/project/${contract.projectId}/errors?contract=${contract.id}`}>
                        View Errors
                    </Button>}
                </PanelContent>
            </Panel>}
        </div>
    )
};

export default ContractDeploymentInformation;
