import {
    AnalyticsWidgetResolutionTypes,
    AnalyticsWidgetSizeTypes,
    AnalyticsWidgetTimeUnitTypes,
    AnalyticsWidgetTypes
} from "../../Common/constants";

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

        /** @type {Object[]} */
        this.time = data.time;

        /** @type {Object[]} */
        this.group = data.group;

        /** @type {Object[]} */
        this.show = data.show;

        /** @type {AnalyticsWidgetResolutionTypes} */
        this.resolution = data.resolution;
    }

    /**
     * @param {Object} response
     * @param {string} key
     * @returns {Widget}
     */
    static buildFromResponse(response, key) {
        return new Widget({
            id: key,
            name: key.replace(/_/g, ' '),
            type: AnalyticsWidgetTypes.LINE_CHART,
            size: AnalyticsWidgetSizeTypes.TWO,
            resolution: AnalyticsWidgetResolutionTypes.HOUR,
            time: {
                window: {
                    unit: AnalyticsWidgetTimeUnitTypes.DAY,
                    value: 7,
                },
            },
            alerts: [],
            group: [
                {group: "contract", variable: "id"},
                {group: "transaction", variable: "status"},
            ],
            show: [
                {math: "count", event: "transaction"},
            ],
        });
    }
}

export default Widget
