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
        if (!response.transaction_info || !response.transaction_info.stack_trace) {
            return null;
        }

        const rawStackTrace = response.transaction_info.stack_trace;

        const trace = rawStackTrace.map(Trace.buildFromRawStackTrace);

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new StackTrace({
            txHash: response.hash,
            stackTrace: trace,
        });
    }
}

export default StackTrace;
