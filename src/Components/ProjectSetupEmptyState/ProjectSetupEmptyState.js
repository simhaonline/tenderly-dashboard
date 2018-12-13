import React from 'react';

import {ProjectSetupGuide} from "../index";

import EmptyStateImage from './project-setup-empty-state.svg';

import './ProjectSetupEmptyState.css';

const ProjectSetupEmptyState = ({project, open}) => {
    return (
        <div className="ProjectSetupEmptyState">
            <div className="EmptyStateImageWrapper">
                <img src={EmptyStateImage} className="EmptyStateImage" alt="Empty state" />
            </div>
            <h4 className="EmptyStateHeadline">One last thing left</h4>
            <p className="EmptyStateDescription">In order to monitor your Smart Contracts for events, we need you to finish the project setup guide.</p>
            <div className="EmptyStateActions">
                <ProjectSetupGuide project={project} open={open}/>
            </div>
        </div>
    );
};

ProjectSetupEmptyState.defaultProps = {
    open: false,
};

export default ProjectSetupEmptyState;
