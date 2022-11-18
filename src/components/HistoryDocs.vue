<!-- eslint-disable max-len -->
<template>
  <div
    class="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-80"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header flex items-center justify-between p-4">
      <h5 class="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasRightLabel">
        歷史上傳
      </h5>
      <button
        type="button"
        class="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body flex-grow p-4 overflow-y-auto">
      <!-- card -->
      <!-- 若沒有檔案 -->
      <div v-if="history.length ? false : true" class="flex h-full justify-center items-center">
        <div class="text-center">
          <img src="../assets/images/noDocs.png" alt="noDocs" />
          <p class="mt-5">目前尚無上傳文件喔~</p>
        </div>
      </div>
      <!-- 若有檔案 -->
      <template v-else>
        <div
          v-for="(item, index) in history"
          :key="index"
          class="flex justify-between items-center p-6 rounded-lg mb-5 shadow-lg bg-white max-w-sm"
        >
          <h5 class="text-gray-900 leading-tight font-medium">{{ item.name }}</h5>
          <div class="flex">
            <button
              type="button"
              :data-btn-download="index"
              class="inline-block px-2 py-1.5 border mr-4 border-p1 text-p1 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:text-n1 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              @click="downloadDoc"
            >
              下載文件
            </button>
            <button
              type="button"
              class="cursor-pointer"
              :data-btn-delete="index"
              @click="deleteDoc"
            >
              <i class="fa-regular fa-trash-can hover:bg-p1 hover:text-n1"></i>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapActions } from 'pinia';
import { useUploadStore } from '../stores/userEdit';

export default {
  computed: { ...mapWritableState(useUploadStore, ['ReName', 'history']) },
  methods: {
    ...mapActions(useUploadStore, ['getHistory', 'deleteDoc', 'downloadDoc']),
  },
  created() {
    this.getHistory();
  },
};
</script>
