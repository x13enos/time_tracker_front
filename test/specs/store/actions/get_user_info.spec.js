import {serial as test} from 'ava';
import actions from '@/store/actions';

const commitObject = {
  commit: (type, payload) => {}
}

const success_response = {
  success: () => { return true },
  data: 'data'
}
const fail_response = {
  success: () => { return false },
  errors: "errors"
}

actions.$api = { personalInfo: () => {} }

test("it should call api for getting personal info", async t => {
  const apiStub = sinon.stub(actions.$api, 'personalInfo').returns(success_response)
  await actions.getUserInfo(commitObject)
  t.true(apiStub.calledOnce)
  apiStub.restore()
})

test("it should commit data if response is success", async t => {
  const commitStub = sinon.stub(commitObject, 'commit')
  const apiStub = sinon.stub(actions.$api, 'personalInfo').returns(success_response)
  await actions.getUserInfo(commitObject)
  t.deepEqual(commitStub.args[0], [ 'updatePersonalInfo', 'data' ])
  apiStub.restore()
  commitStub.restore()
})
