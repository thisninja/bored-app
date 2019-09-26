import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(App, {});
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
