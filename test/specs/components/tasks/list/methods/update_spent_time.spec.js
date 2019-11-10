import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }
const $appMethods = { isEmpty: (value) => { return false } }

const propsData = {
  day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
  currentDate: new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
}

test('it should keep passed time for task', t => {
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData })
  const task = { spentTime: 0.0 }

  wrapper.vm.updateSpentTime(0.5, task)
  t.is(task.spentTime, 0.5)
})
