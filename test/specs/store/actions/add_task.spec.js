import storeActions from '@/store/actions';
import $appMethods from "@/services/global_methods";
import { DateTime } from 'luxon';

describe("addTask", () => {
  const actions = Object.assign({}, storeActions);
  actions.$appMethods = $appMethods;

  const commitObject = {
    commit: (type, payload) => {},
    dispatch: (type, payload) => {},
  }

  const day = DateTime.local(2020, 4, 30);

  const successResponse = {
    success: () => { return true },
    data: 'data'
  }
  const fail_response = {
    success: () => { return false },
    errors: "errors"
  }

  beforeEach(() => {
    sinon.stub(DateTime, 'local').returns(day);
    actions.$api = { createTimeRecord: () => {} };
  })

  afterEach(() => {
    sinon.restore();
  });


  it('should call api for creating new time record', async () => {
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })

    expect(apiStub.calledOnce).to.be.true
    expect(apiStub.args[0]).to.eql([{ assignedDate: "4/30/2020" }])
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })

    expect(commitStub.args[0]).to.eql([ 'updateTask', 'data' ])
  })

  it('should call mutation for setting current task id if this task is active', async function(){
    const commitStub = sinon.stub(commitObject, 'commit')
    successResponse.data = {
      id: 222,
      time_start: 12312313
    }
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })

    expect(commitStub.args[1]).to.eql([ 'updateCurrentTask', successResponse.data ])
  });

  it('should not call mutation for setting current task id if this task is not active', async function(){
    const commitStub = sinon.stub(commitObject, 'commit')
    successResponse.data = {
      id: 222,
      time_start: null
    }
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: {}, day })

    expect(commitStub.args[1]).to.be.undefined;
  });


  it('should call action stopOtherTasks if response is success', async () => {
    const dispatchStub = sinon.stub(commitObject, 'dispatch')
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    await actions.addTask(commitObject, { params: { active: true }, day })

    expect(dispatchStub.args[0]).to.eql(['stopOtherTasks', true ])
  })

  it('should return response', async () => {
    const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(successResponse)
    const response = await actions.addTask(commitObject, { params: {}, day })

    expect(response).to.eql(successResponse)
  })

})
