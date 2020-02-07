import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const assignedDate = new Date()

describe("createTimeRecord", () =>  {

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
    await apiInstance.createTimeRecord({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      spentTime: 1.0,
      description: "test",
      active: true,
      project: 12,
      assignedDate
    }
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.createTimeRecord(data)
    expect(mock.args[0]).to.eql(["/time_records", {
      spent_time: 1.0,
      description: "test",
      start_task: true,
      project_id: 12,
      assigned_date: assignedDate
    }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.createTimeRecord({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.createTimeRecord({})).to.be.rejectedWith(error);
  })
})
