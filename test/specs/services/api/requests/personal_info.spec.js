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
  await apiInstance.personalInfo('data')
  t.truthy(mock.performStub.calledOnce)
})

test("it should return response", async t => {
  mock.stub("responseData")
  const response = await apiInstance.personalInfo('data')
  t.is(response, "responseData")
})
