import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasks from '@/pages/tasks'

const localVue = createLocalVue()
localVue.use(Vuetify)

const app = {
  $api: {
    allProjects: () => { return { data: ["First"] } },
    allTimeRecords: () => { return { data: [{
      id: 1,
      project: { id: 2 },
      description: "Test",
      timeStart: "today",
      spentTime: 0.5
    }] } }
  },
  store: { commit: (name, data) => {} }
}

test('it should call method for fetching projects', async t => {
  const commitStub = sinon.stub(app.store, 'commit')

  const wrapper = await shallowMount(tasks, { localVue })
  await wrapper.vm.$options.fetch({ app })
  t.true(commitStub.calledOnce)
  t.deepEqual(commitStub.args[0], ['updateProjects', ["First"]])

  commitStub.restore();
})
