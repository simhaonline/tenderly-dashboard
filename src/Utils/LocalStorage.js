class LocalStorage {
    /**
     * @param {LocalStorageKeys} key
     * @param {*} item
     */
    static setItem(key, item) {
        try {
            localStorage.setItem(key, JSON.stringify(item));

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * @param {LocalStorageKeys} key
     *
     * @returns {*}
     */
    static getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * @param {LocalStorageKeys} key
     */
    static removeItem(key) {
        try {
            localStorage.removeItem(key);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}

export default LocalStorage;
