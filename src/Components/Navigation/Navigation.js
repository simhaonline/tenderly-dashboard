import React, {Component} from 'react';

import './Navigation.css';
import {Icon} from "../../Elements";
import {NavLink} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation">
                <NavLink className="HeaderNavItem" exact to="/private">
                    <Icon icon='project'/>
                    Dashboard
                </NavLink>
                <NavLink className="HeaderNavItem" exact to="/contracts">
                    <Icon icon='diamond'/>
                    Public Contracts
                </NavLink>
            </div>
        );
    }
}

export default Navigation;
