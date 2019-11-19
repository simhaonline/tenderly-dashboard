import React, {Fragment} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import {PrivateRoute} from "../Components";
import ExplorerPage from "./PublicContracts/ExplorerPage";
import PublicContractPage from "./PublicContracts/PublicContractPage";
import LoginPage from "./Public/LoginPage";
import DashboardPage from "./Dashboard/DashboardPage";
import CreateProjectPage from "./Project/CreateProjectPage";
import ProjectPage from "./Project/ProjectPage";
import OnboardingPage from "./Onboarding/OnboardingPage";
import AccountSettingsPage from "./User/AccountSettingsPage";
import RegisterPage from "./Public/RegisterPage";
import OAuthPage from "./Public/OAuthPage";
import NotFoundPage from "./Public/NotFoundPage";
import AccountRecoveryPage from "./Public/AccountRecoveryPage";
import ResetPasswordPage from "./Public/ResetPasswordPage";
import PublicContractTransactionPage from "./PublicContracts/PublicContractTransactionPage";
import RedirectToProjectPage from "./Project/RedirectToProjectPage";
import AcceptInvitationPage from "./Project/AcceptInvitationPage";
import VerifyEmailPage from "./Public/VerifyEmailPage";

import Project from "../Core/Project/Project.model";
import ProFeaturePage from "./Public/ProFeaturePage";

const AppPages = ({loggedIn, initialContext, projectContext}) => {
    let projectOwner, projectSlug;

    if (projectContext || initialContext) {
        const {slug, username} = Project.getSlugAndUsernameFromId(projectContext || initialContext);

        projectOwner = username;
        projectSlug = slug;
    }

    return (
        <Switch>
            <PrivateRoute path="/dashboard" exact component={DashboardPage}/>
            <PrivateRoute path="/project/create" exact component={CreateProjectPage}/>
            <PrivateRoute path="/onboarding" exact component={OnboardingPage}/>
            <PrivateRoute path="/account/:tab?" component={AccountSettingsPage}/>
            <PrivateRoute path="/verify-email" exact component={VerifyEmailPage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/oauth/:service" exact component={OAuthPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/account-recovery" exact component={AccountRecoveryPage}/>
            <Route path="/reset-password" exact component={ResetPasswordPage}/>
            <Route path="/explorer" exact component={ExplorerPage}/>
            <Route path="/contract/:network/:address" strict component={PublicContractPage}/>
            <Route path="/tx/:network/:txHash/:tab?" strict component={PublicContractTransactionPage}/>
            <Route path="/analytics" exact render={() => <ProFeaturePage feature="analytics"/>}/>
            <Route path="/alerts" exact render={() => <ProFeaturePage feature="alerting"/>}/>
            <Route path="/private-networks" exact render={() => <ProFeaturePage feature="private_networks"/>}/>
            <Route path="/accept-invitation" exact component={AcceptInvitationPage}/>
            <PrivateRoute path="/project/:slug" component={RedirectToProjectPage}/>
            <PrivateRoute path="/:username/:slug" strict component={ProjectPage}/>
            {loggedIn && <Fragment>
                {(!projectContext || !initialContext) && <Redirect exact from="/" to="/dashboard"/>}
                {(!!projectContext || !!initialContext) && <Redirect exact from="/" to={`/${projectOwner}/${projectSlug}`}/>}
            </Fragment>}
            {!loggedIn && <Redirect exact from="/" to="/explorer"/>}
            <Redirect exact from="/public-contracts" to="/explorer"/>
            <Route component={NotFoundPage}/>
        </Switch>
    )
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
        projectContext: state.search.currentProject,
    };
};

export default connect(
    mapStateToProps,
    null,
)(AppPages);
