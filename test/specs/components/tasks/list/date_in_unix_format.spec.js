import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import test from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)

const $api = {
  allTimeRecords: () => { return { data: [] } }
}

const props = { day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000') }

test('it should return date in unix format', t => {
  const wrapper = shallowMount(tasksList, { localVue, mocks: { $api }, propsData: props })
  t.is(wrapper.vm.dateInUnixFormat(wrapper.vm.day), 1572134400)
})
