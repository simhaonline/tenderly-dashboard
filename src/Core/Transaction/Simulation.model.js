class Simulation {
   constructor(data) {
      this.block = data.block;
      this.blockIndex = data.blockIndex;
      this.from = data.from;
      this.to = data.to;
      this.inputs = data.inputs;
      this.gas = data.gas;
      this.gasPrice = data.gasPrice;
      this.value = data.value;
   }
   static transformToApiPayload(simulation){
      return {
         block_number: parseInt(simulation.block),
         transaction_index: parseInt(simulation.blockIndex),
         from: simulation.from,
         to: simulation.to,
         gas: parseInt(simulation.gas),
         gas_price: parseInt(simulation.gasPrice),
         value: simulation.value,
         input: "",
      }
   }
}

export default Simulation;