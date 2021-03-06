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
 * @param {ProjectContract} projectContract
 * @returns {Contract[]}
 */
export function getContractRevisionsForProjectContract(state, projectId, projectContract) {
    const allContracts = getContractsForProject(state, projectId);

    if (!projectContract || !allContracts.length) return [];

    return projectContract.revisions
        .map(revision => allContracts.find(contract => contract.id === revision.id))
        .filter(contract => !!contract);
}
