import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import test from 'ava';
import reports from '@/pages/reports'
import { DateTime } from 'luxon';

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

const store = new Vuex.Store(fakeStoreData);
const mocks = { $api: { allTimeRecords: () => {
  return { success: () => { return false } }
} } }

const time = DateTime.local()
const stubTime = sinon.stub(DateTime, 'fromObject').returns(time)

test("it should call method for setting dates for current week", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "this_week" });

  t.true(methodSpy.calledOnce)
  t.deepEqual(methodSpy.args[0], ['week', time])

  methodSpy.restore()
  stubTime.restore()
})

test("it should call method for setting dates for last week", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "last_week" });

  t.true(methodSpy.calledOnce)
  t.deepEqual(methodSpy.args[0], ['week', time.minus({days: 7})])

  methodSpy.restore()
  stubTime.restore()
})

test("it should call method for setting dates for current month", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "this_month" });

  t.true(methodSpy.calledOnce)
  t.deepEqual(methodSpy.args[0], ['month', time])

  methodSpy.restore()
  stubTime.restore()
})

test("it should call method for setting dates for last month", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.spy(wrapper.vm, 'setDates')

  await wrapper.setData({ quickDate: "last_month" });

  t.true(methodSpy.calledOnce)
  t.deepEqual(methodSpy.args[0], ['month', time.minus({month: 1})])

  methodSpy.restore()
  stubTime.restore()
})
