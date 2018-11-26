import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {PrivateRoute} from "../Components";
import PublicContractsPage from "./PublicContracts/PublicContractsPage";
import PublicContractPage from "./PublicContracts/PublicContractPage";
import PublicContractSourcePage from "./PublicContracts/PublicContractSourcePage";
import ErrorPage from "./Error/ErrorPage";
import LoginPage from "./Public/LoginPage";
import DashboardPage from "./Dashboard/DashboardPage";
import CreateProjectPage from "./Project/CreateProjectPage";
import ProjectPage from "./Project/ProjectPage";
import OnboardingPage from "./Onboarding/OnboardingPage";

const noMatchPage = () => (
    <div>
        woah 404
    </div>
);

const AppPages = () => {
    return (
        <Switch>
            <PrivateRoute path="/dashboard" exact component={DashboardPage}/>
            <PrivateRoute path="/project/create" exact component={CreateProjectPage}/>
            <PrivateRoute path="/project/:id" component={ProjectPage}/>
            <PrivateRoute path="/onboarding" exact component={OnboardingPage}/>
            <Route path="/login" exact component={LoginPage}/>
            <PrivateRoute path="/public-contracts/:network" exact component={PublicContractsPage}/>
            <PrivateRoute path="/contract/:network/:id" exact component={PublicContractPage}/>
            <PrivateRoute path="/contract/:network/:id/source" exact component={PublicContractSourcePage}/>
            <PrivateRoute path="/contract/:network/:id/error/:errorId" exact component={ErrorPage}/>
            <Redirect exact from="/" to="/login"/>
            <Route component={noMatchPage}/>
        </Switch>
    )
};

export default AppPages;
