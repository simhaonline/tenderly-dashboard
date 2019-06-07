import {Api} from "../../Utils/Api";
import Contract from './Contract.model';
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import {NetworkAppToApiTypeMap} from "../../Common/constants";

export const FETCH_CONTRACTS_FOR_PROJECT_ACTION = 'FETCH_CONTRACTS_FOR_PROJECT';
export const FETCH_CONTRACT_FOR_PROJECT_ACTION = 'FETCH_CONTRACT_FOR_PROJECT';

/**
 * @param {string} projectId
 * @param {string|null} [account]
 */
export const fetchContractsForProject = (projectId, account = null) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        const projectAccount = account || username;

        try {
            const {data} = await Api.get(`/account/${projectAccount}/project/${projectId}/contracts`);

            if (!data) {
                // @TODO Return an ErrorActionResponse here.
                return null;
            }

            const contracts = data.map(contract => Contract.buildFromResponse(contract, projectId));

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
 * @param {string} contactAddress
 * @param {NetworkTypes} network
 */
export const fetchContractForProject = (projectId, contactAddress, network) => {
    return async (dispatch, getState) => {
        const {auth: {user: {username}}} = getState();

        try {
            const apiNetworkId = NetworkAppToApiTypeMap[network];

            const {data} = await Api.get(`/account/${username}/project/${projectId}/contract/${apiNetworkId}/${contactAddress}`);

            if (!data) {
                return new ErrorActionResponse();
            }

            const contract = Contract.buildFromResponse(data, projectId);

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
