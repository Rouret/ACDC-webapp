<template>
  <v-app>
    <v-navigation-drawer app>
      <Menu />
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
        <v-alert dense outlined type="error" class="alert" v-if="alertMessage.length!=0">
          {{alertMessage}}
        </v-alert>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "@/components/menu/Menu";
import { mapActions,mapState } from "vuex";
export default {
  name: "App",

  components: {
    Menu,
  },

  data: () => ({
    //
  }),
  methods: {
    ...mapActions("communStore", ["fetchInformation"]),
  },
  computed:{
    ...mapState("communStore",["alertMessage"])
  },
  mounted() {
    this.fetchInformation();
  },
};
</script>
<style>
.alert{
  position: fixed;
  bottom: 0px;
}
</style>
