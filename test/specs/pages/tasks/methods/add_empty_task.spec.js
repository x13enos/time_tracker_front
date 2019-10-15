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

test('it should add empty task to tasks array', t => {
  const wrapper = shallowMount(tasks, { localVue, methods })
  wrapper.vm.addEmptyTask()
  t.deepEqual(wrapper.vm.tasks[0], {
    id: null,
    project: null,
    description: null,
    time: 0.0,
    active: false
  })
})
