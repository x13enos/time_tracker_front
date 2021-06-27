import actions from '@/store/actions';

describe("updateTask", () => {
  const commitObject = {
    commit: (type, payload) => {},
    dispatch: (type, payload) => {},
  }

  const successResponse = {
    success: () => { return true },
    data: 'data'
  }
  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  before(() => {
    actions.$api = { updateTimeRecord: () => {} }
  })

  it('should call api for updating time record', async () => {
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateTask(commitObject, { params: "params" })
    expect(apiStub.calledOnceWith({ params: "params" })).to.be.true
    sinon.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateTask(commitObject, { params: "params" })
    expect(commitStub.args[0]).to.eql(['updateTask', 'data' ])
    sinon.restore()
  })

  it('should call method for handle stopped task', async () => {
    const dispatchStub = sinon.stub(commitObject, 'dispatch')
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)

    await actions.updateTask(commitObject, { active: false })
    expect(dispatchStub.calledOnceWith('handleStoppingTask', successResponse.data)).to.be.true;
    sinon.restore()
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)
    const response = await actions.updateTask(commitObject, { params: "data" })
    expect(response).to.eql(successResponse)
    sinon.restore()
  })

})
