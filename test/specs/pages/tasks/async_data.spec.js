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
  }
}

test('it should call method for fetching projects', async t => {
  const wrapper = await shallowMount(tasks, { localVue })

  const mergedData = await wrapper.vm.$options.asyncData({ app })
  t.deepEqual(mergedData, {
    projects: ["First"],
    tasks: [{
      id: 1,
      project: 2,
      description: "Test",
      timeStart: "today",
      spentTime: 0.5
    }]
  })
})
