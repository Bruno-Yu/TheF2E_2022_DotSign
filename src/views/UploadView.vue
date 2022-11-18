<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <div class="bg-p2 w-full h-screen flex flex-col items-center px-4 xl:relative">
    <img
      class="absolute w-[238px] h-auto bottom-0 right-[111px] hidden 2xl:block"
      src="../assets/images/login_avatar.png"
      alt="login_avatar"
    />
    <!-- 上傳檔案 -->
    <img
      class="w-1/3 mb-8 pt-5 lg:w-[219px] lg:h-auto lg:mb-10"
      src="../assets/images/Logo.png"
      alt="logo"
    />

    <div class="bg-n1 mt-8 w-full max-w-5xl mx-auto xl:rounded xl:mt-[80px] relative">
      <!-- tabs -->
      <FunNav
        :stage="0"
        :allow-next="percent ? false : true"
        @cancel="pauseAndOpen"
        @next="goToConfirm"
      />

      <!-- tabs content -->

      <div class="px-4 py-10 xl:px-[60px]">
        <div
          class="border-dashed border-[1.5px] border-n6 min-h-[280px] flex justify-center items-center relative"
        >
          <!-- 沒有檔案時 -->
          <div
            v-if="percent ? false : true"
            class="flex w-full flex-col justify-center items-center"
          >
            <!-- <button
                type="button"
                class="block px-5 py-2.5 border-p1 border text-p1 font-bold mb-6 whitespace-nowrap ml-8 leading-tight uppercase rounded hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
              >
                選擇檔案 (PDF / png)
              </button> -->
            <label
              for="formFile"
              class="px-3 xl:px-5 py-2.5 border-p1 border block text-p1 font-bold mb-6 whitespace-nowrap leading-tight uppercase rounded hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
              >選擇檔案 (PDF / png)
              <input
                class="absolute left-0 top-0 bottom-0 right-0 opacity-0"
                type="file"
                id="formFile"
                placeholder="選擇檔案 (PDF / png)"
                @change="countUp"
              />
            </label>

            <p class="text-center text-n6 font-medium">或直接拖放檔案進來</p>
          </div>
          <!-- 有檔案時 -->
          <div v-else class="flex flex-col justify-center items-center">
            <div class="flex items-center justify-center overflow-hidden bg-white rounded-full">
              <svg class="w-32 h-32 transform translate-x-1 translate-y-1" aria-hidden="true">
                <circle
                  class="text-n3"
                  stroke-width="5"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="60"
                  cy="60"
                />
                <circle
                  class="text-p1"
                  stroke-width="5"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="circumference - (percent / 100) * circumference"
                  stroke-linecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="50"
                  cx="60"
                  cy="60"
                />
              </svg>
              <span class="absolute text-2xl text-p1">{{ percent }}%</span>
            </div>
            <p class="text-center mt-6 text-n6">檔案上傳中...</p>

            <button
              type="button"
              class="mt-4 inline-block px-3 py-1.5 border-p1 border text-p1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
              @click="pauseAndOpen"
            >
              取消
            </button>
          </div>
        </div>
        <p class="text-sm text-n6 mt-4">檔案大小不得超過 10 MB</p>
      </div>
    </div>
  </div>
  <ModalNote ref="modal" @cancel="resumeCounting" />
</template>

<script>
// pinia
import { mapState, mapActions } from 'pinia';
import { useUploadStore } from '../stores/userEdit';
import ModalNote from '../components/ModalNote.vue';
import FunNav from '../components/FunNav.vue';
// import modalMixin from '../mixins/modalMixin';

export default {
  data() {
    return {
      circumference: 50 * 2 * Math.PI,
      percent: 0,
      ctx: null,
      canvas: null,
      repeatAdd: null,
    };
  },
  computed: {
    ...mapState(useUploadStore, ['fileName']),
  },
  components: { ModalNote, FunNav },
  watch: {
    percent(n) {
      if (n === 100) {
        clearInterval(this.repeatAdd);
        this.$router.push('./confirm');
      }
    },
  },
  methods: {
    ...mapActions(useUploadStore, ['upload']),
    countUp(e) {
      this.upload(e);
      if (this.percent < 100) {
        this.addPercent();
      }
    },
    addPercent() {
      this.repeatAdd = setInterval(() => {
        this.percent += 10;
      }, 500);
    },
    goToConfirm() {
      this.$router.push('./confirm');
    },
    pauseAndOpen() {
      clearInterval(this.repeatAdd);
      this.$refs.modal.openModal();
    },
    resumeCounting() {
      if (this.percent > 0) {
        this.addPercent();
      }
    },
  },
};
</script>
