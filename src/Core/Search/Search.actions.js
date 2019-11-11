import {Api, PublicApi} from "../../Utils/Api";
import {ErrorActionResponse, SuccessActionResponse} from "../../Common";
import Project from "../Project/Project.model";
import SearchResult from "./SearchResult.model";
import {LocalStorageKeys, SearchResultTypes} from "../../Common/constants";
import LocalStorage from "../../Utils/LocalStorage";

export const FETCH_SEARCH_RESULTS_ACTION = 'FETCH_SEARCH_RESULTS';
export const SET_PROJECT_CONTEXT_ACTION = 'SET_PROJECT_CONTEXT';
export const REMOVE_PROJECT_CONTEXT_ACTION = 'REMOVE_PROJECT_CONTEXT';
export const SEARCH_RESULT_SELECTED_ACTION = 'SEARCH_RESULT_SELECTED';
export const SET_RECENT_SEARCH_RESULTS_ACTION = 'SET_RECENT_SEARCH_RESULTS';
export const CLEAR_RECENT_SEARCH_RESULTS_ACTION = 'CLEAR_RECENT_SEARCH_RESULTS';

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

            if (data.project_transactions) {
                results.push({
                    label: "Project Transactions",
                    value: SearchResultTypes.PROJECT_TRANSACTION,
                    options: data.project_transactions.map(tx => SearchResult.buildFromResponse(tx, SearchResultTypes.PROJECT_TRANSACTION)),
                });
            }

            if (data.transactions) {
                results.push({
                    label: "Transactions",
                    value: SearchResultTypes.PUBLIC_TRANSACTION,
                    options: data.transactions.map(tx => SearchResult.buildFromResponse(tx, SearchResultTypes.PUBLIC_TRANSACTION)),
                });
            }

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

/**
 * @param {SearchResult} searchResult
 */
export function registerSearchResultSelected(searchResult) {
    return (dispatch, getState) => {
        const {search: {recentSearches}} = getState();

        if (recentSearches.find(search => search.value === searchResult.value && search.projectId === searchResult.projectId)) return;

        const updatedRecentSearches = [
            searchResult,
            ...recentSearches.slice(0, 4),
        ];

        LocalStorage.setItem(LocalStorageKeys.RECENT_SEARCHES, updatedRecentSearches);

        dispatch({
            type: SEARCH_RESULT_SELECTED_ACTION,
            recentSearches: updatedRecentSearches,
        });
    }
}

export function clearRecentSearches() {
    return dispatch => {
        LocalStorage.removeItem(LocalStorageKeys.RECENT_SEARCHES);

        dispatch({
            type: CLEAR_RECENT_SEARCH_RESULTS_ACTION,
        });
    };
}

/**
 * @param {Object[]} cachedSearchResults
 */
export function setRecentSearchesFromCache(cachedSearchResults) {
    return dispatch => {
        dispatch({
            type: SET_RECENT_SEARCH_RESULTS_ACTION,
            recentSearches: cachedSearchResults.map(searchResultCache => new SearchResult(searchResultCache)),
        });
    };
}
