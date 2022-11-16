<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <div class="container-fluid h-screen bg-n3">
    <FunNav :stage="0" @next="goToConfirm" />
    <!-- 上傳檔案 -->
    <div class="bg-n1 mt-8 max-w-5xl mx-auto xl:rounded xl:mt-[80px]">
      <!-- tabs -->
      <div class="border-b border-n2 px-4 mb-4 xl:px-[60px]">
        <ul class="nav nav-tabs flex list-none font-bold" id="tabs-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-home"
              class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 pt-10 pb-3 hover:border-transparent focus:border-transparent active"
              id="tabs-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-home"
              role="tab"
              aria-controls="tabs-home"
              aria-selected="true"
              >上傳檔案</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-profile"
              class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 pt-10 pb-3 hover:border-transparent focus:border-transparent"
              id="tabs-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-profile"
              role="tab"
              aria-controls="tabs-profile"
              aria-selected="false"
              >掃描檔案</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-messages"
              class="nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 pt-10 pb-3 hover:border-transparent focus:border-transparent"
              id="tabs-messages-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-messages"
              role="tab"
              aria-controls="tabs-messages"
              aria-selected="false"
              >歷史上傳</a
            >
          </li>
        </ul>
      </div>
      <!-- tabs content -->
      <div class="tab-content" id="tabs-tabContent">
        <div
          class="tab-pane fade show active"
          id="tabs-home"
          role="tabpanel"
          aria-labelledby="tabs-home-tab"
        >
          <div class="px-4 py-10 xl:px-[60px]">
            <div
              class="border-dashed border-[1.5px] border-n6 h-[280px] flex justify-center items-center"
            >
              <!-- 沒有檔案時 -->
              <div v-if="percent ? false : true" class="flex flex-col justify-center items-center">
                <!-- <button
                  type="button"
                  class="block px-5 py-2.5 border-p1 border text-p1 font-bold mb-6 whitespace-nowrap ml-8 leading-tight uppercase rounded hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
                >
                  選擇檔案 (PDF / png)
                </button> -->
                <input
                  class="block px-5 py-2.5 border-p1 border text-p1 font-bold mb-6 whitespace-nowrap ml-8 leading-tight uppercase rounded hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
                  type="file"
                  id="formFile"
                  placeholder="選擇檔案 (PDF / png)"
                  @change="countUp"
                />

                <p class="text-center text-n6 indent-8 font-medium">
                  或直接拖放檔案進來{{ fileName }}
                </p>
              </div>
              <!-- 有檔案時 -->
              <div v-else class="flex flex-col justify-center items-center">
                <div
                  class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full"
                >
                  <svg
                    class="w-32 h-32 transform translate-x-1 translate-y-1"
                    x-cloak
                    aria-hidden="true"
                  >
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
                <p class="text-center mt-6 text-n6">檔案上傳中...{{ fileName }}</p>

                <button
                  type="button"
                  class="mt-4 inline-block px-3 py-1.5 border-p1 border text-p1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  取消
                </button>
              </div>
            </div>
            <p class="text-sm text-n6 mt-4">檔案大小不得超過 10 MB</p>
          </div>
        </div>
        <div
          class="tab-pane fade"
          id="tabs-profile"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <canvas id="canvas" style="border: 1px solid #000"></canvas>
        </div>
        <div
          class="tab-pane fade"
          id="tabs-messages"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          Tab 3 content
        </div>
      </div>
    </div>
  </div>
  <ModalNote />
</template>

<script>
// pinia
import { mapState, mapActions } from 'pinia';
import { useUploadStore } from '../stores/userEdit';
import ModalNote from '../components/ModalNote.vue';
import FunNav from '../components/FunNav.vue';

// import emitter from '../libs/emitter';

// eslint-disable-next-line no-undef
// pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
// const Base64Prefix = 'data:application/pdf;base64,';

export default {
  data() {
    return {
      circumference: 50 * 2 * Math.PI,
      percent: 0,
      ctx: null,
      canvas: null,
    };
  },
  computed: {
    ...mapState(useUploadStore, ['fileName']),
  },
  components: { ModalNote, FunNav },
  watch: {
    percent(n) {
      if (n === 100) {
        this.$router.push('./confirm');
      }
    },
  },
  methods: {
    ...mapActions(useUploadStore, ['upload']),
    countUp(e) {
      this.upload(e);
      if (this.percent < 100) {
        setInterval(() => {
          this.percent += 10;
        }, 500);
      }
    },
    goToConfirm() {
      this.$router.push('./confirm');
    },
    // upload(e) {
    //   if (e.target.files[0] === undefined) {
    //     return;
    //   }
    //   // 超過10m 警示toast跳出
    //   // 透過 input 所選取的檔案
    //   const file = e.target.files[0];
    //   const { name } = file;
    //   // 產生fileReader物件
    //   const fileReader = new FileReader();

    //   // 將資料做處理
    //   fileReader.readAsArrayBuffer(file);

    //   // 綁入事件監聽
    //   // 一但fileReader 完成加載後load後就可以顯示，return fileReader
    //   fileReader.addEventListener('load', () => {
    //     // 獲取readAsArrayBuffer產生的結果，並用來渲染PDF const
    //     const typedarray = new Uint8Array(fileReader.result);

    //     // console.log(typedarray);
    //     this.renderPDF(typedarray);
    //     const pdfFile = { typedarray, name };
    //     this.$emitter.emit('pdf', pdfFile);
    //   });
    //   this.countUp();
    // },
    // async renderPDF(data) {
    //   // eslint-disable-next-line no-undef
    //   const pdfDoc = await pdfjsLib.getDocument(data).promise;
    //   const pdfPage = await pdfDoc.getPage(1);
    //   const viewport = pdfPage.getViewport({ scale: 1 });
    //   this.canvas.width = viewport.width;
    //   this.canvas.height = viewport.height;
    //   pdfPage.render({
    //     canvasContext: this.ctx,
    //     viewport,
    //   });
    // },

    // readBlob(blob) {
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('progress', (e) => {
    //       const complete = (e.loaded / e.total) * 100;
    //       this.progress = complete;
    //     });
    //     reader.addEventListener('load', () => resolve(reader.result));
    //     reader.addEventListener('error', reject);
    //     reader.readAsDataURL(blob);
    //   });
    // },
    // async printPDF(pdfData) {
    //   // 將檔案處理成 base64
    //   pdfData = await readBlob(pdfData);
    //   // 將base64 中的前綴刪去，並進行解碼
    //   const data = atob(pdfData.substring(Base64Prefix.length));
    //   // 利用解碼的檔案，載入 PDF 檔及第一頁
    //   const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
    //   const pdfPage = await pdfDoc.getPage(1); // 設定尺寸及產生 canvas const viewport =
    //   pdfPage.getViewport({ scale: window.devicePixelRatio });
    //   const canvas = document.createElement('canvas');
    //   const context = canvas.getContext('2d'); // 設定 PDF所要顯示的寬高及渲染
    //   canvas.height = viewport.height;
    //   canvas.width = viewport.width;
    //   const renderContext = { canvasContext: context, viewport };
    //   const renderTask = pdfPage.render(renderContext); // 回傳做好的 PDF canvas
    //   return renderTask.promise.then(() => canvas);
    // },
  },
  mounted() {
    this.canvas = document.querySelector('#canvas');
    this.ctx = this.canvas.getContext('2d');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
