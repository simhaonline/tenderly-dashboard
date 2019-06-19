import React from 'react';

import {toast} from "react-toastify";

import {Notification} from "../Elements";

window.addEventListener("blur", () => {
    toast.dismiss();
});

class Notifications {
    /**
     * @param {string} title
     * @param {string} [description]
     * @param {object} [options]
     */
    static success(title, description, options) {
        toast.success(<Notification title={title} description={description} type="success"/>, options);
    }

    /**
     * @param {string} title
     * @param {string} [description]
     * @param {object} [options]
     */
    static warn(title, description, options) {
        toast.warn(<Notification title={title} description={description} type="warning"/>, options);
    }

    /**
     * @param {string} title
     * @param {string} [description]
     * @param {object} [options]
     */
    static error(title, description, options) {
        toast.error(<Notification title={title} description={description} type="error"/>, options);
    }

    /**
     * @param {string} title
     * @param {string} [description]
     * @param {object} [options]
     */
    static info(title, description, options) {
        toast.info(<Notification title={title} description={description} type="info"/>, options);
    }
}

export default Notifications;
