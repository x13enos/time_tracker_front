import createWrapper from '@/test/support/create_wrapper.js'
import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon'

describe('clearIntervalId', () => {
  const $api = { allTimeRecords: () => { return { data: [] } } }
  const params = { description: "text" }
  const propsData = {
    day: DateTime.local(2019, 10, 27),
    currentDate: DateTime.local(2019, 10, 27)
  }

  it('should clear interval id', () => {
    const wrapper = createWrapper(tasksList, { propsData, mocks: { $api } }, fakeStoreData())
    const timer = sinon.useFakeTimers()
    const clearIntervalSpy = sinon.spy(timer, "clearInterval")
    wrapper.vm.intervalId = timer.setInterval(() => {}, 1000)

    wrapper.vm.clearIntervalId()
    expect(clearIntervalSpy.calledOnceWith(wrapper.vm.intervalId)).to.be.true

    sinon.restore()
  })

});
