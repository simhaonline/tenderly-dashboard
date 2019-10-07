import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import classNames from 'classnames';
import * as _ from "lodash";

import {ProjectTypes} from "../../Common/constants";

import {Icon, Card} from "../../Elements";
import {SimpleLoader, NoProjectsEmptyState} from "../index";

import './DashboardProjectsList.scss';

/**
 * @param {Project} project
 */
const DashboardProjectListItem = ({project}) => {
    let projectIcon = 'project';

    if (!project.isSetup) {
        projectIcon = 'code';
    }

    if (project.type === ProjectTypes.SHARED) {
        projectIcon = 'two-hexa';
    } else if (project.type === ProjectTypes.DEMO) {
        projectIcon = 'package';
    }

    return <Link to={`/${project.owner}/${project.slug}`} className="DashboardProjectListItem" key={project.id}>
        <Card className="DashboardProjectListItem__Card" clickable>
            <div className={classNames(
                "DashboardProjectListItem__IconWrapper",
                {
                    "DashboardProjectListItem__IconWrapper--Personal": project.type === ProjectTypes.PRIVATE,
                    "DashboardProjectListItem__IconWrapper--Demo": project.type === ProjectTypes.DEMO,
                    "DashboardProjectListItem__IconWrapper--Shared": project.type === ProjectTypes.SHARED,
                    "DashboardProjectListItem__IconWrapper--NotSetup": !project.isSetup,
                },
            )}>
                <Icon icon={projectIcon} className="DashboardProjectListItem__Icon"/>
            </div>
            <div className="DashboardProjectListItem__Info">
                <div className="DashboardProjectListItem__ProjectName">
                    <span>{project.name}</span>
                </div>
                <div className="DashboardProjectListItem__ProjectSlug">
                    <span>{project.getDisplaySlug()}</span>
                </div>
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
    const groupedProjects = _.groupBy(projects, 'type');

    const personalProjects = groupedProjects[ProjectTypes.PRIVATE] || [];
    const sharedProjects = groupedProjects[ProjectTypes.SHARED] || [];

    if (groupedProjects[ProjectTypes.DEMO]) {
        personalProjects.unshift(...groupedProjects[ProjectTypes.DEMO]);
    }

    return (
        <div className="DashboardProjectsList">
            {!loaded && <div className="LoadingProjects">
                <SimpleLoader/>
            </div>}
            {(loaded && projects.length === 0) && <NoProjectsEmptyState onTryExample={onTryExample}/>}
            {(loaded && projects.length !== 0) && <div>
                {(sharedProjects && sharedProjects.length > 0) && <Fragment>
                    <h2 className="DashboardProjectsList__SubHeading">Shared Projects</h2>
                    <div className="DashboardProjectsList__ListWrapper">
                        {_.sortBy(sharedProjects, 'createdAt').map(project => <DashboardProjectListItem key={project.id} project={project}/>)}
                    </div>
                    <h2 className="DashboardProjectsList__SubHeading">Personal Projects</h2>
                </Fragment>}
                <div className="DashboardProjectsList__ListWrapper">
                    {_.sortBy(personalProjects, 'createdAt').map(project => <DashboardProjectListItem key={project.id} project={project}/>)}
                    <Link to={`/project/create`} className="DashboardProjectListItem DashboardProjectListItem--Create">
                        <Card className="DashboardProjectListItem__Card" clickable>
                            <div className="DashboardProjectListItem__IconWrapper DashboardProjectListItem__IconWrapper--Create">
                                <Icon icon="plus" className="DashboardProjectListItem__Icon"/>
                            </div>
                            <div className="DashboardProjectListItem__Info">
                                <div className="DashboardProjectListItem__ProjectName">
                                    <span>Create Project</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
