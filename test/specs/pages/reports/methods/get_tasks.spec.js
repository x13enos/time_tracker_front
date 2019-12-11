import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { serial as test } from 'ava';
import reports from '@/pages/reports'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)


const mocks = { $api: { allTimeRecords: () => {} } }

const success_response = {
  success: () => { return true },
  data: {
    totalSpentTime: 110,
    edges: ['edges']
  }
}

const fail_response = {
  success: () => { return false },
  errors: "errors"
}

const store = new Vuex.Store(fakeStoreData);

test("it should call method for fetching time records", async t => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(fail_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')

  await wrapper.vm.getTasks()

  t.true(apiStub.calledOnce)
  t.deepEqual(apiStub.args[0], ['filters'])

  apiStub.restore()
  filtersData.restore()
})

test("it should set totalAmount if response was successful", async t => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(success_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.getTasks()
  t.is(wrapper.vm.totalAmount, 110)

  apiStub.restore()
})

test("it should set tasks from recieved data", async t => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(success_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.getTasks()
  t.deepEqual(wrapper.vm.tasks, ['edges'])

  apiStub.restore()
})
