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
    /** @type {Object.<Contract.id, Contract>} */
    contracts: {},
    /** @type {Object.<Contract.id, EntityStatusTypes>} */
    contractStatus: {},
    /** @type {Object.<Project.id, Contract.id[]>} */
    projectContractsMap: {},
    /** @type {Object.<Project.id, Object.<Contract.id, Object[]>>} */
    projectContractTagsMap: {},
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
                }

                data.contractStatus[contract.id] = EntityStatusTypes.PARTIALLY_LOADED;

                data.contractTags[contract.id] = action.contractTags[contract.id] || [];

                return data;
            }, {
                contracts: {},
                contractStatus: {},
                contractTags: {},
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
                projectContractTagsMap: {
                    ...state.projectContractTagsMap,
                    [action.projectId]: computedData.contractTags,
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
                projectContractTagsMap: {
                    ...state.projectContractTagsMap,
                    [action.projectId]: {
                        ...state.projectContractTagsMap[action.projectId],
                        [action.contract.id]: action.tags,
                    },
                },
                contractStatus: {
                    ...state.contractStatus,
                    [contract.id]: EntityStatusTypes.LOADED,
                },
            };
        case TOGGLE_CONTRACT_LISTENING_ACTION:
            const toggledContract = state.contracts[action.contract.id];

            const toggleUpdatedContract = toggledContract.update({
                listening: !toggledContract.listening,
            });

            return {
                ...state,
                contracts: {
                    ...state.contracts,
                    [toggledContract.id]: toggleUpdatedContract,
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
                projectContractsMap,
            };
        default:
            return state;
    }
};

export default ContractReducer;
