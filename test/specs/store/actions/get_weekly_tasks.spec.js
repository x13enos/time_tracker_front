import actions from '@/store/actions';

describe("getWeeklyTasks", () => {
  const commitObject = { commit: (type, payload) => {} }

  const successResponse = {
    data: {
      time_records: "data"
    }
  }

  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  before(() => {
    actions.$api = { weeklyTimeRecords: () => {} }
  })

  it('should call api for auth user', async () => {
    const apiStub = sinon.stub(actions.$api, 'weeklyTimeRecords').returns(successResponse)
    await actions.getWeeklyTasks(commitObject, new Date())
    expect(apiStub.calledOnce).to.be.true
    apiStub.restore()
  })

  it('should clean list of tasks', async () => {
    const date = new Date()
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'weeklyTimeRecords').returns(successResponse)
    await actions.getWeeklyTasks(commitObject, date)
    expect(commitStub.args[0]).to.eql(['reinitTasksObject', date])
    apiStub.restore()
    commitStub.restore()
  })

  it('should clean interval id', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'weeklyTimeRecords').returns(successResponse)
    await actions.getWeeklyTasks(commitObject, new Date())
    expect(commitStub.args[1]).to.eql(['clearActiveTaskIntervalId'])
    apiStub.restore()
    commitStub.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'weeklyTimeRecords').returns(successResponse)
    await actions.getWeeklyTasks(commitObject, new Date())
    expect(commitStub.args[2]).to.eql([ 'updateTasks', { time_records: "data" } ])
    apiStub.restore()
    commitStub.restore()
  })

  it('should not commit data if response is failed', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'weeklyTimeRecords').rejects("error")
    try{
      await actions.getWeeklyTasks(commitObject, new Date())
    } catch (error) {
      expect(commitStub.calledOnce).to.be.false
    }
    apiStub.restore()
    commitStub.restore()
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'weeklyTimeRecords').returns(successResponse)
    const response = await actions.getWeeklyTasks(commitObject, new Date())
    expect(response).to.eql(successResponse)
    apiStub.restore()
  })

})
