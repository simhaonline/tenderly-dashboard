import React from 'react';
import {NavLink} from "react-router-dom";

import {Container, Button, Icon} from "../../Elements";

import './ProjectNavigation.css';

const ProjectNavigation = ({project}) => {
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
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/events`}>
                        <span>Events</span>
                    </NavLink>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/contracts`}>
                        <span>Contracts</span>
                    </NavLink>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/usage`}>
                        <span>Analytics</span>
                    </NavLink>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/releases`}>
                        <span>Deployment</span>
                    </NavLink>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/alerts`}>
                        <span>Alerts</span>
                    </NavLink>
                    <NavLink className="NavigationItem" exact to={`/project/${project.id}/settings`}>
                        <span>Settings</span>
                    </NavLink>
                </div>
            </div>
        </Container>
    );
};

export default ProjectNavigation;
