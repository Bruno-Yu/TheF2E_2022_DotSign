<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <!-- edit view的第二個navbar -->
  <nav class="flex items-center justify-between bg-n1 px-4 py-5 lg:px-8 lg:py-6 shadow-lg">
    <ul class="list-none flex w-full">
      <li class="flex items-center xl:mr-5">
        <img class="mr-2" src="../assets/Icon/write.png" alt="write" />
        <input
          type="text"
          class="font-bold"
          v-model="ReName"
          :readOnly="stage === 3 ? true : false"
        />
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
            <button
              :disabled="stage === 3 ? true : false"
              type="button"
              @click="deleteTag(item)"
              class="mx-1"
            >
              x</button
            >{{ item }}
          </span>
        </div>
      </li>
      <li class="ml-auto">
        <div
          class="rounded-full border-n6 border-[1.5px] text-center text-sm w-5 h-5 text-n6 align-top"
        >
          ?
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapWritableState } from 'pinia';
import { useUploadStore } from '../stores/userEdit';

export default {
  props: ['stage'],
  computed: { ...mapWritableState(useUploadStore, ['ReName', 'tags']) },
};
</script>
