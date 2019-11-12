import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)

const date = new Date('Sun Oct 27 2019 00:00:00 GMT+0000');

test('it should set the new current date', t => {
  const wrapper = shallowMount(bar, { localVue })
  wrapper.vm.selectedDate = date
  wrapper.vm.changeDay(-7)
  t.deepEqual(wrapper.vm.selectedDate, new Date('Sun Oct 20 2019 00:00:00 GMT+0000'))
});

test('it should call method for cleaning tab', t => {
  const wrapper = shallowMount(bar, { localVue })
  wrapper.vm.changeDay(-7)
  t.is(wrapper.vm.tab, null)
});
