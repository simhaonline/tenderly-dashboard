import {NetworkTypes} from "../../Common/constants";

import Network from "./Network.model";

import {LOG_OUT_ACTION} from "../Auth/Auth.actions";

const initialState = {
    defaultNetworks: {
        ...Object.values(NetworkTypes).reduce((data, network) => {
            data[network] = Network.buildFromNetworkType(network);

            return data;
        }, {}),
    },
    userNetworks: {},
};

const NetworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default NetworkReducer;
