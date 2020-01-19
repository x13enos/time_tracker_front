import createWrapper from '@/test/support/create_wrapper.js'


import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon'

const $api = { allTimeRecords: () => { return { data: [] } } }
const params = { description: "text" }
const propsData = {
  day: DateTime.local(2019, 10, 27),
  currentDate: DateTime.local(2019, 10, 27)
}

it('should clear interval id', () => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = createWrapper(tasksList, { propsData, mocks: { $api, $appMethods } }, fakeStoreData())

  const timer = sinon.useFakeTimers()
  const clearIntervalSpy = sinon.spy(timer, "clearInterval")

  wrapper.vm.intervalId = timer.setInterval(() => {}, 1000)

  wrapper.vm.clearIntervalId()

  expect(clearIntervalSpy.calledOnce).to.be.true
  expect(clearIntervalSpy.args[0]).to.eql([wrapper.vm.intervalId])

  timer.restore()
  clearIntervalSpy.restore()
})
