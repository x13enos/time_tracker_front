import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const assignedDate = new Date()

describe("updateUserData", () =>  {

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
    await apiInstance.updateUserData(1, {})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      name: "test-user"
    }
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.updateUserData(1, data)
    expect(mock.args[0]).to.eql(["/admin/users/1", data])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    const response = await apiInstance.updateUserData(1, {})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "put").rejects(error)
    return expect(apiInstance.updateUserData(1, {})).to.be.rejectedWith(error);
  })
})
