import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("signOut", () =>  {

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
    await apiInstance.signOut('data')
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const mock = sinon.stub(client, "delete").resolves({ data: "data" })
    await apiInstance.signOut('data')
    expect(mock.args[0]).to.eql(["/auth"])
  })

  it('should return response in case of success', async () => {
    sinon.stub(client, "delete").resolves({ data: "data" })
    const response = await apiInstance.signOut('data')
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "delete").rejects(error)
    return expect(apiInstance.signOut('data')).to.be.rejectedWith(error);
  })

})
