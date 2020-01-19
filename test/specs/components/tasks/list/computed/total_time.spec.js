import createWrapper from '@/test/support/create_wrapper.js'
import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon';

const $api = { allTimeRecords: () => { return { data: [] } } }
const propsData = {
  day: DateTime.local(2019, 10, 27),
  currentDate: DateTime.local(2019, 10, 27)
}

it('should return total time from received tasks', () => {
  const store = fakeStoreData()
  store.state.tasks = [{ spentTime: 0.5 }, { spentTime: 1.25 }, { spentTime: 0.0 }]
  const wrapper = createWrapper(tasksList, { propsData, mocks: { $api } }, store)

  expect(wrapper.vm.totalTime).to.eq(1.75);
})
