import state from "@/store/modules/commun/commun.state.js"
import getters from "@/store/modules/commun/commun.getters.js"
import actions from "@/store/modules/commun/commun.actions.js"
import mutations from "@/store/modules/commun/commun.mutations.js"

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}