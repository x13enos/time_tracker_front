import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import bar from '@/components/days/bar'
import { DateTime } from 'luxon';

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const date = DateTime.local(2019, 10, 27);

test('it should set the new current date', t => {
  const wrapper = shallowMount(bar, { store, localVue })
  wrapper.vm.selectedDate = date
  wrapper.vm.changeDay(-7)
  t.deepEqual(wrapper.vm.selectedDate, DateTime.local(2019, 10, 20))
});

test('it should call method for cleaning tab', t => {
  const wrapper = shallowMount(bar, { store, localVue })
  wrapper.vm.changeDay(-7)
  t.is(wrapper.vm.tab, null)
});
