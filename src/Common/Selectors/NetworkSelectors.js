import * as _ from "lodash";
import {Network} from "../../Core/models";

/**
 * @param {Contract[]} contracts
 */
export function getUniqueNetworksForContracts(contracts) {
    if (!contracts || !contracts.length) {
        return [];
    }

    const uniqueNetworks = _.uniqBy(contracts, 'network')
        .map(contract => Network.buildFromNetworkType(contract.network));

    return uniqueNetworks;
}
