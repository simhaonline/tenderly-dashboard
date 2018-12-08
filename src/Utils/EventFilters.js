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
     * @param {string[]} contractIds
     * @returns {Event[]}
     */
    static filterEventsByContracts(events, contractIds) {
        console.log(contractIds);

        return events.filter(event => {
            return contractIds.some(id => id === event.contractId);
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
                   filteredEvents = EventFilters.filterEventsByQuery(filteredEvents, filter.value);
                   break;
               case EventFilterTypes.CONTRACTS:
                   filteredEvents = EventFilters.filterEventsByContracts(filteredEvents, filter.value);
                   break;
               default:
                   break;
           }
        });

        return filteredEvents;
    }
}

export default EventFilters;
