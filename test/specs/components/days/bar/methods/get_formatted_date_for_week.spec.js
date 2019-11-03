import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should return a date in the right format', t => {
  const wrapper = shallowMount(bar, { localVue })

  t.is(wrapper.vm.getFormattedDateForWeek(date), "27 October")
});
