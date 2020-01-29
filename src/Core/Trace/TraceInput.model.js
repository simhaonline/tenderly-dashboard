class TraceInput {
    constructor(data) {
        /** @type {string} */
        this.name = data.name;

        /** @type {string} */
        this.value = data.value;
    }

    static buildFromResponse(rawInput) {
        return new TraceInput({
            name: rawInput.soltype ? rawInput.soltype.name : null,
            value: rawInput.value !== null ? rawInput.value : null,
        });
    }
}

export default TraceInput;
