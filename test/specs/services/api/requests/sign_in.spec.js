import {serial as test} from 'ava';
import Api from '@/services/api/requests';
import HandlerMock from '@/test/support/handler_mock'

let apiInstance, mock, router

test.beforeEach(() => {
  router = { push: (path) => {} }
  apiInstance = new Api(router)
  mock = new HandlerMock()
})

test.afterEach(() => {
  mock.restore()
})

test("it should call handler", async t => {
  mock.stub("responseData")
  await apiInstance.signIn('data')
  t.truthy(mock.performStub.calledOnce)
})

test("it should pass data to handler", async t => {
  mock.stub("responseData")
  await apiInstance.signIn('data')
  t.deepEqual(mock.performStub.args[0], ['signInUser', 'data'])
})

test("it should return response", async t => {
  mock.stub("responseData")
  const response = await apiInstance.signIn('data')
  t.is(response, "responseData")
})
