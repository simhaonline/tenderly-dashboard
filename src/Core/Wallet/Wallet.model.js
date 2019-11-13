import {AccountTypes} from "../../Common/constants";

import {Account} from "../models";

class Wallet extends Account {
    constructor(data) {
        super(data, AccountTypes.WALLET);
    }

    static buildFromResponse(response) {
        return new Wallet({
           id: Wallet.generateUniqueId(response.address, response.network),
        });
    }
}
