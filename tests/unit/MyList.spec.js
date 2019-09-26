import Vuex from 'vuex';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import MyList from '@/views/MyList.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(ElementUI);

describe('MyList.vue', () => {
  const selected = [
    {
      budget: 0,
      name: 'Go for a run dsfsdf',
      participants: 1,
      uid: '38_1569454262161',
    },
  ];

  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = {
      activitiesList: () => [],
    };

    mutations = {
      CLEAR_ACTIVITIES: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
      mutations,
    });

    wrapper = shallowMount(MyList, {
      store,
      localVue,
    });
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('computed', () => {
    it('activeButtonText', () => {
      expect(wrapper.vm.activeButtonText).toEqual(wrapper.vm.CLEAR_ALL_TEXT);
      wrapper.vm.selected = selected;
      expect(wrapper.vm.activeButtonText).toEqual(wrapper.vm.CLEAR_SELECTED_TEXT);
    });
  });

  describe('methods', () => {
    it('handleSelectionChange', () => {
      wrapper.vm.handleSelectionChange(selected);
      expect(wrapper.vm.selected).toEqual(selected);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
