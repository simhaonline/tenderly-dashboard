import {keccak256} from "js-sha3";
import _ from "lodash";

/**
 * @param {string} txHash
 * @returns {String}
 */
export function isValidTransactionHash(txHash) {
    const txRegex = /^0x([A-Fa-f0-9]{64})$/;

    return txRegex.test(txHash);
}

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
function isAddress(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
}

/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX address
 * @return {Boolean}
 */
function isChecksumAddress(address) {
    // Check each case
    address = address.replace('0x','');
    const addressHash = keccak256(address.toLowerCase());
    for (let i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
}

/**
 * @param {string} address
 * @returns {boolean}
 */
export function isValidAddress(address) {
    return isAddress(address);
}

/**
 * @param {string} base64
 * @return {string}
 */
export function decodeBase64ToHex(base64) {
    const raw = atob(base64);

    let HEX = '';

    for (let i = 0; i < raw.length; i++ ) {

        let _hex = raw.charCodeAt(i).toString(16);

        HEX += (_hex.length === 2 ? _hex : '0' + _hex);

    }
    return `0x${HEX.toLowerCase()}`;
}

export function isValidInputParameter(type, value) {
    let parsedType = type;

    if (_.endsWith(type, '[]')) {
        return value.split(',').every(splitValue => isValidInputParameter(type.replace('[]', ''), splitValue));
    }

    if (_.startsWith(type, 'uint')) {
        parsedType = 'uint';
    }

    switch (parsedType) {
        case 'uint':
            console.log('asd', _.isNumber(value), value, parsedType);
            return !isNaN(value);
        case 'address':
            return isValidAddress(value);
        default:
            return true;
    }
}
