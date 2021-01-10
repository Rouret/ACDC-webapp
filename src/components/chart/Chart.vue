<template>
  <div class="small">
    <line-chart></line-chart>
    <v-col>
      <v-row class="mt-5">
        <v-btn color="blue-grey" class="ma-2 white--text" @click="downloadCSV">
          CSV
          <v-icon right dark> mdi-cloud-download </v-icon>
        </v-btn>
        <v-btn color="blue-grey" class="ma-2 white--text" @click="dowlaodJSON">
          JSON
          <v-icon right dark> mdi-cloud-download </v-icon>
        </v-btn>
      </v-row>
      <v-divider class="mt-5" ></v-divider>
      <v-row class="mt-5 text-center">
        <v-col class="center">
          <p>Changer l'unité en</p>
        </v-col>
        <v-col class="center">
          <v-select
            v-model="unitLocal"
            :items="availableUnit"
            label="Unitée"
          ></v-select>
        </v-col>
        <v-col class="center">
          <p>avec un prix de gas de</p>
        </v-col>
        <v-col class="center">
          <v-text-field
            v-model="gasPrice"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col class="center">
          <v-btn class="ma-2" color="success" @click="newUnit"> Valider </v-btn>
        </v-col>
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
      availableUnit: ["ETH", "EUR", "USD", "GasUsed"],
    };
  },
  computed: {
    ...mapState("communStore", [
      "runExecData",
      "currentScript",
      "isConverted",
      "unit",
      "runExecDataInit",
      "runExecDataLabel",
    ]),
    unitLocal: {
      get() {
        return this.unit;
      },
      set(value) {
        this.setUnit(value);
      },
    },
  },
  methods: {
    ...mapActions("communStore", [
      "setRunExecData",
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

      return `${this.currentScript}_rendu${this.unit}_${now}.${ext}`;
    },
    customRunExecData() {
      var i = 0;
      return this.runExecData.map((el) => {
        let obj = { index: this.runExecDataLabel[i] };
        obj[this.unit] = el;
        i++;
        return obj;
      });
    },

    async newUnit() {
      let ethRunExecData = await this.runExecDataInit.map((el) => {
        return el * this.gasPrice * 10 ** -9;
      });
      console.log(ethRunExecData);
      switch (this.unit) {
        case "ETH":
          this.setRunExecData(ethRunExecData);
          break;
        case "EUR":
          let ethEurValue;
          await eth
            .getEthereumPriceEur()
            .then((ethPriceEur) => (ethEurValue = ethPriceEur));
          let eurRunExecData = ethRunExecData.map((el) => {
            return el * ethEurValue;
          });
          this.setRunExecData(eurRunExecData);
          break;
        case "USD":
          let ethUsdValue;
          await eth
            .getEthereumPriceUsd()
            .then((ethPriceUsd) => (ethUsdValue = ethPriceUsd));
          let usdRunExecData = ethRunExecData.map((el) => {
            return el * ethUsdValue;
          });
          this.setRunExecData(usdRunExecData);
          break;
        case "GasUsed":
          this.setRunExecData(this.runExecDataInit);
          break;
      }
    },
  },
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>