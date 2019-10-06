import {serial as test} from 'ava';
import axios from 'axios';
import handler from '@/services/api/handler';
import { localStorageMock } from '@/test/support/local_storage_mock'

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

global.localStorage = localStorageMock


test("it should make a request via axios", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  await handler.perform('signInUser', 'data')
  t.truthy(handlerStub.calledOnce)
  handlerStub.restore()
})

test("it should collect headers and add them to request", async t => {
  const localStorageStub = sinon.stub(localStorageMock, 'getItem').returns("token")
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  await handler.perform('signInUser', 'data')
  t.is(handlerStub.args[0][2].headers.Authorization, 'Bearer token')
  handlerStub.restore()
  localStorageStub.restore()
})

test("it should return handled response with data", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  const handledResponse = await handler.perform('signInUser', 'data')
  t.is(handledResponse.data, "response")
  handlerStub.restore()
})

test("it should return true for success function if request was succesfull", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  const handledResponse = await handler.perform('signInUser', 'data')
  t.truthy(handledResponse.success())
  handlerStub.restore()
})

test("it should return false for success function if request was failed", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(failedRequest)
  const handledResponse = await handler.perform('signInUser', 'data')
  t.false(handledResponse.success())
  handlerStub.restore()
})

test("it should return errors if request was failed", async t => {
  const handlerStub = sinon.stub(axios, 'post').returns(failedRequest)
  const handledResponse = await handler.perform('signInUser', 'data')
  t.is(handledResponse.errors, 'errors!')
  handlerStub.restore()
})
