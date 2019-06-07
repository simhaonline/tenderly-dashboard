export class Trace {
    /**
     * @param {Object} data
     * @param {Trace[]} [calls]
     */
    constructor(data, calls) {
        /** @type string */
        this.functionName = data.functionName;

        /** @type number */
        this.lineNumber = data.lineNumber;

        /** @type Trace[] */
        this.calls = calls;
    }

    /**
     *
     * @param {Object} rawCallTrace
     */
    static buildFromRawCallTrace(rawCallTrace) {
        let calls;

        if (rawCallTrace.calls) {
            calls = rawCallTrace.calls.map(Trace.buildFromRawCallTrace);
        }

        console.log(rawCallTrace);

        return new Trace({
            functionName: rawCallTrace.function_name,
            lineNumber: rawCallTrace.caller_line_number || rawCallTrace.function_line_number,
        }, calls);
    }
}
