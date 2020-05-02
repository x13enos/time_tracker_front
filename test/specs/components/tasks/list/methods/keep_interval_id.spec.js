import createWrapper from '@/test/support/create_wrapper.js'
import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon'

describe('keepIntervalId', function(){
  const $api = { allTimeRecords: () => { return { data: [] } } }
  const params = { description: "text" }
  const propsData = {
    day: DateTime.local(2019, 10, 27),
    currentDate: DateTime.local(2019, 10, 27)
  }

  it('should keep passed id', () => {
    const wrapper = createWrapper(tasksList, { propsData, mocks: { $api } }, fakeStoreData())

    wrapper.vm.keepIntervalId(11)
    expect(wrapper.vm.intervalId).to.eq(11)
  })

});
