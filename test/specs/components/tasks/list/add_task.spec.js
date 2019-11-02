import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $appMethods = { isEmpty: (value) => { return true } }
const $api = {
  allTimeRecords: () => { return { data: [] } },
  createTimeRecord: () => { return {
    data: {
      "timeRecord": {
        id: 11,
        timeStart: 'now'
      }
    }
  } }
}

const params = { description: "text" }
const props = { day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000') }

test('it should call api for creating record', t => {
  const apiSpy = sinon.spy($api, "createTimeRecord")
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  wrapper.vm.addTask(params)
  t.true(apiSpy.calledOnce)
  t.deepEqual(apiSpy.args[0], [{ description: "text", assignedDate: 1572134400 }])
  apiSpy.restore()
})

test('it should add new task to array', async t => {
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  await wrapper.vm.addTask(params)
  t.deepEqual(wrapper.vm.tasks[0], {
    assignedDate: 1572134400,
    id: 11,
    description: "text",
    timeStart: "now"
  })
})

test('it should call method for stopping other active tasks', async t => {
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData: props })
  const methodStub = sinon.stub(wrapper.vm, 'stopOtherTasks')
  await wrapper.vm.addTask(params)

  t.true(methodStub.calledOnce)
  t.deepEqual(methodStub.args[0], [{
    "timeRecord": {
      id: 11,
      timeStart: 'now'
    }
  }])

  methodStub.restore()
})
