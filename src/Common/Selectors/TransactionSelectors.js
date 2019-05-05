/**
 * @param {Object} state
 * @param {string} txHash
 * @return {Transaction}
 */
export function getTransaction(state, txHash) {
    if (!event) {
        return null;
    }

    const transaction = state.transaction.transactions[txHash];

    if (!transaction) {
        return null;
    }

    return transaction;
}
