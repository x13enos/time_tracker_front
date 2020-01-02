import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }

const params = { description: "text" }
const propsData = {
  day: DateTime.local(2019, 10, 27),
  currentDate: DateTime.local(2019, 10, 27)
}

test('it should clear interval id', t => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData })
  const timer = sinon.useFakeTimers()
  const clearIntervalSpy = sinon.spy(timer, "clearInterval")

  wrapper.vm.intervalId = timer.setInterval(() => {}, 1000)

  wrapper.vm.clearIntervalId()

  t.true(clearIntervalSpy.calledOnce)
  t.deepEqual(clearIntervalSpy.args[0], [wrapper.vm.intervalId])

  timer.restore()
  clearIntervalSpy.restore()
})
