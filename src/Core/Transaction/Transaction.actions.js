import * as Sentry from "@sentry/browser";

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NetworkAppToApiTypeMap, TransactionFilterTypes} from "../../Common/constants";
import {Api} from "../../Utils/Api";

import {EventLog, StackTrace, CallTrace, Transaction, StateDiff, Project} from "../models";

import {
    exampleTransaction1Paylod
} from "../../examples";
import Contract from "../Contract/Contract.model";

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

const TypeValueToApiValue = {
    'all': null,
    'internal': 'internal',
    'direct': 'direct',
};

/**
 * @param {Project.slug} projectSlug
 * @param {User.username} username
 * @param {Object} filters
 * @param {number} page
 * @param {number} limit
 * @return {Function}
 */
export const fetchTransactionsForProject = (projectSlug, username, filters, page = 1, limit = 50) => {
    return async (dispatch) => {
        try {
            const statusFilter = filters[TransactionFilterTypes.STATUS];
            const typeFilter = filters[TransactionFilterTypes.TYPE];
            const contractsFilter = filters[TransactionFilterTypes.CONTRACTS];
            const networksFilter = filters[TransactionFilterTypes.NETWORKS];

            const projectId = Project.generateProjectId(projectSlug, username);

            const {data} = await Api.get(`/account/${username}/project/${projectSlug}/transactions`, {
                params: {
                    page,
                    perPage: limit,
                    txType: typeFilter ? TypeValueToApiValue[typeFilter.value] : null,
                    status: statusFilter ? StatusValueToApiValue[statusFilter.value] : null,
                    contractId: contractsFilter ? contractsFilter.value.map(contractId => Contract.generateApiIdFromUniqueId(contractId)) : null,
                    network: networksFilter ? NetworkAppToApiTypeMap[networksFilter.value] : null,
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
    return async (dispatch) => {
        try {
            const networkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/me/project/${projectId}/network/${networkId}/transaction/${txHash}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const transaction = Transaction.buildFromResponse(data, projectId);

            const callTrace = CallTrace.buildFromResponse(data);

            const stackTrace = StackTrace.buildFromResponse(data);

            let eventLogs = [];

            if (data.transaction_info && data.transaction_info.logs) {
                eventLogs = data.transaction_info.logs.map(eventLog => EventLog.buildFromResponse(eventLog))
            }

            let stateDiffs = [];

            if (data.transaction_info && data.transaction_info.state_diff) {
                stateDiffs = data.transaction_info.state_diff.map(state_diff => StateDiff.buildFromResponse(state_diff, txHash));
            }

            dispatch({
                type: FETCH_TRANSACTION_FOR_PROJECT_ACTION,
                projectId,
                transaction,
                callTrace,
                stackTrace,
                eventLogs,
                stateDiffs,
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

            let eventLogs = [];

            if (data.transaction_info && data.transaction_info.logs) {
                eventLogs = data.transaction_info.logs.map(eventLog => EventLog.buildFromResponse(eventLog))
            }

            let stateDiffs = [];

            if (data.transaction_info && data.transaction_info.state_diff) {
                stateDiffs = data.transaction_info.state_diff.map(state_diff => StateDiff.buildFromResponse(state_diff, txHash));
            }

            dispatch({
                type: FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION,
                transaction,
                callTrace,
                stackTrace,
                eventLogs,
                stateDiffs,
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
