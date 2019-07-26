import {GET_USER_ACTION, LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FeatureFlagTypes} from "../../Common/constants";
import {TOGGLE_FEATURE_FLAG_ACTION} from "./FeatureFlag.actions";

const initialState = {
    flags: {},
};

const FeatureFlagReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        case GET_USER_ACTION:
            const isInternalUser = action.user.email.includes('@tenderly.app');

            let flags = {};

            if (isInternalUser) {
                const possibleFlags = Object.values(FeatureFlagTypes);
                flags = possibleFlags.reduce((map, key) => {
                    map[key] = false;
                    return map;
                }, {});
            }

            return {
                ...state,
                flags: {
                    ...state.flags,
                    ...flags,
                },
            };
        case TOGGLE_FEATURE_FLAG_ACTION:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    [action.featureFlag]: action.status,
                },
            };
        default:
            return state;
    }
};

export default FeatureFlagReducer;
