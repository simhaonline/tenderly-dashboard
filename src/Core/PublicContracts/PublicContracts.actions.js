import {Api} from '../../Utils/Api';
import {NetworkAppToApiTypeMap} from "../../Common/constants";
import Event from "../Event/Event.model";
import PublicContract from "./PublicContract.model";

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

        const contracts = data.map(contract => PublicContract.responseTransformer(contract));

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
 */
export const fetchPublicContract = (id) => {
    return async dispatch => {
        const {data} = await Api.get(`/public-contracts/${id}`);

        if (!data) {
            return;
        }

        const contract = PublicContract.responseTransformer(data);

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_ACTION,
            contract,
        });
    }
};

/**
 * @param {string} id
 * @param {string} query
 * @param {number} page
 */
export const fetchPublicContractEvents = (id, query, page) => {
    return async dispatch => {
        const {data} = await Api.get(`/public-contracts/${id}/events`, {
            params: {
                query,
                page,
            }
        });

        if (!data) {
            return;
        }

        const events = data.map(contract => Event.responseTransformer(contract));

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_EVENTS_ACTION,
            events,
        });
    }
};
