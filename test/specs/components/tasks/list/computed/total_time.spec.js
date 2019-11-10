import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }
const propsData = {
  day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
  currentDate: new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
}

test('it should return total time from received tasks', t => {
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api }, propsData })
  wrapper.vm.tasks = [{ spentTime: 0.5 }, { spentTime: 1.25 }, { spentTime: 0.0 }]
  t.is(wrapper.vm.totalTime, 1.75)
})
