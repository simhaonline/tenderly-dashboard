import mixpanel from 'mixpanel-browser';

const mixpanelToken = '075259fbcb4ebb3a8ef2d1dc877d9948';

const _mixpanel = mixpanel;

class MixPanel {
    static initialize() {
        _mixpanel.init(mixpanelToken);
    }

    /**
     * @param {User} user
     */
    static setUser(user) {
        _mixpanel.identify(user.id);
        _mixpanel.people.set({
            "$email": user.email,
            "$username": user.username,
            "$first_name": user.firstName,
            "$last_name": user.lastName,
        });
    }

    /**
     * @param {String} event
     * @param {Object} [data]
     */
    static track(event, data = {}) {
        _mixpanel.track(event, data)
    }
}

export default MixPanel;
