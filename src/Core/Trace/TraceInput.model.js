class TraceInputModel {
    constructor(data) {
        /** @type {string} */
        this.name = data.name;

        /** @type {string} */
        this.value = data.value;
    }

    static buildFromResponse(rawInput) {
        return new TraceInputModel({
            name: rawInput.Soltype.Name,
            value: rawInput.Value.toString(),
        });
    }
}

export default TraceInputModel;
