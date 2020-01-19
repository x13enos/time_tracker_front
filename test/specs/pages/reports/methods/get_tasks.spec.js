import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

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

it('should drop report link', async () => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(fail_response)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
  const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')
  wrapper.vm.reportLink = "/report.pdf"

  await wrapper.vm.getTasks()
  expect(wrapper.vm.reportLink).to.eq(null)

  apiStub.restore()
  filtersData.restore()
})

it('should call method for fetching time records', async () => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(fail_response)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
  const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')

  await wrapper.vm.getTasks()

  expect(apiStub.calledOnce).to.be.true
  expect(apiStub.args[0]).to.eql(['filters'])

  apiStub.restore()
  filtersData.restore()
})

it('should set totalAmount if response was successful', async () => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(success_response)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

  await wrapper.vm.getTasks()
  expect(wrapper.vm.totalAmount).to.eq(110)

  apiStub.restore()
})

it('should set tasks from recieved data', async () => {
  const apiStub = sinon.stub(mocks.$api, "allTimeRecords").returns(success_response)
  const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

  await wrapper.vm.getTasks()
  expect(wrapper.vm.tasks).to.eql(['edges'])

  apiStub.restore()
})
