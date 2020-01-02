import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'
import { DateTime } from 'luxon'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }

const params = { description: "text" }
const propsData = {
  day: DateTime.local(2019, 10, 27),
  currentDate: DateTime.local(2019, 10, 27)
}

test('it should keep passed id', t => {
  const $appMethods = { isEmpty: (value) => { return false } }
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api, $appMethods }, propsData })

  wrapper.vm.keepIntervalId(11)
  t.is(wrapper.vm.intervalId, 11)
})
