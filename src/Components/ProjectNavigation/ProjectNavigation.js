import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import MixPanel from "../../Utils/MixPanel";
import {FeatureFlagTypes} from "../../Common/constants";

import {FeatureFlag} from "../index";

import './ProjectNavigation.scss';

class ProjectNavigation extends Component {
    trackNavigationItem = (navItem) => {
        MixPanel.track(`navigate_project_${navItem}`);
    };

    render () {
        const {project} = this.props;

        return (
            <div className="ProjectNavigation">
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/transactions`} onClick={() => this.trackNavigationItem('transactions')}>
                    <span>Transactions</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/project/${project.id}/errors`} onClick={() => this.trackNavigationItem('errors')}>
                        <span>Errors</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/contracts`} onClick={() => this.trackNavigationItem('contracts')}>
                    <span>Contracts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/analytics`} onClick={() => this.trackNavigationItem('analytics')}>
                    <span>Analytics</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/project/${project.id}/releases`} onClick={() => this.trackNavigationItem('deployment')}>
                        <span>Deployment</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/alerts`} onClick={() => this.trackNavigationItem('alerts')}>
                    <span>Alerts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/project/${project.id}/settings`} onClick={() => this.trackNavigationItem('settings')}>
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
