import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const date = new Date()

describe("changePassword", () =>  {

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
    await apiInstance.changePassword(date)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const params = {
      password: "11111111",
      confirm_password: "11111111"
    }
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.changePassword(params)
    expect(mock.args[0]).to.eql(["/reset_password", params])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.changePassword(date)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.changePassword(date)).to.be.rejectedWith(error);
  })

})
