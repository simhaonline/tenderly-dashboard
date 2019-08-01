import {Api} from "../../Utils/Api";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

import AlertRule from "./AlertRule.model";

export const FETCH_ALERT_RULES_FOR_PROJECT_ACTION = 'FETCH_ALERT_RULES_FOR_PROJECT';
export const FETCH_ALERT_RULE_FOR_PROJECT_ACTION = 'FETCH_ALERT_RULE_FOR_PROJECT';
export const CREATE_ALERT_RULE_FOR_PROJECT_ACTION = 'CREATE_ALERT_RULE_FOR_PROJECT';

/**
 * @param {string} projectId
 */
export const fetchAlertRulesForProject = (projectId) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/me/project/${projectId}/alerts`);

            if (!data || !data.alerts) {
                return new ErrorActionResponse();
            }

            const rules = data.alerts.map(response => AlertRule.buildFromResponse(response));

            dispatch({
                type: FETCH_ALERT_RULES_FOR_PROJECT_ACTION,
                projectId,
                rules,
            });

            return new SuccessActionResponse(rules);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {string} projectId
 * @param {string} ruleId
 */
export const fetchAlertRuleForProject = (projectId, ruleId) => {
    return async dispatch => {
        try {
            const alertsResponse = {
                id: "asdas-123123",
                project_id: projectId,
                name: "Simple Alert",
                description: "This alert is triggered when any transaction happens in this project.",
                enabled: true,
                delivery_channels: [],
                expressions: [
                    {
                        "type": "method_call",
                        "expression": {
                            "line_number": 222,
                            "call_position": "any"
                        }
                    },
                    {
                        "type": "whitelisted_caller_addresses",
                        "expression": {
                            "addresses": [
                                "0x6b9ef02657339310e28a7a9d4b5f25f7c1f68d61",
                                "0x904ef6ff8e82478c5604d99884eb9bcd7f73cc36",
                                "0x02e3f16ca21cf0508835b190933ecbde2f7f14df",
                                "0x4838eab6f43841e0d233db4cea47bd64f614f0c5",
                                "0xa646e29877d52b9e2de457eca09c724ff16d0a2b",
                                "0x3ac6cb2ccfd8c8aae3ba31d7ed44c20d241b16a4",
                                "0xdbd6ffd3cb205576367915dd2f8de0af7edcceef",
                                "0xbbf0cc1c63f509d48a4674e270d26d80ccaf6022"
                            ]
                        }
                    }
                ],
            };

            const rule = AlertRule.buildFromResponse(alertsResponse);

            dispatch({
                type: FETCH_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId,
                ruleId,
                rule,
            });

            return new SuccessActionResponse(rule);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};

/**
 * @param {string} projectId
 */
export const createAlertRuleForProject = (projectId) => {
    return async dispatch => {
        try {

            dispatch({
                type: CREATE_ALERT_RULE_FOR_PROJECT_ACTION,
                projectId,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error)
        }
    };
};
