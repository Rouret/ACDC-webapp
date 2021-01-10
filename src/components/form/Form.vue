<template>
  <v-row>
    <v-col cols="4">
      <v-card width="100%" height="100%">
        <v-card-title> Scripts disponibles </v-card-title>
        <v-list class="overflow-y-auto max" nav>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="item in availableScripts" :key="item">
              <v-list-item-content>
                <v-list-item-title
                  ><v-icon size="x-large" color="orange"
                    >mdi-script-text</v-icon
                  >
                  {{ item }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="6">
      <v-card width="100%" height="100%">
        <v-card-title>
          Liste des paramètres {{ currentScript !== undefined ? `de ${currentScript}` : "" }}
        </v-card-title>
        <div v-if="currentParams!== undefined && currentParams!== null && currentParams.length > 0">
          <v-list class="overflow-y-auto">
            <v-list-item v-for="item in currentParams" :key="item">
              <v-list-item-content>
                <v-list-item-title>{{
                  item.match(/(\/\w+\;)/g)[0].replace(/[\/;]/g, "")
                }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div v-else class="ml-4">
          <p>Aucun script sélectionné</p>
        </div>
      </v-card>
      <!--  -->
    </v-col>
    <v-col cols="2" class="center">
      <v-btn color="blue-grey" class="ma-2 white--text" @click="openModalVerif">
        Paramétrage
        <v-icon right dark> mdi-cloud-upload </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "Form",
  data() {
    return {
      choice: {
        min: null,
        max: null,
        step: null,
        inputType: null,
      },
    };
  },
  computed: {
    ...mapState("communStore", [
      "availableScripts",
      "currentParams",
      "currentScript",
    ]),
    ...mapGetters("communStore", ["getScriptNameByIndex"]),
    selectedItem: {
      get() {
        return this.currentScript;
      },
      set(value) {
        if(value===undefined) {
          this.setCurrentParams(null)
          this.setCurrentScript(null)
          return
        }
        const scriptName = this.getScriptNameByIndex(value);
        this.fetchParamOfScript(scriptName);
      },
    },
  },
  methods: {
    ...mapActions("communStore", ["fetchParamOfScript","setCurrentParams","setCurrentScript"]),
    ...mapActions("modalStore", ["openModal"]),
    openModalVerif() {
      if (this.currentScript === null)
        return alert("Veuillez selectionner un script");
      this.openModal();
    },
  },
};
</script>

<style scoped>
.overflow {
  overflow: auto;
  max-height: 100%;
}
.max {
  max-height: 25vh;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>