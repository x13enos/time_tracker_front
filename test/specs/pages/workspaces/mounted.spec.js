import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('mounted', () => {

  const mocks = {
    $config: { extensionEnabled: false },
    $api: { allWorkspaces: () => ({}) }
  }

  it("should fetch projects", () => {
    const endpointStub = sinon.stub(mocks.$api, 'allWorkspaces').returns({})
    createWrapper(Workspaces, { mocks }, fakeStoreData())

    expect(endpointStub.calledOnce).to.be.true

    sinon.restore()
  });

});
