import {EntityStatusTypes} from "../constants";
import Contract from "../../Core/Contract/Contract.model";

/**
 * @param {Object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @return {Contract|null}
 */
export function getContractByAddressAndNetwork(state, address, network) {
    const contractId = Contract.generateUniqueId(address, network);
    const contract = state.contract.contracts[contractId];

    if (!contract) {
        return null;
    }

    return contract;
}

/**
 * @param {Object} state
 * @param {Project} project
 * @param {string} address
 * @param {NetworkTypes} network
 * @return {Object[]}
 */
export function getContractTagsByAddressAndNetwork(state, project, address, network) {
    const contractId = Contract.generateUniqueId(address, network);

    if (!state.contract.projectContractTagsMap[project.id] || !state.contract.projectContractTagsMap[project.id][contractId]) {
        return [];
    }

    return state.contract.projectContractTagsMap[project.id][contractId];
}

/**
 *
 * @param {Object} state
 * @param {Project} project
 * @returns {Object<Contract.id, Object[]>|null}
 */
export function getTagsForProjectContracts(state, project) {
    if (!state.contract.projectContractTagsMap[project.id]) {
        return null;
    }

    return state.contract.projectContractTagsMap[project.id];
}

/**
 * @param {object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @return {string}
 */
export function getContractStatus(state, address, network) {
    const contractId = Contract.generateUniqueId(address, network);

    let contractStatus = state.contract.contractStatus[contractId];

    if (!contractStatus) {
        contractStatus = EntityStatusTypes.NOT_LOADED;
    }

    return contractStatus;
}

/**
 * @param {Object} state
 * @param {Project.id} projectId
 * @returns {Contract[]}
 */
export function getContractsForProject(state, projectId) {
    if (!state.contract.projectContractsMap[projectId]) {
        return [];
    }

    const contracts = state.contract.projectContractsMap[projectId].map(contractId => {
        return state.contract.contracts[contractId];
    });

    return contracts;
}

/**
 * @param {Object} state
 * @param {Project.id} projectId
 * @returns {Contract[]}
 */
export function getMainContractsForProject(state, projectId) {
    const allContracts = getContractsForProject(state, projectId);

    return allContracts.filter(contract => contract.address === contract.parent);
}

/**
 * @param {Object} state
 * @param {Project.id} projectId
 * @param {Contract} mainContract
 * @returns {Contract[]}
 */
export function getContractRevisionsForProjectContract(state, projectId, mainContract) {
    const allContracts = getContractsForProject(state, projectId);

    return allContracts.filter(contract => mainContract.address === contract.parent);
}
