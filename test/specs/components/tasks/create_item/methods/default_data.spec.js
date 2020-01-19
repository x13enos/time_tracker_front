import createWrapper from '@/test/support/create_wrapper.js'
import task from '@/components/tasks/create_item'
import { DateTime } from 'luxon'

const propsData = {
  day: DateTime.local(),
  activeDay: false
}
const $appMethods = { isEmpty: () => {} }

it('should return default data', () => {
  const wrapper = createWrapper(task, { propsData, mocks: { $appMethods } }, fakeStoreData())
  expect(wrapper.vm.defaultData()).to.eql({
    rowClass: "",
    btnStartFocused: false,
    description: null,
    spentTime: null,
    project: null
  })
});
