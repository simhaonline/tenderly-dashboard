class TraceInputModel {
    constructor(data) {
        /** @type {string} */
        this.name = data.name;

        /** @type {string} */
        this.value = data.value;
    }

    static buildFromResponse(rawInput) {
        return new TraceInputModel({
            name: rawInput.Soltype ? rawInput.Soltype.Name : null,
            value: rawInput.Value !== null ? rawInput.Value : null,
        });
    }
}

export default TraceInputModel;
