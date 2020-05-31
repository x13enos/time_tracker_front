import createWrapper from '@/test/support/create_wrapper.js'
import { RouterLinkStub } from '@vue/test-utils'
import TimeReportApprove from '@/pages/time_reports/approve'

describe("mounted", () => {

  it('should call method of sending data to server if token is exist', async () => {
    const $route = { query: { token: "2222", workspace_id: 1, period_id: 2 } }
    const methods = { approveTimeReport: () => {} }
    const methodStub = sinon.stub(methods, "approveTimeReport")
    await createWrapper(TimeReportApprove, { mocks: { $route }, methods }, fakeStoreData())

    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it("should redirect user to the main page if token wasn't passed", async () => {
    const $route = { query: { workspace_id: 1, period_id: 2 } }
    const $router = { push: () => {} }
    const routerStub = sinon.stub($router, "push")
    await createWrapper(TimeReportApprove, { mocks: { $router, $route } }, fakeStoreData())

    expect(routerStub.calledOnceWith("/")).to.be.true

    sinon.restore()
  });
})
