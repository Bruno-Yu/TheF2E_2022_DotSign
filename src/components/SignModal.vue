<!-- eslint-disable max-len -->
<template>
  <div>
    <div
      class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
      id="signModal"
      tabindex="-1"
      aria-labelledby="signModalTitle"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
        <div
          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
        >
          <div class="relative flex flex-shrink-0 items-center justify-center p-4 rounded-t-md">
            <!-- tabs -->
            <ul
              class="nav nav-tabs nav-justified flex flex-wrap list-none pl-0 mb-2"
              id="tabs-tabJustify"
              role="tablist"
            >
              <li class="nav-item text-center" role="presentation">
                <a
                  href="#tabs-homeJustify"
                  class="nav-link w-full whitespace-nowrap block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                  id="tabs-home-tabJustify"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-homeJustify"
                  role="tab"
                  aria-controls="tabs-homeJustify"
                  aria-selected="true"
                  >簽名</a
                >
              </li>
              <li class="nav-item flex-grow text-center" role="presentation">
                <a
                  href="#tabs-profileJustify"
                  class="nav-link w-full whitespace-nowrap block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                  id="tabs-profile-tabJustify"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-profileJustify"
                  role="tab"
                  aria-controls="tabs-profileJustify"
                  aria-selected="false"
                  >圖片</a
                >
              </li>
            </ul>

            <button
              type="button"
              class="absolute right-4 top-4 btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body relative p-4">
            <!-- content -->
            <div class="tab-content" id="tabs-tabContentJustify">
              <div
                class="tab-pane fade show active"
                id="tabs-homeJustify"
                role="tabpanel"
                aria-labelledby="tabs-home-tabJustify"
              >
                <ul class="list-none" v-if="signatures.length">
                  <li v-for="(image, index) in signatures" :key="index">
                    <button
                      type="button"
                      data-btn="signature"
                      @click="chooseSign(image)"
                      data-bs-dismiss="modal"
                    >
                      <img
                        class="show-img border"
                        :src="image"
                        width="300"
                        height="150"
                        :alt="index"
                      />
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  class="block w-full px-6 py-2.5 mt-4 mb-1 border border-p1 text-p1 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 transition duration-150 ease-in-out"
                  data-bs-dismiss="modal"
                  data-bs-toggle="modal"
                  data-bs-target="#createSignature"
                >
                  創建簽名 +
                </button>
              </div>
              <div
                class="tab-pane fade"
                id="tabs-profileJustify"
                role="tabpanel"
                aria-labelledby="tabs-profile-tabJustify"
              >
                <ul class="grid grid-cols-3 w-full h-auto gap-4">
                  <li>
                    <div
                      class="rounded border-n6 w-full h-full flex justify-center items-center text-center"
                    >
                      <label class="text-p1 text-lg d-block bg-n1 cursor-pointer" for="img"
                        >選擇檔案
                        <input
                          type="file"
                          id="img"
                          name="img"
                          class="hidden"
                          accept="image/*"
                          data-btn="images"
                          @change="saveImage"
                        />
                      </label>
                    </div>
                  </li>
                  <li v-for="(img, index) in images" :key="index">
                    <button
                      type="button"
                      class="block w-full"
                      data-btn="images"
                      data-bs-dismiss="modal"
                      @click="chooseSign(img)"
                    >
                      <img class="w-full h-auto" :src="img" :alt="index" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 簽名板 -->
  <div
    class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
    id="createSignature"
    tabindex="-1"
    aria-labelledby="createSignature"
    aria-modal="true"
    role="dialog"
  >
    <div class="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
      <div
        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
      >
        <div class="flex w-full items-center justify-between p-4 rounded-t-md">
          <button
            type="button"
            class="btn-close block w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
          <h5 class="text-xl font-medium leading-normal text-gray-800" id="createSignatureLabel">
            創建簽名
          </h5>
          <button
            :disabled="use"
            type="button"
            class="block px-6 py-2.5 disabled:bg-n2 disabled:text-n5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
            data-btn="signature"
            @click="saveImage"
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target="#signModal"
          >
            使用
          </button>
        </div>
        <div class="flex justify-end p-4 border-b border-gray-200">
          <div
            class="rounded-full border-n6 border-[1.5px] text-center text-sm w-5 h-5 text-n6 align-top"
          >
            ?
          </div>
        </div>
        <div class="modal-body relative p-4">
          <!-- canvas content -->
          <canvas
            id="signature"
            height="150"
            width="460"
            class="bg-n4"
            @="{mousedown:startPosition, mousemove:draw, mouseup: finishedPosition }"
          ></canvas>
        </div>
        <div
          class="modal-footer flex flex-shrink-0 flex-wrap items-center p-4 border-t border-gray-200 rounded-b-md"
        >
          <button
            type="button"
            class="inline-block clear px-1 py-2.5 mr-5 text-p1 font-medium text-xs leading-tight uppercase rounded transition duration-150 ease-in-out"
            @click="reset"
          >
            清除
          </button>
          <ul class="list-none flex space-x-2 items-center">
            <li>
              <button
                type="button"
                class="rounded-full w-3.5 h-3.5 bg-black active:ring-[1px] active:ring-yellow-300 active:ring-offset-2"
                @click="changeColor"
              ></button>
            </li>
            <li>
              <button
                type="button"
                class="rounded-full w-3.5 h-3.5 bg-p1 active:ring-[1px] active:ring-yellow-300 active:ring-offset-2"
                @click="changeColor"
              ></button>
            </li>

            <li>
              <button
                type="button"
                class="rounded-full w-3.5 h-3.5 bg-red-600 active:ring-[1px] active:ring-yellow-300 active:ring-offset-2"
                @click="changeColor"
              ></button>
            </li>
            <li class="relative">
              <label
                for="pickColors"
                class="w-3.5 h-3.5 text-n6 text-2xl block absolute -top-4 cursor-pointer"
                >+
                <input type="button" class="hidden" id="pickColors" @colorChange="changeColor" />
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Modal from 'tw-elements/dist/src/js/bs/dist/modal';
import { mapWritableState } from 'pinia';
import { useUploadStore } from '../stores/userEdit';

export default {
  data() {
    return {
      isPainting: false,
      picker: null,
      canvas: null,
      ctx: null,
      use: true, // 使用按鈕
    };
  },
  computed: {
    ...mapWritableState(useUploadStore, ['signatures', 'chosenSign', 'images']),
  },

  methods: {
    // 換顏色
    changeColor(e) {
      if (e.target.classList.contains('bg-p1')) {
        this.ctx.strokeStyle = '#3175FA';
      } else if (e.target.classList.contains('bg-red-600')) {
        this.ctx.strokeStyle = '#F64331';
      } else if (e.target.classList.contains('bg-black')) {
        this.ctx.strokeStyle = '#191A1B';
      } else {
        this.ctx.strokeStyle = e.detail.color.hexa;
      }
    },
    // 取得滑鼠 / 手指在畫布上的位置
    getPaintPosition(e) {
      const canvasSize = this.canvas.getBoundingClientRect();
      if (e.type === 'mousemove') {
        return { x: e.clientX - canvasSize.left, y: e.clientY - canvasSize.top };
      }
      // return { x: `${e.clientX - e.offsetX}px`, y: `${e.clientY - e.offsetY}px` };
      return {
        x: e.touches[0].clientX - canvasSize.left,
        y: e.touches[0].clientY - canvasSize.top,
      };
    },
    startPosition(e) {
      this.use = false;
      e.preventDefault();
      this.isPainting = true;
    },
    // 結束繪圖時，將狀態關閉，並產生新路徑
    finishedPosition() {
      this.isPainting = false;
      this.ctx.beginPath();
    },
    draw(e) {
      // 滑鼠移動過程中，若非繪圖狀態，則跳出
      if (!this.isPainting) return;
      // 取得滑鼠 /手指在畫布上的 x, y 軸位置位置
      const paintPosition = this.getPaintPosition(e); // 移動滑鼠位置並產生圖案
      this.ctx.lineTo(paintPosition.x, paintPosition.y);
      this.ctx.stroke();
    },
    reset() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.use = true;
    },
    saveImage(e) {
      // 簽名圖片儲存的類型選擇 png ，並將值放入 img 的 src
      if (e.target.dataset.btn === 'signature') {
        const newImg = this.canvas.toDataURL('image/png');
        // 直接修改剛剛的函式，將拿到的檔案存起來
        this.signatures.push(newImg);
      } else if (e.target.dataset.btn === 'images') {
        if (e.target.files[0] === undefined) {
          return;
        }
        const file = e.target.files[0];
        // 建成圖片連結
        const stamp = URL.createObjectURL(file);
        this.images.push(stamp);
      }
      // 打開簽名檔的modal
      // this.createSignature_modal.toggle();
      // this.signModal.show();
    },
    // 選擇 簽名
    chooseSign(image) {
      // eslint-disable-next-line no-undef
      fabric.Image.fromURL(image, (img) => {
        // 設定簽名出現的位置及大小，後續可調整
        // console.log(img);
        // eslint-disable-next-line no-param-reassign
        img.top = 100;
        // eslint-disable-next-line no-param-reassign
        img.scaleX = 0.5;
        // eslint-disable-next-line no-param-reassign
        img.scaleY = 0.5;
        this.chosenSign = img;
        // canvas.add(image);
      });
    },
  },
  mounted() {
    this.canvas = document.querySelector('#signature');
    // eslint-disable-next-line no-undef
    this.picker = new ColorPicker(document.querySelector('#pickColors'), '#4c0082');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
  },
};
</script>
