import {
    FETCH_PUBLIC_CONTRACT_ACTION,
    FETCH_PUBLIC_CONTRACTS_ACTION,
    FETCH_WATCHED_CONTRACTS_ACTION
} from "./PublicContracts.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";


const initialState = {
    contracts: {},
    contractsLoaded: {},
    pages: {},
    watchedContracts: {},
    watchedContractsLoaded: false,
};

const PublicContractsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION: {
            return initialState;
        }
        case FETCH_WATCHED_CONTRACTS_ACTION:
            console.log(action);
            return {
                ...state,
                watchedContractsLoaded: true,
            };
        case FETCH_PUBLIC_CONTRACTS_ACTION:
            const contracts = action.contracts.reduce((list, contract) => {
                if (state.contracts[contract.id]) {
                    const existingContract = state.contracts[contract.id];

                    list[contract.id] = existingContract.update(contract);
                } else {
                    list[contract.id] = contract;
                }

                return list;
            }, {});

            const pageContracts = Object.keys(contracts);

            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    ...contracts,
                },
                pages: {
                    ...state.pages,
                    [action.network]: {
                        ...state.pages[action.network],
                        [action.page]: [...pageContracts],
                    }
                },
            };
        case FETCH_PUBLIC_CONTRACT_ACTION:
            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    [action.contract.id]: action.contract,
                },
                contractsLoaded: {
                    ...state.contractsLoaded,
                    [action.contract.id]: true,
                }
            };
        default:
            return state;
    }
};

export default PublicContractsReducer;
