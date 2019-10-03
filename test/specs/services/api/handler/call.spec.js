import {serial as test} from 'ava';
import axios from 'axios';
import handler from '@/services/api/handler';

const successRequest = {
  data: {
    data: { signInUser: "response" }
  }
}

const failedRequest = {
  data: {
    data: null,
    errors: [ { message: "errors!" } ]
  }
}

test("it should make a request via axios", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  await handler.call('data', 'signInUser')
  t.truthy(handlerStub.calledOnce)
  handlerStub.restore()
})

test("it should return handled response with data", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  const handledResponse = await handler.call('data', 'signInUser')
  t.is(handledResponse.data, "response")
  handlerStub.restore()
})

test("it should return true for success function if request was succesfull", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  const handledResponse = await handler.call('data', 'signInUser')
  t.truthy(handledResponse.success())
  handlerStub.restore()
})

test("it should return false for success function if request was failed", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(failedRequest)
  const handledResponse = await handler.call('data', 'signInUser')
  t.false(handledResponse.success())
  handlerStub.restore()
})

test("it should return errors if request was failed", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(failedRequest)
  const handledResponse = await handler.call('data', 'signInUser')
  t.is(handledResponse.errors, 'errors!')
  handlerStub.restore()
})
