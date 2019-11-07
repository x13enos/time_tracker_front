import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = { allTimeRecords: () => { return { data: [] } } }

test('it should return true if currentDate is equal to day', t => {
  const propsData = {
    day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
    currentDate: new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
  }

  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api }, propsData })
  t.true(wrapper.vm.activeDay)
})

test('it should return false if currentDate is not equal to day', t => {
  const propsData = {
    day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
    currentDate: new Date('Sun Oct 28 2019 00:00:00 GMT+0000')
  }

  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api }, propsData })
  t.false(wrapper.vm.activeDay)
})
