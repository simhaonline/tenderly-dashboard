import * as Sentry from "@sentry/browser";
import _ from 'lodash';

import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {
    DEFAULT_TRANSACTIONS_LIST_COLUMNS,
    LocalStorageKeys,
    TransactionFilterTypes,
} from "../../Common/constants";
import {Api} from "../../Utils/Api";

import {EventLog, StackTrace, CallTrace, Transaction, StateDiff, Project, ConsoleLog} from "../models";

import {
    exampleTransaction1Paylod
} from "../../examples";
import Contract from "../Contract/Contract.model";
import {getApiIdForNetwork} from "../../Utils/NetworkHelpers";
import {actionWrapper} from "../../Utils/ActionHelpers";
import LocalStorage from "../../Utils/LocalStorage";
import Simulation from "./Simulation.model";

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
            const tagFilter = filters[TransactionFilterTypes.TAG];
            const afterFilter = filters[TransactionFilterTypes.AFTER];

            const projectId = Project.generateProjectId(projectSlug, username);

            const {data} = await Api.get(`/account/${username}/project/${projectSlug}/transactions`, {
                params: {
                    page,
                    perPage: limit,
                    txType: typeFilter ? TypeValueToApiValue[typeFilter.value] : null,
                    status: statusFilter ? StatusValueToApiValue[statusFilter.value] : null,
                    contractId: contractsFilter ? contractsFilter.value.map(contractId => Contract.generateApiId(contractId)) : null,
                    network: networksFilter ? getApiIdForNetwork(networksFilter.value) : null,
                    tag: tagFilter ? tagFilter.value : null,
                    after: afterFilter ? afterFilter.value : null,
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
 * @param {Project} project
 * @param {string} txHash
 * @param {NetworkTypes} network
 * @return {Function<SuccessActionResponse|ErrorActionResponse>}
 */
export const fetchTransactionForProject = (project, txHash, network) => {
    return async (dispatch) => {
        try {
            const networkId = getApiIdForNetwork(network);

            const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/network/${networkId}/transaction/${txHash}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const transaction = Transaction.buildFromResponse(data, project.id);

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

            let consoleLogs = [];

            if(data.transaction_info && data.transaction_info.console_logs){
                consoleLogs = data.transaction_info.console_logs.map(consoleLog=> ConsoleLog.buildFromResponse(consoleLog, txHash))
            }

            dispatch({
                type: FETCH_TRANSACTION_FOR_PROJECT_ACTION,
                projectId: project.id,
                transaction,
                callTrace,
                stackTrace,
                eventLogs,
                stateDiffs,
                consoleLogs,
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
            const networkId = getApiIdForNetwork(network);

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
        const networkId = getApiIdForNetwork(network);

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
            let consoleLogs = [];

            if(data.transaction_info && data.transaction_info.console_logs){
                consoleLogs = data.transaction_info.console_logs.map(consoleLog=> ConsoleLog.buildFromResponse(consoleLog, txHash))
            }

            dispatch({
                type: FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION,
                transaction,
                callTrace,
                stackTrace,
                eventLogs,
                stateDiffs,
                consoleLogs,
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

export const getTransactionsListColumns = () => actionWrapper({
    name: 'getTransactionsListColumns',
}, () => {
    let columns = LocalStorage.getItem(LocalStorageKeys.TRANSACTIONS_LIST_COLUMNS);

    if (!columns) {
        columns = DEFAULT_TRANSACTIONS_LIST_COLUMNS;
    }

    return new SuccessActionResponse(columns);
}, () => {
    return new SuccessActionResponse(DEFAULT_TRANSACTIONS_LIST_COLUMNS);
});

/**
 * @param {TransactionsListColumnTypes} column
 */
export const toggleTransactionsListColumn = (column) => actionWrapper({
    name: 'toggleTransactionsListColumn',
}, dispatch => {
    const currentColumns = dispatch(getTransactionsListColumns()).data;

    const updatedColumns = _.xor(currentColumns, [column]);

    LocalStorage.setItem(LocalStorageKeys.TRANSACTIONS_LIST_COLUMNS, updatedColumns);

    return new SuccessActionResponse(updatedColumns);
}, (error, dispatch) => {
    return dispatch(getTransactionsListColumns());
});

export const createSimulation = (data)=> actionWrapper({
    name: "createSimulation",
}, dispatch => {
    const simulation = new Simulation(data);
    return new SuccessActionResponse(simulation);
});

/**
 * @param {NetworkTypes} network
 * @param {Object} transactionInfo
 */
export const simulateTransaction = (network, simulation) => {
    return async () => {
        try {
            const networkId = getApiIdForNetwork(network);

            // const {data} = await Api.get(`/network/${networkId}/simulate`);

            // if (!data) {
            //     return new ErrorActionResponse();
            // }

            console.log('simulation', Simulation.transformToApiPayload(simulation));

            return new SuccessActionResponse();

        } catch (error) {
            console.error(error);
            return new ErrorActionResponse();
        }
    }
};
