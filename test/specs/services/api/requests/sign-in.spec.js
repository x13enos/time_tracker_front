import {serial as test} from 'ava';
import Api from '@/services/api/requests';
import handler from '@/services/api/handler';

test("it should call handler", async t => {
  const handlerStub = sinon.stub(handler, 'call')
  await Api.signIn('data')
  t.truthy(handlerStub.calledOnce)
  handlerStub.restore()
})

test("it should pass data to handler", async t => {
  const handlerStub = sinon.stub(handler, 'call')
  await Api.signIn('data')
  t.deepEqual(handlerStub.args[0], ['data', 'signInUser'])
  handlerStub.restore()
})

test("it should return response", async t => {
  const handlerStub = sinon.stub(handler, 'call').returns("responseData")
  const response = await Api.signIn('data')
  t.is(response, "responseData")
  handlerStub.restore()
})
