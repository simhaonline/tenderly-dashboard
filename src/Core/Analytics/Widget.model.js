import {AnalyticsWidgetSizeTypes, AnalyticsWidgetTypes} from "../../Common/constants";

class Widget {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {string} */
        this.name = data.name;

        /** @type {AlertRule.id[]} */
        this.alerts = data.alerts;

        /** @type {AnalyticsWidgetTypes} */
        this.type = data.type;

        /** @type {AnalyticsWidgetSizeTypes} */
        this.size = data.size;

        /** @type {string} */
        this.dataPoints = data.dataPoints;

        /** @type {string} */
        this.data = data.data;
    }

    /**
     * @param {Object} response
     * @param {string} key
     * @returns {Widget}
     */
    static buildFromResponse(response, key) {
        return new Widget({
            id: key,
            name: key,
            type: AnalyticsWidgetTypes.LINE_CHART,
            size: AnalyticsWidgetSizeTypes.TWO,
            alerts: [],
            dataPoints: Object.keys(response.legend.items).map(itemKey => ({
                key: itemKey,
                name: itemKey,
                color: '#0076FF',
            })),
            data: response.data.map(datum => ({
                date: datum.timestamp,
                ...datum.data,
            })),
        });
    }
}

export default Widget
