import {asyncActionWrapper} from "../../Utils/ActionHelpers";
// import {Api} from "../../Utils/Api";

import {SuccessActionResponse} from "../../Common";
import {NetworkTypes} from "../../Common/constants";

import {ProjectWallet, Wallet, WalletToken} from "../models";

export const FETCH_WALLETS_FOR_PROJECT_ACTION = 'FETCH_WALLETS_FOR_PROJECT';

/**
 * @param {Project} project
 * @returns {Promise<Function>}
 */
export const fetchWalletsForProject = (project) => asyncActionWrapper('fetchWalletsForProject', async dispatch => {
    // const {data} = await Api.get(`/account/${project.owner}/project/${project.slug}/wallets`);

    const walletOneAddress = '0xabcdef123456789';
    const walletNetwork = NetworkTypes.RINKEBY;

    const projectWallets = [
        new ProjectWallet({
            id: `${project.id}:${walletNetwork}:${walletOneAddress}`,
            projectId: project.id,
            name: 'Personal',
            walletId: `${walletNetwork}:${walletOneAddress}`,
            defaultToken: 'eth',
            enabled: true,
        }),
    ];

    const wallets = [
        new Wallet({
            id: `${walletNetwork}:${walletOneAddress}`,
            address: walletOneAddress,
            network: walletNetwork,
            walletTokens: [
                new WalletToken({
                    token: 'eth',
                    name: 'Ethereum',
                    shorthand: 'ETH',
                    balance: 0.234573001,
                }),
            ]
        }),
    ];

    dispatch({
        type: FETCH_WALLETS_FOR_PROJECT_ACTION,
        projectId: project.id,
        projectWallets,
        wallets,
    });

    return new SuccessActionResponse(wallets);
});
