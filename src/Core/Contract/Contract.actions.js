import {Api} from "../../Utils/Api";
import Contract from './Contract.model';
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NetworkAppToApiTypeMap} from "../../Common/constants";

export const FETCH_CONTRACTS_FOR_PROJECT_ACTION = 'FETCH_CONTRACTS_FOR_PROJECT';
export const FETCH_CONTRACT_FOR_PROJECT_ACTION = 'FETCH_CONTRACT_FOR_PROJECT';
export const TOGGLE_CONTRACT_LISTENING_ACTION = 'TOGGLE_CONTRACT_LISTENING';

/**
 * @param {string} projectId
 */
export const fetchContractsForProject = (projectId) => {
    return async dispatch => {
        try {
            const {data} = await Api.get(`/account/me/project/${projectId}/contracts`);

            if (!data) {
                // @TODO Return an ErrorActionResponse here.
                return null;
            }

            const contracts = data.map(contract => Contract.buildFromResponse(contract.contract, {
                id: projectId,
                listening: contract.include_in_transaction_listing,
            }));

            await dispatch({
                type: FETCH_CONTRACTS_FOR_PROJECT_ACTION,
                contracts,
                projectId,
            });

            // @TODO Return an SuccessActionResponse here.
            return contracts;
        } catch (error) {
            console.error(error);
            // @TODO Return an ErrorActionResponse here.
            return null;
        }
    }
};

/**
 *
 * @param {string} projectId
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 */
export const fetchContractForProject = (projectId, contractAddress, network) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/me/project/${projectId}/contract/${apiNetworkId}/${contractAddress}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const contract = Contract.buildFromResponse(data, {
                id: projectId,
                listening: data.include_in_transaction_listing,
            });

            await dispatch({
                type: FETCH_CONTRACT_FOR_PROJECT_ACTION,
                contract,
                projectId,
            });

            return new SuccessActionResponse(contract);
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};

/**
 *
 * @param {string} projectId
 * @param {string} contractAddress
 * @param {NetworkTypes} network
 */
export const toggleContractListening = (projectId, contractAddress, network) => {
    return async dispatch => {
        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.post(`/account/me/project/${projectId}/contract/${apiNetworkId}/${contractAddress}/toggle`);

            if (!data || !data.success) {
                return new ErrorActionResponse();
            }

            dispatch({
                type: TOGGLE_CONTRACT_LISTENING_ACTION,
                projectId,
                contract: contractAddress,
                network,
            });

            return new SuccessActionResponse();
        } catch (error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
};
