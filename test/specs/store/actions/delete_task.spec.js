import actions from '@/store/actions';

describe("deleteTask", () => {
  const commitObject = { commit: (type, payload) => {} }

  const successResponse = {
    success: () => { return true },
    data: 'data'
  }
  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  before(() => {
    actions.$api = { deleteTimeRecord: () => {} }
  })

  it('should call api for deleting time record', async () => {
    const apiStub = sinon.stub(actions.$api, 'deleteTimeRecord').returns(successResponse)
    await actions.deleteTask(commitObject, { data: 1 })
    expect(apiStub.calledOnce).to.be.true
    expect(apiStub.args[0]).to.eql([{ data: 1 }])
    apiStub.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'deleteTimeRecord').returns(successResponse)
    await actions.deleteTask(commitObject, { id: 1 })
    expect(commitStub.args[0]).to.eql(['deleteTask', { id: 1 }])
    apiStub.restore()
    commitStub.restore()
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'deleteTimeRecord').returns(successResponse)
    const response = await actions.deleteTask(commitObject, { data: 1 })
    expect(response).to.eql(successResponse)
    apiStub.restore()
  })

})
