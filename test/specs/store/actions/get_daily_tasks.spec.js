import actions from '@/store/actions';

describe("getDailyTasks", () => {
  const commitObject = { commit: (type, payload) => {} }

  const success_response = {
    data: {
      time_records: "data"
    }
  }

  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  before(() => {
    actions.$api = { dailyTimeRecords: () => {} }
  })

  it('should call api for auth user', async () => {
    const apiStub = sinon.stub(actions.$api, 'dailyTimeRecords').returns(success_response)
    await actions.getDailyTasks(commitObject, new Date())
    expect(apiStub.calledOnce).to.be.true
    apiStub.restore()
  })

  it('should clean list of tasks', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'dailyTimeRecords').returns(success_response)
    await actions.getDailyTasks(commitObject, new Date())
    expect(commitStub.args[0]).to.eql(['clearTasks'])
    apiStub.restore()
    commitStub.restore()
  })

  it('should clean interval id', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'dailyTimeRecords').returns(success_response)
    await actions.getDailyTasks(commitObject, new Date())
    expect(commitStub.args[1]).to.eql(['clearActiveTaskIntervalId'])
    apiStub.restore()
    commitStub.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'dailyTimeRecords').returns(success_response)
    await actions.getDailyTasks(commitObject, new Date())
    expect(commitStub.args[2]).to.eql([ 'updateTasks', 'data' ])
    apiStub.restore()
    commitStub.restore()
  })

  it('should not commit data if response is failed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'dailyTimeRecords').rejects("error")
    try{
      await actions.getDailyTasks(commitObject, new Date())
    } catch (error) {
      expect(commitStub.calledOnce).to.be.false
    }
    apiStub.restore()
    commitStub.restore()
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'dailyTimeRecords').returns(success_response)
    const response = await actions.getDailyTasks(commitObject, new Date())
    expect(response).to.eql(success_response)
    apiStub.restore()
  })

})
