/**
 * @param {Object} state
 * @param {Project.id} projectId
 * @returns {Wallet[]}
 */
export function getWalletsForProject(state, projectId) {
    if (!state.wallet.projectWalletsMap[projectId]) {
        return [];
    }

    return state.wallet.projectWalletsMap[projectId].map(walletId => {
        return state.wallet.wallets[walletId];
    });
}
