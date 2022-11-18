<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <div class="bg-p2 w-full h-screen flex flex-col items-center px-4 xl:relative">
    <router-link class="block w-1/3 mb-8 pt-5 lg:w-[219px] lg:mb-10" to="./login"
      ><img class="w-full lg:h-auto" src="../assets/images/Logo.png" alt="logo"
    /></router-link>

    <!-- navbar -->
    <!-- content -->
    <div
      class="rounded bg-n1 mt-8 w-full md:max-w-5xl mx-auto xl:rounded xl:mt-[80px] px-4 py-6 relative"
    >
      <FunNav :stage="1" @next="goToEdit" @cancel="openModal" />
      <button class="font-bold text-p1 block mb-6" @click="openModal">&lt; 上一步</button>
      <VForm v-slot="{ errors }" ref="form">
        <div class="form-group mb-6">
          <label
            for="fileName"
            class="form-label inline-block mb-2 font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >文件名稱</label
          >
          <VField
            type="text"
            name="檔案名稱"
            :class="{ 'is-invalid': errors['檔案名稱'] }"
            rules="required"
            class="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="fileName"
            aria-describedby="fileName"
            v-model="ReName"
            placeholder="請輸入想要的名稱"
          />
          <ErrorMessage name="檔案名稱" class="invalid-feedback" />
        </div>
        <div class="form-group mb-6">
          <label
            for="uploadFile"
            class="form-label inline-block mb-2 font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >上傳文件</label
          >
          <VField
            type="text"
            name="載入檔案"
            :class="{ 'is-invalid': errors['載入檔案'] }"
            rules="required"
            class="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="uploadFile"
            :value="fileName"
            readonly
          />
          <ErrorMessage name="載入檔案" class="invalid-feedback" />
        </div>
        <div class="form-group mb-10">
          <label for="fileTag" class="form-label inline-block mb-2 font-bold">建立標籤</label>
          <button
            type="button"
            class="block w-full px-3 py-1.5 text-base font-normal border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:border-blue-600 focus:outline-none"
          >
            <div class="flex items-center grow-0">
              <div class="flex items-center grow-0">
                <span class="py-2 invisible">:</span>
                <span
                  v-for="(item, index) in tags"
                  class="bg-n2 px-4 py-1 mr-1 rounded-full"
                  :key="index"
                >
                  <button type="button" @click="deleteTag(item)" class="mx-1">x</button>{{ item }}
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                id="fileTag"
                v-model="newTag"
                @focus.stop="show"
                @blur.stop="hide"
                @keyup.enter="addTag"
                placeholder="請輸入標籤名稱"
              />
            </div>
            <div class="collapse" id="collapseTags">
              <div class="block pl-1 pb-3">
                <span class="invisible">:</span>
                <div
                  class="mb-2 text-left w-full"
                  v-for="(item, index) in tagsHistory"
                  :key="index"
                >
                  <button
                    type="button"
                    class="bg-n2 px-4 py-1 mr-1 rounded-full"
                    @click="addTag(e, item)"
                  >
                    <button type="button" @click="deleteTagRecord(item)" class="mx-1">x</button
                    >{{ item }}
                  </button>
                </div>
              </div>
            </div>
          </button>
        </div>
      </VForm>
    </div>
  </div>
  <ModalNote ref="modal" @cancel="hideModal" />
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import Collapse from 'tw-elements/dist/src/js/bs/dist/collapse';
import { useUploadStore } from '../stores/userEdit';
import ModalNote from '../components/ModalNote.vue';
import FunNav from '../components/FunNav.vue';

// import emitter from '../libs/emitter';

export default {
  data() {
    return {
      newTag: '',
      collapse: null,
      // allowNext: false,
      allowNext: false,
    };
  },
  computed: {
    ...mapState(useUploadStore, ['fileName']),
    ...mapWritableState(useUploadStore, ['ReName', 'tags', 'tagsHistory']),
  },
  components: { FunNav, ModalNote },
  methods: {
    addTag(e, item = '') {
      if (this.tags.indexOf(this.newTag) > 0 || this.tags.indexOf(item) > 0) return;
      if (!item) {
        if (!this.newTag) return;
        this.tags.push(this.newTag);
        if (this.tagsHistory.indexOf(this.newTag) < 0) {
          this.tagsHistory.push(this.newTag);
        }
        this.newTag = '';
      } else {
        this.tags.push(item);
      }
    },
    goToEdit() {
      this.$refs.form.validate().then((res) => {
        if (!res.valid) {
          alert('請完成必填部分');
        } else {
          this.$router.push('./edit');
        }
      });
    },
    show() {
      this.collapse.show();
    },
    hide() {
      this.collapse.hide();
    },
    hideModal() {
      this.$refs.modal.hideModal();
    },
    openModal() {
      this.$refs.modal.openModal();
    },
    deleteTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    deleteTagRecord(tag) {
      this.tagsHistory.splice(this.tags.indexOf(tag), 1);
    },
  },
  mounted() {
    // 預設閉合狀態需要在建立Collapse 時設定
    this.collapse = new Collapse('#collapseTags', { toggle: false });
  },
};
</script>
