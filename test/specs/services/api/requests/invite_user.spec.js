import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

const date = new Date()

describe("inviteUser", () =>  {

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
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.inviteUser(1, 2)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.inviteUser(1, "admin@gmail.com")
    expect(mock.args[0]).to.eql(["/workspaces/1/workspace_users/", {
      email: "admin@gmail.com"
    }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.inviteUser(1, 2)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.inviteUser(1, 2)).to.be.rejectedWith(error);
  })
})
