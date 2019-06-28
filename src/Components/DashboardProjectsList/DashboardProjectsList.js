import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import {Bar, BarChart, YAxis} from "recharts";

import MixPanel from "../../Utils/MixPanel";

import {FeatureFlagTypes, ProjectTypes} from "../../Common/constants";

import {Icon, Card} from "../../Elements";
import {SimpleLoader, NoProjectsEmptyState, ProjectSetupGuide, FeatureFlag} from "../index";

import './DashboardProjectsList.scss';

const handleProjectItemClick = () => {
    MixPanel.track('navigate_project');
};

const handleCreateProjectClick = () => {
    MixPanel.track('navigate_create_project');
};

const DashboardProjectsList = ({projects, loaded, onTryExample = () => {}}) => {
    const data = [
        {name: 'Page A', events: 0.1,},
        {name: 'Page B', events: 0.1,},
        {name: 'Page C', events: 0.1,},
        {name: 'Page D', events: 0.1,},
        {name: 'Page E', events: 0.1,},
        {name: 'Page F', events: 0.1,},
        {name: 'Page G', events: 0.1,},
        {name: 'Page G', events: 0.1,},
        {name: 'Page G', events: 0.1,},
        {name: 'Page G', events: 0.1,},
        {name: 'Page G', events: 0.1,},
        {name: 'Page G', events: 4,},
        {name: 'Page G', events: 0.1,},
        {name: 'Page G', events: 0.1,},
    ];

    return (
        <div className="DashboardProjectsList">
            {(loaded && projects.length === 0) && <NoProjectsEmptyState onTryExample={onTryExample}/>}
            {(loaded && projects.length !== 0) && <div className="ProjectList">
                {projects.map(project =>
                    <Link to={`/project/${project.id}`} className="ProjectListItem" key={project.id} onClick={handleProjectItemClick}>
                        <Card className="ProjectListItemCard">
                            <div className="ProjectNameWrapper">
                                <div className="ProjectName">
                                    {project.type === ProjectTypes.DEMO && <span className="DemoTag">Demo</span>}
                                    <span>{project.name}</span>
                                </div>
                                <div className="ProjectId">{project.id}</div>
                            </div>
                            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                                <div className="ProjectChartWrapper">
                                    {!!project.lastPushAt && <BarChart width={220} height={80} data={data}>
                                        <YAxis type="number" domain={[0,  dataMax => Math.max(dataMax, 8)]} hide/>
                                        <Bar dataKey='events' fill='#df0074'/>
                                    </BarChart>}
                                    {!project.lastPushAt && <div className="ProjectNotSetupState">
                                        <Icon icon="cloud-off"/>
                                        <span>Not contracts pushed yet</span>
                                    </div>}
                                </div>
                            </FeatureFlag>
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
                )}
                <Link to={`/project/create`} className="ProjectListItem CreateProjectItem" onClick={handleCreateProjectClick}>
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
