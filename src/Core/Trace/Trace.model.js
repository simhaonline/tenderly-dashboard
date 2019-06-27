export class Trace {
    /**
     * @param {Object} data
     * @param {Trace[]} [calls]
     */
    constructor(data, calls) {
        /** @type string */
        this.functionName = data.functionName;

        /** @type string */
        this.op = data.op;

        /** @type string */
        this.fileName = data.fileName;

        /** @type number */
        this.gasUsed = data.gasUsed;

        /** @type string */
        this.contract = data.contract;

        /** @type number */
        this.fileId = data.fileId;

        /** @type number */
        this.lineNumber = data.lineNumber;

        /** @type Trace[] */
        this.calls = calls;
    }

    /**
     *
     * @param {Object} rawCallTrace
     * @param {number} depth
     */
    static buildFromRawCallTrace(rawCallTrace, depth = 0) {
        let calls;

        if (rawCallTrace.calls) {
            calls = rawCallTrace.calls.map(trace => Trace.buildFromRawCallTrace(trace, depth + 1));
        }

        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Trace({
            functionName: rawCallTrace.function_name,
            contract: rawCallTrace.caller_line_number ? rawCallTrace.from : rawCallTrace.to,
            op: rawCallTrace.caller_op || rawCallTrace.function_op,
            fileName: rawCallTrace.contract_name,
            fileId: rawCallTrace.caller_file_index !== null ? rawCallTrace.caller_file_index : rawCallTrace.function_file_index,
            lineNumber: rawCallTrace.caller_line_number || rawCallTrace.function_line_number,
            gasUsed: rawCallTrace.gas_used,
        }, calls);
    }

    static buildFromRawStackTrace(rawStackTrace) {
        /**
         * @Notice When ever changing the mapping from response data, be sure to check `examples.js` and adjust them
         * accordingly as those mocked responses are used for the Example Project and might break it.
         */
        return new Trace({
            functionName: rawStackTrace.code,
            contract: rawStackTrace.contract,
            fileName: rawStackTrace.name,
            lineNumber: rawStackTrace.line,
            fileId: rawStackTrace.file_index,
        });
    }
}
