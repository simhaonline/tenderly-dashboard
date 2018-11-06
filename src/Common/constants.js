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

export const NetworkLabelMap = {
    [NetworkTypes.MAIN]: 'Main Network',
    [NetworkTypes.KOVAN]: 'Kovan Testnet',
};

export const NetworkAppToApiTypeMap = {
    [NetworkTypes.MAIN]: NetworkRouteTypes.MAIN,
    [NetworkTypes.KOVAN]: NetworkRouteTypes.KOVAN,
};

export const EtherscanLinkTypes = {
    BLOCK: 'block',
    TRANSACTION: 'transaction',
    ADDRESS: 'address',
};

export const EntityStatusTypes = {
    NOT_LOADED: 'NOT_LOADED',
    LOADED: 'LOADED',
    NON_EXISTING: 'NON_EXISTING',
    DELETED: 'DELETED',
    ARCHIVED: 'ARCHIVED',
};
