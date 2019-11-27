import moment from "moment";

import {AnalyticsWidgetResolutionTypes} from "../Common/constants";

/**
 * @param {Date} date
 * @param {AnalyticsWidgetResolutionTypes} resolution
 */
export function getFormattedDateForResolution(date, resolution) {
    switch (resolution) {
        case AnalyticsWidgetResolutionTypes.HOUR:
            return moment(date).format('HH[h], MMM DD');
        case AnalyticsWidgetResolutionTypes.DAY:
        default:
            return moment(date).format('ddd, MMM DD');
    }

}
