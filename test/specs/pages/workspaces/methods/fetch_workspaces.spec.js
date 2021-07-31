import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('fetchWorkspaces', () => {
  const mocks = {
    $config: { extensionEnabled: false },
    $api: { allWorkspaces: () => ({}) }
  }

  const successResponse = {
    data: [{ name: 'Workspace', id: 11 }]
  }

  it("should call api method for fetching workspaces", async () => {
    const methodStub = sinon.stub(mocks.$api, 'allWorkspaces').returns(successResponse)
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    await wrapper.vm.fetchWorkspaces()
    expect(methodStub.called).to.be.true

    sinon.restore()
  });

  it('should keep projects from recieved data if request was successful', async () => {
    const apiStub = sinon.stub(mocks.$api, "allWorkspaces").returns(successResponse)
    const wrapper = createWrapper(Workspaces, { mocks }, fakeStoreData())

    await wrapper.vm.fetchWorkspaces()
    expect(wrapper.vm.workspaces).to.eql([{ name: 'Workspace', id: 11 }])

    sinon.restore()
  })

});
