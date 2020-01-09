class WidgetData {

    constructor(data) {
        this.data = data.data;
        this.dataPoints = data.dataPoints;
    }

    static buildFromResponse(response) {
        console.log(response)
        return new WidgetData({
            data: [],
            dataPoints: []
        })

    }

}

export default WidgetData;
