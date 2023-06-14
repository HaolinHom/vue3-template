import router from '@/router';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

dayjs.locale('zh-ch');

const app = createApp(App);

app.use(router).use(createPinia()).mount('#root');
