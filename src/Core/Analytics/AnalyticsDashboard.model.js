import Widget from "./Widget.model";

class AnalyticsDashboard {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {string} */
        this.name = data.name;

        /** @type {Number} */
        this.index = data.index;

        /** @type {boolean} */
        this.isCustom = data.isCustom;

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {Widget.id[]} */
        this.widgetOrder = data.widgetOrder;

        /** @type {Widget[]} */
        this.widgets = data.widgets;
    }

    update(data) {
        const updatedData = Object.assign({}, this, data);

        return new AnalyticsDashboard(updatedData);
    }

    /**
     * @param {Object} response
     * @param {Project.id} projectId
     * @param {boolean} isCustom
     * @returns {AnalyticsDashboard}
     */
    static buildFromResponse(response, projectId, isCustom = false) {
        return new AnalyticsDashboard({
            id: response.id,
            projectId,
            isCustom: isCustom,
            name: response.name,
            index: response.index,
            widgets: response.analytics_widgets.map(widgetResponse => Widget.buildFromResponse(widgetResponse, response.id, isCustom)),
        });
    }
}

export default AnalyticsDashboard;
