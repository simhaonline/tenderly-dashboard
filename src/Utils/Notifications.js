import React from 'react';

import {toast} from "react-toastify";

import {Notification} from "../Elements";

window.addEventListener("blur", () => {
    toast.dismiss();
});

class Notifications {
    /**
     * @param {object} data
     * @param {string} data.title
     * @param {string} [data.description]
     * @param {string} [data.icon]
     * @param {object} [options]
     */
    static success(data = {}, options) {
        toast.success(<Notification title={data.title} description={data.description} icon={data.icon} type="success"/>, options);
    }

    /**
     * @param {object} data
     * @param {string} data.title
     * @param {string} [data.description]
     * @param {string} [data.icon]
     * @param {object} [options]
     */
    static warn(data = {}, options) {
        toast.warn(<Notification title={data.title} description={data.description} icon={data.icon} type="warning"/>, options);
    }

    /**
     * @param {object} data
     * @param {string} data.title
     * @param {string} [data.description]
     * @param {string} [data.icon]
     * @param {object} [options]
     */
    static error(data = {}, options) {
        toast.error(<Notification title={data.title} description={data.description} icon={data.icon} type="error"/>, options);
    }

    /**
     * @param {object} data
     * @param {string} data.title
     * @param {string} [data.description]
     * @param {string} [data.icon]
     * @param {object} [options]
     */
    static info(data = {}, options) {
        toast.info(<Notification title={data.title} description={data.description} icon={data.icon} type="info"/>, options);
    }
}

export default Notifications;
