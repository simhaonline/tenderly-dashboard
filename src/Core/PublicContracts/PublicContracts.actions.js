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
    return dispatch => {
        // @TODO Replace with API call...
        const contract = {
            id: id,
            network: 'kovan_testnet',
            address: '0x0a97094c19295E320D5121d72139A150021a2702',
            name: 'CryptoMinerToken',
            compilerVersion: 'v0.4.25',
            events: [
                {
                    id: 'e1',
                    name: 'Dummy error number 1',
                },
                {
                    id: 'e2',
                    name: 'Dummy error number 2',
                },
                {
                    id: 'e3',
                    name: 'Dummy error number 3',
                },
            ]
        };

        dispatch({
            type: FETCH_PUBLIC_CONTRACT_ACTION,
            contract,
            events: contract.events,
        });
    }
};
