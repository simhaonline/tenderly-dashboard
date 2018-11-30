import React from 'react';
import moment from "moment";

import {EtherscanLinkTypes} from "../../Common/constants";

import {Card, Button} from "../../Elements";
import NetworkTag from "../NetworkTag/NetworkTag";
import PageLink from "../PageLink/PageLink";
import EtherscanLink from "../EtherscanLink/EtherscanLink";

import './ProjectContract.css';

const ProjectContract = ({contract}) => {
    const hasEvents = !!contract.eventCount;
    return (
        <PageLink className="ProjectContract" to={`/project/${contract.projectId}/contract/${contract.id}`}>
            <Card>
                <div className="ContentWrapper">
                    <NetworkTag network={contract.network} size="small" className="ContractNetworkTag"/>
                    <div className="GeneralInfoColumn ItemColumn">
                        <h3 className="ContractName">{contract.name}</h3>
                        <EtherscanLink onClick={event => event.stopPropagation()}
                                       className="ContractAddress"
                                       network={contract.network}
                                       type={EtherscanLinkTypes.ADDRESS}
                                       value={contract.address}>
                            {contract.address}
                        </EtherscanLink>
                    </div>
                    <div className="EventsColumn ItemColumn">
                        <div className="InfoLabel">No. of Events:</div>
                        {hasEvents && <div>{contract.eventCount}</div>}
                        {!hasEvents && <div>/</div>}
                    </div>
                    {contract.lastEventAt && <div className="LastEventColumn ItemColumn">
                        <div className="InfoLabel">Last event:</div>
                        <div>{moment(contract.lastEventAt).fromNow()}</div>
                    </div>}
                    {contract.lastDeploymentAt && <div className="DeploymentInfoColumn ItemColumn">
                        <div className="InfoLabel">Deployed:</div>
                        <div title={moment(contract.lastDeploymentAt).format("MMM DD YYYY, HH:mm:ss")}>{moment(contract.lastDeploymentAt).fromNow()}</div>
                    </div>}
                    <div className="ActionsColumn ItemColumn">
                        {hasEvents && <Button size="small" outline color="secondary" onClick={event => event.stopPropagation()}
                                to={`/project/${contract.projectId}/events?contract=${contract.id}`} className="Action">View
                            <span>Events</span>
                        </Button>}
                        <Button size="small" outline color="secondary" onClick={event => event.stopPropagation()}
                                to={`/project/${contract.projectId}/contract/${contract.id}/source`}
                                className="Action">
                            <span>Source</span>
                        </Button>
                    </div>
                </div>
            </Card>
        </PageLink>
    )
};

export default ProjectContract;
