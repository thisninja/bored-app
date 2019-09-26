import Vue from 'vue';

import {
  API_URL,
} from '../constants';

import helper from '../helpers/helper';

export default {
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
        price: helper.convertFromNaturalToFloat(getters.budget),
      });
    }

    const { data } = await Vue.prototype.$http.get(API_URL, { params });

    if (data && data.error) {
      commit('SET_RESPONSE_ERROR', data.error);
      params = {};
    }

    commit('SET_ACTIVITY', data.activity);
    commit('SET_BUDGET', helper.convertFromFloatToNatural(data.price));
    commit('SET_PARTICIPANTS', data.participants);
    commit('SET_TYPE', data.type);
  },
};
