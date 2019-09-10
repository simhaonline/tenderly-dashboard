import {NetworkApiToAppTypeMap} from "../../Common/constants";
import moment from "moment";

class AlertLog {
    constructor(data) {
        /**
         * The ID of the alert rules that maps to the AlertRule model.
         * @type string
         */
        this.alertRule = data.alertRule;

        /** @type string */
        this.txHash = data.txHash;

        /** @type NetworkTypes */
        this.network = data.network;

        /** @type Date */
        this.triggeredAt = data.triggeredAt;
    }

    static buildFromResponse(response) {
        return new AlertLog({
            alertRule: response.alert_id,
            triggeredAt: moment(response.checked_at),
            network: NetworkApiToAppTypeMap[response.network_id],
            txHash: response.tx_hash,
        });
    }
}

export default AlertLog;
