import { mapState } from 'vuex';
<template>
  <div class="pa-2">
    <v-row class="justify-space-around">
      <v-col cols="4">
        <v-row class="mb-5">
          <v-card
            class="mx-auto white--text"
            color="light-blue lighten-3"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Scripts Disponible</div>
                <v-list-item-title class="headline mb-1">
                  {{
                    availableScripts === null
                      ? "Indisponible"
                      : availableScripts.length
                  }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="80" color="white" rounded>
                <v-icon size="50">mdi-script-text</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-row>
        <v-row>
          <v-card
            class="mx-auto white--text"
            color="light-blue lighten-3"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Ethereum</div>
                <v-list-item-title class="headline mb-1">
                  {{
                    ethereumPrice
                  }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="80" color="white" rounded>
                <v-icon size="50">mdi-script-text</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-card width="100%" height="100%">
          <v-card-title> Scripts disponible </v-card-title>
          <v-list>
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
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/services/http"
export default {
  name: "Dashboard",
   data: function () {
    return {
      ethereumPrice:null
    }
  },
  computed: {
    ...mapState("communStore", ["availableScripts"]),
  },
  methods:{
    getEthereumPrice(){
      http.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur&include_24hr_change=true').then((res)=>{
        this.ethereumPrice=res?.ethereum?.eur + "€"
        
      })
    }
  },
  mounted(){
    this.getEthereumPrice();
  }
};
</script>

<style>
</style>