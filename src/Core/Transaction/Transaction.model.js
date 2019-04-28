import {CallTrace} from "../Trace/CallTrace.model";

export class Transaction {
    constructor(data) {
        /**
         * Defines whether the transaction was successful or not.
         * @type boolean
         */
        this.status = data.status;

        /** @type CallTrace */
        this.callTrace = data.callTrace;
    }

    static buildFromResponse(response) {
        const callTrace = CallTrace.buildFromResponse(response.Trace);

        return new Transaction({
            status: response.status,
            callTrace,
        });
    }
}
