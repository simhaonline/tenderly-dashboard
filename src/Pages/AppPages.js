import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {PrivateRoute} from "../Components";
import PublicContractsPage from "./PublicContracts/PublicContractsPage";
import PublicContractPage from "./PublicContracts/PublicContractPage";
import PublicContractSourcePage from "./PublicContracts/PublicContractSourcePage";
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

const AppPages = () => {
    return (
        <Switch>
            <PrivateRoute path="/dashboard" exact component={DashboardPage}/>
            <PrivateRoute path="/project/create" exact component={CreateProjectPage}/>
            <PrivateRoute path="/project/:id" component={ProjectPage}/>
            <PrivateRoute path="/onboarding" exact component={OnboardingPage}/>
            <PrivateRoute path="/account/:tab?" component={AccountSettingsPage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/oauth/:service" exact component={OAuthPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/account-recovery" exact component={AccountRecoveryPage}/>
            <Route path="/reset-password" exact component={ResetPasswordPage}/>
            <Route path="/public-contracts/:network" exact component={PublicContractsPage}/>
            <Route path="/contract/:network/:id" exact component={PublicContractPage}/>
            <Route path="/contract/:network/:id/source" exact component={PublicContractSourcePage}/>
            <Route path="/contract/:network/:id/tx/:txHash" exact component={PublicContractTransactionPage}/>
            <Redirect exact from="/" to="/login"/>
            <Route component={NotFoundPage}/>
        </Switch>
    )
};

export default AppPages;
