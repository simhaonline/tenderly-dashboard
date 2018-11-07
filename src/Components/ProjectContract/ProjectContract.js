import React from 'react';
import moment from "moment";

import NetworkTag from "../NetworkTag/NetworkTag";

import './ProjectContract.css';

const ProjectContract = ({contract}) => {
    console.log(contract);
    return (
        <div className="ProjectContract">
            <div>{contract.name}</div>
            <div>{contract.getFileName()}</div>
            <div>
                <h5>Deployment Info:</h5>
                {contract.lastDeploymentAt && <div>Last deployment: {moment(contract.lastDeploymentAt).format("MMM DD YYYY, HH:mm:ss")}</div>}
                <div>Total deployments: {contract.deploymentCount}</div>
                <div>Current address: {contract.address}</div>
            </div>
            <div>
                <h5>Events Info:</h5>
                {contract.lastEventAt && <div>Last event: {moment(contract.lastEventAt).format("MMM DD YYYY, HH:mm:ss")}</div>}
                <div>Total events: {contract.eventCount}</div>
            </div>
            <div>
                <h5>Networks:</h5>
                <div>
                    <NetworkTag network={contract.network}/>
                </div>
            </div>
        </div>
    )
};

export default ProjectContract;
