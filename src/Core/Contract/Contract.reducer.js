import {FETCH_CONTRACTS_FOR_PROJECT_ACTION} from "./Contract.actions";

import {EntityStatusTypes} from "../../Common/constants";

const initialState = {
    contracts: {},
    contractStatus: {},
};

const ContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTRACTS_FOR_PROJECT_ACTION:
            const computedData = action.contracts.reduce((data, contract) => {

                if (state.contracts[contract.id]) {
                    const existingContract = state.contracts[contract.id];

                    data.contracts[contract.id] = existingContract.update(contract);
                } else {
                    data.contracts[contract.id] = contract;
                    data.contractStatus[contract.id] = EntityStatusTypes.LOADED;
                }

                return data;
            }, {
                contracts: {},
                contractStatus: {},
            });

            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    ...computedData.contracts,
                },
                contractStatus: {
                    ...state.contractStatus,
                    ...computedData.contractStatus,
                },
            };
        default:
            return state;
    }
};

export default ContractReducer;
