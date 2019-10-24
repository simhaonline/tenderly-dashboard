import {NetworkApiToAppTypeMap, NetworkAppToRouteTypeMap, SearchResultTypes} from "../../Common/constants";
import Project from "../Project/Project.model";

class SearchResult {
    constructor(data) {
        /** @type {SearchResultTypes} */
        this.type = data.type;

        /** @type {string} */
        this.label = data.label;

        /** @type {string} */
        this.value = `${data.network}:${data.hex}`;

        /**
         * This is unique hex for this search results. It can be either the contract address or transaction hash.
         * @type {string}
         */
        this.hex = data.hex;

        /** @type {NetworkTypes} */
        this.network = data.network;

        /** @type {(Project.id|null)} */
        this.projectId = data.projectId;
    }

    /**
     * @returns {string}
     */
    getUrl() {
        let url = '';

        if (this.projectId) {
            const {slug, username} = Project.getSlugAndUsernameFromId(this.projectId);

            url += `/${username}/${slug}`;
        }

        switch (this.type) {
            case SearchResultTypes.PROJECT_CONTRACT:
            case SearchResultTypes.PUBLIC_CONTRACT:
                url += '/contract';
                break;
            case SearchResultTypes.PROJECT_TRANSACTION:
            case SearchResultTypes.PUBLIC_TRANSACTION:
                url += '/tx';
                break;
            default:
                break;
        }

        const networkRoute = NetworkAppToRouteTypeMap[this.network];

        return url + `/${networkRoute}/${this.hex}`;
    }

    /**
     * @returns {null|{slug: string, username: string}}
     */
    getProjectInfo() {
        if (!this.projectId) return null;

        return Project.getSlugAndUsernameFromId(this.projectId);
    }

    static getLabelForType(type, response) {
        switch (type) {
            case SearchResultTypes.PROJECT_CONTRACT:
                return response.contract.contract_name;
            case SearchResultTypes.PUBLIC_CONTRACT:
                return response.contract_name;
            case SearchResultTypes.PUBLIC_TRANSACTION:
            case SearchResultTypes.PROJECT_TRANSACTION:
                return 'Transaction';
            default:
                return '';
        }
    }

    static getNetworkForType(type, response) {
        switch (type) {
            case SearchResultTypes.PROJECT_CONTRACT:
                return NetworkApiToAppTypeMap[response.contract.network_id];
            case SearchResultTypes.PUBLIC_CONTRACT:
            case SearchResultTypes.PUBLIC_TRANSACTION:
            case SearchResultTypes.PROJECT_TRANSACTION:
                return NetworkApiToAppTypeMap[response.network_id];
            default:
                return null;
        }
    }

    static getHexForType(type, response) {
        switch (type) {
            case SearchResultTypes.PROJECT_CONTRACT:
                return response.contract.address;
            case SearchResultTypes.PUBLIC_CONTRACT:
                return response.address;
            case SearchResultTypes.PUBLIC_TRANSACTION:
            case SearchResultTypes.PROJECT_TRANSACTION:
                return response.hash;
            default:
                return null;
        }
    }

    /**
     * @param {Object} response
     * @param {SearchResultTypes} type
     * @returns {SearchResult}
     */
    static buildFromResponse(response, type) {
        return new SearchResult({
            label: SearchResult.getLabelForType(type, response),
            network: SearchResult.getNetworkForType(type, response),
            hex: SearchResult.getHexForType(type, response),
            projectId: response.project ? Project.generateProjectId(response.project.slug, response.project.owner.username) : null,
            type,
        });
    }
}

export default SearchResult;
