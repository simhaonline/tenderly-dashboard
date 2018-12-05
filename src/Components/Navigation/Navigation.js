import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import {Icon} from "../../Elements";
import FeatureFlag from "../FeatureFlag/FeatureFlag";

import './Navigation.css';
import {FeatureFlagTypes} from "../../Common/constants";

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation">
                <NavLink className="HeaderNavItem" exact to="/dashboard">
                    <Icon icon="project" className="NavIcon"/>
                    Dashboard
                </NavLink>
                <FeatureFlag flag={FeatureFlagTypes.COMING_SOON}>
                    <NavLink className="HeaderNavItem" exact to="/public-contracts/kovan">
                        <Icon icon="diamond" className="NavIcon"/>
                        Contracts
                    </NavLink>
                    <a className="HeaderNavItem" rel="noopener noreferrer" target="_blank" href="https://docs.tenderly.app">
                        <Icon icon="file-text" className="NavIcon"/>
                        Documentation
                    </a>
                </FeatureFlag>
            </div>
        );
    }
}

export default Navigation;
