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

test('it should assign data to passed task', t => {
  const wrapper = shallowMount(tasks, { localVue, methods })
  const task = { data: 11, text: "text" }
  const newData = { data: 22, id: 33 }
  wrapper.vm.updateTaskData(newData, task)
  t.deepEqual(task, { data: 22, text: "text", id: 33})
})
