import http from "@/services/http"

export default {
    fetchInformation({ commit }) {
        http.get(process.env.VUE_APP_API + "/scripts").then((res) => {
            commit("setAvailableScripts", res)
        })
    },
    fetchParamOfScript({ commit }, scriptName) {
        http.get(process.env.VUE_APP_API + `/scripts/${scriptName}`).then((res) => {

            commit("setCurrentParams", res)
            commit("setCurrentScript", scriptName)
        })
    },
    startExec({ commit, state }, data) {
        commit("setIsProcess", true)
        http.post(process.env.VUE_APP_API + `/runScript/${state.currentScript}`, data).then((res) => {
            commit("setRunExecData", res.map(el => el[1]))
            commit("setRunExecDataInit", res.map(el => el[1]))
            commit("setRunExecDataLabel", res.map(el => el[0]))
            commit("setIsConverted", false)
            commit("setIsProcess", false)

        })
    },
    setCurrentParams({ commit }, data) {
        commit("setCurrentParams", data)
    },
    setCurrentScript({ commit }, data) {
        commit("setCurrentScript", data)
    },
    setRunExecData({ commit }, data) {
        commit("setRunExecData", data)
    },
    setRunExecDataInit({ commit }, data) {
        commit("setRunExecDataInit", data)
    },
    setIsProcess({ commit }, value) {
        commit("setIsProcess", value)
    },
    setUnit({ commit }, value) {
        commit("setUnit", value)
    },
    resetRunExecData({ commit }) {
        commit("resetRunExecData")
    },
    setErrorMessage({ commit }, message) {
        commit("setErrorMessage", message)
    }

}