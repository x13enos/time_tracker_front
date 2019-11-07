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
  await apiInstance.deleteTimeRecord('data')
  t.true(mock.performStub.calledOnce)
})

test("it should pass data to handler", async t => {
  mock.stub("responseData")
  await apiInstance.deleteTimeRecord('data')
  t.deepEqual(mock.performStub.args[0], ['deleteTimeRecord', 'data'])
})

test("it should return response", async t => {
  mock.stub("responseData")
  const response = await apiInstance.deleteTimeRecord('data')
  t.is(response, "responseData")
})

test("it should redirect to route is error has info about unathorized attempt", async t => {
  mock.stub({ errors: "User must be logged in", code: 401})
  const routerStub = sinon.stub(router, 'push')
  await apiInstance.deleteTimeRecord('data')
  t.true(routerStub.calledOnce)
  t.deepEqual(routerStub.args[0], ["/auth/sign-in"])
  routerStub.restore()
})
