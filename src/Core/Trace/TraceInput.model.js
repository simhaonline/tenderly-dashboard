class TraceInputModel {
    constructor(data) {
        /** @type {string} */
        this.name = data.name;

        /** @type {string | number} */
        this.value = data.value;
    }

    static buildFromResponse(rawInput) {
        return new TraceInputModel({
            value: rawInput.Value,
            name: rawInput.Soltype.Name,
        });
    }
}

export default TraceInputModel;
