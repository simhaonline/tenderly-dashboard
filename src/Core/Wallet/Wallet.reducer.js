import {FETCH_WALLETS_FOR_PROJECT_ACTION} from "./Wallet.actions";

const initialState = {
    /** @type {Object.<Wallet.id, Wallet>} */
    wallets: {},
    /** @type {Object.<Project.id, Wallet.id[]>} */
    projectWalletsMap: {},
};

const WalletReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WALLETS_FOR_PROJECT_ACTION:
            return {
                ...state,
                wallets: {
                    ...state.wallets,
                    ...action.wallets.reduce((wallets, wallet) => {
                        wallets[wallet.id] = wallet;

                        return wallets;
                    }, {}),
                },
                projectWalletsMap: {
                    ...state.projectWalletsMap,
                    [action.projectId]: action.wallets.map(wallet => wallet.id),
                },
            };
        default:
            return state;
    }
};

export default WalletReducer;
