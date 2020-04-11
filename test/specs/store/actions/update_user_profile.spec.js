import actions from '@/store/actions';

const commitObject = {
  commit: (type, payload) => {}
}

const successResponse = {
  success: () => { return true },
  data: "data"
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

before(() => {
  actions.$api = { updateUserProfile: () => {} }
})

it('should call api for updating personal info', async () => {
  const apiStub = sinon.stub(actions.$api, 'updateUserProfile').returns(successResponse)
  await actions.updateUserProfile(commitObject, userData)
  expect(apiStub.calledOnce).to.be.true
  expect(apiStub.args[0]).to.eql([userData])
  apiStub.restore()
})

it('should commit data if response was success', async () => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'updateUserProfile').returns(successResponse)
  await actions.updateUserProfile(commitObject, userData)
  expect(commitStub.args[0]).to.eql([ 'updatePersonalInfo', 'data' ])
  apiStub.restore()
  commitStub.restore()
})

it('should return response', async () => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'updateUserProfile').returns(successResponse)
  const response = await actions.updateUserProfile(commitObject, userData)
  expect(response).to.eql(successResponse)
  apiStub.restore()
  commitStub.restore()
})
