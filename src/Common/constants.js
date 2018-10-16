export const NetworkTypes = {
    MAIN: 'main_network',
    KOVAN: 'kovan_testnet',
};

export const NetworkRouteTypes = {
    MAIN: 'main',
    KOVAN: 'kovan',
};

export const NetworkApiToAppTypeMap = {
    [NetworkRouteTypes.MAIN]: NetworkTypes.MAIN,
    [NetworkRouteTypes.KOVAN]: NetworkTypes.KOVAN,
};

export const NetworkAppToApiTypeMap = {
    [NetworkTypes.MAIN]: NetworkRouteTypes.MAIN,
    [NetworkTypes.KOVAN]: NetworkRouteTypes.KOVAN,
};

export const EtherscanLinkTypes = {
    BLOCK: 'block',
    TRANSACTION: 'transaction',
};
