import {LOG_OUT_ACTION} from "../Auth/Auth.actions";
import {SIMULATE_TRANSACTION_ACTION} from "../Transaction/Transaction.actions";

const initialState = {
    transactions: {},
    callTraces: {},
    stackTraces: {},
    eventLogs: {},
    stateDiffs: {},
    consoleLogs: {},
    projectSimulations: {},
    simulationContracts: {},
};

const SimulatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIMULATE_TRANSACTION_ACTION:
            const transaction = action.transaction;
            const callTrace = action.callTrace;
            const stackTrace = action.stackTrace;

            let stackTraces = state.stackTraces;
            let eventLogs = state.eventLogs;
            let stateDiffs = state.stateDiffs;
            let consoleLogs = state.consoleLogs;

            if (stackTrace) {
                stackTraces = {
                    ...stackTraces,
                    [stackTrace.id]: stackTrace,
                };
            }

            if (action.eventLogs && action.eventLogs.length > 0) {
                eventLogs = {
                    ...eventLogs,
                    [transaction.id]: action.eventLogs,
                };
            }

            if (action.stateDiffs && action.stateDiffs.length > 0) {
                stateDiffs = {
                    ...stateDiffs,
                    [transaction.id]: action.stateDiffs,
                };
            }

            if (action.consoleLogs && action.consoleLogs.length > 0) {
                consoleLogs = {
                    ...consoleLogs,
                    [transaction.id]: action.consoleLogs,
                }
            }
            let projectSimulations = [];
            if (state.projectSimulations[action.projectId]){
                projectSimulations = state.projectSimulations[action.projectId]
            }
            return {
                ...state,
                callTraces: {
                    ...state.callTraces,
                    [callTrace.id]: callTrace,
                },
                stackTraces,
                eventLogs,
                stateDiffs,
                consoleLogs,
                transactions: {
                    ...state.transactions,
                    [transaction.id]: transaction,
                },
                projectSimulations: {
                  ...state.projectSimulations,
                  [action.projectId]: [transaction.id, ...projectSimulations],
                },
                simulationContracts: {
                    ...state.simulationContracts,
                    [transaction.id]: action.contracts,
                }
            };
        case LOG_OUT_ACTION:
            return initialState;
        default:
            return state;

    }
};

export default SimulatorReducer;