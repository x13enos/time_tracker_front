import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper, fetchProjectsStub, fetchTasksStub;

const methods = {
  fetchProjects: () => {},
  fetchTasks: () => {}
}

test.beforeEach(async (t) => {
  fetchProjectsStub = sinon.stub(methods, "fetchProjects")
  fetchTasksStub = sinon.stub(methods, "fetchTasks")
  wrapper = await shallowMount(tasks, { localVue, methods })
})

test.afterEach((t) => {
  fetchProjectsStub.restore()
  fetchTasksStub.restore()
})

test('it should call method for fetching projects', t => {
  t.true(fetchProjectsStub.calledOnce)
})

test('it should call method for fetching tasks', t => {
  t.true(fetchTasksStub.calledOnce)
})
