/**
 * @param {string} email
 * @returns {boolean}
 */
export function isInternalUserByEmail(email) {
    const [emailIdentity, emailDomain] = email.split('@');

    return ['andrej', 'miljan', 'bogdan', 'nebojsa', 'vvk'].includes(emailIdentity) && emailDomain.includes('tenderly.');
}
