import {getRouteSlugForNetwork} from "../../Utils/RouterHelpers";
import {getApiIdForNetwork, getLabelForNetwork, getShorthandForNetwork} from "../../Utils/NetworkHelpers";

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
            name: getLabelForNetwork(type),
            shorthand: getShorthandForNetwork(type),
            apiId: getApiIdForNetwork(type),
            routeId: getRouteSlugForNetwork(type),
        });
    }
}

export default Network;
