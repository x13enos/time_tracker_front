import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should return formatted range of week', t => {
  const wrapper = shallowMount(bar, { localVue })
  wrapper.vm.currentDate = date
  t.is(wrapper.vm.currentWeek, '21 October - 27 October')
});
