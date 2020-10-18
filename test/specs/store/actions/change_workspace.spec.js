import actions from '@/store/actions';

describe("changeActiveWorkspaceId", () => {
  const successResponse = {
    success: () => { return true },
    data: 'data'
  }

  before(() => {
    actions.$api = { changeActiveWorkspaceId: () => {} }
    actions.$router = { go: () => {} }
  })

  it('should call api for changing active workspace', async () => {
    const apiStub = sinon.stub(actions.$api, 'changeActiveWorkspaceId').returns(successResponse)

    await actions.changeWorkspace({}, 1)
    expect(apiStub.calledOnceWith(1)).to.be.true
    sinon.restore()
  })

  it('should refresh page for user', async () => {
    const routerStub = sinon.stub(actions.$router, 'go')

    await actions.changeWorkspace({}, 1)
    expect(routerStub.calledOnce).to.be.true
    sinon.restore()
  })
})
