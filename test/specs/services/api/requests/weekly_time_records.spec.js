import Api from '@/services/api/requests';
import axios from 'axios';
import { DateTime } from 'luxon'

let client, apiInstance, mock, router, store
const assigned_date = DateTime.fromObject({ year: 2020, month: 4, day: 30})

describe("weeklyTimeRecords", () =>  {

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
    await apiInstance.weeklyTimeRecords(assigned_date)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    await apiInstance.weeklyTimeRecords(assigned_date)
    expect(mock.args[0]).to.eql(["/time_records", { params: { assigned_date: "4/30/2020" } }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    const response = await apiInstance.weeklyTimeRecords(assigned_date)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "get").rejects(error)
    return expect(apiInstance.weeklyTimeRecords(assigned_date)).to.be.rejectedWith(error);
  })
})
