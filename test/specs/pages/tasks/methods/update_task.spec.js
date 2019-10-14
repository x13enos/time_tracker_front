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
  updateTimeRecord: () => { return { data: "data" } }
}

const task = {
  id: 11,
  description: "old text"
}

const params = { description: "new text" }

test('it should call api for updating record', t => {
  const apiSpy = sinon.spy($api, "updateTimeRecord")
  const wrapper = shallowMount(tasks, { localVue, methods, mocks: { $api } })
  wrapper.vm.updateTask(params, task)
  t.true(apiSpy.calledOnce)
  t.deepEqual(apiSpy.args[0], [{ description: "new text" }])
  apiSpy.restore()
})

test('it should update passed task', async t => {
  const wrapper = shallowMount(tasks, { localVue, methods, mocks: { $api } })
  await wrapper.vm.updateTask(params, task)
  t.deepEqual(task, { id: 11, description: "new text" })
})
