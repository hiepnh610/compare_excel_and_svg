const app = new Vue({
  el: '#app',

  data: {
    col: '',
    excelFile: [],
    svgFile: []
  },

  methods: {
    onExcelFile: function () {
      this.excelFile = this.$refs.excelFile.files[0];
    },

    onSVGFile: function () {
      this.svgFile = this.$refs.svgFile.files[0];
    },

    sendData: function () {
      let formData = new FormData();

      formData.append('excel', this.excelFile);
      formData.append('svg', this.svgFile);
    }
  }
});
