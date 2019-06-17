import {Trace} from "./Trace.model";

class StackTrace {
    /**
     * @param {Object} data
     */
    constructor(data) {
        /** @type string */
        this.id = data.txHash;

        /** @type Trace[] */
        this.trace = data.stackTrace;
    }

    /**
     * @param {Object} response
     * @return {StackTrace}
     */
    static buildFromResponse(response) {
        if (!response.transaction_info || !response.transaction_info.StackTrace) {
            return null;
        }

        const rawStackTrace = response.transaction_info.StackTrace;

        const trace = rawStackTrace.map(Trace.buildFromRawStackTrace);

        return new StackTrace({
            txHash: response.hash,
            stackTrace: trace,
        });
    }
}

export default StackTrace;
