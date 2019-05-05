import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_TRANSACTION_ACTION, FETCH_TRANSACTIONS_FOR_PROJECT_ACTION} from "./Transaction.actions";

const initialState = {
    transactions: {},
};

const TransactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS_FOR_PROJECT_ACTION:
            const transactions = {};

            action.transactions.forEach(tx => {
                transactions[tx.txHash] = tx;
            });

            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    ...transactions,
                },
            };
        case FETCH_TRANSACTION_ACTION:
            const transaction = action.transaction;

            return {
                ...state,
                transactions: {
                    ...state.transactions,
                    [transaction.txHash]: transaction,
                },
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default TransactionReducer;
