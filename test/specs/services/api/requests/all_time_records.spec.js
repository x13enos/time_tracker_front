import axios from 'axios'
import Api from '@/services/api/requests'

let client, apiInstance, mock, router, store

const date = new Date()

describe('allTimeRecords', () => {
  beforeEach(() => {
    client = axios.create()
    sinon.stub(axios, 'create').returns(client)
    store = { commit: () => {} }
    router = { push: (path) => {} }
    apiInstance = new Api(router, store)
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should make get request', async () => {
    mock = sinon.stub(client, 'get').resolves({ data: 'data' })
    await apiInstance.allTimeRecords(date)
    expect(mock.calledOnce).to.be.true
  })

  it('should pass data', async () => {
    const params = {
      fromDate: 'fromDate',
      toDate: 'toDate',
      userId: 125,
      tagsIds: [1, 2]
    }
    mock = sinon.stub(client, 'get').resolves({ data: 'data' })
    await apiInstance.allTimeRecords(params)
    expect(mock.args[0]).to.eql(['/reports', {
      params: {
        from_date: 'fromDate',
        to_date: 'toDate',
        user_id: 125,
        tags_ids: [1, 2]
      }
    }])
  })

  it('should return response in case of success', async () => {
    mock = sinon.stub(client, 'get').resolves({ data: 'data' })
    const response = await apiInstance.allTimeRecords(date)
    expect(response).to.eql({ data: 'data' })
  })

  it('should reject error in case of fail', async () => {
    const error = { response: { data: { error: 'error message' } } }
    sinon.stub(client, 'get').rejects(error)
    return expect(apiInstance.allTimeRecords(date)).to.be.rejectedWith(error)
  })
})
