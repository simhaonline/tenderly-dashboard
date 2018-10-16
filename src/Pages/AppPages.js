import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {PrivateRoute} from "../Components";
import PublicContractsPage from "./PublicContracts/PublicContractsPage";
import PublicContractPage from "./PublicContracts/PublicContractPage";
import ErrorPage from "./Error/ErrorPage";

const loginPages = () => (
    <div>
        login page
    </div>
);

const privatePages = () => (
    <div>
        private
    </div>
);

const noMatchPage = () => (
    <div>
        woah 404
    </div>
);

const AppPages = () => {
    return (
        <Switch>
            <PrivateRoute path="/private" exact component={privatePages}/>
            <Route path="/login" exact component={loginPages}/>
            <Route path="/public-contracts/:network" exact component={PublicContractsPage}/>
            <Route path="/contract/:network/:id" exact component={PublicContractPage}/>
            <Route path="/contract/:network/:id/error/:errorId" exact component={ErrorPage}/>
            <Redirect exact from="/" to="/public-contracts/kovan"/>
            <Route component={noMatchPage}/>
        </Switch>
    )
};

export default AppPages;
