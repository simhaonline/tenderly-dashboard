import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import {Icon} from "../../Elements";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './Navigation.scss';
import {FeatureFlagTypes} from "../../Common/constants";

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation">
                <NavLink className="HeaderNavItem" exact to="/dashboard">
                    <Icon icon="project" className="NavIcon DisplayMobile"/>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink className="HeaderNavItem" exact to="/public-contracts">
                    <Icon icon="diamond" className="NavIcon DisplayMobile"/>
                    <span>Public Contracts</span>
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <a className="HeaderNavItem" rel="noopener noreferrer" target="_blank" href="https://docs.tenderly.dev">
                        <Icon icon="file-text" className="NavIcon"/>
                        Documentation
                    </a>
                </FeatureFlag>
            </div>
        );
    }
}

export default Navigation;
