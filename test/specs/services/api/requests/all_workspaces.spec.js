import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("allWorkspaces", () =>  {

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
    await apiInstance.allWorkspaces()
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const params = {
      fromDate: "fromDate",
      toDate: "toDate",
      userId: 125
    }
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    await apiInstance.allWorkspaces()
    expect(mock.args[0]).to.eql(["/workspaces"])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    const response = await apiInstance.allWorkspaces()
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "get").rejects(error)
    return expect(apiInstance.allWorkspaces()).to.be.rejectedWith(error);
  })
})
