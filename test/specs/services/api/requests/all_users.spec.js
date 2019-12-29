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
  await apiInstance.allUsers()
  t.truthy(mock.performStub.calledOnce)
})

test("it should return response", async t => {
  const responceData = { success: () => true, data: "responseData" }
  mock.stub(responceData)
  const response = await apiInstance.allUsers()
  t.is(response, responceData)
})

test("it should redirect to route is error has info about unathorized attempt", async t => {
  mock.stub({ success: () => false, errors: "User must be logged in", code: 401})
  const routerStub = sinon.stub(router, 'push')
  await apiInstance.allUsers()
  t.true(routerStub.calledOnce)
  t.deepEqual(routerStub.args[0], ["/auth/sign-in"])
  routerStub.restore()
})