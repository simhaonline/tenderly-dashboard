import * as Sentry from "@sentry/browser";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NetworkAppToApiTypeMap, TransactionFilterTypes} from "../../Common/constants";
import {Api} from "../../Utils/Api";

import {Transaction} from "./Transaction.model";
import CallTrace from "../Trace/CallTrace.model";
import StackTrace from "../Trace/StackTrace.model";

import {
    exampleTransaction1Paylod
} from "../../examples";

export const FETCH_TRANSACTIONS_FOR_PROJECT_ACTION = 'FETCH_TRANSACTIONS_FOR_PROJECT';
export const FETCH_TRANSACTION_FOR_PROJECT_ACTION = 'FETCH_TRANSACTION_FOR_PROJECT';

export const FETCH_TRANSACTIONS_FOR_PUBLIC_CONTRACT_ACTION = 'FETCH_TRANSACTIONS_FOR_PUBLIC_CONTRACT';
export const FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION = 'FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT';

export const FETCH_EXAMPLE_TRANSACTION_ACTION = 'FETCH_EXAMPLE_TRANSACTION';

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
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

export const fetchExampleTransactions = () => {
    return async () => {
        const transactions = [
            Transaction.buildFromResponse(exampleTransaction1Paylod, "example-project"),
        ];

        return new SuccessActionResponse(transactions);
    }
};

/**
 * @param {string} projectId
 * @param {string} txHash
 * @param {NetworkTypes} network
 * @return {Function<SuccessActionResponse|ErrorActionResponse>}
 */
export const fetchTransactionForProject = (projectId, txHash, network) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        try {
            const networkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/${username}/project/${projectId}/network/${networkId}/transaction/${txHash}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const transaction = Transaction.buildFromResponse(data, projectId);

            const callTrace = CallTrace.buildFromResponse(data);

            const stackTrace = StackTrace.buildFromResponse(data);

            dispatch({
                type: FETCH_TRANSACTION_FOR_PROJECT_ACTION,
                projectId,
                transaction,
                callTrace,
                stackTrace,
            });

            return new SuccessActionResponse({
                transaction,
                callTrace,
            });
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

export const fetchExampleTransaction = () => {
    return async (dispatch) => {

        const transaction = Transaction.buildFromResponse(exampleTransaction1Paylod, "example-project");

        const callTrace = CallTrace.buildFromResponse(exampleTransaction1Paylod);

        dispatch({
            type: FETCH_EXAMPLE_TRANSACTION_ACTION,
            projectId: "example-project",
            transaction,
            callTrace,
        });

        return new SuccessActionResponse({
            transaction,
            callTrace,
        })
    };
};

/**
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 * @param {number} [page]
 */
export const fetchTransactionsForPublicContract = (contractAddress, network, page = 1) => {
    return async (dispatch) => {
        try {
            const networkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/public-contract/${networkId}/address/${contractAddress}/transactions`, {
                params: {
                    page,
                },
            });

            if (!data) {
                return new ErrorActionResponse();
            }

            const transactions = data.map(tx => Transaction.buildFromResponse(tx));

            dispatch({
                type: FETCH_TRANSACTIONS_FOR_PUBLIC_CONTRACT_ACTION,
                contractAddress,
                transactions,
            });

            return new SuccessActionResponse(transactions);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} txHash
 * @param {NetworkTypes} network
 * @param {boolean} silentError
 */
export const fetchTransactionForPublicContract = (txHash, network, silentError = false) => {
    return async (dispatch) => {
        const networkId = NetworkAppToApiTypeMap[network];

        try {
            const {data} = await Api.get(`/public-contract/${networkId}/tx/${txHash}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const transaction = Transaction.buildFromResponse(data);

            const callTrace = CallTrace.buildFromResponse(data);

            const stackTrace = StackTrace.buildFromResponse(data);

            dispatch({
                type: FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION,
                transaction,
                callTrace,
                stackTrace,
            });

            return new SuccessActionResponse({
                transaction,
                callTrace,
            });
        } catch (error) {
            if (!silentError) {
                console.error(error);

                Sentry.withScope(scope => {
                    scope.setExtras({
                        network,
                        networkId,
                        transaction: txHash,
                        error,
                    });
                    Sentry.captureMessage('Failed fetching public transaction');
                });
            }

            return new ErrorActionResponse(error);
        }
    }
};
