import {AnalyticsWidgetSizeTypes} from "../../Common/constants";

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

    static parseTimeRange(apiTimeRange) {
        if (apiTimeRange.window) {
            return {
                window: {
                    unit: apiTimeRange.window.resolution,
                    value: apiTimeRange.window.amount,
                },
            }
        }

        return {};
    }

    /**
     * @param {Object} response
     * @param {string} key
     * @returns {Widget}
     */
    static buildFromResponse(response, key) {
        const time = Widget.parseTimeRange(response.time_range);

        return new Widget({
            id: key,
            name: response.name,
            type: response.display_settings.chart_type,
            size: AnalyticsWidgetSizeTypes.TWO,
            resolution: response.resolution,
            time,
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
