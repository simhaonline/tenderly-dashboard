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
 * @param {number} id
 * @returns {Object} contract
 */
export function getPublicContractById(state, id) {
    if (!state.publicContracts.contracts[id]) {
        return null;
    }

    return state.publicContracts.contracts[id];
}
