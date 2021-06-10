import createWrapper from '@/test/support/create_wrapper.js'
import tasksList from '@/components/tasks/list';
import { DateTime } from 'luxon';

describe("activeDay", () => {
  const $api = { allTimeRecords: () => { return { data: [] } } }

  it('should return true if currentDate is equal to day', () => {
    const storeDate = fakeStoreData();
    storeDate.state.selectedDate = DateTime.local(2019, 10, 27);
    storeDate.state.currentDate = DateTime.local(2019, 10, 27);

    const wrapper = createWrapper(tasksList, { mocks: { $api } }, storeDate)
    expect(wrapper.vm.activeDay).to.be.true
  })

  it('should return false if currentDate is not equal to day', () => {
    const storeDate = fakeStoreData();
    storeDate.state.selectedDate = DateTime.local(2019, 10, 27);
    storeDate.state.currentDate = DateTime.local(2019, 10, 28);

    const wrapper = createWrapper(tasksList, { mocks: { $api } }, storeDate)
    expect(wrapper.vm.activeDay).to.be.false
  })
})
