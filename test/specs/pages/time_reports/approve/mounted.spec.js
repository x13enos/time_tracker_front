import createWrapper from '@/test/support/create_wrapper.js'
import TimeReportApprove from '@/pages/time_reports/approve'

describe("mounted", () => {

  it('should call method of sending data to server if token is exist', async () => {
    const mocks = { 
      $api: { approveTimeReport: () => {} },
      $route: { query: { token: "2222", workspace_id: 1, period_id: 2 } },
      $router: { push: () => {} }
    }
    const methodStub = sinon.stub(mocks.$api, "approveTimeReport")
    await createWrapper(TimeReportApprove, { mocks }, fakeStoreData())

    expect(methodStub.called).to.be.true
    sinon.restore()
  });

  it("should redirect user to the main page if token wasn't passed", async () => {
    const $router = { push: () => {} }
    const routerStub = sinon.stub($router, "push")
    const mocks = { 
      $api: { approveTimeReport: () => {} },
      $route: { query: { workspace_id: 1, period_id: 2 } },
      $router
    }
    await createWrapper(TimeReportApprove, { mocks }, fakeStoreData())

    expect(routerStub.calledOnceWith("/")).to.be.true
    sinon.restore()
  });
})
