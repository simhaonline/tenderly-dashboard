import {Contract} from "../../Core/models";

/**
 * @param {Object} state
 * @param {string} network
 * @param {number} page
 * @returns {Object[]} contracts
 */
export function getNetworkPublicContractsForPage(state, network, page) {
    if (!state.publicContracts.pages[network] || !state.publicContracts.pages[network][page]) {
        return [];
    }

    const contractIds = state.publicContracts.pages[network][page];

    return contractIds.map(id => state.publicContracts.contracts[id]);
}

/**
 * @param {Object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @returns {Object} contract
 */
export function getPublicContractById(state, address, network) {
    const contractId = Contract.generateUniqueId(address, network);

    if (!state.publicContracts.contracts[contractId]) {
        return null;
    }

    return state.publicContracts.contracts[contractId];
}

/**
 * @param {Object} state
 * @param {Transaction} transaction
 * @returns {Contract[]} contracts
 */
export function getPublicContractsForTransaction(state, transaction) {
    if (!transaction || !transaction.contracts.length) {
        return [];
    }

    return transaction.contracts.map(contractId => getPublicContractById(state, contractId, transaction.network))
        .filter(contract => !!contract);
}

/**
 * @param {Object} state
 * @param {Transaction} transaction
 * @returns {boolean}
 */
export function arePublicContractsLoadedForTransaction(state, transaction) {
    if (!transaction || !transaction.contracts.length) {
        return false;
    }

    return transaction.contracts.every(contractId => isPublicContractLoaded(state, contractId));
}

/**
 * @param {Object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @returns {boolean}
 */
export function isPublicContractLoaded(state, address, network) {
    const contractId = Contract.generateUniqueId(address, network);

    if (!state.publicContracts.contracts[contractId] || !state.publicContracts.contractsLoaded[contractId]) {
        return false;
    }

    return state.publicContracts.contractsLoaded[contractId];
}

/**
 * @param {Object} state
 * @return {Contract[]}
 */
export function getWatchedContracts(state) {
    return Object.values(state.publicContracts.watchedContracts).filter(contract => !!contract);
}

/**
 * @param {Object} state
 * @return {boolean}
 */
export function areWatchedContractsLoaded(state) {
    return state.publicContracts.watchedContractsLoaded;
}

/**
 * @param {Object} state
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 * @return {boolean}
 */
export function isPublicContractWatched(state, contractAddress, network) {
    return !!state.publicContracts.watchedContracts[`${network}:${contractAddress}`];
}
