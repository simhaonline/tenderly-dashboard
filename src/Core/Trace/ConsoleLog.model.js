class ConsoleLog {
   constructor(data) {
       this.output = data.output;
       this.contractId = data.contractId;
       this.txHash = data.txHash;
       this.line = data.line;
   }
   static buildFromResponse(response){
       return new ConsoleLog({
          output: response.output,
          contractId: response.contract_id,
          txHash: response.tx_hash,
          line : response.line,
       })
   }
}

export default ConsoleLog;


