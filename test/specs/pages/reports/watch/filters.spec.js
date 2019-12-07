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


test("it should call method for fetching tasks if from and to dates were chose", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.stub(wrapper.vm, 'getTasks')

  await wrapper.setData({ filters: {
    fromDate: '2019-10-21',
    toDate: '2019-10-22'
  }});

  t.true(methodSpy.calledOnce)

  methodSpy.restore()
})

test("it should not call method for fetching tasks if fromDate is empty", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.stub(wrapper.vm, 'getTasks')

  await wrapper.setData({ filters: {
    fromDate: null,
    toDate: '2019-10-22'
  }});

  t.false(methodSpy.called)

  methodSpy.restore()
})

test("it should not call method for fetching tasks if toDate is empty", async t => {
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const methodSpy = sinon.stub(wrapper.vm, 'getTasks')

  await wrapper.setData({ filters: {
    fromDate: '2019-10-22',
    toDate: null 
  }});

  t.false(methodSpy.called)

  methodSpy.restore()
})
