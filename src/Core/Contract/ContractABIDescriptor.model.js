import {ContractInputParameter} from "../models";

class ContractABIDescriptor {
    constructor(data) {
        this.type = data.type;
        this.name = data.name;
        this.constant = data.constant;
        this.inputs = data.inputs;
        this.outputs = data.outputs;
    }

    static transformToWeb3(descriptor) {
        const web3Data = {
            type: descriptor.type,
            name: descriptor.name,
            inputs: [],
        };

        if (descriptor.inputs){
            web3Data.inputs = descriptor.inputs.map(input=> ({
                type: input.type,
                name: input.name,
            }))
        }

        return web3Data;
    }

    static buildFromResponse(response) {
        let inputs, outputs;
        if (response.inputs && response.inputs.length > 0) {
            inputs = response.inputs.map(ContractInputParameter.buildFromResponse)
        }
        if (response.outputs && response.outputs.length > 0) {
            outputs = response.outputs.map(ContractInputParameter.buildFromResponse)
        }

        return new ContractABIDescriptor({
            type: response.type,
            name: response.name,
            constant: response.constant,
            inputs,
            outputs,
        })
    }
}

export default ContractABIDescriptor;