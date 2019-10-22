/**
 * @param {string} url
 * @returns {boolean}
 */
export function isTransactionOrContractUrl(url) {
    if (!url.includes('/tx/') && !url.includes('/contract/')) {
        return false;
    }

    return true;
}
