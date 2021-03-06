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
  Select,
  Slider,
  Notification,
} from 'element-ui';

import axios from 'axios';

import App from './App.vue';
import store from './store/store';

[Button, Table, TableColumn, Input, InputNumber, Option, Tabs, TabPane, Select, Slider]
  .forEach(el => Vue.use(el));

Vue.prototype.$notify = Notification;

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
