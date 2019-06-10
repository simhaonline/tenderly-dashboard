export class Trace {
    /**
     * @param {Object} data
     * @param {Trace[]} [calls]
     */
    constructor(data, calls) {
        /** @type string */
        this.functionName = data.functionName;

        /** @type string */
        this.fileName = data.fileName;

        /** @type number */
        this.fileIndex = data.fileIndex;

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

        return new Trace({
            functionName: rawCallTrace.function_name,
            fileName: rawCallTrace.contract_name,
            fileIndex: depth === 0 ? rawCallTrace.function_file_index : rawCallTrace.caller_file_index,
            lineNumber: rawCallTrace.caller_line_number || rawCallTrace.function_line_number,
        }, calls);
    }
}
