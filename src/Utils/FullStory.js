class FullStory {
    /**
     * @param {User} user
     */
    static identifyUser(user) {
        if (process.env.NODE_ENV !== 'development' && window.FS) {
            window.FS.identify(user.id, {
                displayName: user.getFullName(),
                email: user.email,
            });
        }
    }

    static disable() {
        if (process.env.NODE_ENV !== 'development' && window.FS) {
            window.FS.shutdown();
        }
    }
}

export default FullStory;
