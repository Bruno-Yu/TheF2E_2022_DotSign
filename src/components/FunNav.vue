<!-- eslint-disable max-len -->
<template>
  <nav class="flex items-center justify-between bg-n1 px-4 lg:px-8 py-5 lg:py-6">
    <div class="container flex flex-wrap grow-1 items-center justify-between">
      <ul class="list-none flex space-x-9 lg:space-x-12">
        <li class="flex items-center" :class="[status[0]]">
          <div class="rounded-full text-center text-sm w-5 h-5 lg:w-6 lg:h-6 lg:text-base">
            <i v-if="status[0] === 'checked'" class="fa-solid fa-check" />
            <span v-else> 1 </span>
          </div>
          <p class="hidden lg:block font-medium pl-2">{{ process[0] }}</p>
        </li>
        <li
          class="flex items-center relative before:block before:absolute before:w-full before:-left-7 lg:before:-left-9 before:top-1/2 lg:before:w-1/5 before:h-px"
          :class="[status[1]]"
        >
          <div class="rounded-full text-center text-sm w-5 h-5 lg:w-6 lg:h-6 lg:text-base">
            <i v-if="status[1] === 'checked'" class="fa-solid fa-check" />
            <span v-else> 2 </span>
          </div>
          <p class="hidden lg:block font-medium pl-2">{{ process[1] }}</p>
        </li>
        <li
          class="flex items-center relative before:block before:absolute before:w-full before:-left-7 lg:before:-left-9 before:top-1/2 lg:before:w-1/5 before:h-px"
          :class="[status[2]]"
        >
          <div class="rounded-full text-center text-sm w-5 h-5 lg:w-6 lg:h-6 lg:text-base">
            <i v-if="status[2] === 'checked'" class="fa-solid fa-check" />
            <span v-else> 3 </span>
          </div>
          <p class="hidden lg:block font-medium pl-2">{{ process[2] }}</p>
        </li>
        <li
          class="flex items-center relative before:block before:absolute before:w-full before:-left-7 lg:before:-left-9 before:top-1/2 lg:before:w-1/5 before:h-px"
          :class="[status[3]]"
        >
          <div class="rounded-full text-center text-sm w-5 h-5 lg:w-6 lg:h-6 lg:text-base">
            <i v-if="status[3] === 'checked'" class="fa-solid fa-check" />
            <span v-else> 4 </span>
          </div>
          <p class="hidden lg:block font-medium pl-2">{{ process[3] }}</p>
        </li>
      </ul>
    </div>
    <div
      class="rounded-full border-n6 border-[1.5px] text-center text-sm w-5 h-5 text-n6 align-top"
    >
      ?
    </div>
    <!-- 修改hidden -->
    <div class="hidden lg:flex ml-8">
      <button
        v-if="stage === 3"
        type="button"
        class="hidden lg:inline-block px-5 py-2.5 border-p1 border text-p1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
        @click="goToFront"
      >
        返回主頁
      </button>
      <button
        v-else
        type="button"
        class="hidden lg:inline-block px-5 py-2.5 border-p1 border text-p1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        取消
      </button>

      <button
        type="button"
        class="hidden lg:inline-block px-5 py-2.5 ml-4 bg-p1 border text-n1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
        @click="pressNext"
        :class="{ 'lg:hidden': stage == 0 ? true : false }"
      >
        {{ stage === 3 ? `下載檔案` : `下一步` }}
      </button>
    </div>
  </nav>
  <nav class="w-full flex items-center justify-between bg-n1 px-4 py-5 lg:px-8 lg:py-6 lg:hidden">
    <p class="text-xl font-bold">{{ process[stage] }}</p>
    <div class="flex">
      <button
        v-if="stage === 3"
        type="button"
        class="inline-block px-3 py-1.5 border-p1 border text-p1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
        @click="goToFront"
      >
        返回主頁
      </button>

      <button
        v-else
        type="button"
        class="inline-block px-3 py-1.5 border-p1 border text-p1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        取消
      </button>
      <button
        type="button"
        class="inline-block px-3 py-1.5 ml-4 bg-p1 border text-n1 font-bold whitespace-nowrap text-xs leading-tight uppercase rounded shadow-md hover:bg-p1 hover:text-n1 hover:shadow-lg focus:bg-p1 focus:text-n1 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-p1 active:text-n1 active:shadow-lg transition duration-150 ease-in-out"
        @click="pressNext"
      >
        {{ stage === 3 ? `下載檔案` : `下一步` }}
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['stage'],
  data() {
    return {
      process: ['上傳檔案', '確認上傳檔案', '製作簽署檔案', '下載簽署檔案'],
      status: ['inActive', 'inActive', 'inActive', 'inActive'],
    };
  },
  methods: {
    pressNext() {
      this.$emit('next');
    },
    goToFront() {
      this.$emit('front');
    },
  },
  created() {
    this.status[this.stage] = 'current';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.stage; i++) {
      this.status[i] = 'checked';
    }
  },
};
</script>

<style>
.current {
  @apply before:bg-p1;
}
.current p {
  @apply text-n7;
}
.current .rounded-full {
  @apply bg-p1 text-n1;
}
.inActive {
  @apply before:bg-n5;
}
.inActive p {
  @apply text-n5;
}

.inActive .rounded-full {
  @apply bg-n5 text-n1;
}
.checked {
  @apply before:bg-p1;
}
.checked p {
  @apply text-p1;
}
.checked .rounded-full {
  @apply border border-p1 text-p1;
}
</style>
