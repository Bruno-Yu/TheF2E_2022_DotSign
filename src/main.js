import { createApp } from 'vue';
import mitt from 'mitt';
import { createPinia } from 'pinia';
// vee-validate
// eslint-disable-next-line object-curly-newline
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import 'tw-elements';
import router from './router';

defineRule('required', required);
defineRule('email', email);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');

const pinia = createPinia();
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.$emitter = emitter;

app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

app.use(router);
app.use(pinia);
app.mount('#app');
