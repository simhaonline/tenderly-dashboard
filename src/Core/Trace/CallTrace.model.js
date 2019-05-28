export class CallTrace {
    /**
     * @param {Object} data
     */
    constructor(data) {
        /** @type string */
        this.id = data.txHash;

        /** @type Trace[] */
        this.trace = [];
    }

    /**
     * @param {Object} response
     * @return {CallTrace}
     */
    static buildFromResponse(response) {
        console.log(response);
        return new CallTrace({
            txHash: response.hash,
        });
    };
}
