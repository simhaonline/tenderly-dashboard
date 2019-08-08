import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import {Area, AreaChart, YAxis, Tooltip} from "recharts";

import {FeatureFlagTypes, ProjectTypes} from "../../Common/constants";

import {Icon, Card} from "../../Elements";
import {SimpleLoader, NoProjectsEmptyState, ProjectSetupGuide, FeatureFlag} from "../index";

import './DashboardProjectsList.scss';

const DashboardProjectsList = ({projects, loaded, onTryExample = () => {}}) => {
    const data = [
        {name: 'Page A', transactions: 1,},
        {name: 'Page B', transactions: 2,},
        {name: 'Page C', transactions: 0,},
        {name: 'Page D', transactions: 0,},
        {name: 'Page E', transactions: 5,},
        {name: 'Page F', transactions: 11,},
        {name: 'Page G', transactions: 17,},
        {name: 'Page G', transactions: 2,},
        {name: 'Page G', transactions: 3,},
        {name: 'Page G', transactions: 1,},
        {name: 'Page G', transactions: 2,},
        {name: 'Page G', transactions: 4,},
        {name: 'Page G', transactions: 27,},
        {name: 'Page G', transactions: 0,},
        {name: 'Page G', transactions: 2,},
    ];

    return (
        <div className="DashboardProjectsList">
            {(loaded && projects.length === 0) && <NoProjectsEmptyState onTryExample={onTryExample}/>}
            {(loaded && projects.length !== 0) && <div className="ProjectList">
                {projects.map(project =>
                    <Link to={`/project/${project.id}`} className="ProjectListItem" key={project.id}>
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
                                    {!!project.lastPushAt && <AreaChart width={250} height={90} data={data}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="15%" stopColor="#0076FF" stopOpacity={0.75}/>
                                                <stop offset="100%" stopColor="#0076FF" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Tooltip cursor={{ stroke: 'rgba(0,118,255,0.25)', strokeWidth: 1 }} contentStyle={{
                                            backgroundColor: 'rgba(8,20,33,0.8)',
                                            border: 'none',
                                            borderRadius: '4px',
                                        }}/>
                                        <YAxis type="number" domain={[0,  dataMax => Math.max(dataMax, 8)]} hide/>
                                        <Area type="monotone" xAxisId="name" dataKey="transactions" stroke="#0076FF" fill="url(#colorUv)" />
                                    </AreaChart>}
                                    {!project.lastPushAt && <div className="ProjectNotSetupState">
                                        <Icon icon="cloud-off"/>
                                        <span>Not contracts pushed yet</span>
                                    </div>}
                                </div>
                            </FeatureFlag>
                            <FeatureFlag flag={FeatureFlagTypes.COMING_SOON} reverse>
                                <div className="ProjectContractInfo">
                                    {!!project.lastPushAt && <div className="LastDeployInfo">
                                        Last Push: <span>{moment(project.lastPushAt).fromNow()}</span>
                                    </div>}
                                    {!project.lastPushAt && <div onClick={event => event.preventDefault()}>
                                        <ProjectSetupGuide label="Add Contracts" project={project} size="small" color="secondary"/>
                                    </div>}
                                </div>
                            </FeatureFlag>
                        </Card>
                    </Link>
                )}
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
