import createWrapper from '@/test/support/create_wrapper.js'
import TimeReportsBlock from '@/components/admin/users/time_reports_block'

describe('unblock', () => {
  const mocks = {
    $api: {
      unblockUserTimeReport: () => {}
    }
  }

  const propsData = {
    userId: 1
  }

  const successResponse = {
    data: "ok"
  }

  it("should call api method for unblocking time report", async () => {
    const methodStub = sinon.stub(mocks.$api, 'unblockUserTimeReport').returns(successResponse)
    const wrapper = createWrapper(TimeReportsBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.timeReports = [{ id: 25, approved: true }]

    await wrapper.vm.unblock(wrapper.vm.timeReports[0])
    expect(methodStub.calledOnceWith(1, 25)).to.be.true

    sinon.restore()
  });

  it('should change approved status to false in case of unblocking time report', async () => {
    sinon.stub(mocks.$api, "unblockUserTimeReport").returns(successResponse)
    const wrapper = createWrapper(TimeReportsBlock, { propsData, mocks }, fakeStoreData())
    wrapper.vm.timeReports = [{ id: 25, approved: true }]

    await wrapper.vm.unblock(wrapper.vm.timeReports[0])
    expect(wrapper.vm.timeReports[0].approved).to.be.false

    sinon.restore()
  })

  it('should call snack for showing message in case of unblocking time report', async () => {
    sinon.stub(mocks.$api, "unblockUserTimeReport").returns(successResponse)
    const wrapper = createWrapper(TimeReportsBlock, { propsData, mocks }, fakeStoreData())
    const snackStub = sinon.stub(wrapper.vm, "updateSnack").returns(successResponse)
    wrapper.vm.timeReports = [{ id: 25, approved: true }]

    await wrapper.vm.unblock(wrapper.vm.timeReports[0])
    expect(snackStub.calledOnceWith({ message: 'users.time_reports.was_unblocked', color: "green" })).to.be.true

    sinon.restore()
  })

});
