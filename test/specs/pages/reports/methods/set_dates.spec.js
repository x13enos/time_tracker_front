import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { serial as test } from 'ava';
import reports from '@/pages/reports';
import { DateTime } from 'luxon';

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const mocks = { $api: { allTimeRecords: () => {
  return { success: () => { return false } }
} } }
const time = DateTime.fromObject({ year: 2020, month: 1, day: 2 })

test("it should set date from", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.setDates('week', time)
  t.is(wrapper.vm.filters.fromDate, "2019-12-30")
})

test("it should set date to", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.setDates('week', time)
  t.is(wrapper.vm.filters.toDate, "2020-01-05")
})
