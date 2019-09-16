class StateDiff {
    constructor(data) {
        /** @type string */
        this.txHash = data.txHash;

        /** @type string */
        this.contract= data.contract;

        /** @type any */
        this.before = data.before;

        /** @type any */
        this.after = data.after;

        /** @type string */
        this.name = data.name;

        /** @type string */
        this.type = data.type;
    }

    /**
     * @param {Object} response
     * @param {string} transaction
     * @return {StateDiff}
     */
    static buildFromResponse(response, transaction) {
        const data = {
            txHash: transaction,
            before: response.original,
            after: response.dirty,
            contract: response.address ? response.address.toLowerCase() : '',
        };

        if (response.soltype) {
            data.name = response.soltype.name;
            data.type = response.soltype.type;
        }

        return new StateDiff(data);
    }
}

export default StateDiff;
