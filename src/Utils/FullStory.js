class FullStory {
    /**
     * @param {User} user
     */
    static identifyUser(user) {
        // This is an example script - don't forget to change it!
        if (window.FS) {
            window.FS.identify(user.id, {
                displayName: user.getFullName(),
                email: user.email,
            });
        }
    }
}

export default FullStory;
