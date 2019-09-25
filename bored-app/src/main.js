import Vue from 'vue';

import {
  Button,
  Table,
  TableColumn,
  Input,
  InputNumber,
  Option,
  Tabs,
  TabPane,
  Switch,
  Select,
} from 'element-ui';

import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

[Button, Table, TableColumn, Input, InputNumber, Option, Tabs, TabPane, Switch, Select]
  .forEach(el => Vue.use(el));

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
