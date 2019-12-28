import {serial as test} from 'ava';
import Api from '@/services/api/requests';
import HandlerMock from '@/test/support/handler_mock'

let apiInstance, mock, router, store

test.beforeEach(() => {
  store = { commit: () => {} }
  router = { push: (path) => {} }
  apiInstance = new Api(router, store)
  mock = new HandlerMock()
})

test.afterEach(() => {
  mock.restore()
})

test("it should call handler", async t => {
  mock.stub()
  await apiInstance.personalInfo('data')
  t.truthy(mock.performStub.calledOnce)
})

test("it should return response", async t => {
  const responceData = { success: () => true, data: "responseData" }
  mock.stub(responceData)
  const response = await apiInstance.personalInfo('data')
  t.is(response, responceData)
})
