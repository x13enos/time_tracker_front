import createWrapper from '@/test/support/create_wrapper.js'
import TimeReportsBlock from '@/components/admin/users/time_reports_block'

describe('fetchUserTimeReports', () => {
  const mocks = {
    $api: {
      getUserTimeReports: () => {}
    }
  }

  const propsData = {
    userId: 1
  }

  const successResponse = {
    data: [{ id: 1, from: "1/01/2001", to: "7/01/2001", approved: true }]
  }

  it("should call api method for fetching user time reports", async () => {
    const methodStub = sinon.stub(mocks.$api, 'getUserTimeReports').returns(successResponse)
    const wrapper = createWrapper(TimeReportsBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.fetchUserTimeReports()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep user time reports from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "getUserTimeReports").returns(successResponse)
    const wrapper = createWrapper(TimeReportsBlock, { propsData, mocks }, fakeStoreData())

    await wrapper.vm.fetchUserTimeReports()
    expect(wrapper.vm.timeReports).to.eql([{ id: 1, from: "1/01/2001", to: "7/01/2001", approved: true }])

    sinon.restore()
  })

});
