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
  await apiInstance.createTimeRecord('data')
  t.truthy(mock.performStub.calledOnce)
})

test("it should pass data to handler", async t => {
  mock.stub("responseData")
  await apiInstance.createTimeRecord('data')
  t.deepEqual(mock.performStub.args[0], ['createTimeRecord', 'data'])
})

test("it should return response", async t => {
  mock.stub("responseData")
  const response = await apiInstance.createTimeRecord('data')
  t.is(response, "responseData")
})

test("it should redirect to route is error has info about unathorized attempt", async t => {
  mock.stub({ errors: "User must be logged in"})
  const routerStub = sinon.stub(router, 'push')
  await apiInstance.createTimeRecord('data')
  t.true(routerStub.calledOnce)
  t.deepEqual(routerStub.args[0], ["/auth/sign-in"])
  routerStub.restore()
})
