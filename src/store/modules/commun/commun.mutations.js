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
    },
    setIsProcess(state, value) {
        state.isProcess = value
    },
    setIsConverted(state, value) {
        state.isConverted = value
    },
    setUnit(state, value) {
        state.unit = value
    }
}