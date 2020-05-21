import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const assignedDate = new Date()

describe("deleteTag", () =>  {

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
    await apiInstance.deleteTag(1)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      name: "test-poject"
    }
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    await apiInstance.deleteTag(1)
    expect(mock.args[0]).to.eql(["/tags/1"])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "delete").resolves({ data: "data" })
    const response = await apiInstance.deleteTag(1)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "delete").rejects(error)
    return expect(apiInstance.deleteTag(1)).to.be.rejectedWith(error);
  })
})
