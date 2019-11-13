import {AccountTypes} from "../../Common/constants";

import {Account} from "../models";

class Wallet extends Account {
    constructor(data) {
        super(data, AccountTypes.WALLET);

        /** @type {WalletToken[]} */
        this.walletTokens = data.walletTokens;
    }

    /**
     * @param {string} token
     * @returns {WalletToken}
     */
    getWalletToken(token) {
        return this.walletTokens.find(walletToken => walletToken.token === token);
    }

    static buildFromResponse(response) {
        return new Wallet({
           id: Wallet.generateUniqueId(response.address, response.network),
        });
    }
}

export default Wallet;
