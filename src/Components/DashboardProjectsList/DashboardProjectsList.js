import React from 'react';
import {Link} from "react-router-dom";

import {Button} from "../../Elements";

import './DashboardProjectsList.css';

const DashboardProjectsList = ({projects, loaded}) => {
    return (
        <div className="DashboardProjectsList">
            <h2>Projects</h2>
            <hr/>
            {(loaded && projects.length === 0) && <div className="ProjectListEmptyState">
                <h5>No project created yet!</h5>
                <p>Create a project and upload your Smart Contract to start tracking them</p>
                <Button to="/project/create">Create Project</Button>
            </div>}
            {(loaded && projects.length !== 0) && <div className="ProjectList">
                {projects.map(project =>
                    <Link to={`/project/${project.id}`} className="ProjectListItem" key={project.id}>
                        {project.name}
                    </Link>
                )}
                <Button to="/project/create">Create Project</Button>
            </div>}
            {!loaded && <div className="LoadingProjects">
                Loading...
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
