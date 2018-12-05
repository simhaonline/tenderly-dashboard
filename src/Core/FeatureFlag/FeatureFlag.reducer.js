import _ from 'lodash';

import {GET_USER_ACTION} from "../Auth/Auth.actions";
import {FeatureFlagTypes} from "../../Common/constants";
import {TOGGLE_FEATURE_FLAG_ACTION} from "./FeatureFlag.actions";

const initialState = {
    flags: {},
};

const FeatureFlagReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_ACTION:
            const isInternalUser = action.user.email.includes('@tenderly.app');

            let flags = {};

            if (isInternalUser) {
                flags = _.mapValues(FeatureFlagTypes, () => { return true; });
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
                },
            };
        default:
            return state;
    }
};

export default FeatureFlagReducer;
