import {Api} from '../../Utils/Api';
import {NetworkAppToApiTypeMap} from "../../Common/constants";
import Contract from "../Contract/Contract.model";
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";

export const FETCH_PUBLIC_CONTRACTS_ACTION = 'FETCH_PUBLIC_CONTRACTS';
export const FETCH_PUBLIC_CONTRACT_ACTION = 'FETCH_PUBLIC_CONTRACT';
export const FETCH_PUBLIC_CONTRACT_EVENTS_ACTION = 'FETCH_PUBLIC_CONTRACT_EVENTS';

export const FETCH_WATCHED_CONTRACTS_ACTION = 'FETCH_WATCHED_CONTRACTS';
export const TOGGLE_WATCHED_CONTRACT_ACTION = 'TOGGLE_WATCHED_CONTRACT';

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
        try {
            const apiNetwork = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/public-contracts/${apiNetwork}/${id}`);

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
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 * @param {string} id
 * @param {Transaction} transaction
 */
export const fetchPublicContractsForTransaction = (id, transaction) => {
    return async dispatch => {
        try {
            const apiNetwork = NetworkAppToApiTypeMap[transaction.network];

            const {data} = await Api.get(`/public-contracts/${apiNetwork}/${id}`);

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

            const contracts = data.contracts.map(Contract.buildFromResponse);

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
            const networkId = NetworkAppToApiTypeMap[network];

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
