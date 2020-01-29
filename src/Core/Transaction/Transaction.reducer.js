import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
    FETCH_EXAMPLE_TRANSACTION_ACTION,
    FETCH_TRANSACTION_FOR_PROJECT_ACTION, FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION,
    FETCH_TRANSACTIONS_FOR_PROJECT_ACTION,
    FETCH_TRANSACTIONS_FOR_PUBLIC_CONTRACT_ACTION
} from "./Transaction.actions";

const initialState = {
    transactions: {},
    callTraces: {},
    stackTraces: {},
    eventLogs: {},
    stateDiffs: {},
    consoleLogs: {},
};

const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_FOR_PROJECT_ACTION:
        case FETCH_TRANSACTIONS_FOR_PUBLIC_CONTRACT_ACTION:
            const transactions = {};

            action.transactions.forEach(tx => {
                transactions[tx.id] = tx;
            });

            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    ...transactions,
                },
            };
        case FETCH_TRANSACTION_FOR_PROJECT_ACTION:
        case FETCH_EXAMPLE_TRANSACTION_ACTION:
        case FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION:
            const transaction = action.transaction;
            const callTrace = action.callTrace;
            const stackTrace = action.stackTrace;

            let stackTraces = state.stackTraces;
            let eventLogs = state.eventLogs;
            let stateDiffs = state.stateDiffs;
            let consoleLogs = state.consoleLogs;

            if (stackTrace) {
                stackTraces = {
                    ...stackTraces,
                    [stackTrace.id]: stackTrace,
                };
            }

            if (action.eventLogs && action.eventLogs.length > 0) {
                eventLogs = {
                    ...eventLogs,
                    [transaction.id]: action.eventLogs,
                };
            }

            if (action.stateDiffs && action.stateDiffs.length > 0) {
                stateDiffs = {
                    ...stateDiffs,
                    [transaction.id]: action.stateDiffs,
                };
            }

            if (action.consoleLogs && action.consoleLogs.length > 0) {
                consoleLogs = {
                    ...consoleLogs,
                    [transaction.id]: action.consoleLogs,
                }
            }

            return {
                ...state,
                callTraces: {
                    ...state.callTraces,
                    [callTrace.id]: callTrace,
                },
                stackTraces,
                eventLogs,
                stateDiffs,
                consoleLogs,
                transactions: {
                    ...state.transactions,
                    [transaction.id]: transaction,
                },
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default TransactionReducer;
