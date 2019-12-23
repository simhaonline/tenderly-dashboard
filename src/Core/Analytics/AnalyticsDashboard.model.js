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

}

export default AnalyticsDashboard;
