import {NetworkAppToApiTypeMap, NetworkLabelMap, NetworkLabelShorthandMap} from "../Common/constants";

/**
 * @param {(NetworkTypes|string)} network
 * @returns {string}
 */
export function getApiIdForNetwork(network) {
    if (NetworkAppToApiTypeMap[network]) {
        return NetworkAppToApiTypeMap[network];
    }

    return network;
}

/**
 * @param {(NetworkTypes|string)} network
 * @returns {string}
 */
export function getLabelForNetwork(network) {
    if (NetworkLabelMap[network]) {
        return NetworkLabelMap[network];
    }

    return 'Private Network';
}

/**
 * @param {(NetworkTypes|string)} network
 * @returns {string}
 */
export function getShorthandForNetwork(network) {
    if (NetworkLabelShorthandMap[network]) {
        return NetworkLabelShorthandMap[network];
    }

    return 'PRV';
}
