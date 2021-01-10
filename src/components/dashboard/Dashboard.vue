import { mapState } from 'vuex';
<template>
  <v-col>
    <v-row class="justify-space-around">
      <div class="ENC">
        <div class="ENCTitle text-center">Prix d'un Ethereum</div>
        <div class="ENCContent">
          <div class="coin">
            <v-col>
              <img
                src="https://www.goldeneaglecoin.com/resource/productimages/crypto-1oz-ethereum-obv.png"
                width="100%"
                height="100%"
                alt=""
              />
              <div class="text-center">
                <span>
                  {{ ethereumPrice + "€" }}
                </span>
              </div>
            </v-col>
          </div>
        </div>
      </div>
      <div class="ENC">
        <div class="ENCTitle text-center">Scripts solidity disponibles</div>
        <div class="ENCContent">
          <div class="coin">
            <v-col class="text-center fill-height">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Solidity_logo.svg/1200px-Solidity_logo.svg.png"
                width="113"
                height="176"
                alt=""
              />
              <div class="text-center">
                <span>
                  {{
                    availableScripts === null
                      ? "inconnu"
                      : availableScripts.length > 1
                      ? availableScripts.length + " scripts"
                      : availableScripts.length + " script"
                  }}
                </span>
              </div>
            </v-col>
          </div>
        </div>
      </div>
    </v-row>
    <v-row class="mt-10">
      <v-card width="100%" height="100%">
        <v-card-title> Scripts disponibles </v-card-title>
        <v-list class="overflow">
          <v-list-item v-for="item in availableScripts" :key="item">
            <v-list-item-content>
              <v-list-item-title
                ><v-icon size="x-large" color="orange">mdi-script-text</v-icon>
                {{ item }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn
            text
            color="light-blue"
            @click="$router.push({ name: 'Script' })"
          >
            Voir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import http from "@/services/http";
import eth from "@/services/eth";
export default {
  name: "Dashboard",
  data: function () {
    return {
      ethereumPrice: null,
    };
  },
  computed: {
    ...mapState("communStore", ["availableScripts"]),
  },
  methods: {
    getEthereumPrice() {
      eth.getEthereumPriceEur().then((res) => {
        this.ethereumPrice = res;
      });
    },
  },
  mounted() {
    this.getEthereumPrice();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Goldman&display=swap");
.coin {
  width: 230px;
  height: 100%;
}
.ENC {
  font-family: "Goldman", sans-serif;
  border-radius: 3px;
  border: 1px solid gray;
  box-shadow: 6px 6px 2px 1px rgba(0, 0, 255, 0.2);
}
.ENC .ENCTitle {
  background: rgba(54, 54, 54, 0.4);
  height: 24px;
}
.ENC .ENCContent {
  height: calc(100% - 24px);
}
.overflow {
  overflow-y: auto;
  height: 500px;
}
</style>