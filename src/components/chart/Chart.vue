
<script>
import { Line } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState("communStore", ["runExecData"]),
  },
  watch: {
    runExecData(){
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.renderChart(
        {
          labels: this.runExecData.map((value) => value.x),
          datasets: [
            {
              label: "Prix en gas",
              backgroundColor: "#f87979",
              data: this.runExecData,
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false }
      );
    },
  },
};
</script>
