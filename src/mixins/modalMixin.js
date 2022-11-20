// import Modal from 'tw-elements/dist/src/js/bs/dist/modal';
import Modal from 'tw-elements/dist/src/js/bs/src/modal';

// 若放在被掛載modal 處
export default {
  data() {
    return {
      modal: null,
      signModal: null,
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
    signOpen() {
      this.signModal.show();
    },
    signHide() {
      this.signModal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    if (this.$refs?.signModal) {
      this.signModal = new Modal(this.$refs?.signModal);
    }
  },
};
