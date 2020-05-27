import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const assignedDate = new Date()

describe("createTimeLockingRule", () =>  {

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
    await apiInstance.createTimeLockingRule({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      period: 'weekly',
      workspace_id: 1
    }
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.createTimeLockingRule(data)
    expect(mock.args[0]).to.eql(["/time_locking_rules", data])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.createTimeLockingRule({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.createTimeLockingRule({})).to.be.rejectedWith(error);
  })
})
