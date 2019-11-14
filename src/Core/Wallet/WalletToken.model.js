class WalletToken {
    constructor(data) {
        /** @type {string} */
        this.token = data.token;

        /** @type {string} */
        this.name = data.name;

        /** @type {string} */
        this.shorthand = data.shorthand;

        /** @type {number} */
        this.balance = data.balance;
    }

}

export default WalletToken;
