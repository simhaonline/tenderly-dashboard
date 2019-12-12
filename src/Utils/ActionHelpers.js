import * as Sentry from "@sentry/browser";

import {Api} from "./Api";

import {ErrorActionResponse} from "../Common";
import {CommonActionTypes} from "../Common/constants";

import AccountPlan from "../Core/Billing/AccountPlan.model";

const fetchUpdatePlanUsage = (username) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/${username}/billing/plan`);

            if (!data || !data.plan) {
                return;
            }

            const accountPlan = AccountPlan.buildFromResponse(data.plan, data.usage);

            dispatch({
                type: CommonActionTypes.FETCH_ACCOUNT_PLAN_ACTION,
                username,
                accountPlan,
            });
        } catch (error) {
            console.error(error);

            Sentry.withScope(scope => {
                scope.setTag("action", "fetchUpdatePlanUsage");
                scope.setLevel(Sentry.Severity.Warning);
                Sentry.captureException(error);
            });
        }
    };
};

/**
 * @param {Error} error
 * @param {ActionSettings} actionSettings
 * @param {Function} [onErrorCallback]
 * @returns {ErrorActionResponse}
 */
const logActionError = (error, actionSettings, onErrorCallback) => {
    console.error(error);

    Sentry.withScope(scope => {
        scope.setTag("action", actionSettings.name);
        scope.setLevel(Sentry.Severity.Warning);
        Sentry.captureException(error);
    });

    if (onErrorCallback) {
        return onErrorCallback(error);
    }

    return new ErrorActionResponse(error);
};

/**
 * @typedef ActionSettings
 * @property {string} name
 * @property {boolean} [payable]
 * @property {string} [account]
 */

/**
 * @param {ActionSettings} actionSettings
 * @param {Function} action
 * @param {Function} [onError]
 * @returns {Promise<Function>}
 */
export function asyncActionWrapper(actionSettings, action, onError = () => {}) {
    return async dispatch => {
        try {
            const actionResponse = await action(dispatch);

            if (actionSettings.payable) {
                dispatch(fetchUpdatePlanUsage(actionSettings.account));
            }

            return actionResponse;
        } catch (error) {
            return logActionError(error, actionSettings, onError);
        }
    }
}

/**
 * @param {ActionSettings} actionSettings
 * @param {Function} action
 * @param {Function} [onError]
 * @returns {Function}
 */
export function actionWrapper(actionSettings, action, onError = () => {}) {
    return dispatch => {
        try {
            return action(dispatch);
        } catch (error) {
            return logActionError(error, actionSettings, onError);
        }
    };
}
