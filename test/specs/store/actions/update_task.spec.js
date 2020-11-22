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
    expect(apiStub.calledOnce).to.be.true
    expect(apiStub.args[0]).to.eql([{ params: "params" }])
    apiStub.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)
    await actions.updateTask(commitObject, { params: "params" })
    expect(commitStub.args[0]).to.eql(['updateTask', 'data' ])
    apiStub.restore()
    commitStub.restore()
  })

  it('should call action stopOtherTasks if response is success', async () => {
    const dispatchStub = sinon.stub(commitObject, 'dispatch')
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)
    await actions.updateTask(commitObject, { active: true })
    expect(dispatchStub.args[0]).to.eql(['stopOtherTasks', true])
    apiStub.restore()
    dispatchStub.restore()
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'updateTimeRecord').returns(successResponse)
    const response = await actions.updateTask(commitObject, { params: "data" })
    expect(response).to.eql(successResponse)
    apiStub.restore()
  })

})
