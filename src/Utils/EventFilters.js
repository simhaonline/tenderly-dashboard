import {EventFilterTypes} from "../Common/constants";

class EventFilters {
    /**
     * @param {Event[]} events
     * @param {string} query
     * @returns {Event[]}
     */
    static filterEventsByQuery(events, query) {
        return events.filter(event => {
            const comparableProperties = [
                event.transactionId,
                event.block.toString(),
                event.message.toLowerCase(),
                event.description.toLowerCase(),
            ];

            return comparableProperties.some(prop => prop.includes(query));
        });
    }

    /**
     * @param {Event[]} events
     * @param {EventFilter[]} filters
     * @returns {Event[]}
     */
    static filterEvents(events, filters) {
        let filteredEvents = events;

        filters.forEach(filter => {
           switch (filter.type) {
               case EventFilterTypes.QUERY:
                   filteredEvents = EventFilters.filterEventsByQuery(events, filter.value);
                   break;
               default:
                   break;
           }
        });

        return filteredEvents;
    }
}

export default EventFilters;
