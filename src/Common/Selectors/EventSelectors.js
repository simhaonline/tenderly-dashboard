/**
 * @param {Object} state
 * @param {string} id
 * @param {string} network
 * @param {number} limit
 * @param {number} offset
 * @returns {Event[]}
 */
export function getPublicContractEvents(state, id, network, limit=20, offset=0) {
    if (!state.event.contractEvents[network] || !state.event.contractEvents[network][id]) {
        return [];
    }

    return Object.values(state.event.contractEvents[network][id]);
}

/**
 * @param {Object} state
 * @param {string} eventId
 * @param {string} contractId
 * @param {string} network
 * @returns {Event}
 */
export function getPublicContractEvent(state, eventId, contractId, network) {
    if (!state.event.contractEvents[network] || !state.event.contractEvents[network][contractId] || !state.event.contractEvents[network][contractId][eventId]) {
        return null;
    }

    return state.event.contractEvents[network][contractId][eventId];
}
