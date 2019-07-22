import {
    FETCH_PUBLIC_CONTRACT_ACTION,
    FETCH_PUBLIC_CONTRACTS_ACTION, FETCH_PUBLIC_CONTRACTS_FOR_TX_ACTION,
    FETCH_WATCHED_CONTRACTS_ACTION, TOGGLE_WATCHED_CONTRACT_ACTION
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
            return {
                ...initialState,
                contracts: state.contracts,
                contractsLoaded: state.contractsLoaded,
            };
        }
        case FETCH_WATCHED_CONTRACTS_ACTION:
            return {
                ...state,
                watchedContracts: {
                    ...action.contracts.reduce((data, contract) => {
                        data[contract.getUniqueId()] = {
                            name: contract.name,
                            address: contract.address,
                            network: contract.network,
                        };

                        return data;
                    }, {}),
                },
                watchedContractsLoaded: true,
            };
        case TOGGLE_WATCHED_CONTRACT_ACTION:
            const contractId = action.contract.getUniqueId();

            const currentToggleState = state.watchedContracts[contractId];

            return {
                ...state,
                watchedContracts: {
                    ...state.watchedContracts,
                    [contractId]: currentToggleState ? null : {
                        name: action.contract.name,
                        address: action.contract.address,
                        network: action.contract.network,
                    },
                },
            };
        case FETCH_PUBLIC_CONTRACTS_FOR_TX_ACTION:
            const txContracts = action.contracts.reduce((list, contract) => {
                if (state.contracts[contract.id]) {
                    const existingContract = state.contracts[contract.id];

                    list[contract.id] = existingContract.update(contract);
                } else {
                    list[contract.id] = contract;
                }

                return list;
            }, {});


            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    ...txContracts,
                },
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
