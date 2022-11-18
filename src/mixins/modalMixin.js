import Modal from 'tw-elements/dist/src/js/bs/dist/modal';

// 若放在被掛載modal 處
export default {
  data() {
    return {
      // modal: null,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
