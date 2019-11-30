import {serial as test} from 'ava';
import actions from '@/store/actions';

const commitObject = {
  commit: (type, payload) => {}
}

const success_response = {
  success: () => { return true },
  data: {
    user: "data"
  }
}
const fail_response = {
  success: () => { return false },
  errors: "errors"
}

const userData = {
  name: "John",
  email: "john@gmail.com",
  timezone: "Athens"
}

actions.$api = { updateUserProfile: () => {} }

test("it should call api for updating personal info", async t => {
  const apiStub = sinon.stub(actions.$api, 'updateUserProfile').returns(success_response)
  await actions.updateUserProfile(commitObject, userData)
  t.true(apiStub.calledOnce)
  t.deepEqual(apiStub.args[0], [userData])
  apiStub.restore()
})

test("it should commit data if response was success", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'updateUserProfile').returns(success_response)
  await actions.updateUserProfile(commitObject, userData)
  t.deepEqual(commitStub.args[0], [ 'updatePersonalInfo', 'data' ])
  apiStub.restore()
  commitStub.restore()
})

test("it should return response", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'updateUserProfile').returns(success_response)
  const response = await actions.updateUserProfile(commitObject, userData)
  t.deepEqual(response, success_response)
  apiStub.restore()
  commitStub.restore()
})
