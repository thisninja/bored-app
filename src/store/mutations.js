import {
  SET_ACTIVE_TAB,
  SET_ACTIVITY,
  CLEAR_ACTIVITIES,
  SAVE_ACTIVITY_TO_LIST,
  SET_BUDGET,
  SET_PARTICIPANTS,
  SET_TYPE,
  SET_RESPONSE_ERROR,
  CLEAR_RESPONSE_ERROR,
} from './types/mutations-types';

import {
  ACTIVITY,
  MY_LIST,
} from '../constants';

export default {
  [SET_ACTIVE_TAB](state, payload = ACTIVITY) {
    // sanity check
    if (![ACTIVITY, MY_LIST].includes(payload)) {
      console.error(`SET_ACTIVE_TAB: ${payload} doesn't match ${ACTIVITY} or ${MY_LIST}`);
    }

    state.activeTab = payload;
  },
  [SET_ACTIVITY](state, payload) {
    state.activity = payload;
  },
  [CLEAR_ACTIVITIES](state, payload = []) {
    if (!payload.length) {
      state.activitiesList = [];
    } else {
      const ids = [...new Set(payload.map(item => item.uid))];

      state.activitiesList = state.activitiesList.filter(
        activity => !ids.includes(activity.uid),
      );
    }
  },
  [SAVE_ACTIVITY_TO_LIST](state, payload) {
    state.activitiesList.push(payload);
  },
  [SET_BUDGET](state, payload) {
    state.budget = payload;
  },
  [SET_PARTICIPANTS](state, payload) {
    state.participants = payload;
  },
  [SET_TYPE](state, payload) {
    state.type = payload;
  },
  [SET_RESPONSE_ERROR](state, payload) {
    state.responseError = payload;
  },
  [CLEAR_RESPONSE_ERROR](state) {
    state.responseError = null;
  },
};
