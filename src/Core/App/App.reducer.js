import {OSTypes} from "../../Common/constants";

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
};

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default AppReducer;

