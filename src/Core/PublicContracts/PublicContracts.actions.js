import {Api} from '../../Utils/Api';
import PublicContract from "./PublicContract.model";

export const FETCH_PUBLIC_CONTRACTS_ACTION = 'FETCH_PUBLIC_CONTRACTS';
export const FETCH_PUBLIC_CONTRACT_ACTION = 'FETCH_PUBLIC_CONTRACT';

/**
 * @param {string} network
 * @param {number} page
 * @param {string} query
 */
export const fetchPublicContracts = (network, page, query) => {
    return async dispatch => {
        const {data} = await Api.get('/public-contracts', {
            params: {
                page,
                query,
            }
        });

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
 * @param {number} id
 */
export const fetchPublicContract = (id) => {
    return async dispatch => {
        const {data} = await Api.get(`/public-contracts/${id}`);

        const contract = PublicContract.responseTransformer(data);

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_ACTION,
            contract,
            events: contract.events,
        });
    }
};
