import _ from 'lodash';

import {NetworkTypes} from "../../Common/constants";

import Network from "./Network.model";

import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {FETCH_CONTRACTS_FOR_PROJECT_ACTION} from "../Contract/Contract.actions";
import PrivateNetwork from "./PrivateNetwork.model";

const initialState = {
    /** @type {Object.<Network.id, Network>} */
    defaultNetworks: {
        ...Object.values(NetworkTypes).reduce((data, network) => {
            data[network] = Network.buildFromNetworkType(network);

            return data;
        }, {}),
    },
    /** @type {Object.<Network.id, PrivateNetwork>} */
    privateNetworks: {},
    /** @type {Object.<Project.id, Network.id[]>} */
    projectPrivateNetworksMap: {},
};

const PRIVATE_NETWORKS_COLOR_MAP = [
    '#3F51B5',
    '#E91E63',
    '#CDDC39',
    '#2196F3',
    '#607D8B',
    '#FFC107',
];

const NetworkReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTRACTS_FOR_PROJECT_ACTION:
            const unknownNetworks = _.uniqBy(action.projectContracts, 'network')
                .map(pc => pc.network)
                .filter(n => !state.defaultNetworks[n]);

            const privateNetworks = unknownNetworks.map((networkId, index) => PrivateNetwork.buildFromNetworkId(networkId, action.projectId, PRIVATE_NETWORKS_COLOR_MAP[index % PRIVATE_NETWORKS_COLOR_MAP.length]));

            return {
                ...state,
                privateNetworks: {
                    ...state.privateNetworks,
                    ...privateNetworks.reduce((data, network) => {
                        data[network.id] = network;

                        return data;
                    }, {}),
                },
                projectPrivateNetworksMap: {
                    ...state.projectPrivateNetworksMap,
                    [action.projectId]: privateNetworks.map(pn => pn.id),
                },
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;
    }
};

export default NetworkReducer;
