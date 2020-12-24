import state from "@/store/modules/menu/menu.state.js"
import getters from "@/store/modules/menu/menu.getters.js"
import actions from "@/store/modules/menu/menu.actions.js"
import mutations from "@/store/modules/menu/menu.mutations.js"

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
