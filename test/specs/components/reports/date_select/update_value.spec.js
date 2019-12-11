import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava'
import dateSelect from '@/components/reports/date_select'

const localVue = createLocalVue()
localVue.use(Vuetify)


test('it should emit updated value', async t => {
  const wrapper = shallowMount(dateSelect, { localVue })

  await wrapper.vm.updateValue('2019-11-12')
  t.deepEqual(wrapper.emitted('input')[0], ['2019-11-12'])
});

test('it should change value of dateMenu for closing datepicker', async t => {
  const wrapper = shallowMount(dateSelect, { localVue })
  wrapper.vm.dateMenu = true
  await wrapper.vm.updateValue('2019-11-12')
  t.false(wrapper.vm.dateMenu)
});
