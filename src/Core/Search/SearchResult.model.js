import {NetworkApiToAppTypeMap, SearchResultTypes} from "../../Common/constants";
import Project from "../Project/Project.model";

class SearchResult {
    constructor(data) {
        this.type = data.type;

        this.label = data.label;

        this.value = data.label;

        this.network = data.network;

        this.projectId = data.projectId;
    }

    /**
     * @returns {string}
     */
    getUrl() {
        switch (this.type) {
            case SearchResultTypes.PROJECT_CONTRACT:
                return 'response.contract.contract_name';
            case SearchResultTypes.PUBLIC_CONTRACT:
                return 'response.contract_name';
            case SearchResultTypes.PUBLIC_TRANSACTION:
                return 'Transaction';
            default:
                return '';
        }
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
                return NetworkApiToAppTypeMap[response.network_id];
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
            projectId: response.project ? Project.generateProjectId(response.project.slug, response.project.owner) : null,
            type,
        });
    }
}

export default SearchResult;
