import {FETCH_CONTRACT_FOR_PROJECT_ACTION, FETCH_CONTRACTS_FOR_PROJECT_ACTION} from "./Contract.actions";

import {EntityStatusTypes} from "../../Common/constants";
import {CREATE_EXAMPLE_PROJECT_ACTION} from "../Project/Project.actions";
import {LOG_OUT_ACTION} from "../Auth/Auth.actions";

const initialState = {
    contracts: {},
    contractStatus: {},
    projectContractsMap: {},
};

const ContractReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_OUT_ACTION:
            return initialState;
        case CREATE_EXAMPLE_PROJECT_ACTION:
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

            const projectContractIds = Object.keys(computedData.contracts);

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
                projectContractsMap: {
                    ...state.projectContractsMap,
                    [action.projectId]: projectContractIds,
                },
            };
        case FETCH_CONTRACT_FOR_PROJECT_ACTION:
            const contract = action.contract;

            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    [contract.id]: contract,
                },
                contractStatus: {
                    ...state.contractStatus,
                    [contract.id]: EntityStatusTypes.LOADED,
                },
            };
        default:
            return state;
    }
};

export default ContractReducer;
