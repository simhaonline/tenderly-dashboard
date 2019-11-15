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
    const walletTwoAddress = '0xf9043e21Def4E757D3ffca578E3E7Bf0f87AA715';
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
        new ProjectWallet({
            id: `${project.id}:${walletNetwork}:${walletTwoAddress}`,
            projectId: project.id,
            name: walletTwoAddress,
            walletId: `${walletNetwork}:${walletTwoAddress}`,
            defaultToken: 'eth',
            enabled: false,
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
        new Wallet({
            id: `${walletNetwork}:${walletTwoAddress}`,
            address: walletTwoAddress,
            network: walletNetwork,
            walletTokens: [
                new WalletToken({
                    token: 'eth',
                    name: 'Ethereum',
                    shorthand: 'ETH',
                    balance: 21.2144688,
                }),
                new WalletToken({
                    token: 'ck',
                    name: 'CryptoKitties',
                    shorthand: 'CK',
                    balance: 6,
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
