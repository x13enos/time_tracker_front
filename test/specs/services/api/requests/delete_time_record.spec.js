
import Api from '@/services/api/requests';
import HandlerMock from '@/test/support/handler_mock'

let apiInstance, mock, router, store

describe("deleteTimeRecord", () =>  {

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
    await apiInstance.deleteTimeRecord('data')
    expect(mock.performStub.calledOnce).to.be.true
  })

  it('should pass data to handler', async () => {
    mock.stub()
    await apiInstance.deleteTimeRecord('data')
    expect(mock.performStub.args[0]).to.eql(['deleteTimeRecord', 'data'])
  })

  it('should return response', async () => {
    const responceData = { success: () => true, data: "responseData" }
    mock.stub(responceData)
    const response = await apiInstance.deleteTimeRecord('data')
    expect(response).to.eq(responceData)
  })

  it('should redirect to route is error has info about unathorized attempt', async () => {
    mock.stub({ success: () => false, errors: "User must be logged in", code: 401})
    const routerStub = sinon.stub(router, 'push')
    await apiInstance.deleteTimeRecord('data')
    expect(routerStub.calledOnce).to.be.true
    expect(routerStub.args[0]).to.eql(["/auth/sign-in"])
    routerStub.restore()
  })

})
