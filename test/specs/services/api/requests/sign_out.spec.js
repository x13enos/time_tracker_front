
import Api from '@/services/api/requests';
import HandlerMock from '@/test/support/handler_mock'

let apiInstance, mock, router, store
describe("signOut", () =>  {

  beforeEach(() => {
    store = { commit: () => {} }
    router = { push: (path) => {} }
    apiInstance = new Api(router, store)
    mock = new HandlerMock()
  })

  afterEach(() => {
    mock.restore()
  })

  it('should call handler', async () => {
    mock.stub()
    await apiInstance.signOut()
    expect(mock.performStub.calledOnce).to.be.true
  })

  it('should pass data to handler', async () => {
    mock.stub()
    await apiInstance.signOut()
    expect(mock.performStub.args[0]).to.eql(['signOutUser', null])
  })

  it('should return response', async () => {
    const responceData = { success: () => true, data: "responseData" }
    mock.stub(responceData)
    const response = await apiInstance.signOut('data')
    expect(response).to.eq(responceData)
  })

})
