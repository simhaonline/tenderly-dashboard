import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import jwt from 'jsonwebtoken';

import {Header} from "../../Elements";
import {Navigation, AppSearch} from "../index";
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";
import HeaderMessage from "../HeaderMessage/HeaderMessage";

import LogoHorizontal from './logo-horizontal.svg';
import LogoSymbol from './logo-symbol.svg';

import './AppHeader.scss';

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
                        <img className="AppLogo" src={LogoHorizontal} alt="Tenderly Logo"/>
                        <img className="AppSymbol" src={LogoSymbol} alt="Tenderly Logo"/>
                    </Link>
                    <div className="NavWrapper">
                        <Navigation/>
                    </div>
                    <div className="SearchWrapper">
                        <AppSearch/>
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
