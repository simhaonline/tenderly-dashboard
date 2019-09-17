class StateDiff {
    constructor(data) {
        /** @type string */
        this.id = data.id;

        /** @type string */
        this.txHash = data.txHash;

        /** @type string */
        this.contract= data.contract;

        /** @type any */
        this.before = data.before;

        /** @type any */
        this.after = data.after;

        /** @type string */
        this.rawBefore = data.rawBefore;

        /** @type string */
        this.rawAfter = data.rawAfter;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.type = data.type;

        /** @type boolean */
        this.parsed = !!data.parsed;
    }

    /**
     * @param {Object} response
     * @param {string} transaction
     * @return {StateDiff}
     */
    static buildFromResponse(response, transaction) {
        const rawData = response.raw && response.raw.length > 0 ? response.raw[0] : null;

        const data = {
            txHash: transaction,
            before: response.original,
            after: response.dirty,
        };

        if (rawData) {
            data.contract = rawData.address ? rawData.address.toLowerCase() : "";
            data.id = rawData.key;
            data.rawBefore = rawData.original;
            data.rawAfter = rawData.dirty;
        }

        if (response.soltype) {
            data.name = response.soltype.name;
            data.type = response.soltype.type;
            data.parsed = true;
        }

        return new StateDiff(data);
    }
}

export default StateDiff;
