<template>
  <v-col>
    <v-row>
      <Form />
    </v-row>
    <v-row class="mt-10">
      <v-col cols="12">
        <div v-if="isProcess">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-else-if="!isProcess && runExecData!==null">
          <Chart />
        </div>
      </v-col>
    </v-row>
    <Modal />
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import Form from "@/components/form/Form";
import Modal from "@/components/modal/Modal";
import Chart from "@/components/chart/Chart";
export default {
  name: "Script",
  components: {
    Form,
    Chart,
    Modal,
  },
  computed: {
    ...mapState("communStore", ["isProcess","runExecData"]),
  },
};
</script>
