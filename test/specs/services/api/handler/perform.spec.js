
import axios from 'axios';
import Handler from '@/services/api/handler';
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


it('should make a request via axios', async () => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  await new Handler().perform('signInUser', 'data')
  expect(handlerStub.calledOnce).to.be.true
  handlerStub.restore()
})

it('should return handled response with data', async () => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  const handledResponse = await new Handler().perform('signInUser', 'data')
  expect(handledResponse.data).to.eq("response")
  handlerStub.restore()
})

it('should return true for success function if request was succesfull', async () => {
  const handlerStub = sinon.stub(axios, 'post').returns(successRequest)
  const handledResponse = await new Handler().perform('signInUser', 'data')
  expect(handledResponse.success()).to.be.true
  handlerStub.restore()
})

it('should return false for success function if request was failed', async () => {
  const handlerStub = sinon.stub(axios, 'post').returns(failedRequest)
  const handledResponse = await new Handler().perform('signInUser', 'data')
  expect(handledResponse.success()).to.be.false
  handlerStub.restore()
})

it('should return errors if request was failed', async () => {
  const handlerStub = sinon.stub(axios, 'post').returns(failedRequest)
  const handledResponse = await new Handler().perform('signInUser', 'data')
  expect(handledResponse.errors).to.eq('errors!')
  handlerStub.restore()
})
