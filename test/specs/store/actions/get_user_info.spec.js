import actions from '@/store/actions';

describe("getUserInfo", () => {
  const commitObject = {
    commit: (type, payload) => {}
  }

  before(() => {
    actions.$api = { personalInfo: () => {} }
  })

  it('should call api for getting personal info', async () => {
    const apiStub = sinon.stub(actions.$api, 'personalInfo').returns({ data: 'data' })
    await actions.getUserInfo(commitObject)
    expect(apiStub.calledOnce).to.be.true
    apiStub.restore()
  })

  it('should commit data if response is success', async () => {
    const commitStub = sinon.stub(commitObject, 'commit')
    const apiStub = sinon.stub(actions.$api, 'personalInfo').returns({ data: 'data' })
    await actions.getUserInfo(commitObject)
    expect(commitStub.args[0]).to.eql([ 'updatePersonalInfo', 'data' ])
    apiStub.restore()
    commitStub.restore()
  })

})
