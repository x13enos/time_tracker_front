import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

const date = new Date()

describe("removeUserFromWorkspace", () =>  {

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
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    await apiInstance.removeUserFromWorkspace(1, 2)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    await apiInstance.removeUserFromWorkspace(1, 2)
    expect(mock.args[0]).to.eql(["/workspaces/1/workspace_users/2"])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    const response = await apiInstance.removeUserFromWorkspace(1, 2)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "delete").rejects(error)
    return expect(apiInstance.removeUserFromWorkspace(1, 2)).to.be.rejectedWith(error);
  })
})
