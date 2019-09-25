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
    activitiesList: [],
  },
  getters: {
    activity: state => state.activity,
    activitiesList: state => state.activitiesList,
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
    SAVE_ACTIVITY_TO_LIST(state, payload) {
      state.activitiesList.push(payload);
    },
  },
  actions: {
    async fetchRandomActivity({ commit }) {
      const { data } = await Vue.prototype.$http.get('http://www.boredapi.com/api/activity/');

      commit('SET_ACTIVITY', data.activity);
    },
  },
});
