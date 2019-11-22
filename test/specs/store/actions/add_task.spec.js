import {serial as test} from 'ava';
import actions from '@/store/actions';

const commitObject = {
  commit: (type, payload) => {},
  dispatch: (type, payload) => {},
}

const day = new Date

const success_response = {
  success: () => { return true },
  data: 'data'
}
const fail_response = {
  success: () => { return false },
  errors: "errors"
}

actions.$api = { createTimeRecord: () => {} }

test("it should call api for creating new time record", async t => {
  const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(success_response)
  await actions.addTask(commitObject, { params: {}, day })
  t.true(apiStub.calledOnce)
  t.deepEqual(apiStub.args[0], [{ assignedDate: day.getTime() / 1000 }])
  apiStub.restore()
})

test("it should commit data if response is success", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(success_response)
  await actions.addTask(commitObject, { params: {}, day })
  t.deepEqual(commitStub.args[0], [ 'addTask', 'data' ])
  apiStub.restore()
  commitStub.restore()
})

test("it should call action stopOtherTasks if response is success", async t => {
  const dispatchStub = sinon.stub(commitObject, 'dispatch')
  const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(success_response)
  await actions.addTask(commitObject, { params: {}, day })
  t.deepEqual(dispatchStub.args[0], [ 'stopOtherTasks', 'data' ])
  apiStub.restore()
  dispatchStub.restore()
})

test("it should return response", async t => {
  const apiStub = sinon.stub(actions.$api, 'createTimeRecord').returns(success_response)
  const response = await actions.addTask(commitObject, { params: {}, day })
  t.deepEqual(response, success_response)
  apiStub.restore()
})
