import {FETCH_WALLETS_FOR_PROJECT_ACTION} from "./Wallet.actions";

const initialState = {
    /** @type {Object.<Wallet.id, Wallet>} */
    wallets: {},
};

const WalletReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WALLETS_FOR_PROJECT_ACTION:
            return {
                ...state,
                ...action.wallets.reduce((wallets, wallet) => {
                    wallets[wallet.id] = wallet;

                    return wallets;
                }, {}),
            };
        default:
            return state;
    }
};

export default WalletReducer;
