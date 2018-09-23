import {combineReducers} from "redux";

import UserReducer from "./User/User.reducer";

const reducers = combineReducers({
    user: UserReducer,
});

export default reducers;
