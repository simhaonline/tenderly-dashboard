import {combineReducers} from "redux";

import AuthReducer from "./Auth/Auth.reducer";
import PublicContractsReducer from "./PublicContracts/PublicContracts.reducer";
import EventReducer from "./Event/Event.reducer";

const reducers = combineReducers({
    auth: AuthReducer,
    publicContracts: PublicContractsReducer,
    event: EventReducer,
});

export default reducers;
