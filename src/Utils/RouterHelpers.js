import {NetworkAppToRouteTypeMap, NetworkRouteToAppTypeMap} from "../Common/constants";

/**
 * @param {(NetworkTypes|string)} network
 * @returns {string}
 */
export function getRouteSlugForNetwork(network) {
    if (NetworkAppToRouteTypeMap[network]) {
        return NetworkAppToRouteTypeMap[network]
    }

    return network;
}

/**
 * @param {string} routeSlug
 * @returns {(NetworkTypes|string)}
 */
export function getNetworkForRouteSlug(routeSlug) {
    if (NetworkRouteToAppTypeMap[routeSlug]) {
        return NetworkRouteToAppTypeMap[routeSlug];
    }

    return routeSlug;
}
