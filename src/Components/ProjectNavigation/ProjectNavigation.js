import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import {FeatureFlagTypes, ProjectTypes} from "../../Common/constants";

import {Tag, Icon} from "../../Elements";
import {FeatureFlag} from "../index";

import './ProjectNavigation.scss';

class ProjectNavigation extends Component {
    render () {
        const {project} = this.props;

        return (
            <div className="ProjectNavigation">
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/transactions`}>
                    <Icon className="NavigationItem__Icon" icon="box"/>
                    <span>Transactions</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/errors`}>
                        <span>Errors</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/contracts`}>
                    <Icon className="NavigationItem__Icon" icon="file-text"/>
                    <span>Contracts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/alerts`}>
                    <Icon className="NavigationItem__Icon" icon="bell"/>
                    <span>Alerts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/analytics`}>
                    <Icon className="NavigationItem__Icon" icon="bar-chart-2"/>
                    <span>Analytics</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/releases`}>
                        <span>Deployment</span>
                    </NavLink>
                </FeatureFlag>
                {project.type === ProjectTypes.PRIVATE && <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/collaborators`}>
                    <Icon className="NavigationItem__Icon" icon="users"/>
                    <span>Collaborators</span>
                    <Tag size="small" className="MarginLeft1">
                        New
                    </Tag>
                </NavLink>}
                {project.type !== ProjectTypes.DEMO && <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/settings`}>
                    <Icon className="NavigationItem__Icon" icon="settings"/>
                    <span>Settings</span>
                </NavLink>}
            </div>
        );
    }
}

ProjectNavigation.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectNavigation;
