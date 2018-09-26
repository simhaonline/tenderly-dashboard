class PublicContract {
    constructor(data) {
        this.id = data.ID;
        this.name = data.contract_name;
    }
    static responseTransformer(responseData) {
        return new PublicContract(responseData);
    }
}

export default PublicContract;
