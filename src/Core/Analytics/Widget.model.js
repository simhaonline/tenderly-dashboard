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

        this.dashboardId = data.dashboardId;

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

        /** @type {AnalyticsDataSourceTypes} */
        this.dataSource = data.dataSource;

        /** @type {AnalyticsWidgetResolutionTypes} */
        this.resolution = data.resolution;

        /** @type {Object[]} */
        this.orderBy = data.orderBy;
    }

    /**
     * @param {Object} data
     */
    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new Widget(updatedData);
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

        if (widget.dataSource){
            data.table = widget.dataSource;
        }

        if (widget.show && widget.show.length>0){
            data.selectors = widget.show.map(showProperty => {
                if (showProperty.custom){
                    return {
                        predefined_selector: showProperty.property,
                    }
                }
                return {
                    selector: {
                        aggregate: showProperty.aggregation,
                        field: showProperty.property
                    }
                }
            })
        }

        if (widget.resolution) {
            data.resolution = widget.resolution;
        }

        if(widget.group && widget.group.length > 0){
            data.group_by = widget.group;
        }

        if(widget.orderBy && widget.orderBy.length > 0){
            data.order_by = widget.orderBy.map(order=> ({
                field: order.property,
                direction: order.direction,
            }))
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
    static buildFromResponse(response, dashboardId, isCustom = false) {
        let widgetData = {};

        if (isCustom) {
            widgetData = {
                type: response.display_settings.chart_type,
                size: AnalyticsWidgetSizeTypes.TWO,
                resolution: AnalyticsWidgetResolutionTypes.DAY,
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
                dataSource: response.analytics_table,
                dashboardId: response.analytics_dashboard_id,
                group: response.group_by,
                show: response.selectors.map(selector=> {
                    if(selector.predefined_selector){
                        return {
                            custom: true,
                            property: selector.predefined_selector,
                        }
                    }
                    return {
                        property: selector.selector.field,
                        aggregation: selector.selector.aggregate,
                    }
                }),
                orderBy: response.order_by.map(order=> ({
                    property: order.field,
                    direction: order.direction
                }))
            };
        }

        return new Widget({
            id: response.id,
            name: response.name,
            dashboardId: dashboardId,
            ...widgetData,
        });
    }
}

export default Widget
