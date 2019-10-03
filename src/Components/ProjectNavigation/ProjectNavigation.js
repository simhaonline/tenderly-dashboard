import React , {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";

import {FeatureFlagTypes} from "../../Common/constants";

import {Tag} from "../../Elements";
import {FeatureFlag} from "../index";

import './ProjectNavigation.scss';

class ProjectNavigation extends Component {
    render () {
        const {project} = this.props;

        return (
            <div className="ProjectNavigation">
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/transactions`}>
                    <span>Transactions</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/errors`}>
                        <span>Errors</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/contracts`}>
                    <span>Contracts</span>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/alerts`}>
                    <span>Alerts</span>
                    <Tag size="small" className="MarginLeft1">
                        New
                    </Tag>
                </NavLink>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/analytics`}>
                    <span>Analytics</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/releases`}>
                        <span>Deployment</span>
                    </NavLink>
                </FeatureFlag>
                <NavLink className="NavigationItem" strict to={`/${project.owner}/${project.slug}/settings`}>
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
