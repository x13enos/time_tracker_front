import actions from '@/store/actions';

describe("approveTimeReport", () => {
  const commitObject = {
    commit: (type, payload) => {}
  }

  before(() => {
    actions.$api = { approveTimeReport: () => {} }
  })

  it('should call api for approving time report', async () => {
    const apiStub = sinon.stub(actions.$api, 'approveTimeReport')
    await actions.approveTimeReport(commitObject, 1)
    expect(apiStub.calledOnceWith(1)).to.be.true
    sinon.restore()
  })

  it('should call mutation of removing period from store', async () => {
    sinon.stub(actions.$api, 'approveTimeReport')
    const mutationStub = sinon.stub(commitObject, "commit")
    await actions.approveTimeReport(commitObject, 1)

    expect(mutationStub.calledOnceWith("removeUnapprovedTimePeriod", 1)).to.be.true
    sinon.restore()
  })
})
