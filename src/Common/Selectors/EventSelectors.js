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

    return state.event.contractEvents[network][id];
}
