import {Api} from "../../Utils/Api";
import Contract from './Contract.model';

export const FETCH_CONTRACTS_FOR_PROJECT_ACTION = 'FETCH_CONTRACTS_FOR_PROJECT';

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
                return null;
            }

            const contracts = data.map(contract => new Contract(contract));

            dispatch({
                type: FETCH_CONTRACTS_FOR_PROJECT_ACTION,
                contracts,
            });

            return contracts;
        } catch (error) {
            return null;
        }
    }
};

