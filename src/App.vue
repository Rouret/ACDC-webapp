<template>
  <v-app>
    <v-navigation-drawer app>
      <Menu />
    </v-navigation-drawer>
    <v-main> </v-main>
  </v-app>
</template>

<script>
import Menu from "@/components/menu/Menu";

export default {
  name: "App",

  components: {
    Menu,
  },

  data: () => ({
    //
  }),
};
</script>
