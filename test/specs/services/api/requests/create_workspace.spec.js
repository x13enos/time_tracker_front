import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const assignedDate = new Date()

describe("createWorkspace", () =>  {

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
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.createWorkspace({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      name: "test-poject"
    }
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.createWorkspace(data)
    expect(mock.args[0]).to.eql(["/workspaces", data])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.createWorkspace({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.createWorkspace({})).to.be.rejectedWith(error);
  })
})
