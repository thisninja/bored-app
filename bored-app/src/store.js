import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import {
  ACTIVITY, MY_LIST,
} from './constants';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    activeTab: ACTIVITY,
    activity: '',
    activitiesList: [],
    type: '',
    participants: null,
    budget: null,
  },
  getters: {
    activity: state => state.activity,
    activitiesList: state => state.activitiesList,
    type: state => state.type,
    participants: state => state.participants,
    budget: state => state.budget,
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
    SET_BUDGET(state, payload) {
      console.log('budget payload: ', payload);
      state.budget = payload;
    },
    SET_PARTICIPANTS(state, payload) {
      state.participants = payload;
    },
    SET_TYPE(state, payload) {
      state.type = payload;
    },
  },
  actions: {
    async fetchActivity({ getters, commit }) {
      let params = {};

      if (getters.type) {
        params = Object.assign(params, {
          type: getters.type,
        });
      }

      if (getters.participants) {
        params = Object.assign(params, {
          participants: getters.participants,
        });
      }

      if (!Number.isNaN(getters.budget)) {
        params = Object.assign(params, {
          price: Boolean(getters.budget),
        });
      }

      const { data } = await Vue.prototype.$http.get('http://www.boredapi.com/api/activity/', params);

      commit('SET_ACTIVITY', data.activity);
      commit('SET_BUDGET', Math.round(data.price * 100));
      commit('SET_PARTICIPANTS', data.participants);
      commit('SET_TYPE', data.type);
    },
  },
});
