/* eslint-disable no-undef */
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

export default {
  data() {
    return {
      pdfjsLib: null,
    };
  },
  created() {
    this.pdfjsLib = pdfjsLib;
  },
};
