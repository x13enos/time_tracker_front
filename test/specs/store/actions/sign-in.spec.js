import {serial as test} from 'ava';
import endpoints from '@/plugins/endpoints.js'
import actions from '@/store/actions'

const commitObject = { commit: (type, payload) => {} }

const success_response = {
  data: {
    data: {
      signInUser: 'userData'
    }
  }
}

const fail_response = {
  data: {
    errors: [{ message: 'error!' }]
  }
}

test("it should commit user's data if response statis is success", async t => {
  const endpointStub = sinon.stub(endpoints, 'signIn').returns(success_response)
  const commitSpy = sinon.spy(commitObject, 'commit')
  await actions.signIn(commitObject, {})
  t.truthy(commitSpy.calledOnce)
  t.deepEqual(commitSpy.args[0], ['updateUserData', 'userData'])
  commitSpy.restore()
  endpointStub.restore()
})

test("it should call endpoint with passed data", async t => {
  const userData = {
    email: 'example@gmail.com',
    password: '11111111'
  }
  const endpointStub = sinon.stub(endpoints, 'signIn').returns(success_response)
  await actions.signIn(commitObject, userData)
  t.truthy(endpointStub.calledOnce)
  t.deepEqual(endpointStub.args[0], [userData])
  endpointStub.restore()
})

test("it should return data and success status", async t => {
  const endpointStub = sinon.stub(endpoints, 'signIn').returns(success_response)
  const data = await actions.signIn(commitObject, {})
  t.deepEqual(data, {
    status: 'success',
    data: 'userData'
  })
  endpointStub.restore()
})

test("it should return errors and fail status", async t => {
  const endpointStub = sinon.stub(endpoints, 'signIn').returns(fail_response)
  const data = await actions.signIn(commitObject, {})
  t.deepEqual(data, {
    status: 'fail',
    errors: 'error!'
  })
  endpointStub.restore()
})
