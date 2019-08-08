import mixpanel from 'mixpanel-browser';

const mixpanelToken = '075259fbcb4ebb3a8ef2d1dc877d9948';

const _mixpanel = mixpanel;

class MixPanel {
    static initialize() {
        if (process.env.NODE_ENV !== 'development') {
            _mixpanel.init(mixpanelToken);
        }
    }

    /**
     * @param {User} user
     */
    static setUser(user) {
        if (process.env.NODE_ENV !== 'development') {
            _mixpanel.identify(user.id);
        }
    }
}

export default MixPanel;
