export const TOGGLE_FEATURE_FLAG_ACTION = 'TOGGLE_FEATURE_FLAG';

/**
 * @param {string} featureFlag
 * @param {boolean} status
 */
export function toggleFeatureFlag(featureFlag, status) {
    return dispatch => {
        dispatch({
            type: TOGGLE_FEATURE_FLAG_ACTION,
            featureFlag,
            status,
        })
    };
}
