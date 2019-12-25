class AnalyticsDashboard {
    constructor(data) {
        /** @type {string} */
        this.id = data.id;

        /** @type {string} */
        this.name = data.name;

        /** @type {Number} */
        this.index = data.index;

        /** @type {Project.id} */
        this.projectId = data.projectId;

        /** @type {Widget.id[]} */
        this.widgetOrder = data.widgetOrder;

        /** @type {Object.<Widget.id, Widget>} */
        this.widgets = data.widgets;
    }

    static buildFromResponse(response, projectId) {
        return new AnalyticsDashboard({
            id: response.id,
            name: response.name,
            index: response.index,
            widgets: response.widgets,
        });
    }
}

export default AnalyticsDashboard;
