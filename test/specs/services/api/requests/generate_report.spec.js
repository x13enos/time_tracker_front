import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const date = new Date()

describe("generateReport", () =>  {

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
    await apiInstance.generateReport(date)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const params = {
      fromDate: "fromDate",
      toDate: "toDate",
      userId: 125
    }
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    await apiInstance.generateReport(params)
    expect(mock.args[0]).to.eql(["/reports", {
      params: {
        from_date: "fromDate",
        to_date: "toDate",
        user_id: 125,
        pdf: true
      }
    }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "get").resolves({ data: "data" })
    const response = await apiInstance.generateReport(date)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "get").rejects(error)
    return expect(apiInstance.generateReport(date)).to.be.rejectedWith(error);
  })
  
})
