import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("updateUserProfile", () =>  {

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
    await apiInstance.updateUserProfile({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      name: "John Doe"
    }
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.updateUserProfile(data)
    expect(mock.args[0]).to.eql(["/users", data])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    const response = await apiInstance.updateUserProfile({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "put").rejects(error)
    return expect(apiInstance.updateUserProfile({})).to.be.rejectedWith(error);
  })
})
