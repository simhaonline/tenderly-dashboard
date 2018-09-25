import {FETCH_PUBLIC_CONTRACTS_ACTION} from "./PublicContracts.actions";


const initialState = {
    contracts: {},
    pages: {},
};

const PublicContractsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PUBLIC_CONTRACTS_ACTION:
            console.log(action);
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default PublicContractsReducer;
