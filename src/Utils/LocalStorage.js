class LocalStorage {
    /**
     * @param {LocalStorageKeys} key
     * @param {*} item
     */
    static setItem(key, item) {
        try {
            localStorage.setItem(key, item);

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    /**
     * @param {LocalStorageKeys} key
     */
    static getItem(key) {
        try {
            localStorage.getItem(key);

            return true;
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
