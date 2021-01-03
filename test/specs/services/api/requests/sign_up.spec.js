import Api from '@/services/api/requests';
import axios from 'axios';

let client, apiInstance, mock, router, store

describe("signUp", () =>  {

  beforeEach(() => {
    localStorage.setItem("locale", "ru")
    client = axios.create()
    sinon.stub(axios, "create").returns(client)
    store = { commit: () => {} }
    router = { push: (path) => {} }
    apiInstance = new Api(router, store)
  })

  afterEach(() => {
    sinon.restore()
  })

  const userData = {
    email: "example@gmail.com",
    password: "1111"
  }

  it('should make post request', async () => {
    mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.signUp({})
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    localStorage.setItem("locale", "ru")
    const mock = sinon.stub(client, "post").resolves({ data: "data" })
    await apiInstance.signUp(userData)
    expect(mock.args[0]).to.eql([
      "/users/registrations",
      {
        "email": "example@gmail.com",
        "password": "1111",
        "locale": "ru"
      }
    ])
  })

  it('should return response in case of success', async () => {
    sinon.stub(client, "post").resolves({ data: "data" })
    const response = await apiInstance.signUp({})
    expect(response).to.eql({ data: "data" })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: "error message" }} }
    sinon.stub(client, "post").rejects(error)
    return expect(apiInstance.signUp({})).to.be.rejectedWith(error);
  })
})
