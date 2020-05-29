import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const assignedDate = new Date()

describe("approveTimeReport", () =>  {

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
    await apiInstance.approveTimeReport(1, {})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      workspace_id: 1,
      token: '2222222'
    }
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.approveTimeReport(1, data)
    expect(mock.args[0]).to.eql(["/time_locking_periods/1", data])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    const response = await apiInstance.approveTimeReport(1, {})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "put").rejects(error)
    return expect(apiInstance.approveTimeReport(1, {})).to.be.rejectedWith(error);
  })
})
