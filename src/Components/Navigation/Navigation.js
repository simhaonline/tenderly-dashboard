import React, {Component} from 'react';

import './Navigation.css';
import {Icon} from "../../Elements";

class Navigation extends Component {
    render() {
        return (
            <div className="Navigation">
                this is main navigation
                <Icon icon='diamond'/>
            </div>
        );
    }
}

export default Navigation;
