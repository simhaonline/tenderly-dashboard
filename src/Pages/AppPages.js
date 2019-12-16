import React from 'react';
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
import IntegrationsPage from "./Public/IntegrationsPage";

const AppPages = ({loggedIn}) => {
    return (
        <Switch>
            <PrivateRoute path="/dashboard" exact component={DashboardPage}/>
            <PrivateRoute path="/project/create" exact component={CreateProjectPage}/>
            <PrivateRoute path="/onboarding" exact component={OnboardingPage}/>
            <PrivateRoute path="/account/:tab?" component={AccountSettingsPage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/oauth/:service" exact component={OAuthPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/integration" exact component={IntegrationsPage}/>
            <Route path="/account-recovery" exact component={AccountRecoveryPage}/>
            <Route path="/reset-password" exact component={ResetPasswordPage}/>
            <Route path="/explorer" exact component={ExplorerPage}/>
            <Route path="/contract/:network/:id" strict component={PublicContractPage}/>
            <Route path="/tx/:network/:txHash/:tab?" strict component={PublicContractTransactionPage}/>
            <Route path="/accept-invitation" exact component={AcceptInvitationPage}/>
            <PrivateRoute path="/project/:slug" component={RedirectToProjectPage}/>
            <PrivateRoute path="/:username/:slug" strict component={ProjectPage}/>
            {loggedIn && <Redirect exact from="/" to="/dashboard"/>}
            {!loggedIn && <Redirect exact from="/" to="/explorer"/>}
            <Redirect exact from="/public-contracts" to="/explorer"/>
            <Route component={NotFoundPage}/>
        </Switch>
    )
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn,
    };
};

export default connect(
    mapStateToProps,
    null,
)(AppPages);
