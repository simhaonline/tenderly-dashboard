import React from 'react';
import {Link} from "react-router-dom";
import moment from "moment";
import {Bar, BarChart, YAxis} from "recharts";

import {Button, Icon} from "../../Elements";
import ProjectSetupGuide from "../ProjectSetupGuide/ProjectSetupGuide";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './DashboardProjectsList.css';
import {FeatureFlagTypes} from "../../Common/constants";
import MixPanel from "../../Utils/MixPanel";
import {SimpleLoader} from "..";

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
            <h2 className="SectionHeading">Projects</h2>
            {(loaded && projects.length === 0) && <div className="ProjectListEmptyState">
                <Icon icon="single-project" className="EmptyStateIcon"/>
                <h5 className="EmptyStateHeadline">Create your first project</h5>
                <p className="EmptyStateDescription">Upload your smart contracts or import them from Etherscan and start monitoring them. View transactions that fail in real-time and be alerted when ever that happens.</p>
                <div>
                    <Button className="EmptyStateButton" size="small" color="secondary" onClick={onTryExample} outline>Try Example Project</Button>
                    <Button className="EmptyStateButton" size="small" color="secondary" to="/project/create">Create a Project</Button>
                </div>
            </div>}
            {(loaded && projects.length !== 0) && <div className="ProjectList">
                {projects.map(project =>
                    <Link to={`/project/${project.id}`} className="ProjectListItem" key={project.id} onClick={handleProjectItemClick}>
                        <div className="ProjectNameWrapper">
                            <div className="ProjectName">{project.name}</div>
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
                                Last push: <span>{moment(project.lastPushAt).fromNow()}</span>
                            </div>}
                            {!project.lastPushAt && <div onClick={event => event.preventDefault()}>
                                <ProjectSetupGuide label="Push Contracts" project={project} size="extra-small" color="secondary"/>
                            </div>}
                        </div>
                    </Link>
                )}
                <Link to={`/project/create`} className="ProjectListItem CreateProjectItem" onClick={handleCreateProjectClick}>
                    <Icon icon="plus" className="CreateIcon"/>
                    <span>Create Project</span>
                </Link>
            </div>}
            {!loaded && <div className="LoadingProjects">
                <SimpleLoader/>
            </div>}
        </div>
    )
};

export default DashboardProjectsList;
