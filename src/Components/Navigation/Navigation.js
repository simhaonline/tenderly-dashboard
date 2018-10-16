import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

import {Icon} from "../../Elements";

import './Navigation.css';

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation">
                <NavLink className="HeaderNavItem" exact to="/private">
                    <Icon icon="project" className="NavIcon"/>
                    Dashboard
                </NavLink>
                <NavLink className="HeaderNavItem" exact to="/public-contracts/kovan">
                    <Icon icon="diamond" className="NavIcon"/>
                    Public Contracts
                </NavLink>
            </div>
        );
    }
}

export default Navigation;
