<template>
  <v-container class="fluid">
    <Dashboard />
  </v-container>
</template>

<script>
import Dashboard from "@/components/dashboard/Dashboard"

export default {
  name: 'Home',
  components: {
    Dashboard
  }
}
</script>
