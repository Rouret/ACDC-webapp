
<script>
import { Line } from "vue-chartjs";
import { mapState } from "vuex";
export default {
  extends: Line,
  computed: {
    ...mapState("communStore", ["runExecData","runExecDataLabel","unit"]),
  },
  watch:{
    runExecData(){
      this.init();
    }
  },
  mounted() {
    if(this.runExecData===null) return
    this.init();
  },
  methods: {
    init() {
      this.renderChart(
        {
          labels: this.runExecDataLabel,
          datasets: [
            {
              label: this.unit,
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
