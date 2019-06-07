import {Api} from '../../Utils/Api';
import {NetworkAppToApiTypeMap} from "../../Common/constants";
import Event from "../Event/Event.model";
import Contract from "../Contract/Contract.model";

export const FETCH_PUBLIC_CONTRACTS_ACTION = 'FETCH_PUBLIC_CONTRACTS';
export const FETCH_PUBLIC_CONTRACT_ACTION = 'FETCH_PUBLIC_CONTRACT';
export const FETCH_PUBLIC_CONTRACT_EVENTS_ACTION = 'FETCH_PUBLIC_CONTRACT_EVENTS';

/**
 * @param {string} network
 * @param {number} page
 * @param {string} query
 */
export const fetchPublicContracts = (network, page, query) => {
    return async dispatch => {
        const apiNetwork = NetworkAppToApiTypeMap[network];

        const {data} = await Api.get(`/public-contracts/${apiNetwork}`, {
            params: {
                page,
                query,
            }
        });

        if (!data) {
            return;
        }

        const contracts = data.map(contract => Contract.buildFromResponse(contract));

        dispatch({
            type: FETCH_PUBLIC_CONTRACTS_ACTION,
            contracts,
            page,
            network,
        });
    }
};

/**
 *
 * @param {string} id
 * @param {string} network
 */
export const fetchPublicContract = (id, network) => {
    return async dispatch => {
        const apiNetwork = NetworkAppToApiTypeMap[network];

        const {data} = await Api.get(`/public-contracts/${apiNetwork}/${id}`);

        if (!data) {
            return;
        }

        const contract = Contract.buildFromResponse(data);

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_ACTION,
            contract,
        });
    }
};

/**
 * @param {string} id
 * @param {string} network
 * @param {number} perPage
 * @param {string} page
 */
export const fetchPublicContractEvents = (id, network, perPage=20, page=1) => {
    return async dispatch => {
        const apiNetwork = NetworkAppToApiTypeMap[network];

        const {data} = await Api.get(`/public-contracts/${apiNetwork}/${id}/events`, {
            params: {
                perPage,
                page,
            }
        });

        if (!data) {
            return;
        }

        const events = data.map(contract => Event.responseTransformer(contract));

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_EVENTS_ACTION,
            contractId: id,
            network,
            events,
        });
    }
};
