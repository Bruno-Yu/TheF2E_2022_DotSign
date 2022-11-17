<!-- eslint-disable max-len -->
<template>
  <div class="container-fluid h-screen bg-n3 flex justify-center items-center">
    <!-- 上傳檔案 -->
    <div class="flex flex-col items-center text-center max-w-5xl">
      <img class="mb-8" src="../assets/images/Error_State.png" alt="Error_State" />
      <h2 class="text-3xl font-bold mb-4">未知錯誤</h2>
      <p class="text-n6 mb-8">發生未知錯誤，請稍後再試一次</p>
      <router-link
        type="button"
        class="px-3 py-2.5 mb-9 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
        to="/"
      >
        前往首頁
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
