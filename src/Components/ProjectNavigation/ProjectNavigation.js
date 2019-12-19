import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import {FeatureFlagTypes, ProjectTypes} from "../../Common/constants";

import {Icon} from "../../Elements";
import {FeatureFlag} from "../index";

import './ProjectNavigation.scss';

class ProjectNavigation extends Component {
    render () {
        const {project} = this.props;

        return (
            <div className="ProjectNavigation">
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/transactions`}>
                    <Icon className="NavigationItem__Icon" icon="box"/>
                    <span className="HideMobile">Transactions</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/errors`}>
                        <span className="HideMobile">Errors</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/contracts`}>
                    <Icon className="NavigationItem__Icon" icon="file-text"/>
                    <span className="HideMobile">Contracts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/alerts`}>
                    <Icon className="NavigationItem__Icon" icon="bell"/>
                    <span className="HideMobile">Alerts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/analytics`}>
                    <Icon className="NavigationItem__Icon" icon="bar-chart-2"/>
                    <span className="HideMobile">Analytics</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/releases`}>
                        <span className="HideMobile">Deployment</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/collaborators`}>
                    <Icon className="NavigationItem__Icon" icon="users"/>
                    <span className="HideMobile">Collaborators</span>
                </NavLink>
                {project.type !== ProjectTypes.DEMO && <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/settings`}>
                    <Icon className="NavigationItem__Icon" icon="settings"/>
                    <span className="HideMobile">Settings</span>
                </NavLink>}
            </div>
        );
    }
}

ProjectNavigation.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectNavigation;
