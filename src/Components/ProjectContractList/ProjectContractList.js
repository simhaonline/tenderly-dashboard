import React from 'react';

import ProjectContract from "../ProjectContract/ProjectContract";

import './ProjectContractList.css';

const ProjectContractList = ({contracts}) => {
    return (
        <div className="ProjectContractList">
            {contracts.map(contract =>
                <ProjectContract key={contract.id} contract={contract} className="ProjectContractListItem"/>
            )}
        </div>
    )
};

export default ProjectContractList;
