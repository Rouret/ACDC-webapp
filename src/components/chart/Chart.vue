<template>
  <div class="small">
    <line-chart></line-chart>
    <v-col>
      <v-row>
        <v-btn color="blue-grey" class="ma-2 white--text" @click="downloadCSV">
          CSV
          <v-icon right dark> mdi-cloud-download </v-icon>
        </v-btn>
        <v-btn color="blue-grey" class="ma-2 white--text" @click="dowlaodJSON">
          JSON
          <v-icon right dark> mdi-cloud-download </v-icon>
        </v-btn>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-text-field
            label="Prix du gas"
            v-model="gasPrice"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="convert('eth')"
          :disabled="isConverted"
        >
          Convertir en eth
          <v-icon right dark> mdi-cloud-download </v-icon>
        </v-btn>
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          @click="convert('eur')"
          :disabled="isConverted"
        >
          Convertir en eur
          <v-icon right dark> mdi-cloud-download </v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import LineChart from "@/components/chart/LineChart";
import { Parser } from "json2csv";
import { mapState, mapActions } from "vuex";
import download from "downloadjs";
import eth from "@/services/eth";
export default {
  components: {
    LineChart,
  },
  data: function () {
    return {
      gasPrice: 20,
    };
  },
  computed: {
    ...mapState("communStore", [
      "runExecData",
      "currentScript",
      "isConverted",
      "unit",
    ]),
  },
  methods: {
    ...mapActions("communStore", [
      "setRunExecData",
      "setIsProcess",
      "setIsConverted",
      "setUnit",
    ]),
    downloadCSV() {
      const parser = new Parser();
      const csv = parser.parse(this.customRunExecData());
      download(csv, this.fileName("csv"), "text/csv");
    },
    dowlaodJSON() {
      download(
        JSON.stringify(this.customRunExecData()),
        this.fileName("json"),
        "application/json"
      );
    },
    customRunExecData() {
      return this.runExecData.map((el) => {
        const obj = { index: el.x };
        obj[this.unit] = el.y;
        return { ...obj };
      });
    },
    fileName(ext) {
      const date = new Date();
      const now =
        date.getDate() +
        "_" +
        ((date.getMonth() + 1).toString().length === 1 ? "0" : "") +
        (date.getMonth() + 1) +
        "_" +
        date.getFullYear() +
        "_" +
        date.getHours() +
        "_" +
        date.getMinutes();
      return this.currentScript + "_rendu_" + now + "." + ext;
    },
    async convert(targetUnit) {
      if (this.isConverted) return;
      this.setIsProcess(true);
      this.setUnit(targetUnit);
      await this.runExecData.map(async (el) => {
        el.y *= this.gasPrice * 10 ** -9;
        if (targetUnit === "eur") {
          console.log("avant: " + el.y);
          await eth.getEthereumPrice().then((res) => {
            el.y *= res;
          });
          console.log("apres: " + el.y);
        }
      });
      console.log(this.runExecData);
      this.setIsConverted(true);
      this.setIsProcess(false);
    },
  },
};
</script>

<style>
</style>