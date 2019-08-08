import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import {FeatureFlagTypes} from "../../Common/constants";

import {FeatureFlag} from "../index";

import './ProjectNavigation.scss';

class ProjectNavigation extends Component {
    render () {
        const {project} = this.props;

        return (
            <div className="ProjectNavigation">
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/transactions`}>
                    <span>Transactions</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/project/${project.id}/errors`}>
                        <span>Errors</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/contracts`}>
                    <span>Contracts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/analytics`}>
                    <span>Analytics</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/project/${project.id}/releases`}>
                        <span>Deployment</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/alerts`}>
                    <span>Alerts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/settings`}>
                    <span>Settings</span>
                </NavLink>
            </div>
        );
    }
}

ProjectNavigation.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectNavigation;
