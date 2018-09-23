import {combineReducers} from "redux";

import AuthReducer from "./Auth/Auth.reducer";

const reducers = combineReducers({
    auth: AuthReducer,
});

export default reducers;
