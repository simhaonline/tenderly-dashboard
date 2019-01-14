import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

import {Header} from "../../Elements";

import Navigation from "../Navigation/Navigation";
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";

import LogoImage from './logo-horizontal.svg';

import './AppHeader.css';

class AppHeader extends Component {
    render() {
        const {wholeScreenPage} = this.props;

        if (wholeScreenPage) {
            return null;
        }

        return (
            <Header id="AppHeader">
                <Link to="/" className="LogoWrapper">
                    <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                    <span className="AppState">Alpha</span>
                </Link>
                <div className="NavWrapper">
                    <Navigation/>
                </div>
                <div className="SessionWrapper">
                    <SessionHeaderMenu/>
                </div>
                <div className="KovanInformation">
                    <div className="InfoTitle">Currently supports <strong>Mainnet</strong>, <strong>Ropsten Testnet</strong>, <strong>Rinkeby Testnet</strong> and <strong>Kovan Testnet</strong> </div>
                </div>
            </Header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wholeScreenPage: state.app.wholeScreenPage,
    }
};

export default withRouter(connect(
    mapStateToProps,
    null,
)(AppHeader));
