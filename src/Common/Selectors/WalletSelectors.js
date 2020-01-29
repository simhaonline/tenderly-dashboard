import {Wallet} from "../../Core/models";

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

/**
 * @param {Object} state
 * @param {string} address
 * @param {NetworkTypes} network
 * @returns {Wallet|null}
 */
export function getWalletByAddressAndNetwork(state, address, network) {
    const walletId = Wallet.generateUniqueId(address, network);

    return state.wallet.wallets[walletId] || null;
}
