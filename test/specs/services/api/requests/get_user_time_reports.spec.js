import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("getUserTimeReports", () =>  {

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

  it('should make get request', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    await apiInstance.getUserTimeReports(2)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    await apiInstance.getUserTimeReports(2)
    expect(mock.args[0]).to.eql(["/admin/users/2/time_reports"])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    const response = await apiInstance.getUserTimeReports(2)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "get").rejects(error)
    return expect(apiInstance.getUserTimeReports(2)).to.be.rejectedWith(error);
  })
})
