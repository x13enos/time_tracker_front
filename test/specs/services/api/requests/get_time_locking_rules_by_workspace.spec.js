import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

const date = new Date()

describe("getTimeLockingRulesByWorkspace", () =>  {

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
    await apiInstance.getTimeLockingRulesByWorkspace({ workpace_id: 15 })

    expect(mock.calledOnceWith("/time_locking_rules", { params: { workpace_id: 15 } })).to.be.true
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    const response = await apiInstance.getTimeLockingRulesByWorkspace()
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "get").rejects(error)
    return expect(apiInstance.getTimeLockingRulesByWorkspace()).to.be.rejectedWith(error);
  })
})
