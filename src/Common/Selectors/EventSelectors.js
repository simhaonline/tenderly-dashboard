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

/**
 * @param {Object} state
 * @param {string} projectId
 * @param {number} page
 * @returns {Event[]}
 */
export function getEventsForProject(state, projectId, page) {
    const projectEvents = state.event.projectEvents[projectId];

    if (!projectEvents || !projectEvents[page]) {
        return [];
    }

    const events = projectEvents[page].map(eventId => state.event.events[eventId]);

    return events;
}

/**
 * @param {Object} state
 * @param {string} eventId
 * @returns {Event}
 */
export function getEvent(state, eventId) {
    const event = state.event.events[eventId];

    if (!event) {
        return null;
    }

    return event;
}
