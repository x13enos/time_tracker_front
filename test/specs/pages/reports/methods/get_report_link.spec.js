import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import { serial as test } from 'ava';
import reports from '@/pages/reports'

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)


const mocks = { $api: { generateReport: () => {} } }

const success_response = {
  success: () => { return true },
  data: {
    link: "/report.pdf"
  }
}

const fail_response = {
  success: () => { return false },
  errors: "errors"
}

const store = new Vuex.Store(fakeStoreData);

test("it should change status of loader",  t => {
  const apiStub = sinon.stub(mocks.$api, "generateReport").returns(fail_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')
  wrapper.vm.loadingReport = false

  wrapper.vm.getReportLink()
  t.true(wrapper.vm.loadingReport)

  apiStub.restore()
  filtersData.restore()
})

test("it should call method for generating report", async t => {
  const apiStub = sinon.stub(mocks.$api, "generateReport").returns(fail_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')

  await wrapper.vm.getReportLink()
  t.deepEqual(apiStub.args[0], ['filters'])

  apiStub.restore()
  filtersData.restore()
})

test("it should keep report link if response was successful", async t => {
  const apiStub = sinon.stub(mocks.$api, "generateReport").returns(success_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })

  await wrapper.vm.getReportLink()
  t.is(wrapper.vm.reportLink, "/report.pdf")

  apiStub.restore()
})

test("it should drop loading report status", async t => {
  const apiStub = sinon.stub(mocks.$api, "generateReport").returns(success_response)
  const wrapper = shallowMount(reports, { localVue, mocks, store })
  wrapper.vm.loadingReport = true

  await wrapper.vm.getReportLink()
  t.false(wrapper.vm.loadingReport)

  apiStub.restore()
})
