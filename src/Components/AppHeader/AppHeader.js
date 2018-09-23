import React, {Component} from 'react';

import {Header} from "../../Elements";

import Navigation from "../Navigation/Navigation";
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";

class AppHeader extends Component {
    render() {
        return (
            <Header>
                <div className="Logo">Tenderly</div>
                <div className="NavWrapper">
                    <Navigation/>
                </div>
                <div className="SessionWrapper">
                    <SessionHeaderMenu/>
                </div>
            </Header>
        )
    }
}

export default AppHeader;
