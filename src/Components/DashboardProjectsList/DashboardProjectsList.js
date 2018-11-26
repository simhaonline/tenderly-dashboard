import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import {Bar, BarChart, YAxis} from "recharts";

import {Button, Icon} from "../../Elements";
import ProjectSetupGuide from "../ProjectSetupGuide/ProjectSetupGuide";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './DashboardProjectsList.css';

const DashboardProjectsList = ({projects, loaded}) => {
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
                        <div className="ProjectNameWrapper">
                            <div className="ProjectName">{project.name}</div>
                            <div className="ProjectId">{project.id}</div>
                        </div>
                        <FeatureFlag>
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
                                Last deployment: <span>{moment(project.lastPushAt).fromNow()}</span>
                            </div>}
                            {!project.lastPushAt && <div onClick={event => event.preventDefault()}>
                                <ProjectSetupGuide label="Push Contracts" projectId={project.id} size="extra-small" color="secondary"/>
                            </div>}
                        </div>
                    </Link>
                )}
            </div>}
            {(loaded && projects.length !== 0) && <div>
                <Button size="small" outline to="/project/create">Create Project</Button>
            </div>}
            {!loaded && <div className="LoadingProjects">
                Loading...
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
