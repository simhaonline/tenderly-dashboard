import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Link, NavLink, withRouter} from "react-router-dom";
import jwt from 'jsonwebtoken';

import {Header, Icon} from "../../Elements";
import {AppSearch, TenderlyLogo, ProjectPicker} from "../index";
import SessionHeaderMenu from "../SessionHeaderMenu/SessionHeaderMenu";
import HeaderMessage from "../HeaderMessage/HeaderMessage";

import './AppHeader.scss';
import {getProject} from "../../Common/Selectors/ProjectSelectors";

class AppHeader extends Component {
    render() {
        const {wholeScreenPage, token, project, loggedIn} = this.props;

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
                        <TenderlyLogo className="AppLogo"/>
                        <TenderlyLogo className="AppSymbol" symbol/>
                    </Link>
                    {loggedIn && <div className="ProjectContextWrapper">
                        <ProjectPicker project={project}/>
                    </div>}
                    <div className="SearchWrapper">
                        <AppSearch/>
                    </div>
                    <div className="HideMobile ExplorerLinkWrapper">
                        <NavLink to="/explorer" className="ExplorerLink">
                            <Icon icon="compass"/>
                            <span> Explorer</span>
                        </NavLink>
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
    const projectId = state.search.currentProject;
    const project = getProject(state, state.search.currentProject);

    return {
        projectId,
        project,
        wholeScreenPage: state.app.wholeScreenPage,
        token: state.auth.token,
        loggedIn: state.auth.loggedIn,
    }
};

export default withRouter(connect(
    mapStateToProps,
    null,
)(AppHeader));
