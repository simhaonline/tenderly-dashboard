import {combineReducers} from "redux";

import AuthReducer from "./Auth/Auth.reducer";
import PublicContractsReducer from "./PublicContracts/PublicContracts.reducer";
import ProjectReducer from "./Project/Project.reducer";
import ContractReducer from "./Contract/Contract.reducer";
import AppReducer from "./App/App.reducer";
import FeatureFlagReducer from "./FeatureFlag/FeatureFlag.reducer";
import TransactionReducer from "./Transaction/Transaction.reducer";
import AlertingReducer from "./Alerting/Alerting.reducer";
import NotificationReducer from "./Notification/Notification.reducer";
import NetworkReducer from "./Network/Network.reducer";
import CollaborationReducer from "./Collaboration/Collaboration.reducer";
import SearchReducer from "./Search/Search.reducer";
import WalletReducer from "./Wallet/Wallet.reducer";
import BillingReducer from "./Billing/Billing.reducer";
import AnalyticsReducer from "./Analytics/Analytics.reducer";
import SimulatorReducer from "./Simulator/Simulator.reducer";

const reducers = combineReducers({
    auth: AuthReducer,
    publicContracts: PublicContractsReducer,
    project: ProjectReducer,
    contract: ContractReducer,
    wallet: WalletReducer,
    app: AppReducer,
    transaction: TransactionReducer,
    featureFlag: FeatureFlagReducer,
    alerting: AlertingReducer,
    notification: NotificationReducer,
    network: NetworkReducer,
    collaboration: CollaborationReducer,
    search: SearchReducer,
    billing: BillingReducer,
    analytics: AnalyticsReducer,
    simulator: SimulatorReducer,
});

export default reducers;
