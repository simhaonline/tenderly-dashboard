/**
 * @param {Object} state
 * @param {string} projectId
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
