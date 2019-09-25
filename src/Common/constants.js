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

export const NetworkLabelShorthandMap = {
    [NetworkTypes.MAIN]: 'M',
    [NetworkTypes.KOVAN]: 'K',
    [NetworkTypes.ROPSTEN]: 'RO',
    [NetworkTypes.RINKEBY]: 'RK',
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

export const AnalyticsWidgetTypes = {
    LINE_CHART: 'LINE_CHART',
    STACKED_CHART: 'STACKED_CHART',
    BAR_CHART: 'BAR_CHART',
    PIE_CHART: 'LINE_CHART',
    METRIC: 'METRIC',
};

export const AnalyticsWidgetSizeTypes = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
};

export const AnalyticsWidgetDataRangeTypes = {
    LAST_7_DAYS: 'LAST_7_DAYS',
    LAST_14_DAYS: 'LAST_14_DAYS',
    LAST_30_DAYS: 'LAST_30_DAYS',
    LAST_WEEK: 'LAST_WEEK',
    LAST_MONTH: 'LAST_MONTH',
};

export const FeatureFlagTypes = {
    COMING_SOON: 'coming_soon',
    ERRORS: 'errors',
    ORGANIZATIONS: 'organizations',
    BILLING: 'billing',
    ALERTS: 'alerts',
    ANALYTICS: 'analytics',
};

/**
 * @deprecated
 * @type {{CONTRACTS: string, QUERY: string}}
 */
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
    SLACK: 'slack',
};

export const OAuthServiceLabelMap = {
    [OAuthServiceTypeMap.GOOGLE]: 'Google',
    [OAuthServiceTypeMap.GITHUB]: 'GitHub',
    [OAuthServiceTypeMap.SLACK]: 'Slack',
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
export const SimpleAlertRuleTypes = {
    UNSET: 'unset',
    SUCCESSFUL_TX: 'successful_tx',
    FAILED_TX: 'failed_tx',
    WHITELISTED_CALLERS: 'whitelisted_callers',
    BLACKLISTED_CALLERS: 'blacklisted_callers',
    LOG_EMITTED: 'log_emitted',
    EMITTED_LOG_PARAMETER: 'emitted_log_parameter',
    FUNCTION_CALLED: 'function_called',
    CALLED_FUNCTION_PARAMETER: 'called_function_parameter',
    ADVANCED: 'advanced',
};

/**
 * @enum {string}
 */
export const SimpleAlertRuleTypeIconMap = {
    [SimpleAlertRuleTypes.UNSET]: 'x-circle',
    [SimpleAlertRuleTypes.SUCCESSFUL_TX]: 'check-circle',
    [SimpleAlertRuleTypes.FAILED_TX]: 'x-circle',
    [SimpleAlertRuleTypes.WHITELISTED_CALLERS]: 'eye',
    [SimpleAlertRuleTypes.BLACKLISTED_CALLERS]: 'eye-off',
    [SimpleAlertRuleTypes.LOG_EMITTED]: 'bookmark',
    [SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER]: 'bookmark',
    [SimpleAlertRuleTypes.FUNCTION_CALLED]: 'layers',
    [SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER]: 'layers',
    [SimpleAlertRuleTypes.ADVANCED]: 'zap',
};

/**
 * @enum {string}
 */
export const SimpleAlertRuleTypeLabelMap = {
    [SimpleAlertRuleTypes.SUCCESSFUL_TX]: 'Successful Transaction',
    [SimpleAlertRuleTypes.FAILED_TX]: 'Failed Transaction',
    [SimpleAlertRuleTypes.WHITELISTED_CALLERS]: 'Whitelisted Callers',
    [SimpleAlertRuleTypes.BLACKLISTED_CALLERS]: 'Blacklisted Callers',
    [SimpleAlertRuleTypes.LOG_EMITTED]: 'Event/Log Emitted',
    [SimpleAlertRuleTypes.EMITTED_LOG_PARAMETER]: 'Event Parameter',
    [SimpleAlertRuleTypes.FUNCTION_CALLED]: 'Function Call',
    [SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER]: 'Function Parameter',
};

/**
 * @enum {string}
 */
export const AlertRuleBuilderSteps = {
    GENERAL: 'general',
    TYPE: 'type',
    TARGET: 'target',
    PARAMETERS: 'parameters',
    DESTINATIONS: 'destinations',
};

/**
 * @enum {string}
 */
export const AlertRuleExpressionTypes = {
    CONTRACT_ADDRESS: 'CONTRACT_ADDRESS',
    NETWORK: 'NETWORK',
    TRANSACTION_STATUS: 'TRANSACTION_STATUS',
    METHOD_CALL: 'METHOD_CALL',
    LOG_EMITTED: 'LOG_EMITTED',
    WHITELISTED_CALLER_ADDRESSES: 'WHITELISTED_CALLER_ADDRESSES',
    BLACKLISTED_CALLER_ADDRESSES: 'BLACKLISTED_CALLER_ADDRESSES',
};

export const AlertRuleExpressionApiToAppTypeMap = {
    'contract_address': AlertRuleExpressionTypes.CONTRACT_ADDRESS,
    'network': AlertRuleExpressionTypes.NETWORK,
    'tx_status': AlertRuleExpressionTypes.TRANSACTION_STATUS,
    'method_call': AlertRuleExpressionTypes.METHOD_CALL,
    'emitted_log': AlertRuleExpressionTypes.LOG_EMITTED,
    'whitelisted_caller_addresses': AlertRuleExpressionTypes.WHITELISTED_CALLER_ADDRESSES,
    'blacklisted_caller_addresses': AlertRuleExpressionTypes.BLACKLISTED_CALLER_ADDRESSES,
};

export const AlertRuleExpressionAppToApiTypeMap = {
    [AlertRuleExpressionTypes.CONTRACT_ADDRESS]: 'contract_address',
    [AlertRuleExpressionTypes.NETWORK]: 'network',
    [AlertRuleExpressionTypes.TRANSACTION_STATUS]: 'tx_status',
    [AlertRuleExpressionTypes.METHOD_CALL]: 'method_call',
    [AlertRuleExpressionTypes.LOG_EMITTED]: 'emitted_log',
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
    LOG_NAME: 'LOG_NAME',
    LOG_ID: 'LOG_ID',
};

export const AlertRuleExpressionParameterApiToAppTypeMap = {
    'address': AlertRuleExpressionParameterTypes.ADDRESS,
    'network_id': AlertRuleExpressionParameterTypes.NETWORK_ID,
    'addresses': AlertRuleExpressionParameterTypes.ADDRESSES,
    'transaction_type': AlertRuleExpressionParameterTypes.TRANSACTION_TYPE,
    'transaction_success': AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS,
    'line_number': AlertRuleExpressionParameterTypes.LINE_NUMBER,
    'call_position': AlertRuleExpressionParameterTypes.CALL_POSITION,
    'event_name': AlertRuleExpressionParameterTypes.LOG_NAME,
    'event_id': AlertRuleExpressionParameterTypes.LOG_ID,
};

export const AlertRuleExpressionParameterAppToApiTypeMap = {
    [AlertRuleExpressionParameterTypes.ADDRESS]: 'address',
    [AlertRuleExpressionParameterTypes.NETWORK_ID]: 'network_id',
    [AlertRuleExpressionParameterTypes.ADDRESSES]: 'addresses',
    [AlertRuleExpressionParameterTypes.TRANSACTION_TYPE]: 'transaction_type',
    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: 'transaction_success',
    [AlertRuleExpressionParameterTypes.LINE_NUMBER]: 'line_number',
    [AlertRuleExpressionParameterTypes.CALL_POSITION]: 'call_position',
    [AlertRuleExpressionParameterTypes.LOG_NAME]: 'event_name',
    [AlertRuleExpressionParameterTypes.LOG_ID]: 'event_id',
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

export const NotificationDestinationAppToApiTypes = {
    [NotificationDestinationTypes.EMAIL]: 'email',
    [NotificationDestinationTypes.EMAIL_GROUP]: 'email',
    [NotificationDestinationTypes.SLACK]: 'slack',
    [NotificationDestinationTypes.WEBHOOK]: 'webhook',
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

export const SLACK_CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;

export const SLACK_REDIRECT_URI = process.env.REACT_APP_SLACK_REDIRECT_URI;
