import {
    AnalyticsWidgetResolutionTypes,
    AnalyticsWidgetSizeTypes,
    AnalyticsWidgetTypes,
    TimeUnitTypes
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
     * @param {Widget} widget
     * @returns {Object}
     */
    static transformToApiPayloadForData(widget) {
        const data = {};

        if (widget.time && widget.time.window) {
            data.time_range = {
                window: {
                    resolution: widget.time.window.unit,
                    amount: widget.time.window.value,
                },
            };
        }

        if (widget.resolution) {
            data.resolution = widget.resolution;
        }

        data.display_settings = {
            chart_type: widget.type,
        };

        return data;
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
     * @param {boolean} isCustom
     * @returns {Widget}
     */
    static buildFromResponse(response, isCustom = false) {
        let widgetData = {};

        if (isCustom) {
            widgetData = {
                type: AnalyticsWidgetTypes.LINE_CHART,
                size: AnalyticsWidgetSizeTypes.TWO,
                resolution: AnalyticsWidgetResolutionTypes.HOUR,
                time: {
                    window: {
                        unit: TimeUnitTypes.DAY,
                        value: 7,
                    },
                },
            };
        } else {
            const time = Widget.parseTimeRange(response.time_range);

            widgetData = {
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
            };
        }

        return new Widget({
            id: response.id,
            name: response.name,
            ...widgetData,
        });
    }
}

export default Widget
