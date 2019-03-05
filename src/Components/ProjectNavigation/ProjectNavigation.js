import React from 'react';
import {NavLink} from "react-router-dom";

import MixPanel from "../../Utils/MixPanel";
import {FeatureFlagTypes} from "../../Common/constants";

import {Container, Button, Icon} from "../../Elements";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './ProjectNavigation.css';

const ProjectNavigation = ({project}) => {
    const trackNavigationItem = (navItem) => {
        MixPanel.track(`navigate_project_${navItem}`);
    };

    return (
        <Container>
            <div className="ProjectNavigation">
                <div className="ProjectHeading">
                    <Button to={"/dashboard"} outline>
                        <Icon icon="corner-up-left"/>
                    </Button>
                    <div className="ProjectName">
                        {project.name}
                    </div>
                </div>
                <div className="NavigationItems">
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/events`} onClick={() => trackNavigationItem('events')}>
                        <span>Events</span>
                    </NavLink>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/contracts`} onClick={() => trackNavigationItem('contracts')}>
                        <span>Contracts</span>
                    </NavLink>
                    <FeatureFlag flag={FeatureFlagTypes.ANALYTICS}>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/analytics`} onClick={() => trackNavigationItem('analytics')}>
                            <span>Analytics</span>
                        </NavLink>
                    </FeatureFlag>
                    <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/releases`} onClick={() => trackNavigationItem('deployment')}>
                            <span>Deployment</span>
                        </NavLink>
                    </FeatureFlag>
                    <FeatureFlag flag={FeatureFlagTypes.ALERTS}>
                        <NavLink className="NavigationItem" exact to={`/project/${project.id}/alerts`} onClick={() => trackNavigationItem('alerts')}>
                            <span>Alerts</span>
                        </NavLink>
                    </FeatureFlag>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/settings`} onClick={() => trackNavigationItem('settings')}>
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </Container>
    );
};

export default ProjectNavigation;
