import createWrapper from '@/test/support/create_wrapper.js'
import Workspaces from '@/pages/workspaces'

describe('mounted', () => {

  const methods = {
    fetchWorkspaces: () => {}
  }

  const mocks = {
    $config: {
      extensionEnabled: true
    }
  }

  it("should fetch projects", () => {
    const methodStub = sinon.stub(methods, 'fetchWorkspaces')
    createWrapper(Workspaces, { methods, mocks }, fakeStoreData())

    expect(methodStub.calledOnce).to.be.true

    sinon.restore()
  });

});
