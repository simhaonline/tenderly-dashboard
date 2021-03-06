import {Api} from '../../Utils/Api';
import {getApiIdForNetwork} from "../../Utils/NetworkHelpers";

import Contract from "../Contract/Contract.model";
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

export const FETCH_PUBLIC_CONTRACTS_ACTION = 'FETCH_PUBLIC_CONTRACTS';
export const FETCH_PUBLIC_CONTRACTS_FOR_TX_ACTION = 'FETCH_PUBLIC_CONTRACTS_FOR_TX';
export const FETCH_PUBLIC_CONTRACT_ACTION = 'FETCH_PUBLIC_CONTRACT';

export const FETCH_WATCHED_CONTRACTS_ACTION = 'FETCH_WATCHED_CONTRACTS';
export const TOGGLE_WATCHED_CONTRACT_ACTION = 'TOGGLE_WATCHED_CONTRACT';

/**
 * @param {string} network
 * @param {number} page
 * @param {number} perPage
 * @param {string} [query]
 */
export const fetchPublicContracts = (network, page, perPage = 20, query) => {
    return async dispatch => {
        try {
            const apiNetwork = getApiIdForNetwork(network);

            const {data} = await Api.get(`/public-contracts/${apiNetwork}`, {
                params: {
                    page,
                    perPage,
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

            return new SuccessActionResponse(contracts);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 *
 * @param {string} address
 * @param {NetworkTypes} network
 * @param {boolean} [silentError]
 */
export const fetchPublicContract = (address, network, silentError = false) => {
    return async dispatch => {
        try {
            const apiNetwork = getApiIdForNetwork(network);

            const {data} = await Api.get(`/public-contracts/${apiNetwork}/${address}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const contract = Contract.buildFromResponse(data);

            dispatch({
                type: FETCH_PUBLIC_CONTRACT_ACTION,
                contract,
            });

            return new SuccessActionResponse(contract);
        } catch (error) {
            if (!silentError) {
                console.error(error);
            }
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {Transaction} transaction
 */
export const fetchPublicContractsForTransaction = (transaction) => {
    return async dispatch => {
        try {
            const apiNetwork = getApiIdForNetwork(transaction.network);

            const {data} = await Api.get(`/public-contract/${apiNetwork}/tx/${transaction.txHash}/contracts`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const contracts = data.map(contract => Contract.buildFromResponse(contract));

            dispatch({
                type: FETCH_PUBLIC_CONTRACTS_FOR_TX_ACTION,
                contracts,
            });

            return new SuccessActionResponse(contracts);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

export const fetchWatchedContracts = () => {
    return async dispatch => {
        try {
            const {data} = await Api.get('/account/me/watches');

            if (!data) {
                return new ErrorActionResponse();
            }

            const contracts = data.contracts.map(contract => Contract.buildFromResponse(contract));

            dispatch({
                type: FETCH_WATCHED_CONTRACTS_ACTION,
                contracts,
            });

            return new SuccessActionResponse(contracts);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

/**
 * @param {Contract} contract
 * @param {NetworkTypes} network
 */
export const toggleWatchedContract = (contract, network) => {
    return async dispatch => {
        try {
            const networkId = getApiIdForNetwork(network);

            const {data} = await Api.post(`/public-contract/${networkId}/address/${contract.address}/toggle-watch`);

            if (!data) {
                return new ErrorActionResponse();
            }

            dispatch({
                type: TOGGLE_WATCHED_CONTRACT_ACTION,
                contract: contract,
                network,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    };
};

export const fetchMostWatchedContracts = () => {
    return async () => {
        try {
            const {data} = await Api.get('/most-watched-public-contracts');

            if (!data) {
                return new ErrorActionResponse();
            }

            const contracts = data.map(contract => Contract.buildFromResponse(contract));

            return new SuccessActionResponse(contracts);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};
