import chroma from "chroma-js";

class WidgetData {

    constructor(data) {
        this.data = data.data;
        this.dataPoints = data.dataPoints;
    }

    static buildFromResponse(response) {
        const data = [];
        const dataPoints = [];


        Object.values(response).forEach(widgetResponse => {
            const legendItems = widgetResponse.legend && widgetResponse.legend.items ? Object.keys(widgetResponse.legend.items) : [];
            const colorScale = chroma.scale(['#0069E0', '#ADD3FF']).correctLightness();

            if (widgetResponse.data) {
                data.push(...widgetResponse.data)
            }

            dataPoints.push(...legendItems.map((itemKey, index) => ({
                key: itemKey,
                name: itemKey,
                color: colorScale(1 / (Math.max(legendItems.length - 1, 1)) * index).hex(),
                meta: widgetResponse.legend.items[itemKey].labels,
            })))
        });

        return new WidgetData({
            data,
            dataPoints
        })

    }

}

export default WidgetData;
