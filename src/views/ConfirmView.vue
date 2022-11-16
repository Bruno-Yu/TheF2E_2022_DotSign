<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable max-len -->
<template>
  <div class="bg-p2 w-full h-screen flex flex-col items-center px-4 xl:relative">
    <img
      class="w-1/3 mb-8 pt-5 lg:w-[219px] lg:h-auto lg:mb-10"
      src="../assets/images/Logo.png"
      alt="logo"
    />

    <!-- navbar -->
    <!-- content -->
    <div
      class="rounded bg-n1 mt-8 w-full md:max-w-5xl mx-auto xl:rounded xl:mt-[80px] px-4 py-6 relative"
    >
      <p class="text-2xl font-bold absolute left-0 right-0 top-[-38px]">
        點點簽 - 訪客試用版<span class="text-sm ml-3 align-middle"
          >( 正式版請到 <router-link class="text-p1" to="./login">連結</router-link> )</span
        >
      </p>
      <FunNav :stage="1" @next="goToEdit" />
      <router-link class="font-bold text-p1 block mb-6" to="./upload">&lt; 上一步</router-link>
      <form>
        <div class="form-group mb-6">
          <label
            for="fileName"
            class="form-label inline-block mb-2 font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >文件名稱</label
          >
          <input
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="fileName"
            aria-describedby="fileName"
            v-model="ReName"
            placeholder="請輸入想要的名稱"
          />
        </div>
        <div class="form-group mb-6">
          <label
            for="uploadFile"
            class="form-label inline-block mb-2 font-bold after:content-['*'] after:ml-0.5 after:text-red-500"
            >上傳文件</label
          >
          <input
            type="text"
            class="form-control block w-full px-3 py-1.5 text-base font-normal bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="uploadFile"
            :value="fileName"
            readonly
          />
        </div>
        <div class="form-group mb-10">
          <label for="fileTag" class="form-label inline-block mb-2 font-bold">建立標籤</label>
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
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
                @keyup.enter="addTag"
                placeholder="請輸入標籤名稱"
              />
            </div>
            <div class="collapse" id="collapseExample">
              <div class="block p-6">
                <span class="py-2 invisible">:</span>
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
          {{ tags }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import { useUploadStore } from '../stores/userEdit';
import FunNav from '../components/FunNav.vue';

// import emitter from '../libs/emitter';

export default {
  data() {
    return {
      newTag: '',
    };
  },
  computed: {
    ...mapState(useUploadStore, ['fileName']),
    ...mapWritableState(useUploadStore, ['ReName', 'tags', 'tagsHistory']),
  },
  components: { FunNav },
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
      this.$router.push('./edit');
    },

    deleteTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    deleteTagRecord(tag) {
      this.tagsHistory.splice(this.tags.indexOf(tag), 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
