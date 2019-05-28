import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {TransactionFilterTypes} from "../../Common/constants";
import {Api} from "../../Utils/Api";

import {Transaction} from "./Transaction.model";
import {CallTrace} from "../Trace/CallTrace.model";

export const FETCH_TRANSACTIONS_FOR_PROJECT_ACTION = 'FETCH_TRANSACTIONS_FOR_PROJECT';
export const FETCH_TRANSACTION_ACTION = 'FETCH_TRANSACTION_PROJECT';

const StatusValueToApiValue = {
    'all': null,
    'success': true,
    'failed': false,
};

/**
 * @param {string} projectId
 * @param {Object} filters
 * @param {number} page
 * @param {number} limit
 * @return {Function}
 */
export const fetchTransactionsForProject = (projectId, filters, page = 1, limit = 50) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        try {
            const statusFilter = filters[TransactionFilterTypes.STATUS];
            const contractsFilter = filters[TransactionFilterTypes.CONTRACTS];

            const {data} = await Api.get(`/account/${username}/project/${projectId}/transactions`, {
                params: {
                    page,
                    perPage: limit,
                    status: statusFilter ? StatusValueToApiValue[statusFilter.value] : null,
                    contractId: contractsFilter ? contractsFilter.value : null,
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

/**
 * @param {string} projectId
 * @param {string} txHash
 * @return {Function<SuccessActionResponse|ErrorActionResponse>}
 */
export const fetchTransactionForProject = (projectId, txHash) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        try {
            const {data} = await Api.get(`/account/${username}/project/${projectId}/transactions/${txHash}`);

            if (!data) {
                return new SuccessActionResponse([]);
            }

            const transaction = Transaction.buildFromResponse(data, projectId);

            const callTrace = CallTrace.buildFromResponse(data);

            dispatch({
                type: FETCH_TRANSACTION_ACTION,
                projectId,
                transaction,
                callTrace,
            });
        } catch (error) {
            return new ErrorActionResponse(error);
        }
    }
};
