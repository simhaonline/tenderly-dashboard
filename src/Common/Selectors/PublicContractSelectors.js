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
 * @param {string} id
 * @returns {Object} contract
 */
export function getPublicContractById(state, id) {
    if (!state.publicContracts.contracts[id]) {
        return null;
    }

    return state.publicContracts.contracts[id];
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

    return transaction.contracts.map(contractId => getPublicContractById(state, contractId))
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
 * @param {string} id
 * @returns {boolean}
 */
export function isPublicContractLoaded(state, id) {
    if (!state.publicContracts.contracts[id] || !state.publicContracts.contractsLoaded[id]) {
        return false;
    }

    return state.publicContracts.contractsLoaded[id];
}

/**
 * @param {Object} state
 * @return {Contract[]}
 */
export function getWatchedContracts(state) {
    return Object.values(state.publicContracts.watchedContracts);
}

/**
 * @param {Object} state
 * @return {boolean}
 */
export function areWatchedContractsLoaded(state) {
    return state.publicContracts.watchedContractsLoaded;
}
