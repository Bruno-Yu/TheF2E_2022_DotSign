<!-- eslint-disable max-len -->
<template>
  <div class="bg-n3 flex min-h-screen flex-col overflow-clip">
    <FunNav :stage="2" @next="confirmedEdit" @cancel="openModal" />
    <div class="flex grow w-full overflow-x-scroll">
      <!-- sideNav -->
      <div class="hidden w-1/5 shadow-md bg-white px-1 lg:block">
        <ul class="flex flex-col grow">
          <li class="relative">
            <button
              type="button"
              class="flex w-full items-center whitespace-nowrap text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              @click="signOpen"
            >
              <img class="inline-block mr-1" src="../assets/Icon/edit.png" alt="edit" />
              <p>簽名</p>
            </button>
          </li>
          <li class="relative">
            <button
              type="button"
              class="flex w-full items-center whitespace-nowrap text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              @click="addDate"
            >
              <img class="inline-block mr-1" src="../assets/Icon/Calendar.png" alt="Calendar" />
              <p>日期</p>
            </button>
          </li>
          <li class="relative">
            <button
              type="button"
              class="flex w-full items-center whitespace-nowrap text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              @click="addText"
            >
              <img class="inline-block mr-1" src="../assets/Icon/text.png" alt="text" />
              <p>文字</p>
            </button>
          </li>
        </ul>
      </div>
      <div class="relative w-full py-4 pl-4 lg:w-4/5">
        <canvas class="absolute drop-shadow-lg" id="canvas"></canvas>
        <!-- function buttons 1-->
        <div class="flex items-center justify-center absolute left-8 top-6 z-10 rounded">
          <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
            <button
              type="button"
              class="rounded-l inline-block p-1.5 lg:p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
              @click="scaleUp"
            >
              <img src="../assets/Icon/plus.png" alt="plus" />
            </button>
            <button
              type="button"
              class="rounded-l inline-block p-1.5 lg:p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
              @click="scaleDown"
            >
              <img src="../assets/Icon/minus.png" alt="minus" />
            </button>
            <button
              type="button"
              class="rounded-l inline-block p-1.5 lg:p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
              @click="clipMethod"
            >
              <img src="../assets/Icon/minimize.png" alt="minimize" />
            </button>
          </div>
        </div>
        <!-- function buttons 2-->
        <div class="flex items-center justify-center absolute right-8 top-6 z-10 rounded lg:hidden">
          <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
            <button
              type="button"
              class="rounded-l inline-block p-1.5 lg:p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
              @click="signOpen"
            >
              <img src="../assets/Icon/edit.png" alt="edit" />
            </button>
            <button
              type="button"
              class="rounded-l inline-block p-1.5 lg:p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
              @click="addDate"
            >
              <img src="../assets/Icon/Calendar.png" alt="Calendar" />
            </button>
            <button
              type="button"
              class="rounded-l inline-block p-1.5 lg:p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
              @click="addText"
            >
              <img src="../assets/Icon/text.png" alt="text" />
            </button>
          </div>
        </div>
        <!-- pagination -->
        <div
          class="fixed left-8 top-[470px] lg:left-0 lg:right-8 xl:top-auto xl:bottom-5 flex justify-end"
        >
          <nav aria-label="Page navigation example">
            <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
              <button
                :disabled="currentNum <= 1 ? true : false"
                type="button"
                data-btn="prevPage"
                class="rounded-l inline-block p-2.5 bg-n1 font-medium border border-n3 leading-tight transition duration-150 ease-in-out"
                aria-label="Previous"
                @click="switchPage"
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
              <button
                disabled
                type="button"
                class="rounded-l inline-block p-2.5 bg-n1 font-medium border border-n3 leading-tight transition duration-150 ease-in-out"
              >
                {{ currentNum }} / {{ totalNum }}
              </button>
              <button
                :disabled="currentNum >= totalNum ? true : false"
                data-btn="nextPage"
                type="button"
                class="rounded-l inline-block p-2.5 bg-n1 font-medium border border-n3 leading-tight transition duration-150 ease-in-out"
                aria-label="Next"
                @click="switchPage"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <SignModal ref="signModal" />
  <ModalNote ref="modal" @cancel="hideModal" />
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useUploadStore } from '../stores/userEdit';
import SignModal from '../components/SignModal.vue';
import ModalNote from '../components/ModalNote.vue';
import FunNav from '../components/FunNav.vue';
import pdfJSMixin from '../mixins/pdfJSMixin';
import fabricMixin from '../mixins/fabricMixin';

export default {
  data() {
    return {
      ctx: null,
      canvas: null,
      scale: 1,
      currentNum: 1,
      totalNum: 1,
      offsetX: '',
      offsetY: '',
      clip_state: false,
      userClipPath: null,
      pdfImage: null,
    };
  },
  computed: {
    ...mapState(useUploadStore, ['pdfFile', 'chosenSign']),
    ...mapWritableState(useUploadStore, ['ReName', 'tags', 'finalFile', 'signatures']),
  },
  mixins: [pdfJSMixin, fabricMixin],
  watch: {
    chosenSign(n) {
      this.canvas.add(n);
    },
  },
  components: { FunNav, SignModal, ModalNote },
  methods: {
    switchPage(e) {
      console.log(e.target.dataset.btn === 'nextPage');
      if (e.target.dataset.btn === 'prevPage') {
        this.currentNum -= 1;
      } else if (e.target.dataset.btn === 'nextPage') {
        this.currentNum += 1;
      }
      this.renderAll();
    },
    async renderPDF() {
      const data = this.pdfFile;
      // const { scale } = this;
      const pdfDoc = await this.pdfjsLib.getDocument(data).promise;
      const pdfPage = await pdfDoc.getPage(this.currentNum);
      // 將pdf 轉成 符合螢幕大小的比例
      // 取得目前的螢幕大小
      const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
      // 注意: 這邊的canvas 是新建的元件
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      // 設置canvas的寬高
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      // 為做成圖片，將繪製好的pdf作為變數回傳
      const renderTask = pdfPage.render({ canvasContext: context, viewport });
      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas); // 到這邊
    },
    async pdfToImage(pdfData) {
      // 設定 PDF 轉為圖片時的比例
      // 回傳圖片
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio;
      // pdf的資料在這一層就被設為圖片轉出
      return new this.fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale,
      });
    },
    async renderAll() {
      this.canvas = new this.fabric.Canvas('canvas');
      this.canvas.requestRenderAll();
      const pdfData = await this.renderPDF();
      this.pdfImage = await this.pdfToImage(pdfData);
      // 透過比例設定 canvas 尺寸
      this.canvas.setWidth(this.pdfImage.width / window.devicePixelRatio);
      this.canvas.setHeight(this.pdfImage.height / window.devicePixelRatio);
      // 將 PDF 畫面設定為背景 (也就是原本的pdf已變成純圖片)
      this.canvas.setBackgroundImage(this.pdfImage, this.canvas.renderAll.bind(this.canvas));
    },
    async getTotalNum() {
      const data = this.pdfFile;
      const pdfDoc = await this.pdfjsLib.getDocument(data).promise;
      // 總頁數
      this.totalNum = pdfDoc.numPages;
    },
    scaleUp() {
      this.scale += 0.1;
      this.canvas.setDimensions({
        width: this.canvas.getWidth() * this.scale,
        height: this.canvas.getHeight() * this.scale,
      });
      this.canvas.setZoom(this.scale);
    },
    scaleDown() {
      this.scale -= 0.1;
      this.canvas.setDimensions({
        width: this.canvas.getWidth() * this.scale,
        height: this.canvas.getHeight() * this.scale,
      });
      this.canvas.setZoom(this.scale);
    },
    addText() {
      const iText = new this.fabric.IText('雙擊我編輯', {
        left: 0,
        top: 120,
        hasControls: true,
      });
      this.canvas.add(iText);
      this.canvas.setActiveObject(iText);
      iText.enterEditing();
      iText.selectAll();
    },
    addDate() {
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;
      const date = new Date().getDate();
      const Text = new this.fabric.Text(`${year}/${month}/${date}`, {
        left: 0,
        top: 120,
        hasControls: true,
      });
      this.canvas.add(Text);
    },
    clipMethod() {
      this.clip_state = !this.clip_state;
      if (!this.clip_state) {
        this.clipPath();
      } else {
        this.clipConfirm();
      }
    },
    clipPath() {
      this.userClipPath = new this.fabric.Rect({
        width: 200,
        height: 200,
        fill: 'rgb(178, 178, 178, 0.4)',
        transparentCorners: false,
        cornerColor: 'rgb(178, 178, 178, 0.8)',
        strokeWidth: 1,
        cornerStrokeColor: 'black',
        borderColor: 'black',
        borderDashArray: [5, 5],
        cornerStyle: 'circle',
      });
      this.userClipPath.setControlVisible('mtr', false);
      this.canvas.add(this.userClipPath);
    },
    clipConfirm() {
      const newImgCrop = this.userClipPath.getBoundingRect();
      this.canvas.setWidth(newImgCrop.width);
      this.canvas.setHeight(newImgCrop.height);
      // 這邊原本是圖片
      this.pdfImage.set({
        cropX: newImgCrop.left,
        cropY: newImgCrop.top,
        width: newImgCrop.width,
        height: newImgCrop.height,
      }); // 校正位置 nowClip.x += newImgCrop.left nowClip.y += newImgCrop.top
      this.userClipPath.set({ left: 0, top: 0 });
      this.userClipPath.setCoords();
      this.userClipPath.opacity = 0;
      this.canvas.renderAll();
    },
    confirmedEdit() {
      this.finalFile = this.canvas.toDataURL('image/png');
      const newFile = {};
      newFile.file = `${this.finalFile}`;
      newFile.name = `${this.ReName}`;
      if (localStorage.getItem('historyFiles') === null) {
        const storageArray = [];
        storageArray.push(newFile);
        localStorage.setItem('historyFiles', JSON.stringify(storageArray));
        // 當localStorage已存在資料陣列，指定一個內容與陣列資料庫相同的陣列
      } else {
        const storageArray = JSON.parse(localStorage.getItem('historyFiles'));
        storageArray.push(newFile);
        localStorage.setItem('historyFiles', JSON.stringify(storageArray));
      }
      this.$router.push('./final');
    },
    hideModal() {
      this.$refs.modal.hideModal();
    },
    openModal() {
      this.$refs.modal.openModal();
    },
    signOpen() {
      this.$refs.signModal.openModal();
    },
    signHide() {
      this.$refs.signModal.hideModal();
    },
  },
  mounted() {
    this.getTotalNum();
    this.renderAll();
  },
};
</script>
