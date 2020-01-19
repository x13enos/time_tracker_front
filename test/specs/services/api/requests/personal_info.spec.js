
import Api from '@/services/api/requests';
import HandlerMock from '@/test/support/handler_mock'

let apiInstance, mock, router, store

describe("personalInfo", () =>  {

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
    await apiInstance.personalInfo('data')
    expect(mock.performStub.calledOnce).to.be.true
  })

  it('should return response', async () => {
    const responceData = { success: () => true, data: "responseData" }
    mock.stub(responceData)
    const response = await apiInstance.personalInfo('data')
    expect(response).to.eq(responceData)
  })

})
