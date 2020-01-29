import moment from "moment";

import {AnalyticsWidgetResolutionTypes, TimeUnitLabelMap} from "../Common/constants";

/**
 * @param {Date} date
 * @param {AnalyticsWidgetResolutionTypes} resolution
 */
export function getFormattedDateForResolution(date, resolution) {
    switch (resolution) {
        case AnalyticsWidgetResolutionTypes.MINUTE:
            return moment(date).format('HH:mm, MMM DD');
        case AnalyticsWidgetResolutionTypes.HOUR:
            return moment(date).format('HH[h], MMM DD');
        case AnalyticsWidgetResolutionTypes.DAY:
        default:
            return moment(date).format('ddd, MMM DD');
    }
}

/**
 * @param {Widget.time} time
 *
 * @returns {string}
 */
export function getFormattedTimeRange(time) {
    if (!time.window) {
        return 'Fixed';
    }

    if (time.window.value === 1) {
        return `Last ${TimeUnitLabelMap[time.window.unit].toLowerCase()}`;
    }

    return `Last ${time.window.value} ${TimeUnitLabelMap[time.window.unit].toLowerCase()}s`;
}

/**
 *
 * @param {AnalyticsWidgetResolutionTypes} resolution
 *
 * @returns {string}
 */
export function getFormattedResolution(resolution) {
    return TimeUnitLabelMap[resolution];
}
