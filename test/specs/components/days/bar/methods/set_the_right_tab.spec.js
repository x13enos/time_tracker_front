import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import bar from '@/components/days/bar'

const localVue = createLocalVue()
localVue.use(Vuetify)


test('it should set 6 as the value for tab', t => {
  const wrapper = shallowMount(bar, { localVue })
  wrapper.vm.selectedDate = new Date('Sun Nov 03 2019 00:00:00 GMT+0000')

  wrapper.vm.setTheRightTab()
  t.is(wrapper.vm.tab, 6)
});

test('it should set 4 as the value for tab', t => {
  const wrapper = shallowMount(bar, { localVue })
  wrapper.vm.selectedDate = new Date('Sun Nov 01 2019 00:00:00 GMT+0000')

  wrapper.vm.setTheRightTab()
  t.is(wrapper.vm.tab, 4)
});
