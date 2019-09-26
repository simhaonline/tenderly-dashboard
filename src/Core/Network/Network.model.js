import {
    NetworkAppToApiTypeMap,
    NetworkAppToRouteTypeMap,
    NetworkLabelMap,
    NetworkLabelShorthandMap
} from "../../Common/constants";

class Network {
    constructor(data) {
        /** @type {NetworkTypes} */
        this.id = data.id;

        /** @type {number} */
        this.apiId = data.apiId;

        /** @type {string} */
        this.routeId = data.routeId;

        /** @type {string} */
        this.name = data.name;

        /** @type {string} */
        this.shorthand = data.shorthand;
    }

    /**
     * @param {NetworkTypes} type
     */
    static buildFromNetworkType(type) {
        return new Network({
            id: type,
            name: NetworkLabelMap[type],
            shorthand: NetworkLabelShorthandMap[type],
            apiId: NetworkAppToApiTypeMap[type],
            routeId: NetworkAppToRouteTypeMap[type],
        });
    }
}

export default Network;
