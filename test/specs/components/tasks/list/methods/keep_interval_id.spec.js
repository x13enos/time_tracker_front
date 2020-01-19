import createWrapper from '@/test/support/create_wrapper.js'
import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon'

const $api = { allTimeRecords: () => { return { data: [] } } }
const params = { description: "text" }
const propsData = {
  day: DateTime.local(2019, 10, 27),
  currentDate: DateTime.local(2019, 10, 27)
}

it('should keep passed id', () => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = createWrapper(tasksList, { propsData, mocks: { $api, $appMethods } }, fakeStoreData())

  wrapper.vm.keepIntervalId(11)
  expect(wrapper.vm.intervalId).to.eq(11)
})
