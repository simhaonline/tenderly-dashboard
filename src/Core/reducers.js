import {combineReducers} from "redux";

import AuthReducer from "./Auth/Auth.reducer";
import PublicContractsReducer from "./PublicContracts/PublicContracts.reducer";
import EventReducer from "./Event/Event.reducer";
import ProjectReducer from "./Project/Project.reducer";
import ContractReducer from "./Contract/Contract.reducer";

const reducers = combineReducers({
    auth: AuthReducer,
    publicContracts: PublicContractsReducer,
    event: EventReducer,
    project: ProjectReducer,
    contract: ContractReducer,
});

export default reducers;
