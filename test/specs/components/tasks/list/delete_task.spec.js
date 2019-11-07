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
  allTimeRecords: () => { return { data: [task] } },
  deleteTimeRecord: () => { return {
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
  timeStart: null,
  project: { id: 111 }
}

const propsData = {
  day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
  currentDate: new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
}

test('it should call api for deleting record', t => {
  const apiSpy = sinon.spy($api, "deleteTimeRecord")
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api, $appMethods }, propsData })
  wrapper.vm.deleteTask(task, 0)
  t.true(apiSpy.calledOnce)
  t.deepEqual(apiSpy.args[0], [{ id: task.id }])
  apiSpy.restore()
})

test('it should delete task from list', async t => {
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api, $appMethods }, propsData })
  wrapper.vm.tasks = [task]
  await wrapper.vm.deleteTask(task, 0)
  t.deepEqual(wrapper.vm.tasks, [])
})
