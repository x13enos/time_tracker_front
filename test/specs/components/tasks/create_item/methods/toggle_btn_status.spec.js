import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const propsData = {
  day: DateTime.local(),
  activeDay: false
}
const $appMethods = { isEmpty: () => {} }

it('should set the opposite status for start button', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  wrapper.vm.btnStartFocused = false
  wrapper.vm.toggleBtnStatus()
  expect(wrapper.vm.btnStartFocused).to.be.true
});
