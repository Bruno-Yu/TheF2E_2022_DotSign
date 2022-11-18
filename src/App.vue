<!-- eslint-disable max-len -->
<template>
  <div class="w-full">
    <RouterView />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    color: #191a1b;
    min-height: 100vh;
    font-size: 16px;
  }
  /* * {
    outline: 1px solid black;
  } */
  .nav-tabs.nav-link {
    @apply text-n6;
  }
  @layer utilities {
    .collapse.show {
      display: block;
      visibility: visible;
    }
  }
}
</style>
