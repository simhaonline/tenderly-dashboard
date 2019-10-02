class ContractInputParameter {
    constructor(data) {
        /** @type string */
        this.type = data.type;

        /** @type string */
        this.name = data.name;

        /** @type {ContractInputParameterSimpleTypes} */
        this.simpleType = data.simpleType;

        /** @type {ContractInputParameterSimpleTypes} */
        this.nestedType = data.nestedType;
    }

    static buildFromResponse(response) {
        return new ContractInputParameter({
            type: response.type,
            name: response.name,
            simpleType: response.simple_type ? response.simple_type.type : null,
            nestedType: response.simple_type && response.simple_type.nested_type ? response.simple_type.nested_type.type : null,
        });
    }
}

export default ContractInputParameter;
