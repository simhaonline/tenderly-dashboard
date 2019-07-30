import {FETCH_ALERT_RULE_FOR_PROJECT_ACTION, FETCH_ALERT_RULES_FOR_PROJECT_ACTION} from "./Alerting.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {EntityStatusTypes} from "../../Common/constants";

const initialState = {
    rules: {},
    projectRules: {},
    projectRulesLoaded: {},
};

const AlertingReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALERT_RULES_FOR_PROJECT_ACTION:
            return {
                ...state,
                rules: {
                    ...state.rules,
                    ...action.rules.reduce((data, rule) => {
                        data[rule.id] = rule;
                        return data;
                    }, {}),
                },
                projectRules: {
                    ...state.projectRules,
                    [action.projectId]: action.rules.map(rule => rule.id),
                },
                projectRulesLoaded: {
                    ...state.projectRulesLoaded,
                    [action.projectId]: EntityStatusTypes.LOADED,
                },
            };
        case FETCH_ALERT_RULE_FOR_PROJECT_ACTION:
            return state;
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default AlertingReducer;
