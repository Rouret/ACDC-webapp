<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          :items="availableScripts === null ? [] : availableScripts"
          @change="detectChangeOnScript"
          label="Listes des scripts"
          solo
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="justify-center">
      <v-col cols="4">
        <v-card width="100%" height="100%">
          <v-card-title>
            Paramétre {{ currentScript !== null ? `de ${currentScript}` : "" }}
          </v-card-title>
          <v-list class="overflow-y-auto" nav>
            <v-list-item-group>
              <v-list-item v-for="item in currentParams" :key="item">
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.match(/(\/\w+\;)/g)[0].replace(/[\/;]/g, "")
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-card width="100%" height="100%" class="pa-2">
          <v-form>
            <v-select
              :items="availableGenerators"
              label="Liste des generateur disponible"
              v-model="choice.inputType"
              solo
            ></v-select>

            <v-row>
              <v-col>
                <v-text-field
                  v-model="choice.min"
                  class="mt-0 pt-0"
                  label="Min"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  v-model="choice.max"
                  class="mt-0 pt-0"
                  label="Max"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="choice.step"
                  class="mt-0 pt-0"
                  label="Step"
                  hide-details
                  single-line
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
              @click="prepareExec"
            >
              Upload
              <v-icon right dark> mdi-cloud-upload </v-icon>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="runExecData!=null">
      <Chart options="" data="runExecData" />
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Chart from "@/components/chart/Chart"
export default {
  name: "Script",
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
  components:{
    Chart
  },
  computed: {
    ...mapState("communStore", [
      "availableScripts",
      "currentParams",
      "currentScript",
      "availableGenerators",
      "runExecData"
    ]),
  },
  methods: {
    ...mapActions("communStore", ["fetchParamOfScript", "startExec"]),
    detectChangeOnScript(scriptName) {
      this.fetchParamOfScript(scriptName);
    },
    prepareExec() {
      if (this.currentScript == null) return;
      if (this.choice.min == null) return;
      if (this.choice.step == null) return;
      if (this.choice.max == null) return;
      const data={
        min: parseInt(this.choice.min),
        step: parseInt(this.choice.step),
        max: parseInt(this.choice.max),
        inputType: this.choice.inputType,
        scriptName: this.currentScript,
      }
      console.log(data)
      this.startExec(data);
    },
  },
};
</script>
