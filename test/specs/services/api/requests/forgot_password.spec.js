import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store
const date = new Date()

describe("forgotPassword", () =>  {

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
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.forgotPassword(date)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    localStorage.setItem("locale", "ru")
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.forgotPassword("test@gmail.com")
    expect(mock.args[0]).to.eql(["/users/passwords", { email: "test@gmail.com", locale: "ru" }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.forgotPassword(date)
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.forgotPassword(date)).to.be.rejectedWith(error);
  })

})
