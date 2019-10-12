import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = {
  allTimeRecords: () => { return { data: [{
    id: 1,
    description: "example",
    spentTime: 0.5,
    timeStart: "today",
    project: {
      id: 2
    }
  }] } }
}

const methods = {
  fetchProjects: () => {},
  handleTasksData: (data) => {}
}

test('it should fetch list of projects for user', async t => {
  const actionSpy = sinon.spy($api, "allTimeRecords")
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api }, methods })

  await wrapper.vm.fetchTasks()

  t.true(actionSpy.calledTwice)
  actionSpy.restore()
});

test('it should call method and passed data to that', async t => {
  const methodStub = sinon.stub(methods, "handleTasksData")
  const wrapper = await shallowMount(tasks, { localVue, mocks: { $api }, methods })

  await wrapper.vm.fetchTasks()

  t.true(methodStub.called)
  t.deepEqual(methodStub.args[1][0], $api.allTimeRecords().data)
  methodStub.restore()
});
