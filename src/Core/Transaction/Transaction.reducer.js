import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {
    FETCH_TRANSACTION_FOR_PROJECT_ACTION, FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION,
    FETCH_TRANSACTIONS_FOR_PROJECT_ACTION,
    FETCH_TRANSACTIONS_FOR_PUBLIC_CONTRACT_ACTION
} from "./Transaction.actions";

const initialState = {
    transactions: {},
    callTraces: {},
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
        case FETCH_TRANSACTION_FOR_PUBLIC_CONTRACT_ACTION:
            const transaction = action.transaction;
            const callTrace = action.callTrace;

            return {
                ...state,
                callTraces: {
                    ...state.callTraces,
                    [callTrace.id]: callTrace
                },
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
