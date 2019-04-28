import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {Api} from "../../Utils/Api";

import {Transaction} from "./Transaction.model";

export const FETCH_TRANSACTIONS_FOR_PROJECT_ACTION = 'FETCH_TRANSACTIONS_FOR_PROJECT';
export const FETCH_TRANSACTION_ACTION = 'FETCH_TRANSACTION_PROJECT';

/**
 * @param {string} projectId
 * @param {Object[]} filters
 * @param {number} page
 * @param {number} limit
 * @return {Function}
 */
export const fetchTransactionsForProject = (projectId, filters, page = 1, limit = 25) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        try {
            const {data} = await Api.get(`/account/${username}/project/${projectId}/transactions`, {
                params: {
                    page,
                    limit,
                },
            });

            if (!data) {
                return new SuccessActionResponse([]);
            }

            const transactions = data.map(tx => Transaction.buildFromResponse(tx, projectId));

            dispatch({
                type: FETCH_TRANSACTIONS_FOR_PROJECT_ACTION,
                projectId,
                transactions,
            });

            return new SuccessActionResponse(transactions);
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
