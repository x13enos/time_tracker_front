import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("updateTimeRecord", () =>  {

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
    await apiInstance.updateTimeRecord({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const data = {
      spentTime: 1.0,
      description: "test",
      active: true,
      project: 12,
      id: 125
    }
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    await apiInstance.updateTimeRecord(data)
    expect(mock.args[0]).to.eql([
      "/time_records/125",
      {
        start_task: true,
        description: 'test',
        project_id: 12,
        spent_time: 1.0
      }
    ])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "put").resolves({ data: "data" })
    const response = await apiInstance.updateTimeRecord({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "put").rejects(error)
    return expect(apiInstance.updateTimeRecord({})).to.be.rejectedWith(error);
  })
})
