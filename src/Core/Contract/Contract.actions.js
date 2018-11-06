import {Api} from "../../Utils/Api";

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

            console.log(data);

            // const project = new Project(data);

            dispatch({
                type: FETCH_CONTRACTS_FOR_PROJECT_ACTION,
            });

            return 'qwe';
        } catch (error) {
            return null;
        }
    }
};

