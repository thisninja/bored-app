import Vuex from 'vuex';
import ElementUI from 'element-ui';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Activity from '@/views/Activity.vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(ElementUI);

describe('Activity.vue', () => {
  let wrapper;
  let store;
  let actions;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = {
      activity: () => '',
      participants: () => null,
      type: () => '',
      budget: () => null,
    };

    actions = {
      fetchActivity: jest.fn(),
    };

    mutations = {
      SET_BUDGET: jest.fn(),
      SET_TYPE: jest.fn(),
      SET_ACTIVITY: jest.fn(),
      SET_PARTICIPANTS: jest.fn(),
      SAVE_ACTIVITY_TO_LIST: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
      mutations,
    });

    wrapper = shallowMount(Activity, {
      store,
      localVue,
    });
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('computed', () => {
    it('currentBudget', () => {
      expect(wrapper.vm.currentBudget).toEqual(getters.budget());
      const newBudget = 0.5;
      wrapper.vm.currentBudget = newBudget;
      expect(mutations.SET_BUDGET).toHaveBeenCalledWith({}, newBudget);
    });

    it('currentActivity', () => {
      expect(wrapper.vm.currentActivity).toEqual(getters.activity());
      const newActivity = 'some activity';
      wrapper.vm.currentActivity = newActivity;
      expect(mutations.SET_ACTIVITY).toHaveBeenCalledWith({}, newActivity);
    });

    it('currentType', () => {
      expect(wrapper.vm.currentType).toEqual(getters.type());
      const newType = 'educational';
      wrapper.vm.currentType = newType;
      expect(mutations.SET_TYPE).toHaveBeenCalledWith({}, newType);
    });

    it('currentParticipants', () => {
      expect(wrapper.vm.currentParticipants).toEqual(getters.participants());
      const newParticipants = 5;
      wrapper.vm.currentParticipants = newParticipants;
      expect(mutations.SET_PARTICIPANTS).toHaveBeenCalledWith({}, newParticipants);
    });
  });

  describe('methods', () => {
    describe('handleHitMeButton', () => {
      it('should be called directly', () => {
        wrapper.vm.handleHitMeButton();
        expect(actions.fetchActivity).toHaveBeenCalled();
      });
    });

    it('handleSaveActivity', () => {
      wrapper.vm.handleSaveActivity();

      const { uid } = mutations.SAVE_ACTIVITY_TO_LIST.mock.calls[0][1];

      expect(mutations.SAVE_ACTIVITY_TO_LIST).toHaveBeenCalledWith({}, {
        uid,
        name: wrapper.vm.currentActivity,
        participants: wrapper.vm.currentParticipants,
        budget: wrapper.vm.currentBudget,
      });

      expect(mutations.SET_ACTIVITY).toHaveBeenCalledWith({}, '');
    });
  });
});
