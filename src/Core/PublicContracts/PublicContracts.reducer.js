import {FETCH_PUBLIC_CONTRACTS_ACTION} from "./PublicContracts.actions";


const initialState = {
    contracts: {},
    pages: {},
};

const PublicContractsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_CONTRACTS_ACTION:
            const contracts = action.contracts.reduce((list, contract) => {
                list[contract.id] = contract;
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
                        [action.page]: pageContracts,
                    }
                },
            };
        default:
            return state;
    }
};

export default PublicContractsReducer;
