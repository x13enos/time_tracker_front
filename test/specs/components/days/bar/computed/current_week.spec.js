import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import bar from '@components/days/bar'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const date = DateTime.local(2019, 10, 27);

it('should return formatted range of week', () => {
  const wrapper = shallowMount(bar, { store, localVue })
  wrapper.vm.selectedDate = date
  expect(wrapper.vm.currentWeek).eq('October 21 - October 27');
});
