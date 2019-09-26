import Vue from 'vue';
import state from '../../../src/store/state';
import getters from '../../../src/store/getters';
import actions from '../../../src/store/actions';
import mutations from '../../../src/store/mutations';
import { ACTIVITY } from '../../../src/constants';
import dataMock from '../__mocks__/data';

import {
  API_URL,
} from '../../../src/constants';

const originalState = { ...state };

describe('mutations', () => {
  afterEach(() => {
    Object.keys(state).forEach((key) => {
      const formattedKey = `SET_${key
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase()}`;

      if (mutations[formattedKey]) {
        mutations[formattedKey](state, originalState[key]);
      }
    });

    jest.clearAllMocks();
  });

  describe('SET_ACTIVE_TAB', () => {
    let value;

    beforeEach(() => {
      console.error = jest.fn();
    });

    it('SET_ACTIVE_TAB with valid value', () => {
      value = ACTIVITY;
      mutations.SET_ACTIVE_TAB(state, value);
      expect(console.error).not.toHaveBeenCalled();
      expect(state.activeTab).toEqual(value);
    });

    it('SET_ACTIVE_TAB with invalid value', () => {
      value = 'foo';
      mutations.SET_ACTIVE_TAB(state, value);
      expect(console.error).toHaveBeenCalled();
      expect(state.activeTab).toEqual(value);
      console.error.mockClear();
    });
  });

  it('SET_ACTIVITY', () => {
    const value = 'some activity';
    mutations.SET_ACTIVITY(state, value);
    expect(state.activity).toEqual(value);
  });

  it('SAVE_ACTIVITY_TO_LIST', () => {
    mutations.SAVE_ACTIVITY_TO_LIST(state, dataMock.activity);
    expect(state.activitiesList).toEqual([dataMock.activity]);
  });

  it('SET_BUDGET', () => {
    mutations.SET_BUDGET(state, dataMock.activity.budget);
    expect(state.budget).toEqual(dataMock.activity.budget);
  });

  it('SET_PARTICIPANTS', () => {
    mutations.SET_PARTICIPANTS(state, dataMock.activity.participants);
    expect(state.participants).toEqual(dataMock.activity.participants);
  });

  it('SET_TYPE', () => {
    mutations.SET_TYPE(state, dataMock.activity.type);
    expect(state.type).toEqual(dataMock.activity.type);
  });

  it('SET_RESPONSE_ERROR', () => {
    mutations.SET_RESPONSE_ERROR(state, dataMock.responseError);
    expect(state.responseError).toEqual(dataMock.responseError);
  });

  it('CLEAR_RESPONSE_ERROR', () => {
    mutations.CLEAR_RESPONSE_ERROR(state);
    expect(state.responseError).toEqual(state.responseError);
  });
});

describe('actions', () => {
  describe('fetchActivity', () => {
    let commit;
    let mockedGetters = {
      type: dataMock.activity.type,
      participants: dataMock.activity.participants,
      budget: dataMock.activity.budget,
    };

    beforeEach(() => {
      commit = jest.fn();
      mutations.SET_ACTIVITY = jest.fn();
      mutations.SET_BUDGET = jest.fn();
      mutations.SET_PARTICIPANTS = jest.fn();
      mutations.SET_TYPE = jest.fn();
      Vue.prototype.$http = {
        get: jest.fn(() => Promise.resolve({
          data: dataMock.activity,
        })),
      };
    });

    it('should call Vue.prototype.$http.get with params', () => {
      Vue.prototype.$http = {
        get: jest.fn(),
      };

      const mockedGetters = {
        type: dataMock.activity.type,
        participants: dataMock.activity.participants,
        budget: dataMock.activity.budget,
      };

      actions.fetchActivity({ getters: mockedGetters, commit });
      expect(Vue.prototype.$http.get).toHaveBeenCalledWith(
        API_URL,
        {
          params: {
            type: mockedGetters.type,
            participants: mockedGetters.participants,
            price: mockedGetters.budget,
          }
        },
      );
    });

    it('should call SET_ACTIVITY mutation', () => {
      actions.fetchActivity({ getters: mockedGetters, commit });
      expect(state.activity).toEqual('');
    });

    it('should call SET_BUDGET mutation', () => {
      actions.fetchActivity({ getters: mockedGetters, commit });
      expect(state.budget).toEqual(null);
    });

    it('should call SET_PARTICIPANTS mutation', () => {
      actions.fetchActivity({ getters: mockedGetters, commit });
      expect(state.participants).toEqual(null);
    });

    it('should call SET_TYPE mutation', () => {
      actions.fetchActivity({ getters: mockedGetters, commit });
      expect(state.type).toEqual('');
    });
  });
});
