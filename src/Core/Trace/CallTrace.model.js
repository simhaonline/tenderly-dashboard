import {Trace} from "./Trace.model";

class CallTrace {
    /**
     * @param {Object} data
     */
    constructor(data) {
        /** @type string */
        this.id = data.txHash;

        /** @type Trace */
        this.trace = data.callTrace;

        /** @type {number} */
        this.initialGas = data.initialGas;

        /** @type {number} */
        this.refundedGas = data.refundedGas;
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
            initialGas: response.transaction_info.intrinsic_gas || 0,
            refundedGas: response.transaction_info.refund_gas || 0,
        });
    };
}

export default CallTrace;
