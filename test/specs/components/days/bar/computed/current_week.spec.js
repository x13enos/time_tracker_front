import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const date = DateTime.local(2019, 10, 27);

test('it should return formatted range of week', t => {
  const wrapper = shallowMount(bar, { store, localVue })
  wrapper.vm.selectedDate = date
  t.is(wrapper.vm.currentWeek, 'October 21 - October 27')
});
