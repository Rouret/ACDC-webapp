export default {
    setAvailableScripts(state, data) {
        state.availableScripts = data;
    },
    setCurrentParams(state, data) {
        state.currentParams = data;
    },
    setCurrentScript(state, data) {
        state.currentScript = data;
    },
    setRunExecData(state, data) {
        state.runExecData = data;
    }
}