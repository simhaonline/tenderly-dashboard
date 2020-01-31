import ContractABIDescriptor from "../Contract/ContractABIDescriptor.model";
import Web3Abi from "web3-eth-abi";

class Simulation {
   constructor(data) {
      this.network = data.network;
      this.block = data.block;
      this.blockIndex = data.blockIndex;
      this.from = data.from;
      this.to = data.to;
      this.input = data.input || "";
      this.gas = data.gas;
      this.gasPrice = data.gasPrice;
      this.value = data.value;
      this.encodedInput= data.encodedInput || false;
      this.method = data.method;
      this.parameters = data.parameters
   }

   static encodeSimulationInput(simulation){
     const web3Data = ContractABIDescriptor.transformToWeb3(simulation.method);
     return Web3Abi.encodeFunctionCall(web3Data, simulation.parameters);
   }

   static transformToApiPayload(simulation){
      let input = simulation.input;
      if(!simulation.encodedInput && simulation.method){
         input = Simulation.encodeSimulationInput(simulation);
      }
      return {
         block_number: parseInt(simulation.block),
         transaction_index: parseInt(simulation.blockIndex),
         from: simulation.from,
         to: simulation.to,
         gas: parseInt(simulation.gas),
         gas_price: parseInt(simulation.gasPrice),
         value: simulation.value,
         input,
      }
   }
}

export default Simulation;