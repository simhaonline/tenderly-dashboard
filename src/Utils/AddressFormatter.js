/**
 * @param {string} address
 * @param {number} [size]
 * @returns {string}
 */
export function generateShortAddress(address, size = 10) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
}
