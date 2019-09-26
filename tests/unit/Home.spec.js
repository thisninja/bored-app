import Vuex from 'vuex';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '@/views/Home.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(ElementUI);

describe('Home.vue', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = {
      activity: () => '',
      responseError: () => null,
    };

    actions = {
      fetchActivity: jest.fn(),
    };

    mutations = {
      CLEAR_RESPONSE_ERROR: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
      mutations,
    });

    wrapper = shallowMount(Home, {
      store,
      localVue,
    });
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('watchers', () => {
    it('responseError', () => {
      wrapper.vm.$notify.error = jest.fn();

      wrapper.vm.$options.watch.responseError.call(wrapper.vm, 'some error');
      expect(wrapper.vm.$notify.error).toHaveBeenCalledWith({
        message: wrapper.vm.responseError,
        title: 'Error',
      });
    });
  });

  describe('hooks', () => {
    it('handleHitMeButton', () => {
      expect(actions.fetchActivity).toHaveBeenCalled();
    });
  });
});
