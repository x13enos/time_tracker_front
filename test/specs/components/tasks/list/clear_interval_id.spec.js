import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }

const params = { description: "text" }
const props = { day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000') }

test('it should clear interval id', t => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  const timer = sinon.useFakeTimers()
  const clearIntervalSpy = sinon.spy(timer, "clearInterval")

  wrapper.vm.intervalId = timer.setInterval(() => {}, 1000)

  wrapper.vm.clearIntervalId()

  t.true(clearIntervalSpy.calledOnce)
  t.deepEqual(clearIntervalSpy.args[0], [wrapper.vm.intervalId])

  timer.restore()
  clearIntervalSpy.restore()
})
