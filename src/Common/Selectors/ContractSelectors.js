import {EntityStatusTypes} from "../constants";
import Contract from "../../Core/Contract/Contract.model";

/**
 * @param {Object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @return {Contract|null}
 */
export function getContractByAddressAndNetwork(state, address, network) {
    const contractId = Contract.generateUniqueContractId(address, network);
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
    const contractId = Contract.generateUniqueContractId(address, network);

    if (!state.contract.projectContractTagsMap[project.id] || !state.contract.projectContractTagsMap[project.id][contractId]) {
        return [];
    }

    return state.contract.projectContractTagsMap[project.id][contractId];
}

/**
 * @param {object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @return {string}
 */
export function getContractStatus(state, address, network) {
    const contractId = Contract.generateUniqueContractId(address, network);

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
 * @param {Event} event
 * @return {Contract}
 */
export function getContractForEvent(state, event) {
    if (!event) {
        return null;
    }

    const contract = state.contract.contracts[event.contractId];

    if (!contract) {
        return null;
    }

    return contract;
}

/**
 * @param {Object} state
 * @param {Transaction} transaction
 * @return {Contract[]}
 */
export function getContractsForTransaction(state, transaction) {
    if (!transaction) {
        return null;
    }

    const contracts = transaction.contracts
        .map(contract => state.contract.contracts[contract])
        .filter(contract => !!contract);

    if (!contracts || !contracts.length) {
        return [];
    }

    return contracts;
}
