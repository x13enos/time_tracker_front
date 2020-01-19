import createWrapper from '@/test/support/create_wrapper.js'
import dateSelect from '@/components/reports/date_select'

it('should emit updated value', async () => {
  const wrapper = createWrapper(dateSelect, {}, fakeStoreData())

  await wrapper.vm.updateValue('2019-11-12')
  expect(wrapper.emitted('input')[0]).to.eql(['2019-11-12'])
});

it('should change value of dateMenu for closing datepicker', async () => {
  const wrapper = createWrapper(dateSelect, {}, fakeStoreData())
  wrapper.vm.dateMenu = true
  await wrapper.vm.updateValue('2019-11-12')
  expect(wrapper.vm.dateMenu).to.be.false
});
