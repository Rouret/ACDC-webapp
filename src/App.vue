<template>
  <v-app>
    <v-navigation-drawer app>
      <Menu />
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "@/components/menu/Menu";
import { mapActions } from "vuex";
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
  mounted() {
    this.fetchInformation();
  },
};
</script>
