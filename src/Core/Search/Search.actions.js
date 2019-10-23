import {Api, PublicApi} from "../../Utils/Api";
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import Project from "../Project/Project.model";
import SearchResult from "./SearchResult.model";
import {SearchResultTypes} from "../../Common/constants";

export const FETCH_SEARCH_RESULTS_ACTION = 'FETCH_SEARCH_RESULTS';
export const SET_PROJECT_CONTEXT_ACTION = 'SET_PROJECT_CONTEXT';
export const REMOVE_PROJECT_CONTEXT_ACTION = 'REMOVE_PROJECT_CONTEXT';

/**
 * @param {string} query
 */
export function getSearchResults(query) {
    return async (dispatch, getState) => {
        const {auth: {loggedIn}, search: {currentProject}} = getState();
        try {
            let searchQuery;

            let username, projectSlug;

            if (currentProject) {
                const projectInfo = Project.getSlugAndUsernameFromId(currentProject);

                username = projectInfo.username;
                projectSlug = projectInfo.slug;
            }

            if (loggedIn) {
                searchQuery = await Api.get('/search', {
                    params: {
                        query,
                        username,
                        projectSlug,
                    },
                });
            } else {
                searchQuery = await PublicApi.get('/api/v1/search', {
                    params: {
                        query,
                    },
                });
            }

            const {data} = searchQuery;

            if (!data) {
                return new ErrorActionResponse();
            }

            const results = [];



            if (data.project_contracts) {
                results.push({
                    label: "Project Contracts",
                    value: SearchResultTypes.PROJECT_CONTRACT,
                    options: data.project_contracts.map(contract => SearchResult.buildFromResponse(contract, SearchResultTypes.PROJECT_CONTRACT)),
                });
            }

            if (data.contracts) {
                results.push({
                    label: "Contracts",
                    value: SearchResultTypes.PUBLIC_CONTRACT,
                    options: data.contracts.map(contract => SearchResult.buildFromResponse(contract, SearchResultTypes.PUBLIC_CONTRACT)),
                });
            }

            if (data.transactions) {
                results.push({
                    label: "Transactions",
                    value: SearchResultTypes.TRANSACTION,
                    options: data.transactions.map(tx => SearchResult.buildFromResponse(tx, SearchResultTypes.TRANSACTION)),
                });
            }

            console.log(results, data);

            dispatch({
                type: FETCH_SEARCH_RESULTS_ACTION,
                projectId: currentProject,
                query,
                results,
            });

            return new SuccessActionResponse(results);
        } catch(error) {
            console.error(error);
            return new ErrorActionResponse(error);
        }
    }
}

/**
 * @param {Project.slug} slug
 * @param {Project.owner} owner
 */
export function setProjectContext(slug, owner) {
    return (dispatch) => {
        dispatch({
            type: SET_PROJECT_CONTEXT_ACTION,
            projectId: Project.generateProjectId(slug, owner),
        });
    };
}

export function removeProjectContext() {
    return (dispatch) => {
        dispatch({
            type: REMOVE_PROJECT_CONTEXT_ACTION,
        });
    };
}
