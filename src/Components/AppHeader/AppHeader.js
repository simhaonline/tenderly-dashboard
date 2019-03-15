import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import jwt from 'jsonwebtoken';

import {Header} from "../../Elements";

import Navigation from "../Navigation/Navigation";
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";
import HeaderMessage from "../HeaderMessage/HeaderMessage";

import LogoImage from './logo-horizontal.svg';

import './AppHeader.css';

class AppHeader extends Component {
    render() {
        const {wholeScreenPage, token} = this.props;

        if (wholeScreenPage) {
            return null;
        }

        let decodedToken = {};

        if (token) {
            decodedToken = jwt.decode(token);
        }

        return (
            <Fragment>
                {decodedToken.impersonate && <HeaderMessage color="purple" message="Impersonating Mode"/>}
                <Header id="AppHeader">
                    <Link to="/" className="LogoWrapper">
                        <img className="AppLogo" src={LogoImage} alt="Tenderly Logo"/>
                        <span className="AppState">BETA</span>
                    </Link>
                    <div className="NavWrapper">
                        <Navigation/>
                    </div>
                    <div className="SessionWrapper">
                        <SessionHeaderMenu/>
                    </div>
                </Header>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        wholeScreenPage: state.app.wholeScreenPage,
        token: state.auth.token,
    }
};

export default withRouter(connect(
    mapStateToProps,
    null,
)(AppHeader));
