<!-- eslint-disable vuejs-accessibility/label-has-for -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <main class="bg-p2 h-screen flex flex-col items-center px-4 pt-6 xl:relative">
    <img
      class="absolute w-[238px] h-auto bottom-0 right-[111px] hidden xl:block"
      src="../assets/images/login_avatar.png"
      alt="login_avatar"
    />
    <img
      class="w-1/3 mb-6 lg:w-[219px] lg:h-auto lg:mb-10"
      src="../assets/images/Logo.png"
      alt="logo"
    />
    <div class="flex flex-col bg-n1 w-full rounded lg:max-w-[36%] lg:mx-auto">
      <div class="flex justify-center">
        <ul
          class="nav nav-tabs flex md:flex-row flex-wrap list-none border-b-0 pl-0"
          id="tabs-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-home"
              class="nav-link block text-n6 font-bold text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-5 hover:border-transparent focus:border-transparent active"
              id="tabs-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-home"
              role="tab"
              aria-controls="tabs-home"
              aria-selected="true"
              >登入</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              href="#tabs-profile"
              class="nav-link block text-n6 font-bold text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6 py-5 hover:border-transparent focus:border-transparent"
              id="tabs-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#tabs-profile"
              role="tab"
              aria-controls="tabs-profile"
              aria-selected="false"
              >註冊</a
            >
          </li>
        </ul>
      </div>
      <div class="border-t border-n2 px-4 py-10 xl:px-[60px]">
        <!-- tab content -->
        <div class="tab-content" id="tabs-tabContent">
          <!-- 登入頁 -->
          <div
            class="tab-pane fade show active"
            id="tabs-home"
            role="tabpanel"
            aria-labelledby="tabs-home-tab"
          >
            <div class="flex justify-center pb-10 space-x-4">
              <div class="bg-p2 rounded flex justify-center items-center w-16 h-16">
                <p class="font-bold text-3xl text-p1">f</p>
              </div>
              <div class="bg-p2 rounded flex justify-center items-center w-16 h-16">
                <p class="font-bold text-3xl text-p1">G</p>
              </div>
            </div>
            <div
              class="flex justify-center mb-10 relative before:block before:absolute before:top-1/2 before:w-full before:bg-n3 before:h-px"
            >
              <p class="inline-block px-4 bg-n1 text-sm text-n5 relative z-10">
                或使用電子信箱登入
              </p>
            </div>
            <VForm v-slot="{ errors }">
              <div class="form-group mb-6 relative">
                <VField
                  type="email"
                  name="登入帳號"
                  :class="{ 'is-invalid': errors['登入帳號'] }"
                  class="form-control block w-full pl-9 pr-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="loginEmail"
                  rules="email|required"
                  placeholder="請輸入您的電子信箱"
                />
                <ErrorMessage name="登入帳號" class="invalid-feedback" />
                <img class="absolute top-1.5 left-1.5" src="../assets/Icon/email.png" alt="email" />
              </div>
              <div class="form-group mb-6 relative">
                <VField
                  type="password"
                  name="密碼"
                  :class="{ 'is-invalid': errors['密碼'] }"
                  class="form-control block w-full pl-9 pr-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="loginPassword"
                  rules="required"
                  placeholder="請輸入您的密碼"
                />
                <ErrorMessage name="密碼" class="invalid-feedback" />
                <img
                  class="absolute top-1.5 left-1.5"
                  src="../assets/Icon/password.png"
                  alt="password"
                />
                <img
                  class="absolute top-1.5 right-2"
                  src="../assets/Icon/eye-close.png"
                  alt="eye-close"
                />
              </div>
              <button
                :disabled="false"
                type="submit"
                class="disabled:bg-n2 disabled:text-n5 w-full px-6 py-2.5 mb-9 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="login"
              >
                登入
              </button>
              <p class="text-center text-sm">
                還沒有帳號? 以<router-link class="text-p1 text-sm font-bold" to="/"
                  >訪客身分</router-link
                >體驗，或是註冊會員
              </p>
            </VForm>
          </div>
          <!-- 註冊頁 -->
          <div
            class="tab-pane fade"
            id="tabs-profile"
            role="tabpanel"
            aria-labelledby="tabs-profile-tab"
          >
            <VForm v-slot="{ errors }">
              <div class="form-group mb-6 relative">
                <VField
                  type="text"
                  name="名稱"
                  :class="{ 'is-invalid': errors['名稱'] }"
                  rules="required"
                  class="form-control block w-full pl-9 pr-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="signUpName"
                  placeholder="請輸入您的暱稱、稱謂"
                />
                <i class="fa-regular fa-user absolute top-2.5 left-2.5"></i>
                <ErrorMessage name="名稱" class="invalid-feedback" />
              </div>
              <div class="form-group mb-6 relative">
                <VField
                  type="email"
                  name="信箱"
                  :class="{ 'is-invalid': errors['信箱'] }"
                  rules="required|email"
                  class="form-control block w-full pl-9 pr-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="signUpEmail"
                  placeholder="請輸入您的電子信箱"
                />
                <ErrorMessage name="信箱" class="invalid-feedback" />
                <img class="absolute top-1.5 left-1.5" src="../assets/Icon/email.png" alt="email" />
              </div>
              <div class="form-group mb-6 relative">
                <VField
                  type="password"
                  name="設定密碼"
                  :class="{ 'is-invalid': errors['設定密碼'] }"
                  class="form-control block w-full pl-9 pr-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  rules="required"
                  id="signUpPassword"
                  placeholder="請輸入您的密碼"
                />
                <ErrorMessage name="設定密碼" class="invalid-feedback" />
                <img
                  class="absolute top-1.5 left-1.5"
                  src="../assets/Icon/password.png"
                  alt="password"
                />
                <img
                  class="absolute top-1.5 right-2"
                  src="../assets/Icon/eye-close.png"
                  alt="eye-close"
                />
              </div>
              <div class="form-group mb-6 relative">
                <VField
                  name="確認密碼"
                  :class="{ 'is-invalid': errors['確認密碼'] }"
                  rules="required"
                  type="password"
                  class="form-control block w-full pl-9 pr-3 py-1.5 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="signUpConfirmPassword"
                  placeholder="請重新輸入您的密碼"
                />
                <ErrorMessage name="確認密碼" class="invalid-feedback" />
                <img
                  class="absolute top-1.5 left-1.5"
                  src="../assets/Icon/password.png"
                  alt="password"
                />
                <img
                  class="absolute top-1.5 right-2"
                  src="../assets/Icon/eye-close.png"
                  alt="eye-close"
                />
              </div>

              <button
                :disabled="false"
                type="submit"
                class="disabled:bg-n2 disabled:text-n5 w-full px-6 py-2.5 mb-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="login"
              >
                註冊
              </button>
              <button
                disabled
                type="submit"
                class="disabled:bg-n1 disabled:border-n5 disabled:text-n5 w-full px-6 py-2.5 mb-2 text-p1 border-p1 border font-medium text-xs leading-tight uppercase rounded hover:text-n1 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="login"
              >
                使用 facebook 註冊
              </button>
              <button
                disabled
                type="submit"
                class="disabled:bg-n1 disabled:border-n5 disabled:text-n5 w-full px-6 py-2.5 mb-9 text-p1 border-p1 border font-medium text-xs leading-tight uppercase rounded hover:text-n1 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 transition duration-150 ease-in-out"
                @click.prevent="login"
              >
                使用 google 註冊
              </button>

              <p class="text-center text-sm">
                已經有帳號? 轉往<router-link class="text-p1 text-sm font-bold" to="/login"
                  >登入頁</router-link
                >
              </p>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
