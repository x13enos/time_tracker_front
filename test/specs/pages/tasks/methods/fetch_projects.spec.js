import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = {
  allProjects: () => { return { data: "data" } }
}

const methods = {
  fetchTasks: () => {}
}

test('it should fetch list of projects for user', async t => {
  const actionSpy = sinon.spy($api, "allProjects")
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api }, methods })

  wrapper.vm.fetchProjects()

  t.true(actionSpy.calledTwice)
  actionSpy.restore()
});

test('it should assign received data to variable', async t => {
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api }, methods })

  wrapper.vm.fetchProjects()

  t.is(wrapper.vm.projects, "data")
});
