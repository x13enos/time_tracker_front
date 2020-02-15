import createWrapper from '@/test/support/create_wrapper.js'
import tasksList from '@/components/tasks/list';
import { DateTime } from 'luxon';

describe("activeDay", () => {
  const $api = { allTimeRecords: () => { return { data: [] } } }

  it('should return true if currentDate is equal to day', () => {
    const propsData = {
      day: DateTime.local(2019, 10, 27),
      currentDate: DateTime.local(2019, 10, 27)
    }

    const wrapper = createWrapper(tasksList, { propsData, mocks: { $api } }, fakeStoreData())
    expect(wrapper.vm.activeDay).to.be.true
  })

  it('should return false if currentDate is not equal to day', () => {
    const propsData = {
      day: DateTime.local(2019, 10, 27),
      currentDate: DateTime.local(2019, 10, 28)
    }

    const wrapper = createWrapper(tasksList, { propsData, mocks: { $api } }, fakeStoreData())
    expect(wrapper.vm.activeDay).to.be.false
  })
})
