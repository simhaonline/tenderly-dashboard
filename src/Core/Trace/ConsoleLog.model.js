class ConsoleLog {
    constructor(data) {
        this.output = data.output;
        this.contract = data.contract;
        this.txHash = data.txHash;
        this.line = data.line;
        this.method = data.method;
    }

    static buildFromResponse(response) {
        return new ConsoleLog({
            output: response.output,
            contract: response.contract,
            txHash: response.tx_hash,
            line: response.line,
            method: response.method,
        })
    }
}

export default ConsoleLog;


