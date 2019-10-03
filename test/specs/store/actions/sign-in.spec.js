import {serial as test} from 'ava';
import actions from '@/store/actions';

const commitObject = { commit: (type, payload) => {} }

const success_response = {
  success: () => { return true },
  data: 'data'
}

const fail_response = {
  success: () => { return false },
  errors: "errors"
}

actions.$api = { signIn: () => {} }

test("it should call api for auth user", async t => {
  const apiStub = sinon.stub(actions.$api, 'signIn').returns(success_response)
  await actions.signIn(commitObject, {})
  t.truthy(apiStub.calledOnce)
  apiStub.restore()
})

test("it should commit data if response is success", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'signIn').returns(success_response)
  await actions.signIn(commitObject, {})
  t.truthy(commitStub.calledOnce)
  t.deepEqual(commitStub.args[0], [ 'updateUserData', 'data' ])
  apiStub.restore()
  commitStub.restore()
})

test("it should not commit data if response is failed", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'signIn').returns(fail_response)
  await actions.signIn(commitObject, {})
  t.false(commitStub.calledOnce)
  apiStub.restore()
  commitStub.restore()
})

test("it should return response", async t => {
  const apiStub = sinon.stub(actions.$api, 'signIn').returns(success_response)
  const response = await actions.signIn(commitObject, {})
  t.deepEqual(response, success_response)
  apiStub.restore()
})
