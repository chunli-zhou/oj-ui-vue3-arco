import { createApp } from 'vue';
import '@/assets/style/global.less';
import '@/assets/style/tailwind.css';
import '@arco-design/web-vue/dist/arco.css';
import 'md-editor-v3/lib/style.css';

import App from './App.vue';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import i18n from './locale';
import directive from './directive';
import '@/api/interceptor';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/es/message/style/index.less';
import '@arco-design/web-vue/es/notification/style/index.less';
import '@arco-design/web-vue/es/modal/style/index.less';
import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.use(ArcoVueIcon);
app.use(globalComponents);
app.use(directive);
app.use(ElementPlus);
app.mount('#app');
