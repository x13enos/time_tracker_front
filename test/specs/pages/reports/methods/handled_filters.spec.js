import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import reports from '@/pages/reports'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const mocks = { $api: { allTimeRecords: () => {
  return { success: () => { return false } }
} } }

test("it should return handled dates and user id", t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  wrapper.vm.filters = {
    fromDate: '2019-10-21',
    toDate: '2019-10-22',
    userId: 112
  }

  t.deepEqual(wrapper.vm.handledFilters(), {
    fromDate: 1571616000,
    toDate: 1571702400,
    userId: 112
  })

})
