let _analytics = window.analytics;

class Analytics {
    /**
     * @param {User} user
     */
    static identifyUser(user) {
        if (process.env.NODE_ENV !== 'development' && _analytics) {
            _analytics.identify(user.id, {
                name: user.getFullName(),
                email: user.email,
                username: user.username,
            });
        }
    }

    /**
     * @param {string} slug
     * @param {Object} [data]
     */
    static trackEvent(slug, data = {}) {
        if (process.env.NODE_ENV !== 'development' && _analytics) {
            _analytics.track(slug, data);
        }
    }

}

export default Analytics;
