<!-- eslint-disable max-len -->
<template>
  <div class="bg-n3 min-h-screen">
    <FunNav :stage="3" @front="goFront" @next="downloadDoc" />
    <div class="relative py-4 flex justify-center">
      <img
        :class="{ hidden: finalFile ? false : true }"
        class="drop-shadow-lg block overflow-scroll"
        :src="finalFile"
        alt=""
        @mousedown="mouseDownHandler"
      />
      <!-- <canvas id="fabricCanvas"></canvas> -->
      <!-- function buttons 1-->
      <!-- <div class="flex items-center justify-center absolute left-8 top-6 z-10 rounded">
        <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
          <button
            type="button"
            class="rounded-l inline-block p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
            @click="scaleUp"
          >
            <img src="../assets/Icon/plus.png" alt="plus" />
          </button>
          <button
            type="button"
            class="rounded-l inline-block p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
            @click="scaleDown"
          >
            <img src="../assets/Icon/minus.png" alt="minus" />
          </button>
          <button
            type="button"
            class="rounded-l inline-block p-2.5 bg-n1 font-medium border border-n3 text-xs leading-tight transition duration-150 ease-in-out"
          >
            <img src="../assets/Icon/minimize.png" alt="minimize" />
          </button>
        </div>
      </div> -->
    </div>
  </div>
  <SignModal />
</template>

<script>
import { mapState, mapActions } from 'pinia';
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
      num: 1,
      totalNum: 1,
      offsetX: '',
      offsetY: '',
    };
  },
  emits: ['front', 'next'],
  computed: {
    ...mapState(useUploadStore, ['tags', 'ReName', 'finalFile']),
    // ...mapWritableState(useUploadStore, ['ReName', 'tags', 'finalFile']),
  },
  components: { FunNav, SignModal },
  methods: {
    ...mapActions(useUploadStore, ['downloadDoc']),
    // 無用
    async renderAll() {
      // eslint-disable-next-line no-undef
      this.canvas = new fabric.Canvas('canvas');
      // this.canvas = this.finalFile;
      const data = this.finalFile;
      // this.canvas.renderAll().bind(this.canvas); // 不管有沒有這個，都無法渲染出來
      // this.canvas.add(this.finalFile);
      this.canvas.requestRenderAll();

      // 透過比例設定 canvas 尺寸
      this.canvas.setWidth(data.width / window.devicePixelRatio);
      this.canvas.setHeight(data.height / window.devicePixelRatio);
      // // 將 PDF 畫面設定為背景 (也就是原本的pdf已變成純圖片)
      this.canvas.setBackgroundImage(data, this.canvas.renderAll.bind(this.canvas));
    },
    // 無用
    mouseDownHandler(opt) {
      const evt = opt.e;
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY; //
      this.canvas.style.cursor = 'grab'; //
      // this.offsetX = e.offsetX; //
      // this.offsetY = e.offsetY; //
      // 按下時開始監聽在文件中滑鼠移動的事件，注意這邊是直接監聽mouseDownHandler的掛載目標，因此沒有對像 //
      // 注意這有順序不是同時發生的，因此不能同時綁定在canvas上 //
      // document.addEventListener('mousemove', this.mousemoveHandler); //
      // document.addEventListener('mouseup', this.mouseUpHandler);
    },
    // 無用
    mousemoveHandler(e) {
      // 用當前滑鼠位置減去這個相對元素的左上角位置，保證滑鼠所按位置拖拽
      this.canvas.style.left = `${e.clientX - this.offsetX}px`;
      this.canvas.style.top = `${e.clientY - this.offsetY}px`;
    }, // 當釋放滑鼠鍵時，刪除滑鼠移動事件和刪除滑鼠釋放事件
    // 無用
    mouseUpHandler() {
      // 注意這邊是直接監聽mouseDownHandler的掛載目標，因此沒有對像
      document.removeEventListener('mousemove', this.mousemoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
      this.canvas.style.cursor = 'default';
    },
    // 這是 fabric的做法 無用
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
    // 這是 fabric的做法 無用
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
    // 有用 勿刪
    confirmedEdit() {
      this.finalFile = this.canvas.toDataURL('image/png');
      this.$router.push('./final');
    },
    goFront() {
      this.$router.push('/');
    },
  },
  // mounted() {
  //   // this.canvas = document.querySelector('#canvas');
  //   // this.ctx = this.canvas.getContext('2d');
  //   // this.fileImage = this.finalFile;
  //   // this.renderPDF();
  //   // console.log(this.finalFile);
  //   // this.renderAll();
  //   // this.canvas = this.finalFile;
  // },
};
</script>
