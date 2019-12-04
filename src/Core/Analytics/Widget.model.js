import moment from "moment";
import chroma from "chroma-js";
import _ from 'lodash';

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
        const legendItems = response.legend && response.legend.items ? Object.keys(response.legend.items) : [];

        const colorScale = chroma.scale(['#0069E0', '#ADD3FF']).correctLightness();

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
            dataPoints: legendItems.map((itemKey, index) => ({
                key: itemKey,
                name: itemKey,
                color: colorScale(1 / (Math.max(legendItems.length - 1, 1)) * index).hex(),
                meta: response.legend.items[itemKey].labels,
            })),
            data: _.reverse(response.data.map(datum => ({
                date: moment(datum.timestamp * 1000),
                ...datum.data,
            }))),
        });
    }
}

export default Widget
