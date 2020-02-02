import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("deleteTimeRecord", () =>  {

  beforeEach(() => {
    client = axios.create()
    sinon.stub(axios, "create").returns(client)
    store = { commit: () => {} }
    router = { push: (path) => {} }
    apiInstance = new Api(router, store)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should make delete request', async () => {
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    await apiInstance.deleteTimeRecord({ id: 125 })
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    await apiInstance.deleteTimeRecord({ id: 125 })
    expect(mock.args[0]).to.eql(["/time_records/125"])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    const response = await apiInstance.deleteTimeRecord({ id: 125 })
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "delete").rejects(error)
    return expect(apiInstance.deleteTimeRecord({ id: 125 })).to.be.rejectedWith(error);
  })

  // it('should call handler', async () => {
  //   mock.stub()
  //   await apiInstance.deleteTimeRecord('data')
  //   expect(mock.performStub.calledOnce).to.be.true
  // })
  //
  // it('should pass data to handler', async () => {
  //   mock.stub()
  //   await apiInstance.deleteTimeRecord('data')
  //   expect(mock.performStub.args[0]).to.eql(['deleteTimeRecord', 'data'])
  // })
  //
  // it('should return response', async () => {
  //   const responceData = { success: () => true, data: "responseData" }
  //   mock.stub(responceData)
  //   const response = await apiInstance.deleteTimeRecord('data')
  //   expect(response).to.eq(responceData)
  // })
  //
  // it('should redirect to route is error has info about unathorized attempt', async () => {
  //   mock.stub({ success: () => false, errors: "User must be logged in", code: 401})
  //   const routerStub = sinon.stub(router, 'push')
  //   await apiInstance.deleteTimeRecord('data')
  //   expect(routerStub.calledOnce).to.be.true
  //   expect(routerStub.args[0]).to.eql(["/auth/sign-in"])
  //   routerStub.restore()
  // })

})
