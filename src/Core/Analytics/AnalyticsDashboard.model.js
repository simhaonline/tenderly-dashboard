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

        /** @type {Object.<Widget.id, Widget>} */
        this.widgets = data.widgets;
    }

    /**
     * @param {Object} response
     * @param {Project.id} projectId
     * @param {boolean} isCustom
     * @returns {AnalyticsDashboard}
     */
    static buildFromResponse(response, projectId, isCustom = false) {
        console.log(response);
        return new AnalyticsDashboard({
            id: response.id,
            projectId,
            isCustom: isCustom,
            name: response.name,
            index: response.index,
            widgets: response.analytics_widgets.map(widgetResponse => Widget.buildFromResponse(widgetResponse, isCustom)),
        });
    }
}

export default AnalyticsDashboard;
