import createWrapper from '@/test/support/create_wrapper.js'
import reports from '@/pages/reports'

describe("getReportLink", () => {
  const mocks = { $api: { generateReport: () => {} } }
  const successResponse = {
    data: {
      link: "/report.pdf"
    }
  }

  it("it should change status of loader", () => {
    const apiStub = sinon.stub(mocks.$api, "generateReport").returns(successResponse)
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')
    wrapper.vm.loadingReport = false

    wrapper.vm.getReportLink()
    expect(wrapper.vm.loadingReport).to.be.true

    apiStub.restore()
    filtersData.restore()
  })

  it('should call method for generating report', async () => {
    const apiStub = sinon.stub(mocks.$api, "generateReport").returns(successResponse)
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    const filtersData = sinon.stub(wrapper.vm, 'handledFilters').returns('filters')

    await wrapper.vm.getReportLink()
    expect(apiStub.args[0]).to.eql(['filters'])

    apiStub.restore()
    filtersData.restore()
  })

  it('should keep report link if response was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "generateReport").returns(successResponse)
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())

    await wrapper.vm.getReportLink()
    expect(wrapper.vm.reportLink).to.eq("/report.pdf")

    apiStub.restore()
  })

  it('should drop loading report status', async () => {
    const apiStub = sinon.stub(mocks.$api, "generateReport").returns(successResponse)
    const wrapper = createWrapper(reports, { mocks }, fakeStoreData())
    wrapper.vm.loadingReport = true

    await wrapper.vm.getReportLink()
    expect(wrapper.vm.loadingReport).to.be.false

    apiStub.restore()
  })
})
