import {EventFilterTypes} from "../Common/constants";

class EventFilters {
    /**
     * @param {Event[]} events
     * @param {string} query
     * @returns {Event[]}
     */
    static filterEventsByQuery(events, query) {
        console.log(events, query);
        return events;
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
           }
        });

        return filteredEvents;
    }
}

export default EventFilters;
