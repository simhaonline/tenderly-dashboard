export const OSTypes = {
    UNKNOWN: "Unknown",
    WINDOWS: "Windows",
    MAC: "MacOS",
    UNIX: "UNIX",
    LINUX: "Linux",
};

/**
 * @enum {string}
 */
export const ActionErrorTypes = {
    GENERAL: 'error',
    NO_PERMISSION: 'no_permission',
    API: 'api_error',
};

/**
 * @enum {string}
 */
export const LocalStorageKeys = {
    LOGIN_REDIRECT: 'LOGIN_REDIRECT',
    LOGIN_FLOW: 'LOGIN_FLOW',
    RECENT_SEARCHES: 'RECENT_SEARCHES',
    PROJECT_CONTEXT: 'PROJECT_CONTEXT',
};

/**
 * @enum {string}
 */
export const NetworkTypes = {
    MAIN: 'main_network',
    KOVAN: 'kovan_testnet',
    ROPSTEN: 'ropsten_testnet',
    RINKEBY: 'rinkeby_testnet',
    GOERLI: 'goerli_testnet',
};

export const NetworkRouteTypes = {
    MAIN: 'main',
    KOVAN: 'kovan',
    ROPSTEN: 'ropsten',
    RINKEBY: 'rinkeby',
    GOERLI: 'goerli',
};

export const NetworkAppToApiTypeMap = {
    [NetworkTypes.MAIN]: 1,
    [NetworkTypes.KOVAN]: 42,
    [NetworkTypes.ROPSTEN]: 3,
    [NetworkTypes.RINKEBY]: 4,
    [NetworkTypes.GOERLI]: 5,
};

export const NetworkApiToAppTypeMap = {
    [NetworkAppToApiTypeMap[NetworkTypes.MAIN]]: NetworkTypes.MAIN,
    [NetworkAppToApiTypeMap[NetworkTypes.KOVAN]]: NetworkTypes.KOVAN,
    [NetworkAppToApiTypeMap[NetworkTypes.ROPSTEN]]: NetworkTypes.ROPSTEN,
    [NetworkAppToApiTypeMap[NetworkTypes.RINKEBY]]: NetworkTypes.RINKEBY,
    [NetworkAppToApiTypeMap[NetworkTypes.GOERLI]]: NetworkTypes.GOERLI,
};

export const NetworkRouteToAppTypeMap = {
    [NetworkRouteTypes.MAIN]: NetworkTypes.MAIN,
    [NetworkRouteTypes.KOVAN]: NetworkTypes.KOVAN,
    [NetworkRouteTypes.ROPSTEN]: NetworkTypes.ROPSTEN,
    [NetworkRouteTypes.RINKEBY]: NetworkTypes.RINKEBY,
    [NetworkRouteTypes.GOERLI]: NetworkTypes.GOERLI,
};

export const NetworkAppToRouteTypeMap = {
    [NetworkTypes.MAIN]: NetworkRouteTypes.MAIN,
    [NetworkTypes.KOVAN]: NetworkRouteTypes.KOVAN,
    [NetworkTypes.ROPSTEN]: NetworkRouteTypes.ROPSTEN,
    [NetworkTypes.RINKEBY]: NetworkRouteTypes.RINKEBY,
    [NetworkTypes.GOERLI]: NetworkRouteTypes.GOERLI,
};

export const NetworkLabelMap = {
    [NetworkTypes.MAIN]: 'Mainnet',
    [NetworkTypes.KOVAN]: 'Kovan',
    [NetworkTypes.ROPSTEN]: 'Ropsten',
    [NetworkTypes.RINKEBY]: 'Rinkeby',
    [NetworkTypes.GOERLI]: 'Görli',
};

export const NetworkLabelShorthandMap = {
    [NetworkTypes.MAIN]: 'M',
    [NetworkTypes.KOVAN]: 'K',
    [NetworkTypes.ROPSTEN]: 'RO',
    [NetworkTypes.RINKEBY]: 'RK',
    [NetworkTypes.GOERLI]: 'G',
};

export const EtherscanLinkTypes = {
    BLOCK: 'block',
    TRANSACTION: 'transaction',
    ADDRESS: 'address',
};

export const EntityStatusTypes = {
    NOT_LOADED: 'NOT_LOADED',
    LOADING: 'LOADING',
    PARTIALLY_LOADED: 'PARTIALLY_LOADED',
    LOADED: 'LOADED',
    NON_EXISTING: 'NON_EXISTING',
    DELETED: 'DELETED',
    ARCHIVED: 'ARCHIVED',
};

/**
 * @enum {string}
 */
export const ErrorSlugTypes = {
    TOO_MANY_CONTRACTS: 'too_many_contracts',
};

/**
 * @enum {string}
 */
export const ProjectTypes = {
    PRIVATE: 'PRIVATE',
    SHARED: 'SHARED',
    PUBLIC: 'PUBLIC',
    DEMO: 'DEMO'
};

export const AnalyticsWidgetTypes = {
    LINE_CHART: 'LINE_CHART',
    STACKED_CHART: 'STACKED_CHART',
    BAR_CHART: 'BAR_CHART',
    PIE_CHART: 'LINE_CHART',
    METRIC: 'METRIC',
    LIST: 'LIST',
};

export const AnalyticsWidgetListTypeColumnTypes = {
    VALUE: 'VALUE',
    COUNT: 'COUNT',
    PERCENTAGE: 'PERCENTAGE',
    BAR: 'BAR',
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

/**
 * @enum {string}
 */
export const AnalyticsWidgetResolutionTypes = {
    MINUTE: 'MINUTE',
    HOUR: 'HOUR',
    DAY: 'DAY',
    WEEK: 'WEEK',
    MONTH: 'MONTH',
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
    AFTER: 'AFTER',
    TAG: 'TAG',
    STATUS: 'STATUS',
    TYPE: 'TYPE',
    RESET: 'RESET',
};

/**
 * @enum {string}
 */
export const ContractInputParameterSimpleTypes = {
    INT: "int",
    UINT: "uint",
    BOOL: "bool",
    STRING: "string",
    SLICE: "slice",
    ARRAY: "array",
    TUPLE: "tuple",
    ADDRESS: "address",
    FIXED_BYTES: "fixed_bytes",
    BYTES: "bytes",
    HASH: "hash",
    FUNCTION: "function",
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
export const UserPlanTypes = {
    FREE: 'free',
    PRO: 'pro',
    ENTERPRISE: 'enterprise',
};

/**
 * @enum {string}
 */
export const CollaboratorPermissionTypes = {
    ADD_CONTRACT: 'ADD_CONTRACT',
    REMOVE_CONTRACT: 'REMOVE_CONTRACT',
    CREATE_ALERT: 'CREATE_ALERT',
    UPDATE_ALERT: 'UPDATE_ALERT',
    REMOVE_ALERT: 'REMOVE_ALERT',
};

/**
 * @enum {string}
 */
export const CollaboratorPermissionGroupTypes = {
    ALERT: 'ALERT',
    CONTRACT: 'CONTRACT',
    OTHER: 'OTHER',
};

export const CollaboratorPermissionGroupLabelMap = {
    [CollaboratorPermissionGroupTypes.ALERT]: 'Alerts',
    [CollaboratorPermissionGroupTypes.CONTRACT]: 'Contracts',
    [CollaboratorPermissionGroupTypes.OTHER]: 'Other',
};

export const CollaboratorPermissionTypeGroupMap = {
    ADD_CONTRACT: CollaboratorPermissionGroupTypes.CONTRACT,
    REMOVE_CONTRACT: CollaboratorPermissionGroupTypes.CONTRACT,
    CREATE_ALERT: CollaboratorPermissionGroupTypes.ALERT,
    UPDATE_ALERT: CollaboratorPermissionGroupTypes.ALERT,
    REMOVE_ALERT: CollaboratorPermissionGroupTypes.ALERT,
};

/**
 * @type {Object.<CollaboratorPermissionTypes, string>}
 */
export const CollaboratorPermissionTypeIconMap = {
    [CollaboratorPermissionTypes.ADD_CONTRACT]: 'file-plus',
    [CollaboratorPermissionTypes.REMOVE_CONTRACT]: 'file-minus',
    [CollaboratorPermissionTypes.CREATE_ALERT]: 'bell',
    [CollaboratorPermissionTypes.UPDATE_ALERT]: 'edit',
    [CollaboratorPermissionTypes.REMOVE_ALERT]: 'bell-off',
};

/**
 * @type {Object.<CollaboratorPermissionTypes, string>}
 */
export const CollaboratorPermissionTypeDescriptionMap = {
    [CollaboratorPermissionTypes.ADD_CONTRACT]: 'Add contracts to project',
    [CollaboratorPermissionTypes.REMOVE_CONTRACT]: 'Remove contracts from project',
    [CollaboratorPermissionTypes.CREATE_ALERT]: 'Create alerts in project',
    [CollaboratorPermissionTypes.UPDATE_ALERT]: 'Make changes to existing alerts',
    [CollaboratorPermissionTypes.REMOVE_ALERT]: 'Remove alerts in project',
};

/**
 * @enum {string}
 */
export const CollaboratorPermissionAppToApiTypeMap = {
    [CollaboratorPermissionTypes.ADD_CONTRACT]: 'add_contract',
    [CollaboratorPermissionTypes.REMOVE_CONTRACT]: 'remove_contract',
    [CollaboratorPermissionTypes.CREATE_ALERT]: 'create_alert',
    [CollaboratorPermissionTypes.UPDATE_ALERT]: 'update_alert',
    [CollaboratorPermissionTypes.REMOVE_ALERT]: 'remove_alert',
};

/**
 * @enum {string}
 */
export const CollaboratorPermissionApiToAppTypeMap = {
    'add_contract': CollaboratorPermissionTypes.ADD_CONTRACT,
    'remove_contract': CollaboratorPermissionTypes.REMOVE_CONTRACT,
    'create_alert': CollaboratorPermissionTypes.CREATE_ALERT,
    'update_alert': CollaboratorPermissionTypes.UPDATE_ALERT,
    'remove_alert': CollaboratorPermissionTypes.REMOVE_ALERT,
};

/**
 * @typedef {Object.<CollaboratorPermissionTypes, boolean>} CollaboratorPermissions
 */

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
 * @typedef {Object} SimpleAlertRuleGeneralInformation
 * @property {string} name
 * @property {string} description
 * @property {SimpleAlertRuleTypes} [simpleType]
 */

/**
 * @typedef {Object} SimpleAlertRuleTarget
 * @property {SimpleAlertRuleTargetTypes} type
 * @property {(Contract|Network|null)} data
 */

/**
 * @typedef {Object} SimpleAlertRuleParameters
 * @property {string} [id]
 * @property {string} [name]
 * @property {string} [lineNumber]
 * @property {string[]} [addresses]
 * @property {AlertRuleParameterCondition} [condition]
 */

/**
 * @enum {string}
 */
export const SimpleAlertRuleTargetTypes = {
    CONTRACT: 'contract',
    NETWORK: 'network',
    PROJECT: 'project',
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
    [SimpleAlertRuleTypes.CALLED_FUNCTION_PARAMETER]: 'Function Argument',
    [SimpleAlertRuleTypes.ADVANCED]: 'Advanced Alert',
};

/**
 * @enum {string}
 */
export const AlertRuleBuilderSteps = {
    GENERAL: 'general',
    TYPE: 'type',
    TARGET: 'target',
    PARAMETERS: 'parameters',
    ADVANCED: 'advanced',
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
    METHOD_NAME: 'METHOD_NAME',
    CALL_POSITION: 'CALL_POSITION',
    LOG_NAME: 'LOG_NAME',
    LOG_ID: 'LOG_ID',
    PARAMETER_CONDITIONS: 'PARAMETER_CONDITIONS',
    PARAMETER_CONDITION_NAME: 'PARAMETER_CONDITION_NAME',
    PARAMETER_CONDITION_OPERATOR: 'PARAMETER_CONDITION_OPERATOR',
    PARAMETER_CONDITION_TYPE: 'PARAMETER_CONDITION_TYPE',
    PARAMETER_CONDITION_NESTED_TYPE: 'PARAMETER_CONDITION_NESTED_TYPE',
    PARAMETER_CONDITION_COMPARISON_VALUE: 'PARAMETER_CONDITION_COMPARISON_VALUE',
};

export const AlertRuleExpressionParameterApiToAppTypeMap = {
    'address': AlertRuleExpressionParameterTypes.ADDRESS,
    'network_id': AlertRuleExpressionParameterTypes.NETWORK_ID,
    'addresses': AlertRuleExpressionParameterTypes.ADDRESSES,
    'transaction_type': AlertRuleExpressionParameterTypes.TRANSACTION_TYPE,
    'transaction_success': AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS,
    'line_number': AlertRuleExpressionParameterTypes.LINE_NUMBER,
    'function_name': AlertRuleExpressionParameterTypes.METHOD_NAME,
    'call_position': AlertRuleExpressionParameterTypes.CALL_POSITION,
    'event_name': AlertRuleExpressionParameterTypes.LOG_NAME,
    'event_id': AlertRuleExpressionParameterTypes.LOG_ID,
    'parameter_conditions': AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS,
    'parameter_name': AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME,
    'operator': AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR,
    'parameter_type': AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE,
    'nested_parameter_type': AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NESTED_TYPE,
    'comparison_value': AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE,
};

export const AlertRuleExpressionParameterAppToApiTypeMap = {
    [AlertRuleExpressionParameterTypes.ADDRESS]: 'address',
    [AlertRuleExpressionParameterTypes.NETWORK_ID]: 'network_id',
    [AlertRuleExpressionParameterTypes.ADDRESSES]: 'addresses',
    [AlertRuleExpressionParameterTypes.TRANSACTION_TYPE]: 'transaction_type',
    [AlertRuleExpressionParameterTypes.TRANSACTION_SUCCESS]: 'transaction_success',
    [AlertRuleExpressionParameterTypes.LINE_NUMBER]: 'line_number',
    [AlertRuleExpressionParameterTypes.METHOD_NAME]: 'function_name',
    [AlertRuleExpressionParameterTypes.CALL_POSITION]: 'call_position',
    [AlertRuleExpressionParameterTypes.LOG_NAME]: 'event_name',
    [AlertRuleExpressionParameterTypes.LOG_ID]: 'event_id',
    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITIONS]: 'parameter_conditions',
    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NAME]: 'parameter_name',
    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_OPERATOR]: 'operator',
    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_TYPE]: 'parameter_type',
    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_NESTED_TYPE]: 'nested_parameter_type',
    [AlertRuleExpressionParameterTypes.PARAMETER_CONDITION_COMPARISON_VALUE]: 'comparison_value',
};

/**
 * @enum {string}
 */
export const AlertParameterConditionOperatorTypes = {
    GTE: ">=",
    GT: ">",
    LTE: "<=",
    LT: "<",
    EQ: "==",
    NEQ: "!=",
};

/**
 * @enum {string}
 */
export const AlertParameterConditionOperatorTypeLabelMap = {
    [AlertParameterConditionOperatorTypes.GTE]: "Greater than or equal to",
    [AlertParameterConditionOperatorTypes.GT]: "Greater than",
    [AlertParameterConditionOperatorTypes.LTE]: "Less than or equal to",
    [AlertParameterConditionOperatorTypes.LT]: "Less than",
    [AlertParameterConditionOperatorTypes.EQ]: "Equal to",
    [AlertParameterConditionOperatorTypes.NEQ]: "Not equal to",
};

/**
 * @typedef {Object} AlertRuleParameterCondition
 * @property {string} name
 * @property {ContractInputParameterSimpleTypes} type
 * @property {ContractInputParameterSimpleTypes} [nestedType]
 * @property {AlertParameterConditionOperatorTypes} operator
 * @property {string|number} value
 */

/**
 * @typedef {Object} AlertParameterConditionOperatorOption
 * @property {AlertParameterConditionOperatorTypeLabelMap} label
 * @property {AlertParameterConditionOperatorTypes} value
 */

/**
 * @enum {string}
 */
export const NotificationDestinationTypes = {
    EMAIL: 'EMAIL',
    SLACK: 'SLACK',
    DISCORD: 'DISCORD',
    TELEGRAM: 'TELEGRAM',
    WEBHOOK: 'WEBHOOK',
};

export const NotificationDestinationAppToApiTypes = {
    [NotificationDestinationTypes.EMAIL]: 'email',
    [NotificationDestinationTypes.SLACK]: 'slack',
    [NotificationDestinationTypes.DISCORD]: 'discord',
    [NotificationDestinationTypes.TELEGRAM]: 'telegram',
    [NotificationDestinationTypes.WEBHOOK]: 'webhook',
};

/**
 * @enum {string}
 */
export const SearchResultTypes = {
    PUBLIC_CONTRACT: 'PUBLIC_CONTRACT',
    PROJECT_CONTRACT: 'PROJECT_CONTRACT',
    PROJECT_TRANSACTION: 'PROJECT_TRANSACTION',
    PUBLIC_TRANSACTION: 'PUBLIC_TRANSACTION',
};

/**
 * @enum {string}
 */
export const AccountTypes = {
    CONTRACT: 'contract',
    WALLET: 'wallet',
};

export const FIVE_SECOND_INTERVAL = 5 * 1000;
export const ONE_MIN_INTERVAL = 60 * 1000;
export const FIVE_MIN_INTERVAL = 5 * ONE_MIN_INTERVAL;

export const APP_HOST = process.env.REACT_APP_HOST;

export const APP_PORT = process.env.REACT_APP_PORT;

export const DASHBOARD_BASE_URL = process.env.REACT_APP_DASHBOARD_BASE_URL;

export const GITHUB_CALLBACK_URL = process.env.REACT_APP_GITHUB_CALLBACK_URL;

export const API_BASE_URL = process.env.REACT_APP_API_URL;

export const INTERCOM_APP_ID = process.env.REACT_APP_INTERCOM_APP_ID;

export const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const SLACK_CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;

export const SLACK_REDIRECT_URI = process.env.REACT_APP_SLACK_REDIRECT_URI;
