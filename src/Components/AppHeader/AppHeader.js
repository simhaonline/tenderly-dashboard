import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {Header} from "../../Elements";

import Navigation from "../Navigation/Navigation";
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";

import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <Header id="AppHeader">
                <Link to="/" className="LogoWrapper">
                    <span className="AppLogo">Tenderly</span>
                    <span className="AppState">Alpha v0.1</span>
                </Link>
                <div className="NavWrapper">
                    <Navigation/>
                </div>
                <div className="SessionWrapper">
                    <SessionHeaderMenu/>
                </div>
                <div className="KovanInformation">
                    <div className="InfoTitle">Currently only <strong>Kovan Testnet</strong> is supported</div>
                </div>
            </Header>
        )
    }
}

export default AppHeader;
