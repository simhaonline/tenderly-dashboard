class TraceInputModel {
    constructor(data) {
        /** @type {string} */
        this.name = data.name;

        /** @type {string} */
        this.value = data.value;
    }

    static buildFromResponse(rawInput) {
        return new TraceInputModel({
            name: rawInput.soltype ? rawInput.soltype.Name : null,
            value: rawInput.value ? rawInput.value.toString() : "null",
        });
    }
}

export default TraceInputModel;
