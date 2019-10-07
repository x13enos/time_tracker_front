import {serial as test} from 'ava';
import Api from '@/services/api/requests';
import handler from '@/services/api/handler';

test("it should call handler", async t => {
  const handlerStub = sinon.stub(handler, 'perform')
  await Api.createTimeRecord('data')
  t.truthy(handlerStub.calledOnce)
  handlerStub.restore()
})

test("it should pass data to handler", async t => {
  const handlerStub = sinon.stub(handler, 'perform')
  await Api.createTimeRecord('data')
  t.deepEqual(handlerStub.args[0], ['createTimeRecord', 'data'])
  handlerStub.restore()
})

test("it should return response", async t => {
  const handlerStub = sinon.stub(handler, 'perform').returns("responseData")
  const response = await Api.createTimeRecord('data')
  t.is(response, "responseData")
  handlerStub.restore()
})
