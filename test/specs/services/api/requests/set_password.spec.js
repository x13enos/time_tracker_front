import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("setPassword", () =>  {

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

  it('should make post request', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.setPassword({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const params = {
      name: "test user",
      password: "11111111",
      token: "fods324fdsf2"
    }
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.setPassword(params)
    expect(mock.args[0]).to.eql(["/users/invitations", params])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    const response = await apiInstance.setPassword({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "put").rejects(error)
    return expect(apiInstance.setPassword({})).to.be.rejectedWith(error);
  })

})
