/**
 * @TODO Add support for unique tx id and network in id
 *
 * @param {Object} state
 * @param {string} txHash
 * @return {Transaction}
 */
export function getTransaction(state, txHash) {
    if (!txHash) {
        return null;
    }

    const transaction = state.transaction.transactions[txHash];

    if (!transaction) {
        return null;
    }

    return transaction;
}

/**
 * @param {Object} state
 * @param {string} txHash
 * @return {CallTrace}
 */
export function getTransactionCallTrace(state, txHash) {
    if (!txHash) {
        return null;
    }

    const callTrace = state.transaction.callTraces[txHash];

    if (!callTrace) {
        return null;
    }

    return callTrace;
}

/**
 * @param {Object} state
 * @param {string} txHash
 * @return {StackTrace}
 */
export function getTransactionStackTrace(state, txHash) {
    if (!txHash) {
        return null;
    }

    const stackTrace = state.transaction.stackTraces[txHash];

    if (!stackTrace) {
        return null;
    }

    return stackTrace;
}
