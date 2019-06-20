import {Trace} from "./Trace.model";

export class CallTrace {
    /**
     * @param {Object} data
     */
    constructor(data) {
        /** @type string */
        this.id = data.txHash;

        /** @type Trace */
        this.trace = data.callTrace;
    }

    /**
     * @param {Object} response
     * @return {CallTrace}
     */
    static buildFromResponse(response) {
        if (!response.transaction_info || !response.transaction_info.call_trace) {
            return null;
        }

        const rawCallTrace = response.transaction_info.call_trace;

        const callTrace = Trace.buildFromRawCallTrace(rawCallTrace);

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new CallTrace({
            txHash: response.hash,
            callTrace,
        });
    };
}
