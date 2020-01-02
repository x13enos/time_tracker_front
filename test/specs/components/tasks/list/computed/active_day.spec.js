import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list';
import { DateTime } from 'luxon';

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }

test('it should return true if currentDate is equal to day', t => {
  const propsData = {
    day: DateTime.local(2019, 10, 27),
    currentDate: DateTime.local(2019, 10, 27)
  }

  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api }, propsData })
  t.true(wrapper.vm.activeDay)
})

test('it should return false if currentDate is not equal to day', t => {
  const propsData = {
    day: DateTime.local(2019, 10, 27),
    currentDate: DateTime.local(2019, 10, 28)
  }

  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api }, propsData })
  t.false(wrapper.vm.activeDay)
})
