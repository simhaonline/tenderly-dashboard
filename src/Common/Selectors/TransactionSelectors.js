/**
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
