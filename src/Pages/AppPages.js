import React from 'react';
import {Route, Switch} from "react-router-dom";

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
            <Route path="/contracts" exact component={PublicContractsPage}/>
            <Route path="/contract/:id" exact component={PublicContractPage}/>
            <Route path="/contract/:id/error/:errorId" exact component={ErrorPage}/>
            <Route component={noMatchPage}/>
        </Switch>
    )
};

export default AppPages;
