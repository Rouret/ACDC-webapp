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
    setRunExecDataInit(state, data) {
        state.runExecDataInit = data;
    },
    setRunExecDataLabel(state, data) {
        state.runExecDataLabel = data;
    },
    setIsProcess(state, value) {
        state.isProcess = value
    },
    setUnit(state, value) {
        state.unit = value
    },
    setErrorMessage(state, message) {
        state.alertMessage = message;
    },
}