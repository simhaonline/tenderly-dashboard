export const OSTypes = {
    UNKNOWN: "Unknown",
    WINDOWS: "Windows",
    MAC: "MacOS",
    UNIX: "UNIX",
    LINUX: "Linux",
};

export const ActionErrorTypes = {
    GENERAL: 'error',
    API: 'api_error',
};

/**
 * @enum {string}
 */
export const NetworkTypes = {
    MAIN: 'main_network',
    KOVAN: 'kovan_testnet',
    ROPSTEN: 'ropsten_testnet',
    RINKEBY: 'rinkeby_testnet',
};

export const NetworkRouteTypes = {
    MAIN: 'main',
    KOVAN: 'kovan',
    ROPSTEN: 'ropsten',
    RINKEBY: 'rinkeby',
};

export const NetworkAppToApiTypeMap = {
    [NetworkTypes.MAIN]: 1,
    [NetworkTypes.KOVAN]: 42,
    [NetworkTypes.ROPSTEN]: 3,
    [NetworkTypes.RINKEBY]: 4,
};

export const NetworkApiToAppTypeMap = {
    [NetworkAppToApiTypeMap[NetworkTypes.MAIN]]: NetworkTypes.MAIN,
    [NetworkAppToApiTypeMap[NetworkTypes.KOVAN]]: NetworkTypes.KOVAN,
    [NetworkAppToApiTypeMap[NetworkTypes.ROPSTEN]]: NetworkTypes.ROPSTEN,
    [NetworkAppToApiTypeMap[NetworkTypes.RINKEBY]]: NetworkTypes.RINKEBY,
};

export const NetworkRouteToAppTypeMap = {
    [NetworkRouteTypes.MAIN]: NetworkTypes.MAIN,
    [NetworkRouteTypes.KOVAN]: NetworkTypes.KOVAN,
    [NetworkRouteTypes.ROPSTEN]: NetworkTypes.ROPSTEN,
    [NetworkRouteTypes.RINKEBY]: NetworkTypes.RINKEBY,
};

export const NetworkAppToRouteTypeMap = {
    [NetworkTypes.MAIN]: NetworkRouteTypes.MAIN,
    [NetworkTypes.KOVAN]: NetworkRouteTypes.KOVAN,
    [NetworkTypes.ROPSTEN]: NetworkRouteTypes.ROPSTEN,
    [NetworkTypes.RINKEBY]: NetworkRouteTypes.RINKEBY,
};

export const NetworkLabelMap = {
    [NetworkTypes.MAIN]: 'Mainnet',
    [NetworkTypes.KOVAN]: 'Kovan',
    [NetworkTypes.ROPSTEN]: 'Ropsten',
    [NetworkTypes.RINKEBY]: 'Rinkeby',
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

/**
 * @enum {string}
 */
export const ProjectTypes = {
    PRIVATE: 'PRIVATE',
    PUBLIC: 'PUBLIC',
    DEMO: 'DEMO'
};

export const AnalyticsResolutionTypes = {
    HOUR: 'HOUR',
    DAY: 'DAY',
    WEEK: 'WEEK',
    MONTH: 'MONTH',
};

export const FeatureFlagTypes = {
    COMING_SOON: 'coming_soon',
    ERRORS: 'errors',
    BILLING: 'billing',
    ALERTS: 'alerts',
    ANALYTICS: 'analytics',
    DEBUGGER: 'debugger',
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

export const TransactionFilterTypes = {
    QUERY: 'QUERY',
    CONTRACTS: 'CONTRACTS',
    NETWORKS: 'NETWORKS',
    STATUS: 'STATUS',
    TYPE: 'TYPE',
    RESET: 'RESET',
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

export const UsernameStatusMap = {
    UNKNOWN: 'unknown',
    INVALID: 'invalid',
    TAKEN: 'taken',
    VALID: 'valid',
    VALIDATING: 'validating',
};

/**
 * @enum {string}
 */
export const CompanyTypes = {
    KYBER_NETWORK: 'KYBER_NETWORK',
};

export const CompanyNameMap = {
    [CompanyTypes.KYBER_NETWORK]: 'Kyber Network',
};

/**
 * @enum {string}
 */
export const AlertRuleExpressionTypes = {
    CONTRACT_ADDRESS: 'CONTRACT_ADDRESS',
    NETWORK: 'NETWORK',
    TRANSACTION_STATUS: 'TRANSACTION_STATUS',
    METHOD_CALL: 'METHOD_CALL',
    WHITELISTED_CALLER_ADDRESSES: 'WHITELISTED_CALLER_ADDRESSES',
    BLACKLISTED_CALLER_ADDRESSES: 'BLACKLISTED_CALLER_ADDRESSES',
};

export const AlertRuleExpressionApiToAppTypeMap = {
    'contract_address': AlertRuleExpressionTypes.CONTRACT_ADDRESS,
    'network': AlertRuleExpressionTypes.NETWORK,
    'tx_status': AlertRuleExpressionTypes.TRANSACTION_STATUS,
    'method_call': AlertRuleExpressionTypes.METHOD_CALL,
    'whitelisted_caller_addresses': AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES,
    'blacklisted_caller_addresses': AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES,
};

export const AlertRuleExpressionAppToApiTypeMap = {
    [AlertRuleExpressionTypes.CONTRACT_ADDRESS]: 'contract_address',
    [AlertRuleExpressionTypes.NETWORK]: 'network',
    [AlertRuleExpressionTypes.TRANSACTION_STATUS]: 'tx_status',
    [AlertRuleExpressionTypes.METHOD_CALL]: 'method_call',
    [AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES]: 'whitelisted_caller_addresses',
    [AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES]: 'blacklisted_caller_addresses',
};

/**
 * @enum {string}
 */
export const AlertRuleExpressionParameterTypes = {
    ADDRESS: 'ADDRESS',
    NETWORK_ID: 'NETWORK_ID',
    ADDRESSES: 'ADDRESSES',
    TRANSACTION_TYPE: 'TRANSACTION_TYPE',
    TRANSACTION_SUCCESS: 'TRANSACTION_SUCCESS',
    LINE_NUMBER: 'LINE_NUMBER',
    CALL_POSITION: 'CALL_POSITION',
};

export const AlertRuleExpressionParameterApiToAppTypeMap = {
    'address': AlertRuleExpressionParameterTypes.ADDRESS,
    'network_id': AlertRuleExpressionParameterTypes.NETWORK_ID,
    'addresses': AlertRuleExpressionParameterTypes.ADDRESSES,
    'transaction_type': AlertRuleExpressionParameterTypes.TRANSACTION_TYPE,
    'transaction_success': AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS,
    'line_number': AlertRuleExpressionParameterTypes.LINE_NUMBER,
    'call_position': AlertRuleExpressionParameterTypes.CALL_POSITION,
};

export const AlertRuleExpressionParameterAppToApiTypeMap = {
    [AlertRuleExpressionParameterTypes.ADDRESS]: 'address',
    [AlertRuleExpressionParameterTypes.NETWORK_ID]: 'network_id',
    [AlertRuleExpressionParameterTypes.ADDRESSES]: 'addresses',
    [AlertRuleExpressionParameterTypes.TRANSACTION_TYPE]: 'transaction_type',
    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: 'transaction_success',
    [AlertRuleExpressionParameterTypes.LINE_NUMBER]: 'line_number',
    [AlertRuleExpressionParameterTypes.CALL_POSITION]: 'call_position',
};

/**
 * @enum {string}
 */
export const NotificationDestinationTypes = {
    EMAIL: 'EMAIL',
    EMAIL_GROUP: 'EMAIL_GROUP',
    SLACK: 'SLACK',
    WEBHOOK: 'WEBHOOK',
};

export const ONE_MIN_INTERVAL = 60 * 1000;
export const FIVE_MIN_INTERVAL = 5 * ONE_MIN_INTERVAL;

export const APP_HOST = process.env.REACT_APP_HOST;

export const APP_PORT = process.env.REACT_APP_PORT;

export const GITHUB_CALLBACK_URL = process.env.REACT_APP_GITHUB_CALLBACK_URL;

export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const INTERCOM_APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;

export const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
