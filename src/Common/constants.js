export const OSTypes = {
    UNKNOWN: "Unknown",
    WINDOWS: "Windows",
    MAC: "MacOS",
    UNIX: "UNIX",
    LINUX: "Linux",
};

export const NetworkTypes = {
    MAIN: 'main_network',
    KOVAN: 'kovan_testnet',
};

export const NetworkRouteTypes = {
    MAIN: 'main',
    KOVAN: 'kovan',
};

export const NetworkApiToAppTypeMap = {
    1: NetworkTypes.MAIN,
    42: NetworkTypes.KOVAN,
};

export const NetworkAppToApiTypeMap = {
    [NetworkTypes.MAIN]: 1,
    [NetworkTypes.KOVAN]: 42,
};

export const NetworkRouteToAppTypeMap = {
    [NetworkRouteTypes.MAIN]: NetworkTypes.MAIN,
    [NetworkRouteTypes.KOVAN]: NetworkTypes.KOVAN,
};

export const NetworkAppToRouteTypeMap = {
    [NetworkTypes.MAIN]: NetworkRouteTypes.MAIN,
    [NetworkTypes.KOVAN]: NetworkRouteTypes.KOVAN,
};

export const NetworkLabelMap = {
    [NetworkTypes.MAIN]: 'Main Network',
    [NetworkTypes.KOVAN]: 'Kovan Testnet',
};

export const EtherscanLinkTypes = {
    BLOCK: 'block',
    TRANSACTION: 'transaction',
    ADDRESS: 'address',
};

export const EntityStatusTypes = {
    NOT_LOADED: 'NOT_LOADED',
    LOADING: 'LOADING',
    LOADED: 'LOADED',
    NON_EXISTING: 'NON_EXISTING',
    DELETED: 'DELETED',
    ARCHIVED: 'ARCHIVED',
};

export const ContractTypes = {
    PRIVATE: 'PRIVATE',
    VERIFIED: 'VERIFIED',
    NOT_VERIFIED: 'NOT_VERIFIED',
};

export const AnalyticsResolutionTypes = {
    HOUR: 'HOUR',
    DAY: 'DAY',
    WEEK: 'WEEK',
    MONTH: 'MONTH',
};

export const FeatureFlagTypes = {
    COMING_SOON: 'coming_soon',
    BILLING: 'billing',
    ALERTS: 'alerts',
    ANALYTICS: 'analytics',
};

export const EventActionTypes = {
    REFRESH: 'REFRESH',
    NEXT_PAGE: 'NEXT_PAGE',
    PREVIOUS_PAGE: 'PREVIOUS_PAGE',
};

export const EventFilterTypes = {
    QUERY: 'QUERY',
    CONTRACTS: 'CONTRACTS',
};

export const OAuthServiceTypeMap = {
    GITHUB: 'github',
    GOOGLE: 'google',
};

export const OAuthServiceLabelMap = {
    [OAuthServiceTypeMap.GOOGLE]: 'Google',
    [OAuthServiceTypeMap.GITHUB]: 'GitHub',
};

export const OAuthStatusMap = {
    AUTHENTICATING: 'oauth_authenticating',
    FAILED: 'oauth_failed',
    SUCCESS: 'oauth_success',
    USERNAME_REQUIRED: 'oauth_username',
};

export const APP_HOST = process.env.REACT_APP_HOST;

export const APP_PORT = process.env.REACT_APP_PORT;

export const APP_BASE_URL = `${APP_HOST}:${APP_PORT}`;

export const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
