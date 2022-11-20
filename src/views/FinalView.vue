<template>
  <div class="bg-n3 min-h-screen">
    <FunNav :stage="3" @front="goFront" @next="downloadDoc" />
    <div class="py-4 flex justify-center">
      <img
        :class="{ hidden: finalFile ? false : true }"
        class="drop-shadow-lg block overflow-scroll"
        :src="finalFile"
        :alt="ReName"
      />
    </div>
  </div>
  <SignModal />
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useUploadStore } from '../stores/userEdit';
import FunNav from '../components/FunNav.vue';

export default {
  emits: ['front', 'next'],
  computed: {
    ...mapState(useUploadStore, ['tags', 'ReName', 'finalFile']),
  },
  components: { FunNav },
  methods: {
    ...mapActions(useUploadStore, ['downloadDoc']),
    confirmedEdit() {
      this.finalFile = this.canvas.toDataURL('image/png');
      this.$router.push('./final');
    },
    goFront() {
      this.$router.push('/');
    },
  },
};
</script>
