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

const $api = {
  updateTimeRecord: () => { return { data: "data" } },
  allTimeRecords: () => { return { data: [] } }
}

const task = {
  id: 11,
  description: "old text"
}

const params = { description: "new text" }
const props = { day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000') }

test('it should call api for updating record', t => {
  const apiSpy = sinon.spy($api, "updateTimeRecord")
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api }, propsData: props })
  wrapper.vm.updateTask(params, task)
  t.true(apiSpy.calledOnce)
  t.deepEqual(apiSpy.args[0], [{ description: "new text" }])
  apiSpy.restore()
})

test('it should update passed task', async t => {
  const wrapper = shallowMount(tasksList, { localVue, methods, mocks: { $api }, propsData: props })
  await wrapper.vm.updateTask(params, task)
  t.deepEqual(task, { id: 11, description: "new text" })
})
