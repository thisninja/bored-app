import Vue from 'vue';

import {
  Input,
  Tabs,
  TabPane,
} from 'element-ui';

import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

[Input, Tabs, TabPane].forEach(el => Vue.use(el));

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
