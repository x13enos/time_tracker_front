import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const methods = {
  fetchProjects: () => {},
  fetchTasks: () => {}
}

const $appMethods = { isEmpty: (value) => { return true } }
const $api = {
  allTimeRecords: () => { return { data: [] } },
  updateTimeRecord: () => { return {
    data: {
      "timeRecord": {
        id: 11,
        timeStart: 'now'
      }
    }
  } }
}

const task = {
  id: 11,
  description: "old text",
  timeStart: null
}

const params = { description: "new text" }
const propsData = {
  day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
  currentDate: new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
}

test('it should call api for updating record', t => {
  const apiSpy = sinon.spy($api, "updateTimeRecord")
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api, $appMethods }, propsData })
  wrapper.vm.updateTask(params, task)
  t.true(apiSpy.calledOnce)
  t.deepEqual(apiSpy.args[0], [{ description: "new text" }])
  apiSpy.restore()
})

test('it should update passed task', async t => {
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api, $appMethods }, propsData })
  await wrapper.vm.updateTask(params, task, 0)
  t.deepEqual(wrapper.vm.tasks[0], {
    id: 11,
    timeStart: 'now'
  })
})

test('it should call method for stopping other active tasks', async t => {
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api, $appMethods }, propsData })
  const methodStub = sinon.stub(wrapper.vm, 'stopOtherTasks')
  await wrapper.vm.updateTask(params, task)

  t.true(methodStub.calledOnce)
  t.deepEqual(methodStub.args[0], [{
    "timeRecord": {
      id: 11,
      timeStart: 'now'
    }
  }])

  methodStub.restore()
})
