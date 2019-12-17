import {
    NetworkApiToAppTypeMap,
    NetworkAppToApiTypeMap,
    NetworkLabelMap,
    NetworkLabelShorthandMap
} from "../Common/constants";

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
 * @param {String} apiId
 * @returns {(NetworkTypes|string)}
 */
export function getNetworkForApiId(apiId) {
    return NetworkApiToAppTypeMap[apiId] || apiId;
}

/**
 * @param {(NetworkTypes|string)} network
 * @returns {string}
 */
export function getLabelForNetwork(network) {
    if (NetworkLabelMap[network]) {
        return NetworkLabelMap[network];
    }

    return 'Private';
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
