import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import * as _ from "lodash";

import {ProjectTypes} from "../../Common/constants";

import {Icon, Card} from "../../Elements";
import {SimpleLoader, NoProjectsEmptyState, ProjectSetupGuide} from "../index";

import './DashboardProjectsList.scss';

const DashboardProjectListItem = ({project}) => {
    return <Link to={`/${project.owner}/${project.slug}`} className="ProjectListItem" key={project.id}>
        <Card className="ProjectListItemCard">
            <div className="ProjectNameWrapper">
                <div className="ProjectName">
                    {project.type === ProjectTypes.DEMO && <span className="DemoTag">Demo</span>}
                    <span>{project.name}</span>
                </div>
                <div className="ProjectId">
                    <span>{project.getDisplaySlug()}</span>
                </div>
            </div>
            <div className="ProjectContractInfo">
                {!!project.lastPushAt && <div className="LastDeployInfo">
                    Last Push: <span>{moment(project.lastPushAt).fromNow()}</span>
                </div>}
                {!project.lastPushAt && <div onClick={event => event.preventDefault()}>
                    <ProjectSetupGuide label="Add Contracts" project={project} size="small" color="secondary"/>
                </div>}
            </div>
        </Card>
    </Link>
};

/**
 * @param {Project[]} projects
 * @param {boolean} loaded
 * @param {Function} onTryExample
 */
const DashboardProjectsList = ({projects, loaded, onTryExample = () => {}}) => {
    return (
        <div className="DashboardProjectsList">
            {(loaded && projects.length === 0) && <NoProjectsEmptyState onTryExample={onTryExample}/>}
            {(loaded && projects.length !== 0) && <div className="ProjectList">
                {_.sortBy(projects, 'createdAt').map(project => <DashboardProjectListItem key={project.id} project={project}/>)}
                <Link to={`/project/create`} className="ProjectListItem CreateProjectItem">
                    <Card className="ProjectListItemCard">
                        <Icon icon="plus" className="CreateIcon"/>
                        <span className="Title">Create Project</span>
                        <span className="Description">Monitor a public contract or upload your private contracts.</span>
                    </Card>
                </Link>
            </div>}
            {!loaded && <div className="LoadingProjects">
                <SimpleLoader/>
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
