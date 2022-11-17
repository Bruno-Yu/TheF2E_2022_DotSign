<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <div class="bg-n3 flex min-h-screen flex-col overflow-clip">
    <FunNav :stage="2" @next="confirmedEdit" />
    <!-- EditView 新增的 -->
    <nav class="flex items-center justify-between bg-n1 px-4 py-5 lg:px-8 lg:py-6 shadow-lg">
      <ul class="list-none flex w-full">
        <li class="flex items-center xl:mr-5">
          <img class="mr-2" src="../assets/Icon/write.png" alt="write" />
          <input type="text" class="font-bold" v-model="ReName" />
        </li>
        <li class="flex items-center">
          <img class="mr-2" src="../assets/Icon/Tag.png" alt="Tag" />
          <p class="font-bold lg:hidden">{{ tags.length ? tags.length : 0 }}</p>
          <div class="hidden lg:flex items-center grow-0">
            <span class="py-2 invisible">:</span>
            <span
              v-for="(item, index) in tags"
              class="bg-n2 px-4 py-1 mr-1 rounded-full"
              :key="index"
            >
              <button type="button" @click="deleteTag(item)" class="mx-1">x</button>{{ item }}
            </span>
          </div>
        </li>
        <li class="ml-auto">
          <button type="button" class="flex items-center whitespace-nowrap pr-1">
            <img class="inline-block" src="../assets/Icon/View.png" alt="View" />
            <p>預覽</p>
          </button>
        </li>
      </ul>
    </nav>
    <div class="flex grow w-full overflow-x-scroll">
      <!-- sideNav -->
      <div class="hidden w-1/5 shadow-md bg-white px-1 lg:block">
        <ul class="flex flex-col grow">
          <li class="relative">
            <button
              type="button"
              class="flex w-full items-center whitespace-nowrap text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
              data-bs-toggle="modal"
              data-bs-target="#signModal"
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
        <canvas class="absolute drop-shadow-lg" id="canvas" @mousedown="mouseDownHandler"></canvas>
        <!-- <canvas id="fabricCanvas"></canvas> -->
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
              data-bs-toggle="modal"
              data-bs-target="#signModal"
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
                :disabled="currentNum === 1 ? true : false"
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
                :disabled="currentNum === totalNum ? true : false"
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
  <SignModal />
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useUploadStore } from '../stores/userEdit';
import SignModal from '../components/SignModal.vue';
import FunNav from '../components/FunNav.vue';
// eslint-disable-next-line no-undef
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
// const Base64Prefix = 'data:application/pdf;base64,';

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
    ...mapWritableState(useUploadStore, ['ReName', 'tags', 'finalFile']),
  },
  watch: {
    chosenSign(n) {
      // console.log(n);
      // eslint-disable-next-line no-undef
      // const canvas = new fabric.Canvas('canvas');
      // canvas.requestRenderAll();
      this.canvas.add(n);
    },
  },
  components: { FunNav, SignModal },
  methods: {
    switchPage(e) {
      if (e.target.dataset.btn === 'prevPage') {
        this.currentNum -= 1;
      } else {
        this.currentNum += 1;
      }
      this.renderAll();
    },
    async renderPDF() {
      // 將 base64 中的前綴刪去，並進行解碼
      // console.log(this.pdfFile); // null?
      // const data = atob(this.pdfFile.substring(Base64Prefix.length));
      // console.log(data, this.pdfFile);
      // 原本寫法
      const data = this.pdfFile;
      // const { scale } = this;
      // eslint-disable-next-line no-undef
      const pdfDoc = await pdfjsLib.getDocument(data).promise;
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

      // pdfPage.render({ canvasContext: context, viewport });
      // 為做成圖片，將繪製好的pdf作為變數回傳
      const renderTask = pdfPage.render({ canvasContext: context, viewport });
      // 回傳做好的 PDF canvas
      return renderTask.promise.then(() => canvas); // 到這邊
    },
    async pdfToImage(pdfData) {
      // 設定 PDF 轉為圖片時的比例
      // 回傳圖片
      // const { scale } = this;
      // 設定 PDF 轉為圖片時的比例
      const scale = 1 / window.devicePixelRatio;
      // pdf的資料在這一層就被設為圖片轉出
      // eslint-disable-next-line no-undef
      return new fabric.Image(pdfData, {
        id: 'renderPDF',
        scaleX: scale,
        scaleY: scale,
      });
    },
    async renderAll() {
      // eslint-disable-next-line no-undef
      this.canvas = new fabric.Canvas('canvas');
      this.canvas.requestRenderAll();
      // await this.renderPDF(); // 到這邊成功，但比例便原本的樣子，
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
      // eslint-disable-next-line no-undef
      const pdfDoc = await pdfjsLib.getDocument(data).promise;
      // 總頁數
      this.totalNum = pdfDoc.numPages;
      console.log(this.totalNum);
    },
    scaleUp() {
      this.scale += 0.1;
      // this.renderPDF();
      this.canvas.setDimensions({
        width: this.canvas.getWidth() * this.scale,
        height: this.canvas.getHeight() * this.scale,
      });
      this.canvas.setZoom(this.scale);

      // this.renderAll(); // 若用這個方法，會重新建立新的canvas img
    },
    scaleDown() {
      this.scale -= 0.1;
      // this.renderPDF();
      // this.renderAll();
      this.canvas.setDimensions({
        width: this.canvas.getWidth() * this.scale,
        height: this.canvas.getHeight() * this.scale,
      });
      this.canvas.setZoom(this.scale);
    },
    addText() {
      // eslint-disable-next-line no-undef
      const iText = new fabric.IText('雙擊我編輯', {
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
      // eslint-disable-next-line no-undef
      const Text = new fabric.Text(`${year}/${month}/${date}`, {
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
      // eslint-disable-next-line no-undef
      this.userClipPath = new fabric.Rect({
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
      console.log('clip!');
      const newImgCrop = this.userClipPath.getBoundingRect();
      console.log(newImgCrop);
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
    mouseDownHandler(opt) {
      const evt = opt.e;
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;

      // this.canvas.style.cursor = 'grab';
      // this.offsetX = e.offsetX;
      // this.offsetY = e.offsetY;
      // // 按下時開始監聽在文件中滑鼠移動的事件，注意這邊是直接監聽mouseDownHandler的掛載目標，因此沒有對像
      // // 注意這有順序不是同時發生的，因此不能同時綁定在canvas上
      // document.addEventListener('mousemove', this.mousemoveHandler);
      // document.addEventListener('mouseup', this.mouseUpHandler);
    },
    mousemoveHandler(e) {
      // 用當前滑鼠位置減去這個相對元素的左上角位置，保證滑鼠所按位置拖拽
      this.canvas.style.left = `${e.clientX - this.offsetX}px`;
      this.canvas.style.top = `${e.clientY - this.offsetY}px`;
    },
    // 當釋放滑鼠鍵時，刪除滑鼠移動事件和刪除滑鼠釋放事件
    mouseUpHandler() {
      // 注意這邊是直接監聽mouseDownHandler的掛載目標，因此沒有對像
      document.removeEventListener('mousemove', this.mousemoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
      this.canvas.style.cursor = 'default';
    },
    confirmedEdit() {
      this.finalFile = this.canvas.toDataURL('image/png');
      this.$router.push('./final');
    },
  },
  mounted() {
    this.getTotalNum();
    // this.canvas = document.querySelector('#canvas');
    // this.ctx = this.canvas.getContext('2d');
    // this.renderPDF();
    this.renderAll();
  },
};
</script>
