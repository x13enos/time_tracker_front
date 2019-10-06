import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = {
  allProjects: () => { return { data: "data" } }
}

test('it should fetch list of projects for user', async t => {
  const actionSpy = sinon.spy($api, "allProjects")
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api } })
  t.true(actionSpy.calledOnce)
  actionSpy.restore()
});

test('it should assign received response', async t => {
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api } })
  t.is(wrapper.vm.projects, "data")
});

test('it should add new item to the tasks array', async t => {
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api } })
  t.deepEqual(wrapper.vm.tasks, [{}])
});
