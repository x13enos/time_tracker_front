import createWrapper from '@/test/support/create_wrapper.js'
import TimeReportApprove from '@/pages/time_reports/approve'

describe("approveTimeReport", () => {
  const successResponse = {
    success: () => { return true }
  }
  const $route = { query: { token: "2222", workspace_id: 1, period_id: 2 } }

  it('should clean errorMessages', () => {
    const $api = { approveTimeReport: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "approveTimeReport")
    const wrapper = createWrapper(TimeReportApprove, { mocks: { $api, $route  } }, fakeStoreData())
    wrapper.vm.errorMessages = "Error"

    wrapper.vm.approveTimeReport()
    expect(wrapper.vm.errorMessages).to.be.empty

    sinon.restore()
  });

  it('should call action with token, workspace_id and period_id', async () => {
    const $api = { approveTimeReport: () => { return successResponse } }
    const actionSpy = sinon.spy($api, "approveTimeReport")
    const wrapper = await createWrapper(TimeReportApprove, { mocks: { $api, $route } }, fakeStoreData())

    expect(actionSpy.calledOnceWith(2, {
      token: "2222",
      workspace_id: 1
    })).to.be.true

    sinon.restore()
  });

  it('should change attribute "reportWasApproved" in case of successful request', async () => {
    const $api = { approveTimeReport: () => { return successResponse } }
    const wrapper = createWrapper(TimeReportApprove, { mocks: { $api, $route } }, fakeStoreData())
    wrapper.vm.reportWasApproved = false

    await wrapper.vm.approveTimeReport()
    expect(wrapper.vm.reportWasApproved).to.be.true

    sinon.restore()
  });

  it('should call handleError method in case of having problem', async () => {
    const $api = { approveTimeReport: () => { return successResponse } }
    sinon.stub($api, "approveTimeReport").rejects({ errors: { base: 'another error' } })
    const wrapper = createWrapper(TimeReportApprove, { mocks: { $api, $route } }, fakeStoreData())
    const methodStub = sinon.stub(wrapper.vm, 'handleError');

    await wrapper.vm.approveTimeReport()
    expect(methodStub.args[0][0]).to.eql({ errors: { base: 'another error' } });
    sinon.restore()
  });
})
