import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import bar from '@/components/days/bar';
import { DateTime } from 'luxon';

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const date = DateTime.local(2019, 10, 24);
const store = new Vuex.Store(fakeStoreData);

test('it should return 7 days of week', t => {
  const wrapper = shallowMount(bar, { store, localVue })

  const days = wrapper.vm.weekDays(date)
  t.deepEqual(days, [
    DateTime.local(2019, 10, 21),
    DateTime.local(2019, 10, 22),
    DateTime.local(2019, 10, 23),
    DateTime.local(2019, 10, 24),
    DateTime.local(2019, 10, 25),
    DateTime.local(2019, 10, 26),
    DateTime.local(2019, 10, 27)
  ])

});
