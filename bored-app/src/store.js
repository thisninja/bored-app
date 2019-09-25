import Vue from 'vue';
import Vuex from 'vuex';
import {
  ACTIVITY, MY_LIST,
} from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeTab: ACTIVITY,
    activity: '',
  },
  getters: {
    activity: state => state.activity,
  },
  mutations: {
    SET_ACTIVE_TAB(state, payload = ACTIVITY) {
      // sanity check
      if (![ACTIVITY, MY_LIST].includes(payload)) {
        console.error(`SET_ACTIVE_TAB: ${payload} doesn't match ${ACTIVITY} or ${MY_LIST}`);
      }

      state.activeTab = payload;
    },
    SET_ACTIVITY(state, payload) {
      state.activity = payload;
    },
  },
  actions: {
    async fetchRandomActivity({ commit }) {
      const { data } = await Vue.prototype.$http.get('http://www.boredapi.com/api/activity/');

      commit('SET_ACTIVITY', data.activity);
    },
  },
});
