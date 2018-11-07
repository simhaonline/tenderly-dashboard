import React from 'react';

import './ProjectContract.css';

const ProjectContract = ({contract}) => {
    return (
        <div className="ProjectContract">
            {contract.getFileName()}
        </div>
    )
};

export default ProjectContract;
