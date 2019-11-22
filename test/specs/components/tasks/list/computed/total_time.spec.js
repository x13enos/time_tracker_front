import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import {serial as test} from 'ava';
import tasksList from '@/components/tasks/list'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const $api = { allTimeRecords: () => { return { data: [] } } }
const store = new Vuex.Store(fakeStoreData)
const propsData = {
  day: new Date('Sun Oct 27 2019 00:00:00 GMT+0000'),
  currentDate: new Date('Sun Oct 27 2019 00:00:00 GMT+0000')
}

test('it should return total time from received tasks', t => {
  store.state.tasks = [{ spentTime: 0.5 }, { spentTime: 1.25 }, { spentTime: 0.0 }]
  const wrapper = shallowMount(tasksList, { localVue, store, mocks: { $api }, propsData });

  t.is(wrapper.vm.totalTime, 1.75);
})
