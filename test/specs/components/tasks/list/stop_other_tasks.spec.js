import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }

const params = { description: "text" }
const props = { day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000') }

test('it should launch method for clearing interval id', t => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  const clearIntervalStub = sinon.spy(wrapper.vm, 'clearIntervalId')

  wrapper.vm.stopOtherTasks({ timeRecord: {} })
  t.true(clearIntervalStub.calledOnce)

  clearIntervalStub.restore();
})

test('it should drop time start for all tasks', async t => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  wrapper.vm.tasks = [{ timeStart: "now" }]

  wrapper.vm.stopOtherTasks({ timeRecord: {} })
  t.is(wrapper.vm.tasks[0].timeStart, null)
})

test('it should not launch method for clearing interval id if timeStart is empty', t => {
  const $appMethods = { isEmpty: (value) => { return true } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  const clearIntervalStub = sinon.spy(wrapper.vm, 'clearIntervalId')

  wrapper.vm.stopOtherTasks({ timeRecord: {} })
  t.false(clearIntervalStub.calledOnce)

  clearIntervalStub.restore();
})

test('it should not drop time start for all tasks if timeStart is empty', async t => {
  const $appMethods = { isEmpty: (value) => { return true } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  wrapper.vm.tasks = [{ timeStart: "now" }]

  wrapper.vm.stopOtherTasks({ timeRecord: {} })
  t.is(wrapper.vm.tasks[0].timeStart, 'now')
})
