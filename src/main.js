import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'tw-elements';
import router from './router';

const pinia = createPinia();
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
app.use(router);
app.use(pinia);
app.mount('#app');
