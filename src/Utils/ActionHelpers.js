import * as Sentry from "@sentry/browser";

import {ErrorActionResponse} from "../Common";

/**
 * @param {string} actionName
 * @param {Function} action
 * @param {Function} [onError]
 * @returns {Promise<Function>}
 */
export function asyncActionWrapper(actionName, action, onError = () => {}) {
    return async dispatch => {
        try {
            return await action(dispatch);
        } catch (error) {
            console.error(error);

            Sentry.withScope(scope => {
                scope.setTag("action", actionName);
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
