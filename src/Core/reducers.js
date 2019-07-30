import {combineReducers} from "redux";

import AuthReducer from "./Auth/Auth.reducer";
import PublicContractsReducer from "./PublicContracts/PublicContracts.reducer";
import EventReducer from "./Event/Event.reducer";
import ProjectReducer from "./Project/Project.reducer";
import ContractReducer from "./Contract/Contract.reducer";
import AppReducer from "./App/App.reducer";
import FeatureFlagReducer from "./FeatureFlag/FeatureFlag.reducer";
import TransactionReducer from "./Transaction/Transaction.reducer";
import AlertingReducer from "./Alerting/Alerting.reducer";

const reducers = combineReducers({
    auth: AuthReducer,
    publicContracts: PublicContractsReducer,
    event: EventReducer,
    project: ProjectReducer,
    contract: ContractReducer,
    app: AppReducer,
    transaction: TransactionReducer,
    featureFlag: FeatureFlagReducer,
    alerting: AlertingReducer,
});

export default reducers;
