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

test('it should set 6 as the value for tab', t => {
  const wrapper = shallowMount(bar, { store, localVue })
  wrapper.vm.selectedDate = DateTime.local(2019, 11, 3)

  wrapper.vm.setTheRightTab()
  t.is(wrapper.vm.tab, 6)
});

test('it should set 4 as the value for tab', t => {
  const wrapper = shallowMount(bar, { store, localVue })
  wrapper.vm.selectedDate = DateTime.local(2019, 11, 1)

  wrapper.vm.setTheRightTab()
  t.is(wrapper.vm.tab, 4)
});
