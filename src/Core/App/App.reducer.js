import {OSTypes} from "../../Common/constants";
import {SET_WHOLE_SCREEN_PAGE_ACTION} from "./App.actions";

/**
 * @returns {string}
 */
function getBrowserOS() {
    let os = OSTypes.UNKNOWN;

    if (navigator.appVersion.indexOf("Win")!==-1) os = OSTypes.WINDOWS;
    if (navigator.appVersion.indexOf("Mac")!==-1) os = OSTypes.MAC;
    if (navigator.appVersion.indexOf("X11")!==-1) os = OSTypes.UNIX;
    if (navigator.appVersion.indexOf("Linux")!==-1) os = OSTypes.LINUX;

    return os;
}

const initialState = {
    os: getBrowserOS(),
    wholeScreenPage: false,
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WHOLE_SCREEN_PAGE_ACTION:
            return {
                ...state,
                wholeScreenPage: action.value,
            };
        default:
            return state;
    }
};

export default AppReducer;

