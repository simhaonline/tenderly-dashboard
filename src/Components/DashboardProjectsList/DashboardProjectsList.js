import React from 'react';

import {Button} from "../../Elements";

import './DashboardProjectsList.css';

const DashboardProjectsList = ({projects}) => {
    return (
        <div className="DashboardProjectsList">
            <h2>Projects</h2>
            <hr/>
            {(!projects || projects.length === 0) && <div className="ProjectListEmptyState">
                <h5>No project created yet!</h5>
                <p>Create a project and upload your Smart Contract to start tracking them</p>
                <Button to="/project/create">Create Project</Button>
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
