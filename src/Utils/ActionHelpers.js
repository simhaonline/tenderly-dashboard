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

            console.log('now fetched new plan', accountPlan);

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
 * @typedef ActionSettings
 * @property {string} name
 * @property {boolean} [payable]
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

            if (actionResponse.payableAction) {
                console.log('fetch plan');
                dispatch(fetchUpdatePlanUsage);
            }

            console.log('return value');

            return actionResponse;
        } catch (error) {
            console.error(error);

            Sentry.withScope(scope => {
                scope.setTag("action", actionSettings.name);
                scope.setLevel(Sentry.Severity.Warning);
                Sentry.captureException(error);
            });

            if (onError) {
                onError(error);
            }

            return new ErrorActionResponse(error);
        }
    }
}
