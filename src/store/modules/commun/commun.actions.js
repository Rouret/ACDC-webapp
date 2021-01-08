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
    startExec({ commit }, data) {
        http.post(process.env.VUE_APP_API + `/runScript/${data.scriptName}`, data).then((res) => {
            commit("setRunExecData", res.map(ar => { return { "x": ar[0], "y": ar[1] } }))
        })
    }
}