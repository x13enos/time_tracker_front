import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("changeActiveWorkspaceId", () =>  {

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

  it('should make put request', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.changeActiveWorkspaceId(2)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.changeActiveWorkspaceId(2)
    expect(mock.args[0]).to.eql(["/users/change_workspace", { workspace_id: 2 }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    const response = await apiInstance.changeActiveWorkspaceId(2)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "put").rejects(error)
    return expect(apiInstance.changeActiveWorkspaceId(2)).to.be.rejectedWith(error);
  })
})
