/**
 * @param {Object} state
 * @return {NotificationDestination[]}
 */
export function getNotificationDestinations(state) {
    return Object.values(state.notification.destinations);
}

/**
 * @param {Object} state
 * @param {AlertRule} rule
 * @return {NotificationDestination[]}
 */
export function getNotificationDestinationsForRule(state, rule) {
    if (!rule) {
        return [];
    }

    const destinations = getNotificationDestinations(state);

    return destinations.filter(destination => rule.deliveryChannels.includes(destination.id));
}

/**
 * @param {Object} state
 * @return {boolean}
 */
export function areNotificationDestinationsLoaded(state) {
    return state.notification.destinationsLoaded;
}
