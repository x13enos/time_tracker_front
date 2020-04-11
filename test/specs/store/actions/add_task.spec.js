import actions from '@/store/actions';
import { DateTime } from 'luxon';

describe("addTask", () => {
  const commitObject = {
    commit: (type, payload) => {},
    dispatch: (type, payload) => {},
  }

  const day = DateTime.local();

  const successResponse = {
    success: () => { return true },
    data: 'data'
  }
  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  before(() => {
    actions.$api = { createTimeRecord: () => {} }
  })

  it('should call api for creating new time record', async () => {
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })
    expect(apiStub.calledOnce).to.be.true
    expect(apiStub.args[0]).to.eql([{ assignedDate: day.ts / 1000 }])
    apiStub.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })
    expect(commitStub.args[0]).to.eql([ 'updateTask', 'data' ])
    apiStub.restore()
    commitStub.restore()
  })

  it('should call action stopOtherTasks if response is success', async () => {
    const dispatchStub = sinon.stub(commitObject, 'dispatch')
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })
    expect(dispatchStub.args[0]).to.eql(['stopOtherTasks', 'data' ])
    apiStub.restore()
    dispatchStub.restore()
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    const response = await actions.addTask(commitObject, { params: {}, day })
    expect(response).to.eql(successResponse)
    apiStub.restore()
  })

})
