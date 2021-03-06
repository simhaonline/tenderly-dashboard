import {INTERCOM_APP_ID} from "../Common/constants";

class IntercomProvider {
    constructor() {
        /** @type boolean */
        this.intercomBooted = false;
    }

    boot() {
        if (!INTERCOM_APP_ID || !window.Intercom || this.intercomBooted) {
            return;
        }

        window.Intercom("boot", {
            app_id: INTERCOM_APP_ID,
        });

        this.intercomBooted = true;
    }

    shutdown() {
        if (!this.intercomBooted) {
            return;
        }

        window.Intercom('shutdown');

        this.intercomBooted = false;
    }

    /**
     * @param {User} user
     */
    setUser(user) {
        if (!this.intercomBooted) {
            return;
        }

        window.Intercom('update', {
            name: user.getFullName(),
            email: user.email,
            user_id: user.id,
        });
    }

    /**
     * @param {string} [prePopulatedMessage]
     */
    openNewConversation(prePopulatedMessage) {
        if (!this.intercomBooted) {
            return;
        }

        window.Intercom('showNewMessage', prePopulatedMessage);
    }
}

const Intercom = new IntercomProvider();

export default Intercom;
