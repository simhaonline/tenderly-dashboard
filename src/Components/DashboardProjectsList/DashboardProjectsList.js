import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";

import {Button} from "../../Elements";
import ProjectSetupGuide from "../ProjectSetupGuide/ProjectSetupGuide";

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
                        <div className="ProjectNameLabel">Project name:</div>
                        <div className="ProjectName">{project.name}</div>
                        <div className="ProjectContractInfo">
                            {!!project.lastPushAt && <div>
                                Last contract deployed at: {moment(project.lastPushAt).format("MMM DD YYYY, HH:mm:ss")}
                            </div>}
                            {!project.lastPushAt && <div onClick={event => event.preventDefault()}>
                                <ProjectSetupGuide projectId={project.id} size="small" color="secondary"/>
                            </div>}
                        </div>
                    </Link>
                )}
            </div>}
            {(loaded && projects.length !== 0) && <div>
                <Button to="/project/create">Create Project</Button>
            </div>}
            {!loaded && <div className="LoadingProjects">
                Loading...
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
