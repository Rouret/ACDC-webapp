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
            commit("setRunExecData", res.map(ar => { return { "x": ar[0], "y": ar[1] } }))
            commit("setIsConverted", false)
            commit("setIsProcess", false)

        })
    },
    setRunExecData({ commit }, data) {
        commit("setRunExecData", data)
    },
    setIsProcess({ commit }, value) {
        commit("setIsProcess", value)
    },
    setIsConverted({ commit }, value) {
        commit("setIsConverted", value)
    },
    setUnit({ commit }, value) {
        commit("setUnit", value)
    }

}