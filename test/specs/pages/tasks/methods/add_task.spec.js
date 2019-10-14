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

const $api = {
  createTimeRecord: () => { return { data: { "timeRecord": { id: 11 } } } }
}

const params = { description: "text" }

test('it should call api for creating record', t => {
  const apiSpy = sinon.spy($api, "createTimeRecord")
  const wrapper = shallowMount(tasks, { localVue, methods, mocks: { $api } })
  wrapper.vm.addTask(params)
  t.true(apiSpy.calledOnce)
  t.deepEqual(apiSpy.args[0], [{ description: "text" }])
  apiSpy.restore()
})

test('it should add new task to array', async t => {
  const wrapper = shallowMount(tasks, { localVue, methods, mocks: { $api } })
  await wrapper.vm.addTask(params)
  t.deepEqual(wrapper.vm.tasks[0], { id: 11, description: "text" })
})
