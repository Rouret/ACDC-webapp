import state from "@/store/modules/modal/modal.state.js"
import getters from "@/store/modules/modal/modal.getters.js"
import actions from "@/store/modules/modal/modal.actions.js"
import mutations from "@/store/modules/modal/modal.mutations.js"

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}