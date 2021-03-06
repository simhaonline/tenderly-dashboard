import {
    CREATE_ALERT_RULE_FOR_PROJECT_ACTION, DELETE_ALERT_RULE_FOR_PROJECT_ACTION,
    FETCH_ALERT_RULE_FOR_PROJECT_ACTION,
    FETCH_ALERT_RULES_FOR_PROJECT_ACTION, UPDATE_ALERT_RULE_FOR_PROJECT_ACTION
} from "./Alerting.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {EntityStatusTypes} from "../../Common/constants";
import {DELETE_COLLABORATOR_FOR_PROJECT_ACTION} from "../Collaboration/Collaboration.actions";

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
        case DELETE_COLLABORATOR_FOR_PROJECT_ACTION:
            return {
                ...state,
                projectRulesLoaded: {
                    ...state.projectRulesLoaded,
                    [action.projectId]: EntityStatusTypes.NOT_LOADED,
                },
            };
        case FETCH_ALERT_RULE_FOR_PROJECT_ACTION:
            return {
                ...state,
                rules: {
                    ...state.rules,
                    [action.ruleId]: action.rule,
                },
            };
        case CREATE_ALERT_RULE_FOR_PROJECT_ACTION:
            const actionRule = action.rule;

            let projectRules = [];

            if (state.projectRules[action.projectId]) {
                projectRules = [
                    ...state.projectRules[action.projectId],
                ];
            }

            if (!projectRules.includes(actionRule.id)) {
                projectRules.push(actionRule.id);
            }

            return {
                ...state,
                rules: {
                    ...state.rules,
                    [actionRule.id]: actionRule,
                },
                projectRules: {
                    ...state.projectRules,
                    [action.projectId]: projectRules,
                },
            };
        case DELETE_ALERT_RULE_FOR_PROJECT_ACTION:
            let deleteProjectRules = [];

            if (state.projectRules[action.projectId]) {
                deleteProjectRules = state.projectRules[action.projectId].filter(ruleId => ruleId !== action.ruleId);
            }

            return {
                ...state,
                rules: {
                    ...state.rules,
                    [action.ruleId]: null,
                },
                projectRules: {
                    ...state.projectRules,
                    [action.projectId]: deleteProjectRules,
                },
            };
        case UPDATE_ALERT_RULE_FOR_PROJECT_ACTION:
            return {
                ...state,
                rules: {
                    ...state.rules,
                    [action.rule.id]: action.rule,
                },
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default AlertingReducer;
