export const SET_WHOLE_SCREEN_PAGE_ACTION = 'SET_WHOLE_SCREEN_PAGE';

/**
 * @param {boolean} value
 */
export const setWholeScreenPage = (value) => {
    return dispatch => {
        dispatch({
            type: SET_WHOLE_SCREEN_PAGE_ACTION,
            value,
        });
    }
};
