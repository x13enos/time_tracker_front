import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuetify)

const methods = {
  fetchProjects: () => {},
  fetchTasks: () => {}
}

const tasksData = [{
  id: 111,
  description: "text",
  spentTime: 0.5,
  timeStart: "today",
  project: { id: 222 }
}]

test('it should add handled data to the tasks array', async t => {
  const wrapper = shallowMount(tasks, { localVue, methods })
  const addEmptyTaskStub = sinon.stub(wrapper.vm, "addEmptyTask")

  await wrapper.vm.handleTasksData(tasksData)
  t.deepEqual(wrapper.vm.tasks, [{
    id: 111,
    project: 222,
    description: "text",
    time: 0.5,
    active: true
  }])

  addEmptyTaskStub.restore()
})

test('it should call methods for adding empty task', async t => {
  const wrapper = shallowMount(tasks, { localVue, methods })
  const addEmptyTaskStub = sinon.stub(wrapper.vm, "addEmptyTask")

  await wrapper.vm.handleTasksData(tasksData)
  t.true(addEmptyTaskStub.calledOnce)

  addEmptyTaskStub.restore()
})
