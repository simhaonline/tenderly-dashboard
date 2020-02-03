export function getSimulatedTransactionData(state, id) {

    if (!state.simulator.transactions[id]) {
        return {};
    }
    const data = {
        transaction: state.simulator.transactions[id],
        callTrace: state.simulator.callTraces[id],
        contracts: state.simulator.simulationContracts[id],
        stackTrace: null,
        eventLogs: [],
        stateDiffs: [],
        consoleLogs: [],
    };
    if (state.simulator.stackTraces[id]) {
        data.stackTrace = state.simulator.stackTraces[id];
    }
    if (state.simulator.eventLogs[id]) {
        data.eventLogs = state.simulator.eventLogs[id];
    }
    if (state.simulator.stateDiffs[id]) {
        data.stateDiffs = state.simulator.stateDiffs[id];
    }
    if (state.simulator.consoleLogs[id]) {
        data.consoleLogs = state.simulator.consoleLogs[id];
    }
    return data
}