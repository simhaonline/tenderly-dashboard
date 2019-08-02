/**
 * @param {Object} state
 * @return {NotificationDestination[]}
 */
export function getNotificationDestinations(state) {
    return Object.values(state.notification.destinations);
}

/**
 * @param {Object} state
 * @return {boolean}
 */
export function areNotificationDestinationsLoaded(state) {
    return state.notification.destinationsLoaded;
}
