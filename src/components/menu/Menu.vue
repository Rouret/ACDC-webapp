<template>
  <v-card class="mx-auto">
    <v-navigation-drawer dark permanent app hide-overlay>
      <v-list-item >
        <v-list-item-content >
          <v-list-item-title class="title">
            {{ sentences.APP_NAME }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ sentences.APP_DESCRIPTION }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in menuAvailable"
          :key="item.title"
          @click="changeRoute(item.title)"
          link
        >
          <v-list-item-icon>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
import sentences from "@/constants/sentences";
import { mapState } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      sentences: sentences,
    };
  },
  computed: {
    ...mapState("menuStore", ["menuAvailable"]),
  },
  methods: {
    changeRoute(routeName) {
      //Si la route demandé est celle actuel on annulé la redirection
      if(this.$router.currentRoute.name===routeName) return
      return this.$router.push({ name: routeName });
    },
  },
};
</script>