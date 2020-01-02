import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import bar from '@/components/days/bar'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const date = DateTime.local(2019, 10, 27);
const store = new Vuex.Store(fakeStoreData);

test('it should return a date in the right format', t => {
  const wrapper = shallowMount(bar, { store, localVue })

  t.is(wrapper.vm.getFormattedDateForWeek(date), "October 27")
});
