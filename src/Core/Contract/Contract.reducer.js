import {
    DELETE_CONTRACT_ACTION,
    FETCH_CONTRACT_FOR_PROJECT_ACTION,
    FETCH_CONTRACTS_FOR_PROJECT_ACTION,
    TOGGLE_CONTRACT_LISTENING_ACTION
} from "./Contract.actions";

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
                const contractId = contract.getUniqueId();

                if (state.contracts[contractId]) {
                    const existingContract = state.contracts[contractId];

                    data.contracts[contractId] = existingContract.update(contract);
                } else {
                    data.contracts[contractId] = contract;
                }

                data.contractStatus[contractId] = EntityStatusTypes.LOADED;

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
                    [contract.getUniqueId()]: contract,
                },
                contractStatus: {
                    ...state.contractStatus,
                    [contract.getUniqueId()]: EntityStatusTypes.LOADED,
                },
            };
        case TOGGLE_CONTRACT_LISTENING_ACTION:
            const toggledContract = state.contracts[action.contractId];

            const toggleUpdatedContract = toggledContract.update({
                listening: !toggledContract.listening,
            });

            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    [toggledContract.getUniqueId()]: toggleUpdatedContract,
                },
            };
        case DELETE_CONTRACT_ACTION:
            const projectContractsMap = {
                ...state.projectContractsMap,
            };
            const currentProjectContracts = state.projectContractsMap[action.projectId];

            if (currentProjectContracts) {
                projectContractsMap[action.projectId] = currentProjectContracts.filter(contract => contract !== action.contractId);
            }

            return {
                ...state,
                contractStatus: {
                    ...state.contractStatus,
                    [action.contractId]: EntityStatusTypes.DELETED,
                },
                projectContractsMap,
            };
        default:
            return state;
    }
};

export default ContractReducer;
